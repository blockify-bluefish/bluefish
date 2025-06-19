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
        
        // Replace meta tags content with Bluefish information
        modifiedHtml = modifiedHtml.replace(
            /<meta name="generator" content="[^"]*">/g,
            '<meta name="generator" content="Bluefish Web3 Gateway">'
        );
        
        modifiedHtml = modifiedHtml.replace(
            /<title>[^<]*<\/title>/g,
            '<title>Bluefish - The Secure Web3 Gateway</title>'
        );
        
        modifiedHtml = modifiedHtml.replace(
            /<meta name="description" content="[^"]*">/g,
            '<meta name="description" content="Your multi-chain wallet to explore DeFi, NFTs, and the future of Web3. Send tokens, swap on DEXs, and grow your community — all in one secure platform.">'
        );
        
        // Replace Open Graph meta tags
        modifiedHtml = modifiedHtml.replace(
            /<meta property="og:title" content="[^"]*">/g,
            '<meta property="og:title" content="Bluefish - The Secure Web3 Gateway">'
        );
        
        modifiedHtml = modifiedHtml.replace(
            /<meta property="og:description" content="[^"]*">/g,
            '<meta property="og:description" content="Your multi-chain wallet to explore DeFi, NFTs, and the future of Web3. Send tokens, swap on DEXs, and grow your community — all in one secure platform.">'
        );
        
        // Replace Twitter meta tags
        modifiedHtml = modifiedHtml.replace(
            /<meta name="twitter:title" content="[^"]*">/g,
            '<meta name="twitter:title" content="Bluefish - The Secure Web3 Gateway">'
        );
        
        modifiedHtml = modifiedHtml.replace(
            /<meta name="twitter:description" content="[^"]*">/g,
            '<meta name="twitter:description" content="Your multi-chain wallet to explore DeFi, NFTs, and the future of Web3. Send tokens, swap on DEXs, and grow your community — all in one secure platform.">'
        );
        
        // Add JavaScript to protect meta tags from being changed by Framer
        const protectMetaScript = `
            <script>
                // Protect meta tags from being modified by Framer JavaScript
                (function() {
                    // Store original meta content
                    const originalMetas = {
                        title: 'Bluefish - The Secure Web3 Gateway',
                        description: 'Your multi-chain wallet to explore DeFi, NFTs, and the future of Web3. Send tokens, swap on DEXs, and grow your community — all in one secure platform.',
                        generator: 'Bluefish Web3 Gateway'
                    };
                    
                    // Function to restore meta tags
                    function restoreMetaTags() {
                        // Restore title
                        document.title = originalMetas.title;
                        
                        // Restore description
                        const descMeta = document.querySelector('meta[name="description"]');
                        if (descMeta) descMeta.setAttribute('content', originalMetas.description);
                        
                        // Restore generator
                        const genMeta = document.querySelector('meta[name="generator"]');
                        if (genMeta) genMeta.setAttribute('content', originalMetas.generator);
                        
                        // Restore OG tags
                        const ogTitle = document.querySelector('meta[property="og:title"]');
                        if (ogTitle) ogTitle.setAttribute('content', originalMetas.title);
                        
                        const ogDesc = document.querySelector('meta[property="og:description"]');
                        if (ogDesc) ogDesc.setAttribute('content', originalMetas.description);
                        
                        // Restore Twitter tags
                        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
                        if (twitterTitle) twitterTitle.setAttribute('content', originalMetas.title);
                        
                        const twitterDesc = document.querySelector('meta[name="twitter:description"]');
                        if (twitterDesc) twitterDesc.setAttribute('content', originalMetas.description);
                    }
                    
                    // Override document.title setter
                    let titleDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'title');
                    if (titleDescriptor && titleDescriptor.set) {
                        Object.defineProperty(document, 'title', {
                            get: titleDescriptor.get,
                            set: function(newTitle) {
                                // Only allow our title
                                if (newTitle !== originalMetas.title) {
                                    console.log('Blocked title change attempt:', newTitle);
                                    return;
                                }
                                titleDescriptor.set.call(this, newTitle);
                            }
                        });
                    }
                    
                    // Monitor and restore meta tags periodically
                    setInterval(restoreMetaTags, 1000);
                    
                    // Restore on DOM ready
                    if (document.readyState === 'loading') {
                        document.addEventListener('DOMContentLoaded', restoreMetaTags);
                    } else {
                        restoreMetaTags();
                    }
                    
                    // Watch for mutations
                    const observer = new MutationObserver(function(mutations) {
                        let needsRestore = false;
                        mutations.forEach(function(mutation) {
                            if (mutation.type === 'attributes' && 
                                (mutation.target.tagName === 'META' || mutation.target.tagName === 'TITLE')) {
                                needsRestore = true;
                            }
                        });
                        if (needsRestore) {
                            setTimeout(restoreMetaTags, 100);
                        }
                    });
                    
                    observer.observe(document.head, {
                        attributes: true,
                        childList: true,
                        subtree: true
                    });
                })();
            </script>
        `;
        
        // Inject the protection script before closing head tag
        if (modifiedHtml.includes('</head>')) {
            modifiedHtml = modifiedHtml.replace('</head>', protectMetaScript + '</head>');
        } else if (modifiedHtml.includes('<body')) {
            modifiedHtml = modifiedHtml.replace('<body', protectMetaScript + '<body');
        } else {
            modifiedHtml = protectMetaScript + modifiedHtml;
        }
        
        console.log('Meta tags updated with Bluefish content');
        console.log('Meta protection script injected');
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
