const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');
const { FRAMER_CONFIG } = require('../configs');

// Cấu hình cache
const CACHE_CONFIG = {
    CACHE_DIR: path.join(__dirname, '../cache/assets'),
    MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
    CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 giờ
    SUPPORTED_EXTENSIONS: [
        // Media
        '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico',
        // Video/Audio
        '.mp4', '.webm', '.ogg', '.mp3', '.wav',
        // Code
        '.js', '.mjs', '.css',
        // Fonts
        '.woff', '.woff2', '.ttf', '.otf',
        // Documents
        '.html', '.htm', '.xml', '.json'
    ]
};

/**
 * Tạo hash từ URL để làm tên file cache
 */
function generateCacheKey(url) {
    return crypto.createHash('md5').update(url).digest('hex');
}

/**
 * Kiểm tra xem URL có phải là asset cần cache không
 */
function shouldCacheUrl(url) {
    try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname.toLowerCase();
        
        // Chỉ cache từ domain Framer
        if (!url.includes(FRAMER_CONFIG.BASE_URL.replace(/\/$/, ''))) {
            return false;
        }
        
        // Kiểm tra extension
        const ext = path.extname(pathname);
        return CACHE_CONFIG.SUPPORTED_EXTENSIONS.includes(ext);
    } catch {
        return false;
    }
}

/**
 * Tạo thư mục cache nếu chưa tồn tại
 */
async function ensureCacheDir() {
    try {
        await fs.access(CACHE_CONFIG.CACHE_DIR);
    } catch {
        await fs.mkdir(CACHE_CONFIG.CACHE_DIR, { recursive: true });
        console.log(`📁 Created cache directory: ${CACHE_CONFIG.CACHE_DIR}`);
    }
}

/**
 * Kiểm tra xem site đã được cache chưa
 */
async function isSiteCached(siteUrl) {
    try {
        const cacheKey = generateCacheKey(siteUrl);
        const cachePath = path.join(CACHE_CONFIG.CACHE_DIR, cacheKey);
        
        // Kiểm tra thư mục cache có tồn tại không
        await fs.access(cachePath);
        
        // Kiểm tra file index.html có tồn tại không
        const indexPath = path.join(cachePath, 'index.html');
        await fs.access(indexPath);
        
        // Kiểm tra thời gian cache
        const stats = await fs.stat(indexPath);
        const age = Date.now() - stats.mtime.getTime();
        
        if (age > CACHE_CONFIG.CACHE_DURATION) {
            console.log(`⏰ Cache expired for ${siteUrl}, will re-download`);
            return false;
        }
        
        return true;
    } catch {
        return false;
    }
}

/**
 * Download toàn bộ site sử dụng website-scraper
 */
