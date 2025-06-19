// const FRAMER_URL = 'https://internal-area-042798.framer.app/';

const FRAMER_URL = 'https://predictable-team-642357.framer.app/';

// Language-specific meta content
const metaContent = {
    en: {
        title: 'Bluefish - The Secure Web3 Gateway',
        description: 'Your multi-chain wallet to explore DeFi, NFTs, and the future of Web3. Send tokens, swap on DEXs, and grow your community — all in one secure platform.'
    },
    vi: {
        title: 'Bluefish - Cổng Web3 An Toàn',
        description: 'Ví đa chuỗi để khám phá DeFi, NFT và tương lai của Web3. Gửi token, swap trên DEX và phát triển cộng đồng — tất cả trong một nền tảng an toàn.'
    }
};

/**
 * Remove Framer-specific elements from HTML
 * @param {string} html - The HTML content to clean
 * @returns {string} - Cleaned HTML
 */
function removeFramerElements(html) {
    let modifiedHtml = html;
    
    // Fix relative URLs
    modifiedHtml = modifiedHtml.replace(
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
    
    return modifiedHtml;
}

/**
 * Inject CSS to hide Framer elements
 * @param {string} html - The HTML content
 * @returns {string} - HTML with injected CSS
 */
function injectHideFramerCSS(html) {
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
    if (html.includes('</head>')) {
        return html.replace('</head>', hideFramerCSS + '</head>');
    } else if (html.includes('<body')) {
        return html.replace('<body', hideFramerCSS + '<body');
    } else {
        return hideFramerCSS + html;
    }
}

/**
 * Replace meta tags with Bluefish content
 * @param {string} html - The HTML content
 * @param {object} meta - Meta content object
 * @returns {string} - HTML with updated meta tags
 */
function replaceMetaTags(html, meta) {
    let modifiedHtml = html;
    
    // Replace meta tags content
    modifiedHtml = modifiedHtml.replace(
        /<meta name="generator" content="[^"]*">/g,
        '<meta name="generator" content="Bluefish Web3 Gateway">'
    );
    
    modifiedHtml = modifiedHtml.replace(
        /<title>[^<]*<\/title>/g,
        `<title>${meta.title}</title>`
    );
    
    modifiedHtml = modifiedHtml.replace(
        /<meta name="description" content="[^"]*">/g,
        `<meta name="description" content="${meta.description}">`
    );
    
    // Replace Open Graph meta tags
    modifiedHtml = modifiedHtml.replace(
        /<meta property="og:title" content="[^"]*">/g,
        `<meta property="og:title" content="${meta.title}">`
    );
    
    modifiedHtml = modifiedHtml.replace(
        /<meta property="og:description" content="[^"]*">/g,
        `<meta property="og:description" content="${meta.description}">`
    );
    
    // Replace Twitter meta tags
    modifiedHtml = modifiedHtml.replace(
        /<meta name="twitter:title" content="[^"]*">/g,
        `<meta name="twitter:title" content="${meta.title}">`
    );
    
    modifiedHtml = modifiedHtml.replace(
        /<meta name="twitter:description" content="[^"]*">/g,
        `<meta name="twitter:description" content="${meta.description}">`
    );
    
    return modifiedHtml;
}

/**
 * Generate meta protection script
 * @param {object} meta - Meta content object
 * @returns {string} - Protection script HTML
 */
function generateMetaProtectionScript(meta) {
    return `
        <script>
            // Protect meta tags from being modified by Framer JavaScript
            (function() {
                // Store original meta content
                const originalMetas = {
                    title: '${meta.title}',
                    description: '${meta.description}',
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
}

/**
 * Inject meta protection script into HTML
 * @param {string} html - The HTML content
 * @param {string} script - The protection script
 * @returns {string} - HTML with injected script
 */
function injectMetaProtectionScript(html, script) {
    // Inject the protection script before closing head tag
    if (html.includes('</head>')) {
        return html.replace('</head>', script + '</head>');
    } else if (html.includes('<body')) {
        return html.replace('<body', script + '<body');
    } else {
        return script + html;
    }
}

/**
 * Process HTML content with language-specific meta tags
 * @param {string} path - Path to fetch from Framer
 * @param {string} language - Language code (en, vi)
 * @returns {Promise<string>} - Processed HTML content
 */
async function processFramerContent(path = '', language = 'en') {
    const url = FRAMER_URL + path;
    console.log(`Fetching ${language} content from Framer app: ${url}`);
    
    const response = await fetch(url, {
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
    console.log(`${language} content fetched successfully, length:`, html.length);
    
    // Get language-specific meta content
    const meta = metaContent[language] || metaContent.en;
    
    // Process HTML step by step
    let modifiedHtml = removeFramerElements(html);
    modifiedHtml = injectHideFramerCSS(modifiedHtml);
    modifiedHtml = replaceMetaTags(modifiedHtml, meta);
    
    // Generate and inject protection script
    const protectMetaScript = generateMetaProtectionScript(meta);
    modifiedHtml = injectMetaProtectionScript(modifiedHtml, protectMetaScript);
    
    console.log(`${language} meta tags updated with Bluefish content`);
    console.log(`${language} meta protection script injected`);
    console.log(`Framer elements removed from ${language} HTML`);
    
    return modifiedHtml;
}

module.exports = {
    processFramerContent,
    FRAMER_URL,
    metaContent
};
