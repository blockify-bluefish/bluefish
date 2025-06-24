const { processFramerContent, FRAMER_URL } = require('../utils/framerProcessor');
const { generateErrorPage } = require('../utils/errorPages');
const { FRAMER_CONFIG } = require('../configs');
const { ROUTES } = require('../site-config');

/**
 * Build URL by combining base URL and path
 * @param {string} baseUrl - Base URL
 * @param {string} path - Path to append
 * @returns {string} - Complete URL
 */
function buildUrl(baseUrl, path) {
    // Remove trailing slash from baseUrl and leading slash from path
    const cleanBaseUrl = baseUrl.replace(/\/$/, '');
    const cleanPath = path.replace(/^\//, '');
    
    if (!cleanPath) {
        return cleanBaseUrl + '/';
    }
    
    return cleanBaseUrl + '/' + cleanPath;
}

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
    let framerPath = '';
    if (requestedPath === '/') {
        framerPath = ''; // Trang chủ tiếng Anh
    } else if (requestedPath === '/vi') {
        framerPath = 'vi/'; // Trang chủ tiếng Việt
    } else if (isVietnamese) {
        // Vietnamese routes: /vi/privacy-policy -> vi/privacy-policy
        framerPath = requestedPath.substring(1); // Remove leading slash
    } else {
        // English routes: /privacy-policy -> privacy-policy
        framerPath = requestedPath.substring(1); // Remove leading slash
    }
    
    try {
        const modifiedHtml = await processFramerContent(framerPath, language);
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
