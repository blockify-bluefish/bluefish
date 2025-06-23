const { processFramerContent } = require('../utils/framerProcessor');
const { generateErrorPage } = require('../utils/errorPages');
const { FRAMER_CONFIG } = require('../configs');
const { ROUTES } = require('../site-config');

// Import hàm buildUrl từ framerProcessor
const { buildUrl } = require('../utils/framerProcessor');

/**
 * Universal route handler - tự động detect ngôn ngữ và framerPath từ URL
 */
async function handleRoute(req, res) {
    const requestedPath = req.path;
    
    // Kiểm tra xem route có tồn tại không
    if (!ROUTES.includes(requestedPath)) {
        const errorPage = generateErrorPage('en', 'Route not found', FRAMER_CONFIG.BASE_URL, '/');
        return res.status(404).send(errorPage);
    }
    
    // Tự động detect ngôn ngữ và framerPath
    const isVietnamese = requestedPath.startsWith('/vi');
    const language = isVietnamese ? 'vi' : 'en';
    
    // Tạo framerPath từ URL
    let framerPath = requestedPath;
    if (requestedPath === '/') {
        framerPath = ''; // Trang chủ tiếng Anh
    } else if (requestedPath === '/vi') {
        framerPath = 'vi/'; // Trang chủ tiếng Việt
    }
    // Các route khác giữ nguyên (ví dụ: /privacy-policy, /vi/privacy-policy)
    
    try {
        const modifiedHtml = await processFramerContent(framerPath);
        res.send(modifiedHtml);
    } catch (error) {
        console.error(`Error fetching ${requestedPath} from Framer app:`, error.message);
        const errorPage = generateErrorPage(
            language, 
            error.message, 
            buildUrl(FRAMER_CONFIG.BASE_URL, framerPath), 
            requestedPath
        );
        res.status(500).send(errorPage);
    }
}

/**
 * Get all route paths for automatic registration
 */
function getRoutePaths() {
    return ROUTES;
}

module.exports = {
    handleRoute,
    getRoutePaths
};
