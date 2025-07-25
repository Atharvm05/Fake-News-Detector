# Fake News Radar – AI-Powered News Credibility Checker

A futuristic web application that uses machine learning to analyze news content and determine its credibility.

## Features

- Paste any news snippet or URL to analyze
- AI-powered credibility scoring
- Highlighting of potentially misleading content
- User-friendly, futuristic interface

## Tech Stack

- **Frontend**: React with Tailwind CSS
- **Backend**: FastAPI
- **ML Model**: HuggingFace Transformers + PyTorch
- **Datasets**: FakeNewsNet, LIAR

## Project Structure

```
├── frontend/            # React frontend application
├── backend/             # FastAPI backend server
│   ├── app/             # Application code
│   ├── model/           # ML model files
│   └── data/            # Dataset files
└── notebooks/           # Jupyter notebooks for model training
```

## Getting Started

### Prerequisites

- Node.js and npm
- Python 3.8+
- PyTorch
- HuggingFace Transformers

### Installation

1. Clone the repository
2. Set up the frontend:
   ```
   cd frontend
   npm install
   npm start
   ```
3. Set up the backend:
   ```
   cd backend
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

## License

MIT