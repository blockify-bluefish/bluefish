/**
 * Generate error page HTML
 * @param {string} language - Language code (en, vi)
 * @param {string} error - Error message
 * @param {string} url - URL that was attempted
 * @param {string} retryPath - Path for retry link
 * @returns {string} - Error page HTML
 */
function generateErrorPage(language, error, url, retryPath) {
    if (language === 'vi') {
        return `
            <html>
                <head>
                    <title>Lỗi - Bluefish</title>
                    <meta charset="utf-8">
                    <style>
                        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
                        .error-container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 600px; margin: 0 auto; }
                        h2 { color: #e74c3c; margin-bottom: 20px; }
                        p { margin: 10px 0; color: #666; }
                        a { color: #3498db; text-decoration: none; padding: 10px 20px; background: #3498db; color: white; border-radius: 4px; display: inline-block; margin-top: 20px; }
                        a:hover { background: #2980b9; }
                        .details { background: #f8f9fa; padding: 15px; border-radius: 4px; margin: 15px 0; font-family: monospace; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <div class="error-container">
                        <h2>🚫 Lỗi tải nội dung từ Framer app</h2>
                        <p><strong>Chi tiết lỗi:</strong></p>
                        <div class="details">${error}</div>
                        <p><strong>URL đang thử tải:</strong> ${url}</p>
                        <a href="${retryPath}">🔄 Thử lại</a>
                        <a href="/" style="margin-left: 10px; background: #95a5a6;">🏠 Trang chủ</a>
                    </div>
                </body>
            </html>
        `;
    } else {
        return `
            <html>
                <head>
                    <title>Error - Bluefish</title>
                    <meta charset="utf-8">
                    <style>
                        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
                        .error-container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 600px; margin: 0 auto; }
                        h2 { color: #e74c3c; margin-bottom: 20px; }
                        p { margin: 10px 0; color: #666; }
                        a { color: #3498db; text-decoration: none; padding: 10px 20px; background: #3498db; color: white; border-radius: 4px; display: inline-block; margin-top: 20px; }
                        a:hover { background: #2980b9; }
                        .details { background: #f8f9fa; padding: 15px; border-radius: 4px; margin: 15px 0; font-family: monospace; font-size: 14px; }
                    </style>
                </head>
                <body>
                    <div class="error-container">
                        <h2>🚫 Error loading content from Framer app</h2>
                        <p><strong>Error details:</strong></p>
                        <div class="details">${error}</div>
                        <p><strong>Trying to fetch from:</strong> ${url}</p>
                        <a href="${retryPath}">🔄 Try again</a>
                        <a href="/" style="margin-left: 10px; background: #95a5a6;">🏠 Home</a>
                    </div>
                </body>
            </html>
        `;
    }
}

/**
 * Generate 404 page HTML
 * @param {string} path - The requested path
 * @returns {string} - 404 page HTML
 */
function generate404Page(path) {
    return `
        <html>
            <head>
                <title>404 - Page Not Found | Bluefish</title>
                <meta charset="utf-8">
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
                    .error-container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 600px; margin: 0 auto; text-align: center; }
                    h1 { color: #e74c3c; margin-bottom: 20px; font-size: 3em; }
                    h2 { color: #34495e; margin-bottom: 20px; }
                    p { margin: 10px 0; color: #666; }
                    a { color: #3498db; text-decoration: none; padding: 10px 20px; background: #3498db; color: white; border-radius: 4px; display: inline-block; margin: 10px; }
                    a:hover { background: #2980b9; }
                    .path { background: #f8f9fa; padding: 10px; border-radius: 4px; margin: 15px 0; font-family: monospace; }
                </style>
            </head>
            <body>
                <div class="error-container">
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                    <p>The page you're looking for doesn't exist.</p>
                    <div class="path">Requested: ${path}</div>
                    <div>
                        <a href="/">🏠 Home (English)</a>
                        <a href="/vi">🏠 Trang chủ (Tiếng Việt)</a>
                    </div>
                </div>
            </body>
        </html>
    `;
}

module.exports = {
    generateErrorPage,
    generate404Page
};
