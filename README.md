![CI](https://github.com/maitamdev/uml-gen/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/github/license/maitamdev/uml-gen)
![Version](https://img.shields.io/badge/version-1.1.0-blue)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

<p align="center">
  <h1 align="center">ðŸ“ UML Diagram Generator</h1>
  <p align="center">
    <strong>Tá»± Ä‘á»™ng táº¡o sÆ¡ Ä‘á»“ UML tá»« mÃ´ táº£ tiáº¿ng Viá»‡t báº±ng AI</strong>
  </p>
  <p align="center">
    <a href="https://github.com/maitamdev/uml-gen">
      <img src="https://img.shields.io/badge/Made%20by-MaiTamDev-818cf8?style=for-the-badge" alt="MaiTamDev">
    </a>
    <img src="https://img.shields.io/badge/Vite-TypeScript-646CFF?style=for-the-badge&logo=vite" alt="Vite">
    <img src="https://img.shields.io/badge/AI-Hugging%20Face%20%2F%20Groq-FFD21E?style=for-the-badge" alt="AI">
    <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT">
  </p>
</p>

---

## âœ¨ TÃ­nh nÄƒng

- ðŸ¤– **AI-Powered** â€” Há»— trá»£ 2 provider: Hugging Face & Groq, tá»± Ä‘á»™ng chuyá»ƒn Ä‘á»•i khi háº¿t quota
- ðŸ“Š **4 loáº¡i sÆ¡ Ä‘á»“ UML** â€” Use Case, Activity, Sequence, Class Diagram
- ðŸ“ **PhÃ¢n tÃ­ch song song** â€” BÃ i phÃ¢n tÃ­ch chi tiáº¿t báº±ng tiáº¿ng Viá»‡t Ä‘i kÃ¨m má»—i sÆ¡ Ä‘á»“
- ðŸŽ¨ **Giao diá»‡n premium** â€” Dark theme, glassmorphism, micro-animations
- ðŸ“¥ **Xuáº¥t file** â€” SVG, PNG, copy to clipboard
- ðŸ“± **Responsive** â€” Hoáº¡t Ä‘á»™ng trÃªn má»i thiáº¿t bá»‹
- ðŸ”€ **Auto-Failover** â€” Tá»± Ä‘á»™ng chuyá»ƒn provider khi gáº·p lá»—i quota/rate-limit

## ðŸ–¼ï¸ Demo

> Nháº­p mÃ´ táº£ Ä‘á» tÃ i â†’ AI táº¡o 4 sÆ¡ Ä‘á»“ UML + bÃ i phÃ¢n tÃ­ch chi tiáº¿t

## ðŸš€ CÃ i Ä‘áº·t & Cháº¡y

### YÃªu cáº§u

- [Node.js](https://nodejs.org/) phiÃªn báº£n 18+
- API Key tá»« [Hugging Face](https://huggingface.co/settings/tokens) hoáº·c [Groq](https://console.groq.com/keys) (miá»…n phÃ­)

### BÆ°á»›c 1: Clone & CÃ i Ä‘áº·t

```bash
git clone https://github.com/maitamdev/uml-gen.git
cd uml-gen
npm install
```

### BÆ°á»›c 2: Cháº¡y dev server

```bash
npm run dev
```

Má»Ÿ trÃ¬nh duyá»‡t táº¡i `http://localhost:5173`

### BÆ°á»›c 3: Cáº¥u hÃ¬nh API Key

1. Báº¥m âš™ï¸ **Settings** á»Ÿ gÃ³c pháº£i trÃªn
2. Chá»n provider (khuyÃªn dÃ¹ng **Hugging Face**)
3. DÃ¡n API Key â†’ Báº¥m **LÆ°u & Kiá»ƒm tra**
4. Khi tháº¥y ðŸŸ¢ xanh lÃ  sáºµn sÃ ng!

## ðŸ”‘ HÆ°á»›ng dáº«n láº¥y API Key

### Hugging Face (KhuyÃªn dÃ¹ng)

1. Truy cáº­p [huggingface.co/join](https://huggingface.co/join) â†’ ÄÄƒng kÃ½ (báº±ng Google/GitHub cho nhanh)
2. VÃ o [Settings â†’ Tokens](https://huggingface.co/settings/tokens) â†’ **Create new token**
   - Token name: `uml-generator`
   - Token type: **Read** (Ä‘á»§ dÃ¹ng)
3. Báº¥m **Create token** â†’ Copy token (báº¯t Ä‘áº§u báº±ng `hf_...`)
4. DÃ¡n vÃ o app â†’ LÆ°u

> ðŸ’¡ **Miá»…n phÃ­**: ~300 requests/giá»

### Groq

1. Truy cáº­p [console.groq.com/keys](https://console.groq.com/keys) â†’ ÄÄƒng nháº­p
2. Báº¥m **Create API Key** â†’ Copy key (báº¯t Ä‘áº§u báº±ng `gsk_...`)
3. Äá»•i provider sang **Groq** trong Settings â†’ DÃ¡n key â†’ LÆ°u

> âš¡ **Nhanh hÆ¡n** Hugging Face nhÆ°ng giá»›i háº¡n requests/phÃºt

### ðŸ’¡ Máº¹o: Nháº­p key cho Cáº¢ 2 provider

Khi 1 provider háº¿t quota â†’ app **tá»± Ä‘á»™ng chuyá»ƒn** sang provider cÃ²n láº¡i!

## ðŸ—ï¸ Build Production

```bash
npm run build
```

Folder `dist/` chá»©a file tÄ©nh, deploy lÃªn báº¥t ká»³ hosting nÃ o:

- [Vercel](https://vercel.com) (khuyÃªn dÃ¹ng)
- [Netlify](https://netlify.com)
- GitHub Pages

## ðŸ› ï¸ Tech Stack

| CÃ´ng nghá»‡            | Má»¥c Ä‘Ã­ch                  |
| -------------------- | ------------------------- |
| **Vite**             | Build tool & dev server   |
| **TypeScript**       | Type-safe JavaScript      |
| **Mermaid.js**       | Render sÆ¡ Ä‘á»“ UML          |
| **Marked.js**        | Render Markdown phÃ¢n tÃ­ch |
| **Hugging Face API** | AI provider (Qwen 72B)    |
| **Groq API**         | AI provider (LLaMA 70B)   |

## ðŸ“ Cáº¥u trÃºc dá»± Ã¡n

```
uml-gen/
â”œâ”€â”€ index.html              # Trang chÃ­nh
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ main.ts             # Logic á»©ng dá»¥ng
â”‚   â”œâ”€â”€ ai-generator.ts     # AI provider & prompt system
â”‚   â”œâ”€â”€ diagram-renderer.ts # Mermaid renderer
â”‚   â”œâ”€â”€ export.ts           # Xuáº¥t SVG/PNG
â”‚   â”œâ”€â”€ templates.ts        # Äá» máº«u sáºµn
â”‚   â””â”€â”€ style.css           # Thiáº¿t káº¿ giao diá»‡n
â”œâ”€â”€ package.json
â”œâ”€â”€ vite.config.ts
â”œâ”€â”€ vercel.json             # Config deploy Vercel
â””â”€â”€ README.md
```

## ðŸ“„ License

[MIT License](LICENSE) Â© 2026 [MaiTamDev](https://github.com/maitamdev)

---

<p align="center">
  Made with â¤ï¸ by <a href="https://github.com/maitamdev"><strong>MaiTamDev</strong></a>
</p>

