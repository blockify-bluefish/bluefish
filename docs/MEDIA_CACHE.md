# Full Asset Cache System

Hệ thống cache toàn diện cho Bluefish website, sử dụng `website-scraper` để tải và cache toàn bộ assets (HTML, CSS, JS, images, fonts).

## Tính năng

- ✅ **Full Site Download**: Tải toàn bộ site bao gồm HTML, CSS, JS, images, fonts
- ✅ **Recursive Asset Discovery**: Tự động tìm và tải các assets phụ thuộc
- ✅ **URL Rewriting**: Tự động sửa đổi URLs trong HTML/CSS/JS để trỏ về cache local
- ✅ **Smart Caching**: Cache theo site URL với expiration time
- ✅ **Fallback System**: Tự động fallback về fetch trực tiếp nếu cache fail
- ✅ **Management Tools**: CLI và API để quản lý cache
- ✅ **Performance Optimization**: Tất cả assets được serve từ server local

## Cách hoạt động

1. **Site Analysis**: Phân tích URL Framer để tạo cache key
2. **Cache Check**: Kiểm tra xem site đã được cache chưa
3. **Full Download**: Sử dụng `website-scraper` để tải toàn bộ site
4. **Asset Discovery**: Tự động tìm CSS, JS, images, fonts trong HTML
5. **Recursive Processing**: Tiếp tục tải các assets phụ thuộc
6. **URL Rewriting**: Sửa đổi tất cả URLs để trỏ về `/cache/assets/`
7. **Local Serving**: Serve tất cả assets từ server local

## Cấu hình

### Feature Toggle
```javascript
// configs.js
const FEATURE_TOGGLES = {
    USE_MEDIA_CACHE: true, // Bật/tắt full asset cache
};
```

### Cache Settings
```javascript
// utils/assetCache.js
const CACHE_CONFIG = {
    CACHE_DIR: path.join(__dirname, '../cache/assets'),
    MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
    CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 giờ
    SUPPORTED_EXTENSIONS: [
        '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico',
        '.mp4', '.webm', '.ogg', '.mp3', '.wav',
        '.js', '.mjs', '.css',
        '.woff', '.woff2', '.ttf', '.otf',
        '.html', '.htm', '.xml', '.json'
    ]
};
```

## Sử dụng

### Command Line
```bash
# Xem thống kê cache
npm run cache:info

# Xóa tất cả cache
npm run cache:clear

# Xóa cache của site cụ thể
npm run cache:clear "https://example.framer.app"

# Xóa cache cũ
npm run cache:clean
```

### API Endpoints
```bash
# Xem thống kê cache
GET /cache/stats

# Xóa tất cả cache
POST /cache/clear

# Xóa cache của site cụ thể
POST /cache/clear/:siteUrl

# Serve cached assets
GET /cache/assets/*
```

## File Structure

```
bluefish/
├── cache/
│   └── assets/         # Cached site directories
│       └── {hash}/     # Cache cho từng site
│           ├── index.html
│           ├── css/
│           ├── js/
│           └── images/
├── utils/
│   ├── assetCache.js   # Core cache logic với website-scraper
│   └── cacheManager.js # Cache management
├── scripts/
│   └── cache-cli.js    # CLI tool
└── docs/
    └── MEDIA_CACHE.md  # This file
```

## Logs

Hệ thống sẽ log các hoạt động:
```
🌐 Using full asset cache system...
🔍 Checking cache for: https://example.framer.app
🔄 Cache miss, downloading fresh copy
🌐 Starting full site download: https://example.framer.app
📥 Downloading site assets...
💾 Cached: index.html (https://example.framer.app)
💾 Cached: css/main.css (https://example.framer.app/css/main.css)
💾 Cached: js/chunk.12345.mjs (https://example.framer.app/js/chunk.12345.mjs)
✅ Site downloaded successfully!
📁 Main file: index.html
📊 Total files: 15
✅ Asset cache processing completed
🔄 Fresh download completed
```

## Performance Benefits

- **Zero External Dependencies**: Không còn request nào đến Framer server
- **Lightning Fast**: Tất cả assets được serve từ local storage
- **Bandwidth Savings**: Giảm đáng kể bandwidth usage
- **Reliability**: Không bị ảnh hưởng bởi Framer server downtime
- **Scalability**: Có thể handle nhiều concurrent users

## Troubleshooting

### Cache không hoạt động
1. Kiểm tra `FEATURE_TOGGLES.USE_MEDIA_CACHE = true`
2. Kiểm tra thư mục `cache/assets/` có tồn tại không
3. Kiểm tra logs để xem lỗi
4. Thử fallback mode bằng cách tắt feature

### Download fail
- Kiểm tra network connection
- Kiểm tra Framer URL có đúng không
- Xem logs để biết lỗi cụ thể
- Thử clear cache và download lại

### Performance issues
- Kiểm tra disk space
- Clear expired cache: `npm run cache:clean`
- Monitor cache size: `npm run cache:info`

## Advanced Features

### Custom URL Filtering
```javascript
// Trong assetCache.js
urlFilter: (url) => {
    // Chỉ cache từ domain Framer
    return url.includes(FRAMER_CONFIG.BASE_URL.replace(/\/$/, ''));
}
```

### Custom Headers
```javascript
request: {
    headers: {
        'User-Agent': 'Mozilla/5.0...',
        'Accept': 'text/html,application/xhtml+xml...',
        // Thêm headers khác nếu cần
    }
}
```

### Cache Expiration
```javascript
// Tự động xóa cache cũ
const age = Date.now() - stats.mtime.getTime();
if (age > CACHE_CONFIG.CACHE_DURATION) {
    // Cache expired, re-download
}
``` 