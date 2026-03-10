# UML Diagram Generator

Tu dong tao 10 loai so do UML tu mo ta tieng Viet bang AI.

## Tinh nang

- AI-powered (Hugging Face / Groq)
- 10 loai so do: Use Case, Activity, Sequence, Class, ERD, State, Component, Deployment, DFD, Gantt
- Phan tich van ban song song voi so do
- Giao dien dark theme premium
- Responsive design
- Xuat SVG/PNG

## Cai dat

```bash
npm install
npm run dev
```

## Cau hinh

1. Tao token tai [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Mo app -> Settings -> Dan token -> Luu

## Tech Stack

- Vite + TypeScript
- Mermaid.js
- Hugging Face Inference API / Groq API

## Deploy

```bash
npm run build
```

Deploy folder dist/ len Vercel, Netlify, hoac bat ky static hosting nao.
