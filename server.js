const express = require('express');
// Node.js 18+ has built-in fetch, no need to import

const app = express();
const PORT = process.env.PORT || 3001;

const FRAMER_URL = 'https://internal-area-042798.framer.app/';

// Fetch and serve content from Framer app
app.get('/', async (req, res) => {
    try {
        console.log('Fetching content from Framer app...');
        
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
        
        // Add CSS to hide any remaining Framer elements
        const hideFramerCSS = `
            <style>
                #__framer-badge-container,
                #__framer-editorbar,
                .__framer-badge {
                    display: none !important;
                    visibility: hidden !important;
                }
            </style>
        `;
        
        // Inject CSS before closing head tag or at the beginning of body
        if (modifiedHtml.includes('</head>')) {
            modifiedHtml = modifiedHtml.replace('</head>', hideFramerCSS + '</head>');
        } else if (modifiedHtml.includes('<body')) {
            modifiedHtml = modifiedHtml.replace('<body', hideFramerCSS + '<body');
        } else {
            modifiedHtml = hideFramerCSS + modifiedHtml;
        }
        
        console.log('Framer elements removed from HTML');
        
        res.send(modifiedHtml);
    } catch (error) {
        console.error('Error fetching from Framer app:', error.message);
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

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
});
