<p align="center">
  <h1 align="center">📐 UML Diagram Generator</h1>
  <p align="center">
    <strong>Tự động tạo sơ đồ UML từ mô tả tiếng Việt bằng AI</strong>
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

## ✨ Tính năng

- 🤖 **AI-Powered** — Hỗ trợ 2 provider: Hugging Face & Groq, tự động chuyển đổi khi hết quota
- 📊 **4 loại sơ đồ UML** — Use Case, Activity, Sequence, Class Diagram
- 📝 **Phân tích song song** — Bài phân tích chi tiết bằng tiếng Việt đi kèm mỗi sơ đồ
- 🎨 **Giao diện premium** — Dark theme, glassmorphism, micro-animations
- 📥 **Xuất file** — SVG, PNG, copy to clipboard
- 📱 **Responsive** — Hoạt động trên mọi thiết bị
- 🔀 **Auto-Failover** — Tự động chuyển provider khi gặp lỗi quota/rate-limit

## 🖼️ Demo

> Nhập mô tả đề tài → AI tạo 4 sơ đồ UML + bài phân tích chi tiết

## 🚀 Cài đặt & Chạy

### Yêu cầu

- [Node.js](https://nodejs.org/) phiên bản 18+
- API Key từ [Hugging Face](https://huggingface.co/settings/tokens) hoặc [Groq](https://console.groq.com/keys) (miễn phí)

### Bước 1: Clone & Cài đặt

```bash
git clone https://github.com/maitamdev/uml-gen.git
cd uml-gen
npm install
```

### Bước 2: Chạy dev server

```bash
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`

### Bước 3: Cấu hình API Key

1. Bấm ⚙️ **Settings** ở góc phải trên
2. Chọn provider (khuyên dùng **Hugging Face**)
3. Dán API Key → Bấm **Lưu & Kiểm tra**
4. Khi thấy 🟢 xanh là sẵn sàng!

## 🔑 Hướng dẫn lấy API Key

### Hugging Face (Khuyên dùng)

1. Truy cập [huggingface.co/join](https://huggingface.co/join) → Đăng ký (bằng Google/GitHub cho nhanh)
2. Vào [Settings → Tokens](https://huggingface.co/settings/tokens) → **Create new token**
   - Token name: `uml-generator`
   - Token type: **Read** (đủ dùng)
3. Bấm **Create token** → Copy token (bắt đầu bằng `hf_...`)
4. Dán vào app → Lưu

> 💡 **Miễn phí**: ~300 requests/giờ

### Groq

1. Truy cập [console.groq.com/keys](https://console.groq.com/keys) → Đăng nhập
2. Bấm **Create API Key** → Copy key (bắt đầu bằng `gsk_...`)
3. Đổi provider sang **Groq** trong Settings → Dán key → Lưu

> ⚡ **Nhanh hơn** Hugging Face nhưng giới hạn requests/phút

### 💡 Mẹo: Nhập key cho CẢ 2 provider

Khi 1 provider hết quota → app **tự động chuyển** sang provider còn lại!

## 🏗️ Build Production

```bash
npm run build
```

Folder `dist/` chứa file tĩnh, deploy lên bất kỳ hosting nào:

- [Vercel](https://vercel.com) (khuyên dùng)
- [Netlify](https://netlify.com)
- GitHub Pages

## 🛠️ Tech Stack

| Công nghệ            | Mục đích                  |
| -------------------- | ------------------------- |
| **Vite**             | Build tool & dev server   |
| **TypeScript**       | Type-safe JavaScript      |
| **Mermaid.js**       | Render sơ đồ UML          |
| **Marked.js**        | Render Markdown phân tích |
| **Hugging Face API** | AI provider (Qwen 72B)    |
| **Groq API**         | AI provider (LLaMA 70B)   |

## 📁 Cấu trúc dự án

```
uml-gen/
├── index.html              # Trang chính
├── src/
│   ├── main.ts             # Logic ứng dụng
│   ├── ai-generator.ts     # AI provider & prompt system
│   ├── diagram-renderer.ts # Mermaid renderer
│   ├── export.ts           # Xuất SVG/PNG
│   ├── templates.ts        # Đề mẫu sẵn
│   └── style.css           # Thiết kế giao diện
├── package.json
├── vite.config.ts
├── vercel.json             # Config deploy Vercel
└── README.md
```

## 📄 License

[MIT License](LICENSE) © 2026 [MaiTamDev](https://github.com/maitamdev)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/maitamdev"><strong>MaiTamDev</strong></a>
</p>
