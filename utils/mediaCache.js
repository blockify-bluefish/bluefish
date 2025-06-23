const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const { FRAMER_CONFIG } = require('../configs');

// Cấu hình cache
const CACHE_CONFIG = {
    CACHE_DIR: path.join(__dirname, '../cache/media'),
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    SUPPORTED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.mp4', '.webm', '.ogg', '.mp3', '.wav'],
    CACHE_DURATION: 24 * 60 * 60 * 1000 // 24 giờ
};

/**
 * Tạo hash từ URL để làm tên file
 */
function generateCacheKey(url) {
    return crypto.createHash('md5').update(url).digest('hex');
}

/**
 * Lấy extension từ URL
 */
function getFileExtension(url) {
    try {
        const urlPath = new URL(url, FRAMER_CONFIG.BASE_URL).pathname;
        const ext = path.extname(urlPath).toLowerCase();
        return CACHE_CONFIG.SUPPORTED_EXTENSIONS.includes(ext) ? ext : '.jpg';
    } catch {
        return '.jpg';
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
 * Kiểm tra file có trong cache không
 */
async function isCached(cacheKey) {
    try {
        const cachePath = path.join(CACHE_CONFIG.CACHE_DIR, cacheKey);
        const stats = await fs.stat(cachePath);
        
        // Kiểm tra file có quá cũ không
        const age = Date.now() - stats.mtime.getTime();
        if (age > CACHE_CONFIG.CACHE_DURATION) {
            await fs.unlink(cachePath);
            return false;
        }
        
        return true;
    } catch {
        return false;
    }
}

/**
 * Lưu file vào cache
 */
async function saveToCache(url, buffer) {
    try {
        await ensureCacheDir();
        
        const cacheKey = generateCacheKey(url);
        const extension = getFileExtension(url);
        const filename = cacheKey + extension;
        const cachePath = path.join(CACHE_CONFIG.CACHE_DIR, filename);
        
        // Kiểm tra kích thước file
        if (buffer.length > CACHE_CONFIG.MAX_FILE_SIZE) {
            console.log(`⚠️ File too large to cache: ${url} (${buffer.length} bytes)`);
            return null;
        }
        
        await fs.writeFile(cachePath, buffer);
        console.log(`💾 Cached media: ${url} -> ${filename}`);
        
        return filename;
    } catch (error) {
        console.error(`❌ Error caching media: ${url}`, error.message);
        return null;
    }
}

/**
 * Lấy file từ cache
 */
async function getFromCache(cacheKey) {
    try {
        const cachePath = path.join(CACHE_CONFIG.CACHE_DIR, cacheKey);
        return await fs.readFile(cachePath);
    } catch {
        return null;
    }
}

/**
 * Detect media content trong HTML
 */
function detectMediaContent(html) {
    const mediaInfo = {
        images: [],
        videos: [],
        audio: [],
        backgroundImages: [],
        totalCount: 0
    };
    
    // Detect images
    const imgMatches = html.match(/<img[^>]+src=["']([^"']+)["']/gi);
    if (imgMatches) {
        mediaInfo.images = imgMatches.map(match => {
            const src = match.match(/src=["']([^"']+)["']/);
            return src ? src[1] : null;
        }).filter(Boolean);
    }
    
    // Detect videos
    const videoMatches = html.match(/<(video|iframe)[^>]+src=["']([^"']+)["']/gi);
    if (videoMatches) {
        mediaInfo.videos = videoMatches.map(match => {
            const src = match.match(/src=["']([^"']+)["']/);
            return src ? src[1] : null;
        }).filter(Boolean);
    }
    
    // Detect audio
    const audioMatches = html.match(/<audio[^>]+src=["']([^"']+)["']/gi);
    if (audioMatches) {
        mediaInfo.audio = audioMatches.map(match => {
            const src = match.match(/src=["']([^"']+)["']/);
            return src ? src[1] : null;
        }).filter(Boolean);
    }
    
    // Detect background images
    const bgMatches = html.match(/background-image:\s*url\(['"]?([^'")\s]+)['"]?\)/gi);
    if (bgMatches) {
        mediaInfo.backgroundImages = bgMatches.map(match => {
            const url = match.match(/url\(['"]?([^'")\s]+)['"]?\)/);
            return url ? url[1] : null;
        }).filter(Boolean);
    }
    
    mediaInfo.totalCount = mediaInfo.images.length + mediaInfo.videos.length + 
                          mediaInfo.audio.length + mediaInfo.backgroundImages.length;
    
    return mediaInfo;
}

/**
 * Download và cache media
 */
async function downloadAndCacheMedia(url) {
    try {
        console.log(`📥 Downloading media: ${url}`);
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            },
            timeout: 10000
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const buffer = await response.arrayBuffer();
        const filename = await saveToCache(url, Buffer.from(buffer));
        
        return filename;
    } catch (error) {
        console.error(`❌ Error downloading media: ${url}`, error.message);
        return null;
    }
}

/**
 * Replace media URLs trong HTML với cache URLs
 */
function replaceMediaUrls(html, mediaMap) {
    let modifiedHtml = html;
    
    // Replace image src
    modifiedHtml = modifiedHtml.replace(
        /<img([^>]+)src=["']([^"']+)["']/gi,
        (match, attributes, src) => {
            const cacheKey = generateCacheKey(src);
            const extension = getFileExtension(src);
            const cachedFilename = cacheKey + extension;
            
            if (mediaMap[src]) {
                return `<img${attributes}src="/cache/media/${cachedFilename}"`;
            }
            return match;
        }
    );
    
    // Replace video src
    modifiedHtml = modifiedHtml.replace(
        /<(video|iframe)([^>]+)src=["']([^"']+)["']/gi,
        (match, tag, attributes, src) => {
            const cacheKey = generateCacheKey(src);
            const extension = getFileExtension(src);
            const cachedFilename = cacheKey + extension;
            
            if (mediaMap[src]) {
                return `<${tag}${attributes}src="/cache/media/${cachedFilename}"`;
            }
            return match;
        }
    );
    
    // Replace audio src
    modifiedHtml = modifiedHtml.replace(
        /<audio([^>]+)src=["']([^"']+)["']/gi,
        (match, attributes, src) => {
            const cacheKey = generateCacheKey(src);
            const extension = getFileExtension(src);
            const cachedFilename = cacheKey + extension;
            
            if (mediaMap[src]) {
                return `<audio${attributes}src="/cache/media/${cachedFilename}"`;
            }
            return match;
        }
    );
    
    // Replace background images
    modifiedHtml = modifiedHtml.replace(
        /background-image:\s*url\(['"]?([^'")\s]+)['"]?\)/gi,
        (match, url) => {
            const cacheKey = generateCacheKey(url);
            const extension = getFileExtension(url);
            const cachedFilename = cacheKey + extension;
            
            if (mediaMap[url]) {
                return `background-image: url('/cache/media/${cachedFilename}')`;
            }
            return match;
        }
    );
    
    return modifiedHtml;
}

/**
 * Process và cache tất cả media trong HTML
 */
async function processAndCacheMedia(html) {
    const mediaInfo = detectMediaContent(html);
    const mediaMap = {};
    
    if (mediaInfo.totalCount === 0) {
        console.log('📄 No media content detected');
        return { html, mediaMap };
    }
    
    console.log(`🎯 Found ${mediaInfo.totalCount} media items to process`);
    
    // Tạo array tất cả media URLs
    const allMediaUrls = [
        ...mediaInfo.images,
        ...mediaInfo.videos,
        ...mediaInfo.audio,
        ...mediaInfo.backgroundImages
    ];
    
    // Download và cache từng media
    for (const url of allMediaUrls) {
        if (!url) continue;
        
        const cacheKey = generateCacheKey(url);
        const extension = getFileExtension(url);
        const filename = cacheKey + extension;
        
        // Kiểm tra cache trước
        if (await isCached(filename)) {
            console.log(`✅ Media already cached: ${url}`);
            mediaMap[url] = filename;
        } else {
            // Download và cache
            const cachedFilename = await downloadAndCacheMedia(url);
            if (cachedFilename) {
                mediaMap[url] = cachedFilename;
            }
        }
    }
    
    // Replace URLs trong HTML
    const modifiedHtml = replaceMediaUrls(html, mediaMap);
    
    console.log(`✅ Processed ${Object.keys(mediaMap).length} media items`);
    
    return { html: modifiedHtml, mediaMap };
}

module.exports = {
    detectMediaContent,
    processAndCacheMedia,
    getFromCache,
    isCached,
    CACHE_CONFIG
}; 