async function downloadSite(siteUrl) {
    console.log(`🌐 Starting full site download: ${siteUrl}`);
    
    // Dynamic import để tránh lỗi ES Module
    const scrape = await import('website-scraper');
    
    const cacheKey = generateCacheKey(siteUrl);
    const cachePath = path.join(CACHE_CONFIG.CACHE_DIR, cacheKey);
    
    // Tạo thư mục cache
    await ensureCacheDir();
    
    const options = {
        urls: [siteUrl],
        directory: cachePath,
        
        // Cấu hình sources để tìm assets
        sources: [
            { selector: 'img', attr: 'src' },
            { selector: 'img', attr: 'data-src' },
            { selector: 'link[rel="stylesheet"]', attr: 'href' },
            { selector: 'script', attr: 'src' },
            { selector: 'video', attr: 'src' },
            { selector: 'audio', attr: 'src' },
            { selector: 'source', attr: 'src' },
            { selector: 'link[rel="icon"]', attr: 'href' },
            { selector: 'link[rel="shortcut icon"]', attr: 'href' },
            { selector: 'link[rel="apple-touch-icon"]', attr: 'href' }
        ],
        
        // Bật tải đệ quy
        recursive: true,
        
        // Giới hạn độ sâu để tránh vòng lặp vô hạn
        maxDepth: 5,
        
        // Lọc URL: Cho phép domain chính và CDN của Framer
        urlFilter: (url) => {
            console.log(`[Filter] Checking URL: ${url}`);
            const allowed = url.includes('framer.app') || url.includes('framerusercontent.com');
            if (allowed) {
                console.log(`[Filter] ✅ Allowing: ${url}`);
            } else {
                console.log(`[Filter] ❌ Denying: ${url}`);
            }
            return allowed;
        },
        
        // Cấu hình request
        request: {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            },
            timeout: 30000
        },
        
        // Tùy chỉnh tên file
        filenameGenerator: 'bySiteStructure',
        
        // Bật rewrite URL
        urlRewrite: true,
        
        // Giới hạn kích thước file
        maxFileSize: CACHE_CONFIG.MAX_FILE_SIZE,
        
        // Bỏ qua lỗi nhỏ
        ignoreErrors: true,
        
        // Log progress
        onResourceSaved: (resource) => {
            console.log(`💾 Cached: ${resource.getFilename()} (${resource.url})`);
        },
        
        onResourceError: (resource, err) => {
            console.log(`⚠️ Failed to cache: ${resource.url} - ${err.message}`);
        }
    };

    try {
        console.log('📥 Downloading site assets...');
        const result = await scrape.default(options);
        
        console.log('Scraper result object:', JSON.stringify(result.map(r => ({url: r.url, filename: r.getFilename()})), null, 2));

        if (result && result.length > 0) {
            console.log(`✅ Site downloaded successfully!`);
            console.log(`📁 Main file: ${result[0].getFilename()}`);
            console.log(`📊 Total files: ${result.length}`);
            
            return {
                success: true,
                cachePath,
                mainFile: result[0].getFilename(),
                totalFiles: result.length,
                files: result
            };
        } else {
            throw new Error('No files were downloaded');
        }
        
    } catch (error) {
        console.error('❌ Error downloading site:', error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Đọc file HTML đã được cache
 */
async function getCachedHtml(siteUrl) {
    try {
        const cacheKey = generateCacheKey(siteUrl);
        const cachePath = path.join(CACHE_CONFIG.CACHE_DIR, cacheKey);
        const indexPath = path.join(cachePath, 'index.html');
        
        const html = await fs.readFile(indexPath, 'utf8');
        return html;
    } catch (error) {
        console.error('Error reading cached HTML:', error);
        return null;
    }
}

/**
 * Process và cache toàn bộ site
 */
async function processAndCacheSite(siteUrl) {
    console.log(`🔍 Checking cache for: ${siteUrl}`);
    
    // Kiểm tra cache trước
    if (await isSiteCached(siteUrl)) {
        console.log(`✅ Site already cached, using cached version`);
        const cachedHtml = await getCachedHtml(siteUrl);
        return {
            html: cachedHtml,
            fromCache: true
        };
    }
    
    // Download site mới
    console.log(`🔄 Cache miss, downloading fresh copy`);
    const result = await downloadSite(siteUrl);
    
    if (result.success) {
        const cachedHtml = await getCachedHtml(siteUrl);
        return {
            html: cachedHtml,
            fromCache: false,
            cacheInfo: result
        };
    } else {
        throw new Error(`Failed to download site: ${result.error}`);
    }
}

/**
 * Lấy thống kê cache
 */
async function getCacheStats() {
    try {
        const cacheDirs = await fs.readdir(CACHE_CONFIG.CACHE_DIR);
        let totalSize = 0;
        let totalFiles = 0;
        const siteStats = [];
        
        for (const dir of cacheDirs) {
            const sitePath = path.join(CACHE_CONFIG.CACHE_DIR, dir);
            const stats = await fs.stat(sitePath);
            
            if (stats.isDirectory()) {
                const files = await fs.readdir(sitePath);
                let siteSize = 0;
                
                for (const file of files) {
                    const filePath = path.join(sitePath, file);
                    const fileStats = await fs.stat(filePath);
                    siteSize += fileStats.size;
                }
                
                totalSize += siteSize;
                totalFiles += files.length;
                
                siteStats.push({
                    site: dir,
                    files: files.length,
                    size: siteSize,
                    sizeMB: (siteSize / (1024 * 1024)).toFixed(2)
                });
            }
        }
        
        return {
            totalSites: siteStats.length,
            totalFiles,
            totalSize,
            totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
            sites: siteStats
        };
    } catch (error) {
        console.error('Error getting cache stats:', error);
        return null;
    }
}

/**
 * Xóa cache của một site cụ thể
 */
async function clearSiteCache(siteUrl) {
    try {
        const cacheKey = generateCacheKey(siteUrl);
        const cachePath = path.join(CACHE_CONFIG.CACHE_DIR, cacheKey);
        
        await fs.rm(cachePath, { recursive: true, force: true });
        console.log(`🗑️ Cleared cache for: ${siteUrl}`);
        return true;
    } catch (error) {
        console.error('Error clearing site cache:', error);
        return false;
    }
}

/**
 * Xóa toàn bộ cache
 */
async function clearAllCache() {
    try {
        await fs.rm(CACHE_CONFIG.CACHE_DIR, { recursive: true, force: true });
        console.log(`🗑️ Cleared all cache`);
        return true;
    } catch (error) {
        console.error('Error clearing all cache:', error);
        return false;
    }
}

module.exports = {
    processAndCacheSite,
    getCacheStats,
    clearSiteCache,
    clearAllCache,
    isSiteCached,
    CACHE_CONFIG
}; 