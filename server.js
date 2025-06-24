const express = require('express');
const path = require('path');
// Node.js 18+ has built-in fetch, no need to import

const { handleRoute, getRoutePaths } = require('./routes/handlers');
const { generate404Page } = require('./utils/errorPages');
const { getCacheStats, clearAllCache, clearSiteCache, CACHE_CONFIG } = require('./utils/assetCache');
const { SERVER_CONFIG } = require('./configs');

const app = express();
const PORT = SERVER_CONFIG.PORT;

// Automatically register all routes from ROUTES configuration
const routePaths = getRoutePaths();
routePaths.forEach(path => {
    app.get(path, handleRoute);
    console.log(`✅ Registered route: ${path}`);
});

// Serve cached assets (JS, CSS, images, etc.)
app.get('/cache/assets/*', async (req, res) => {
    try {
        const requestedPath = req.params[0]; // Lấy phần còn lại của URL
        const fullPath = path.join(CACHE_CONFIG.CACHE_DIR, requestedPath);
        
        // Kiểm tra file có tồn tại không
        const fs = require('fs').promises;
        try {
            await fs.access(fullPath);
        } catch {
            return res.status(404).send('Asset not found');
        }
        
        // Set appropriate content type
        const ext = path.extname(fullPath).toLowerCase();
        const mimeTypes = {
            // Images
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
            // Video/Audio
            '.mp4': 'video/mp4',
            '.webm': 'video/webm',
            '.ogg': 'video/ogg',
            '.mp3': 'audio/mpeg',
            '.wav': 'audio/wav',
            // Code
            '.js': 'application/javascript',
            '.mjs': 'application/javascript',
            '.css': 'text/css',
            // Fonts
            '.woff': 'font/woff',
            '.woff2': 'font/woff2',
            '.ttf': 'font/ttf',
            '.otf': 'font/otf',
            // Documents
            '.html': 'text/html',
            '.htm': 'text/html',
            '.xml': 'application/xml',
            '.json': 'application/json'
        };
        
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache 24 giờ
        
        // Send file
        res.sendFile(fullPath);
        
    } catch (error) {
        console.error('Error serving cached asset:', error);
        res.status(500).send('Internal server error');
    }
});

// Cache management routes
app.get('/cache/stats', async (req, res) => {
    try {
        const stats = await getCacheStats();
        if (stats) {
            res.json({
                success: true,
                data: stats
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Failed to get cache stats'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.post('/cache/clear', async (req, res) => {
    try {
        const success = await clearAllCache();
        if (success) {
            res.json({
                success: true,
                message: 'All cache cleared successfully'
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Failed to clear cache'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.post('/cache/clear/:siteUrl', async (req, res) => {
    try {
        const { siteUrl } = req.params;
        const decodedUrl = decodeURIComponent(siteUrl);
        const success = await clearSiteCache(decodedUrl);
        
        if (success) {
            res.json({
                success: true,
                message: `Cache cleared for ${decodedUrl}`
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Failed to clear site cache'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Proxy route for framerusercontent.com resources
app.get('/proxy/framerusercontent/*', async (req, res) => {
    try {
        const resourcePath = req.params[0];
        const targetUrl = `https://framerusercontent.com/${resourcePath}`;
        
        console.log(`🔄 Proxying framerusercontent resource: ${targetUrl}`);
        
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });
        
        if (!response.ok) {
            console.error(`❌ Failed to fetch resource: ${response.status}`);
            return res.status(response.status).send('Resource not found');
        }
        
        // Get the content type from the original response
        const contentType = response.headers.get('content-type');
        if (contentType) {
            res.set('Content-Type', contentType);
        }
        
        // Set cache headers for performance
        res.set('Cache-Control', 'public, max-age=3600'); // 1 hour cache
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET');
        
        // Stream the response
        const buffer = await response.arrayBuffer();
        res.send(Buffer.from(buffer));
        
        console.log(`✅ Successfully proxied: ${targetUrl}`);
        
    } catch (error) {
        console.error(`❌ Error proxying framerusercontent resource:`, error.message);
        res.status(500).send('Proxy error');
    }
});

// Proxy route for edit.framer.com resources  
app.get('/proxy/editframer/*', async (req, res) => {
    try {
        const resourcePath = req.params[0];
        const targetUrl = `https://edit.framer.com/${resourcePath}`;
        
        console.log(`🔄 Proxying edit.framer.com resource: ${targetUrl}`);
        
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });
        
        if (!response.ok) {
            console.error(`❌ Failed to fetch edit.framer.com resource: ${response.status}`);
            return res.status(response.status).send('Resource not found');  
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType) {
            res.set('Content-Type', contentType);
        }
        
        res.set('Cache-Control', 'public, max-age=86400'); // 24 hours cache
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET');
        
        const buffer = await response.arrayBuffer();
        res.send(Buffer.from(buffer));
        
        console.log(`✅ Successfully proxied edit.framer.com: ${targetUrl}`);
        
    } catch (error) {
        console.error(`❌ Error proxying edit.framer.com resource:`, error.message);
        res.status(500).send('Proxy error');
    }
});

// Proxy route for app.framerstatic.com resources
app.get('/proxy/framerstatic/*', async (req, res) => {
    try {
        const resourcePath = req.params[0];
        const targetUrl = `https://app.framerstatic.com/${resourcePath}`;
        
        console.log(`🔄 Proxying framerstatic resource: ${targetUrl}`);
        
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9'
            }
        });
        
        if (!response.ok) {
            console.error(`❌ Failed to fetch framerstatic resource: ${response.status}`);
            return res.status(response.status).send('Resource not found');
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType) {
            res.set('Content-Type', contentType);
        }
        
        res.set('Cache-Control', 'public, max-age=86400'); // 24 hours cache
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET');
        
        const buffer = await response.arrayBuffer();
        res.send(Buffer.from(buffer));
        
        console.log(`✅ Successfully proxied framerstatic: ${targetUrl}`);
        
    } catch (error) {
        console.error(`❌ Error proxying framerstatic resource:`, error.message);
        res.status(500).send('Proxy error');
    }
});

// Proxy route for Google Fonts
app.get('/proxy/fonts/*', async (req, res) => {
    try {
        const resourcePath = req.params[0];
        const targetUrl = `https://fonts.gstatic.com/${resourcePath}`;
        
        console.log(`🔄 Proxying Google Font: ${targetUrl}`);
        
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': '*/*'
            }
        });
        
        if (!response.ok) {
            console.error(`❌ Failed to fetch font: ${response.status}`);
            return res.status(response.status).send('Font not found');
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType) {
            res.set('Content-Type', contentType);
        }
        
        res.set('Cache-Control', 'public, max-age=604800'); // 7 days cache for fonts
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'GET');
        
        const buffer = await response.arrayBuffer();
        res.send(Buffer.from(buffer));
        
        console.log(`✅ Successfully proxied font: ${targetUrl}`);
        
    } catch (error) {
        console.error(`❌ Error proxying font:`, error.message);
        res.status(500).send('Proxy error');
    }
});

// Block route for Framer API calls (return empty responses to prevent errors)
app.get('/proxy/framerapi/*', async (req, res) => {
    console.log(`🚫 Blocked Framer API call: ${req.params[0]}`);
    res.set('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Origin', '*');
    res.json({ blocked: true, message: 'API call blocked by proxy' });
});

// Handle 404 errors
app.use((req, res) => {
    const errorPage = generate404Page(req.path);
    res.status(404).send(errorPage);
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`🔗 Total routes registered: ${routePaths.length}`);
    console.log(`💾 Full asset cache enabled at /cache/assets/`);
});
