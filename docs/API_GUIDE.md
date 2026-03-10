# API Integration Guide

## Supported Providers

### Hugging Face (Recommended)
- **Model**: Qwen/Qwen2.5-Coder-32B-Instruct
- **Free tier**: 300 requests/hour
- **Get key**: https://huggingface.co/settings/tokens

### Groq
- **Model**: llama-3.3-70b-versatile
- **Free tier**: 30 requests/minute
- **Get key**: https://console.groq.com/keys

## Auto-Failover
The system automatically switches to the backup provider when:
- HTTP 402 (Payment Required) - quota exceeded
- HTTP 429 (Too Many Requests) - rate limited

## API Key Storage
Keys are stored in `localStorage` per provider:
- `uml-gen-key-huggingface`
- `uml-gen-key-groq`

## Rate Limits
| Provider     | Requests/min | Requests/hour |
|-------------|-------------|---------------|
| Hugging Face | ~5          | 300           |
| Groq         | 30          | 600           |
