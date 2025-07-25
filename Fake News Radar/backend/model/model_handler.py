import os
import torch
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
from typing import Dict, List, Any, Tuple, Optional
import re
from .url_extractor import URLContentExtractor

class FakeNewsDetector:
    def __init__(self, model_path: Optional[str] = None):
        """
        Initialize the fake news detector with a pre-trained model.
        If model_path is None, it will use a default HuggingFace model.
        """
        self.model_name = "distilbert-base-uncased-finetuned-sst-2-english"  # Placeholder
        self.model_version = "1.0.0"
        self.last_updated = "2023-07-25"
        
        # Initialize URL content extractor
        self.url_extractor = URLContentExtractor()
        
        # In a real implementation, we would load a fine-tuned model for fake news detection
        # For now, we'll use a sentiment analysis model as a placeholder
        try:
            if model_path and os.path.exists(model_path):
                # Load local model
                self.tokenizer = AutoTokenizer.from_pretrained(model_path)
                self.model = AutoModelForSequenceClassification.from_pretrained(model_path)
            else:
                # Load from HuggingFace
                self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
                self.model = AutoModelForSequenceClassification.from_pretrained(self.model_name)
                
            self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
            self.model.to(self.device)
            
            # Create a text classification pipeline
            self.classifier = pipeline(
                "text-classification",
                model=self.model,
                tokenizer=self.tokenizer,
                device=0 if torch.cuda.is_available() else -1
            )
            
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            # Fallback to a simpler model or raise the exception
            raise
    
    def _preprocess_text(self, text: str) -> str:
        """
        Clean and preprocess the input text.
        """
        # Remove URLs
        text = re.sub(r'https?://\S+|www\.\S+', '[URL]', text)
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        return text
    
    def _segment_text(self, text: str, max_length: int = 512) -> List[str]:
        """
        Split text into segments that fit within the model's max token length.
        """
        words = text.split()
        segments = []
        current_segment = []
        current_length = 0
        
        for word in words:
            # Approximate token count (words are usually shorter than tokens)
            word_tokens = len(self.tokenizer.tokenize(word))
            
            if current_length + word_tokens <= max_length:
                current_segment.append(word)
                current_length += word_tokens
            else:
                segments.append(' '.join(current_segment))
                current_segment = [word]
                current_length = word_tokens
        
        if current_segment:
            segments.append(' '.join(current_segment))
            
        return segments
    
    def _identify_misleading_segments(self, text: str, threshold: float = 0.6) -> List[Dict[str, Any]]:
        """
        Identify segments of text that might be misleading.
        Returns a list of dictionaries with segment text and confidence score.
        """
        # Split text into sentences (simplified approach)
        sentences = re.split(r'(?<=[.!?])\s+', text)
        
        misleading_segments = []
        
        for i, sentence in enumerate(sentences):
            if len(sentence.strip()) < 10:  # Skip very short sentences
                continue
                
            # Classify the sentence
            result = self.classifier(sentence)
            
            # In a real implementation, we would have a model trained specifically for fake news
            # For this placeholder, we're using sentiment as a proxy (negative = potentially misleading)
            # This is just for demonstration purposes
            label = result[0]['label']
            score = result[0]['score']
            
            if label == "NEGATIVE" and score > threshold:
                misleading_segments.append({
                    "text": sentence,
                    "confidence": float(score),
                    "index": i,
                    "reason": "Potentially misleading content"
                })
        
        return misleading_segments
    
    def analyze_text(self, text: str) -> Dict[str, Any]:
        """
        Analyze text and return credibility score and highlighted segments.
        """
        # Preprocess the text
        cleaned_text = self._preprocess_text(text)
        
        # For longer texts, we need to segment and analyze each part
        segments = self._segment_text(cleaned_text)
        
        # Get overall classification for each segment
        segment_scores = []
        for segment in segments:
            result = self.classifier(segment)
            # For this placeholder, we're using sentiment as a proxy
            # (POSITIVE = credible, NEGATIVE = not credible)
            label = result[0]['label']
            score = result[0]['score']
            
            # Convert sentiment score to credibility score
            # This is just for demonstration - a real model would be trained differently
            if label == "POSITIVE":
                credibility = score
            else:
                credibility = 1.0 - score
                
            segment_scores.append(credibility)
        
        # Calculate overall credibility score (average of segments)
        overall_score = sum(segment_scores) / len(segment_scores) if segment_scores else 0.5
        
        # Identify potentially misleading segments
        highlighted_segments = self._identify_misleading_segments(cleaned_text)
        
        # Determine category based on score
        if overall_score >= 0.7:
            category = "Credible"
        elif overall_score >= 0.4:
            category = "Somewhat Credible"
        else:
            category = "Not Credible"
        
        return {
            "score": float(overall_score),
            "category": category,
            "highlighted_segments": highlighted_segments
        }
    
    def analyze_url(self, url: str) -> Dict[str, Any]:
        """
        Analyze content from a URL and return credibility score and highlighted segments.
        
        Args:
            url (str): The URL to analyze
            
        Returns:
            dict: Analysis results including score, category, and highlighted segments
        """
        try:
            # Extract content from URL
            extracted_data = self.url_extractor.extract_content(url)
            
            # Analyze the extracted content
            content_to_analyze = f"{extracted_data['title']}. {extracted_data['content']}"
            analysis_result = self.analyze_text(content_to_analyze)
            
            # Add source metadata to the result
            analysis_result['source_metadata'] = extracted_data['metadata']
            analysis_result['url'] = url
            analysis_result['title'] = extracted_data['title']
            
            return analysis_result
            
        except Exception as e:
            # Log the error and return a failure response
            print(f"Error analyzing URL {url}: {str(e)}")
            raise ValueError(f"Failed to analyze URL: {str(e)}")
    
    def analyze_batch(self, texts: List[str]) -> List[Dict[str, Any]]:
        """
        Analyze a batch of texts and return credibility scores for each.
        """
        return [self.analyze_text(text) for text in texts]