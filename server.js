const express = require('express');
const path = require('path');
// Node.js 18+ has built-in fetch, no need to import

const { handleRoute, getRoutePaths } = require('./routes/handlers');
const { generate404Page } = require('./utils/errorPages');
const { getFromCache, CACHE_CONFIG } = require('./utils/mediaCache');
const { getCacheStats, clearCache, cleanExpiredCache, showCacheInfo } = require('./utils/cacheManager');
const { SERVER_CONFIG } = require('./configs');

const app = express();
const PORT = SERVER_CONFIG.PORT;

// Automatically register all routes from ROUTES configuration
const routePaths = getRoutePaths();
routePaths.forEach(path => {
    app.get(path, handleRoute);
    console.log(`✅ Registered route: ${path}`);
});

// Serve cached media files
app.get('/cache/media/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(CACHE_CONFIG.CACHE_DIR, filename);
        
        // Kiểm tra file có tồn tại không
        const fs = require('fs').promises;
        try {
            await fs.access(filePath);
        } catch {
            return res.status(404).send('Media file not found');
        }
        
        // Set appropriate content type
        const ext = path.extname(filename).toLowerCase();
        const mimeTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
            '.svg': 'image/svg+xml',
            '.mp4': 'video/mp4',
            '.webm': 'video/webm',
            '.ogg': 'video/ogg',
            '.mp3': 'audio/mpeg',
            '.wav': 'audio/wav'
        };
        
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache 24 giờ
        
        // Send file
        res.sendFile(filePath);
        
    } catch (error) {
        console.error('Error serving cached media:', error);
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
        const deletedCount = await clearCache();
        res.json({
            success: true,
            message: `Cleared ${deletedCount} cached files`,
            deletedCount
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.post('/cache/clean', async (req, res) => {
    try {
        const deletedCount = await cleanExpiredCache();
        res.json({
            success: true,
            message: `Cleaned ${deletedCount} expired cache files`,
            deletedCount
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
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
    console.log(`💾 Media cache enabled at /cache/media/`);
});
