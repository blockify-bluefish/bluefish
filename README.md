# Bluefish Website

Website tĩnh được serve bằng Node.js và Express.

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy server:
```bash
npm start
```

Hoặc chạy với nodemon để tự động restart khi có thay đổi:
```bash
npm run dev
```

3. Mở trình duyệt và truy cập: `http://localhost:3000`

## Deploy lên Vercel

1. Cài đặt Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

## Deploy lên Netlify

1. Kéo thả thư mục vào Netlify Dashboard
2. Hoặc kết nối với Git repository

## Deploy lên Heroku

1. Tạo Procfile:
```
web: node server.js
```

2. Deploy với Heroku CLI:
```bash
heroku create your-app-name
git push heroku main
```

## Cấu trúc thư mục

```
├── index.html      # File HTML chính
├── server.js       # Server Node.js
├── package.json    # Dependencies
└── README.md       # Hướng dẫn này
```
