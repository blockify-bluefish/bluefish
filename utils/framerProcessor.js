const FRAMER_URL = 'https://internal-area-042798.framer.app/';

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
    
    // Proxy framerusercontent.com resources through our server
    modifiedHtml = modifiedHtml.replace(
        /(href|src)="https:\/\/framerusercontent\.com\/([^"]*)/g, 
        '$1="/proxy/framerusercontent/$2'
    );
    
    // Proxy edit.framer.com resources
    modifiedHtml = modifiedHtml.replace(
        /(href|src)="https:\/\/edit\.framer\.com\/([^"]*)/g, 
        '$1="/proxy/editframer/$2'
    );
    
    // Proxy app.framerstatic.com resources
    modifiedHtml = modifiedHtml.replace(
        /(href|src)="https:\/\/app\.framerstatic\.com\/([^"]*)/g, 
        '$1="/proxy/framerstatic/$2'
    );
    
    // Proxy Google Fonts
    modifiedHtml = modifiedHtml.replace(
        /(href|src)="https:\/\/fonts\.gstatic\.com\/([^"]*)/g, 
        '$1="/proxy/fonts/$2'
    );
    
    // Block Framer API calls
    modifiedHtml = modifiedHtml.replace(
        /(href|src)="https:\/\/api\.framer\.com\/([^"]*)/g, 
        '$1="/proxy/framerapi/$2'
    );
    
    // Also handle any imports or other references to these domains
    modifiedHtml = modifiedHtml.replace(
        /https:\/\/framerusercontent\.com\/([^"'\s)]*)/g, 
        '/proxy/framerusercontent/$1'
    );
    
    modifiedHtml = modifiedHtml.replace(
        /https:\/\/edit\.framer\.com\/([^"'\s)]*)/g, 
        '/proxy/editframer/$1'
    );
    
    modifiedHtml = modifiedHtml.replace(
        /https:\/\/app\.framerstatic\.com\/([^"'\s)]*)/g, 
        '/proxy/framerstatic/$1'
    );
    
    modifiedHtml = modifiedHtml.replace(
        /https:\/\/fonts\.gstatic\.com\/([^"'\s)]*)/g, 
        '/proxy/fonts/$1'
    );
    
    modifiedHtml = modifiedHtml.replace(
        /https:\/\/api\.framer\.com\/([^"'\s)]*)/g, 
        '/proxy/framerapi/$1'
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
    
    // Remove Framer events script (original script tag)
    modifiedHtml = modifiedHtml.replace(
        /<script[^>]*src="https:\/\/events\.framer\.com\/script\?v=2"[^>]*><\/script>/g, 
        ''
    );
    
    // Remove any other Framer tracking scripts
    modifiedHtml = modifiedHtml.replace(
        /<script[^>]*src="[^"]*events\.framer\.com[^"]*"[^>]*><\/script>/g, 
        ''
    );
    
    // Remove inline scripts that might contain tracking calls
    modifiedHtml = modifiedHtml.replace(
        /<script[^>]*>[\s\S]*?events\.framer\.com\/track[\s\S]*?<\/script>/gi, 
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
 * Generate early blocking script (inject trước tất cả scripts khác)
 * @returns {string} - Early blocking script HTML
 */
function generateEarlyBlockingScript() {
    return `
        <script>
            // EARLY BLOCKING SCRIPT - Chặn ngay từ đầu
            (function() {
                console.log('🚀 Early blocking script initialized');
                
                // Backup original functions ngay lập tức
                const originalFetch = window.fetch;
                const originalXHR = window.XMLHttpRequest;
                const originalSendBeacon = window.navigator?.sendBeacon;
                
                // Function để check nếu URL cần block
                function shouldBlock(url) {
                    if (typeof url !== 'string') return false;
                    return url.includes('events.framer.com') || 
                           url.includes('api.framer.com') || 
                           url.includes('app.framerstatic.com');
                }
                
                // Override fetch NGAY LẬP TỨC
                window.fetch = function(url, options) {
                    if (shouldBlock(url)) {
                        console.log('🚫 EARLY BLOCKED fetch call:', url);
                        return Promise.resolve(new Response('{"blocked": true, "early": true}', {
                            status: 200,
                            statusText: 'OK',
                            headers: { 'Content-Type': 'application/json' }
                        }));
                    }
                    return originalFetch ? originalFetch.apply(this, arguments) : Promise.reject(new Error('Fetch not available'));
                };
                
                // Override XMLHttpRequest NGAY LẬP TỨC
                if (window.XMLHttpRequest) {
                    const OriginalXHR = window.XMLHttpRequest;
                    window.XMLHttpRequest = function() {
                        const xhr = new OriginalXHR();
                        const originalOpen = xhr.open;
                        
                        xhr.open = function(method, url, ...args) {
                            if (shouldBlock(url)) {
                                console.log('🚫 EARLY BLOCKED XHR call:', url);
                                // Create fake XHR that does nothing
                                this.send = function() {};
                                this.setRequestHeader = function() {};
                                setTimeout(() => {
                                    this.readyState = 4;
                                    this.status = 200;
                                    this.responseText = '{"blocked": true, "early": true}';
                                    if (this.onreadystatechange) this.onreadystatechange();
                                    if (this.onload) this.onload();
                                }, 1);
                                return;
                            }
                            return originalOpen.apply(this, arguments);
                        };
                        
                        return xhr;
                    };
                    
                    // Copy static properties
                    Object.setPrototypeOf(window.XMLHttpRequest.prototype, OriginalXHR.prototype);
                    Object.setPrototypeOf(window.XMLHttpRequest, OriginalXHR);
                }
                
                // Override sendBeacon NGAY LẬP TỨC
                if (window.navigator && window.navigator.sendBeacon) {
                    window.navigator.sendBeacon = function(url, data) {
                        if (shouldBlock(url)) {
                            console.log('🚫 EARLY BLOCKED sendBeacon call:', url);
                            return true;
                        }
                        return originalSendBeacon ? originalSendBeacon.apply(this, arguments) : true;
                    };
                }
                
                console.log('✅ Early blocking script ready - ALL API calls will be blocked');
            })();
        </script>
    `;
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
                // Block Framer tracking API calls
                const originalFetch = window.fetch;
                const originalXHR = window.XMLHttpRequest;
                
                // Override fetch - CHẶN TẤT CẢ API calls
                window.fetch = function(url, options) {
                    if (typeof url === 'string' && (
                        url.includes('events.framer.com') ||
                        url.includes('api.framer.com') ||
                        url.includes('app.framerstatic.com')
                    )) {
                        console.log('🚫 Blocked ALL Framer API call:', url);
                        return Promise.resolve(new Response('{"blocked": true}', {
                            status: 200,
                            statusText: 'OK',
                            headers: { 'Content-Type': 'application/json' }
                        }));
                    }
                    return originalFetch.apply(this, arguments);
                };
                
                // Override XMLHttpRequest - CHẶN TẤT CẢ API calls
                const XHROpen = XMLHttpRequest.prototype.open;
                XMLHttpRequest.prototype.open = function(method, url, ...args) {
                    if (typeof url === 'string' && (
                        url.includes('events.framer.com') ||
                        url.includes('api.framer.com') ||
                        url.includes('app.framerstatic.com')
                    )) {
                        console.log('🚫 Blocked ALL Framer API XHR call:', url);
                        // Create a fake successful response
                        this.send = function() {};
                        this.setRequestHeader = function() {};
                        setTimeout(() => {
                            this.readyState = 4;
                            this.status = 200;
                            this.responseText = '{"blocked": true}';
                            if (this.onreadystatechange) this.onreadystatechange();
                        }, 1);
                        return;
                    }
                    return XHROpen.apply(this, arguments);
                };
                            this.status = 200;
                            this.responseText = '{"blocked": true}';
                            if (this.onreadystatechange) this.onreadystatechange();
                        }, 1);
                        return;
                    }
                    return XHROpen.apply(this, arguments);
                };
                            this.status = 200;
                            this.responseText = '{"blocked": true}';
                            if (this.onreadystatechange) this.onreadystatechange();
                        }, 1);
                        return;
                    }
                    return XHROpen.apply(this, arguments);
                };
                
                // Block navigator.sendBeacon - CHẶN TẤT CẢ
                if (window.navigator && window.navigator.sendBeacon) {
                    const originalSendBeacon = window.navigator.sendBeacon;
                    window.navigator.sendBeacon = function(url, data) {
                        if (typeof url === 'string' && (
                            url.includes('events.framer.com') ||
                            url.includes('api.framer.com') ||
                            url.includes('app.framerstatic.com')
                        )) {
                            console.log('🚫 Blocked ALL Framer sendBeacon call:', url);
                            return true; // Pretend it was successful
                        }
                        return originalSendBeacon.apply(this, arguments);
                    };
                }
                
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
    
    // BƯỚC 1: Inject early blocking script TRƯỚC TIÊN (ngay đầu HTML)
    const earlyBlockingScript = generateEarlyBlockingScript();
    if (html.includes('<head>')) {
        modifiedHtml = html.replace('<head>', '<head>' + earlyBlockingScript);
    } else if (html.includes('<html>')) {
        modifiedHtml = html.replace('<html>', '<html>' + earlyBlockingScript);  
    } else {
        modifiedHtml = earlyBlockingScript + html;
    }
    
    // Process HTML step by step
    modifiedHtml = removeFramerElements(modifiedHtml);
    modifiedHtml = injectHideFramerCSS(modifiedHtml);
    modifiedHtml = replaceMetaTags(modifiedHtml, meta);
    
    // Generate and inject protection script
    const protectMetaScript = generateMetaProtectionScript(meta);
    modifiedHtml = injectMetaProtectionScript(modifiedHtml, protectMetaScript);
    
    console.log(`${language} meta tags updated with Bluefish content`);
    console.log(`${language} EARLY BLOCKING script injected FIRST`);
    console.log(`${language} meta protection script injected`);
    console.log(`Framer elements removed from ${language} HTML`);
    
    return modifiedHtml;
}

module.exports = {
    processFramerContent,
    generateEarlyBlockingScript,
    FRAMER_URL,
    metaContent
};
