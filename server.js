const express = require('express');
// Node.js 18+ has built-in fetch, no need to import

const app = express();
const PORT = process.env.PORT || 3001;

const FRAMER_URL = 'https://internal-area-042798.framer.app/';

// Cache object to store fetched content
let cache = {
    content: null,
    timestamp: null,
    expiry: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
};

// Function to check if cache is valid
function isCacheValid() {
    if (!cache.content || !cache.timestamp) {
        return false;
    }
    return (Date.now() - cache.timestamp) < cache.expiry;
}

// Fetch and serve content from Framer app with caching
app.get('/', async (req, res) => {
    try {
        // Check if we have valid cached content
        if (isCacheValid()) {
            console.log('Serving content from cache');
            res.send(cache.content);
            return;
        }

        console.log('Cache expired or empty, fetching new content from Framer app...');
        
        const response = await fetch(FRAMER_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 10000
        });
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        console.log('Content fetched successfully, length:', html.length);
        
        // Modify the HTML to fix relative URLs and remove Framer elements
        let modifiedHtml = html.replace(
            /(href|src)="\/([^"]*)/g, 
            `$1="${FRAMER_URL}$2`
        );
        
        // Remove Framer badge container
        modifiedHtml = modifiedHtml.replace(
            /<div id="__framer-badge-container">[\s\S]*?<\/div><\/div>/g, 
            ''
        );
        
        // Remove Framer editor iframe
        modifiedHtml = modifiedHtml.replace(
            /<iframe id="__framer-editorbar"[\s\S]*?<\/iframe>/g, 
            ''
        );
        
        // Remove Framer events script
        modifiedHtml = modifiedHtml.replace(
            /<script[^>]*src="https:\/\/events\.framer\.com\/script\?v=2"[^>]*><\/script>/g, 
            ''
        );
        
        console.log('Framer elements removed from HTML');
        
        // Cache the content
        cache.content = modifiedHtml;
        cache.timestamp = Date.now();
        console.log('Content cached for 24 hours');
        
        res.send(modifiedHtml);
    } catch (error) {
        console.error('Error fetching from Framer app:', error.message);
        
        // If we have cached content but it's expired, serve it anyway as fallback
        if (cache.content) {
            console.log('Serving expired cache content as fallback');
            res.send(cache.content);
            return;
        }
        
        res.status(500).send(`
            <html>
                <body>
                    <h2>Error loading content from Framer app</h2>
                    <p>Details: ${error.message}</p>
                    <p>Trying to fetch from: ${FRAMER_URL}</p>
                    <a href="/">Try again</a>
                </body>
            </html>
        `);
    }
});

// Route to check cache status
app.get('/cache-status', (req, res) => {
    const timeLeft = cache.timestamp ? 
        Math.max(0, cache.expiry - (Date.now() - cache.timestamp)) : 0;
    
    res.json({
        cached: !!cache.content,
        timestamp: cache.timestamp ? new Date(cache.timestamp).toISOString() : null,
        timeLeftMs: timeLeft,
        timeLeftHours: Math.round(timeLeft / (1000 * 60 * 60) * 100) / 100,
        isValid: isCacheValid()
    });
});

// Route to clear cache manually
app.post('/clear-cache', (req, res) => {
    cache.content = null;
    cache.timestamp = null;
    console.log('Cache cleared manually');
    res.json({ message: 'Cache cleared successfully' });
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
});
