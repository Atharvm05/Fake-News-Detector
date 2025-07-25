import requests
from bs4 import BeautifulSoup
import logging
from newspaper import Article
from readability import Document
from typing import Dict, Any, Optional
import re
from datetime import datetime

logger = logging.getLogger(__name__)

class URLContentExtractor:
    """Class for extracting content from URLs"""
    
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        }
        
    def _extract_source_from_url(self, url):
        """Extract the source name from the URL
        
        Args:
            url (str): The URL to extract the source from
            
        Returns:
            str: The extracted source name
        """
        try:
            # Remove protocol and www
            domain = re.sub(r'^https?://(www\.)?', '', url)
            # Get the domain part (before the first /)
            domain = domain.split('/')[0]
            # Extract the main domain name (e.g., nytimes.com -> New York Times)
            parts = domain.split('.')
            if len(parts) >= 2:
                main_name = parts[-2]  # Get the part before the TLD
                # Convert to title case and replace hyphens/underscores with spaces
                main_name = main_name.replace('-', ' ').replace('_', ' ').title()
                return main_name
            return domain
        except Exception:
            return domain
    
    def extract_content(self, url):
        """Extract main content from a URL using multiple extraction methods
        
        Args:
            url (str): The URL to extract content from
            
        Returns:
            dict: A dictionary containing the extracted title, content, and metadata
        """
        try:
            # First try using newspaper3k for extraction
            try:
                article = Article(url)
                article.download()
                article.parse()
                
                # Get content from newspaper3k
                title = article.title
                content = article.text
                
                # Get metadata
                metadata = {
                    'published_date': article.publish_date.strftime('%Y-%m-%d') if article.publish_date else None,
                    'author': ', '.join(article.authors) if article.authors else None,
                    'source': self._extract_source_from_url(url)
                }
                
                # If we got good content, return it
                if title and len(content) > 100:
                    return {
                        'title': title,
                        'content': content,
                        'metadata': metadata,
                        'url': url
                    }
            except Exception as e:
                logger.warning(f"newspaper3k extraction failed for {url}: {str(e)}")
            
            # If newspaper3k fails, try readability-lxml
            response = requests.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            
            # Use readability to extract the main content
            doc = Document(response.text)
            title = doc.title()
            content = doc.summary()
            
            # Clean up the HTML content
            soup = BeautifulSoup(content, 'lxml')
            content = soup.get_text(separator=' ', strip=True)
            
            # Extract metadata using BeautifulSoup
            soup = BeautifulSoup(response.content, 'lxml')
            metadata = self._extract_metadata(soup, url)
            
            return {
                'title': title,
                'content': content,
                'metadata': metadata,
                'url': url
            }
            
        except requests.RequestException as e:
            logger.error(f"Error fetching URL {url}: {str(e)}")
            raise ValueError(f"Could not fetch content from URL: {str(e)}")
        except Exception as e:
            logger.error(f"Error processing URL {url}: {str(e)}")
            raise ValueError(f"Error processing URL content: {str(e)}")
    
    def _extract_title(self, soup):
        """Extract the title from the page"""
        # Try to get the title from different possible elements
        if soup.title:
            return soup.title.text.strip()
        
        # Try h1 tags
        h1 = soup.find('h1')
        if h1:
            return h1.text.strip()
        
        return "Unknown Title"
    
    def _extract_main_content(self, soup):
        """Extract the main content from the page
        
        This is a simplified implementation. In a production system, you would
        use more sophisticated content extraction algorithms.
        """
        # Remove script and style elements
        for script_or_style in soup(["script", "style", "nav", "footer", "header", "aside"]):
            script_or_style.decompose()
        
        # Try to find the main content container
        main_content = None
        
        # Look for common content containers
        content_candidates = [
            soup.find('article'),
            soup.find('main'),
            soup.find(attrs={"class": ["content", "article", "post", "entry"]}),
            soup.find(attrs={"id": ["content", "article", "post", "entry"]}),
            soup.find('div', class_='content'),
        ]
        
        # Use the first valid candidate
        for candidate in content_candidates:
            if candidate:
                main_content = candidate
                break
        
        # If no main content container found, use the body
        if not main_content:
            main_content = soup.body
        
        # Extract paragraphs
        paragraphs = main_content.find_all('p')
        content = ' '.join([p.text.strip() for p in paragraphs if len(p.text.strip()) > 20])
        
        # If no substantial paragraphs found, try getting all text
        if not content or len(content) < 100:
            content = main_content.get_text(separator=' ', strip=True)
        
        return content
    
    def _extract_metadata(self, soup, url):
        """Extract metadata from the page"""
        metadata = {}
        
        # Extract publication date
        date_candidates = [
            soup.find('meta', property='article:published_time'),
            soup.find('meta', itemprop='datePublished'),
            soup.find(attrs={"class": ["date", "published", "time", "timestamp"]}),
        ]
        
        for candidate in date_candidates:
            if candidate:
                if candidate.get('content'):
                    metadata['published_date'] = candidate['content']
                    break
                elif candidate.text:
                    metadata['published_date'] = candidate.text.strip()
                    break
        
        # Extract author
        author_candidates = [
            soup.find('meta', property='article:author'),
            soup.find('meta', name='author'),
            soup.find('meta', itemprop='author'),
            soup.find(attrs={"class": ["author", "byline"]}),
        ]
        
        for candidate in author_candidates:
            if candidate:
                if candidate.get('content'):
                    metadata['author'] = candidate['content']
                    break
                elif candidate.text:
                    metadata['author'] = candidate.text.strip()
                    break
        
        # Extract source/publisher
        source_candidates = [
            soup.find('meta', property='og:site_name'),
            soup.find('meta', name='publisher'),
        ]
        
        for candidate in source_candidates:
            if candidate and candidate.get('content'):
                metadata['source'] = candidate['content']
                break
        
        # If no source found, use the domain name
        if 'source' not in metadata:
            from urllib.parse import urlparse
            domain = urlparse(url).netloc
            metadata['source'] = domain
        
        return metadata