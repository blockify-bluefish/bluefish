const { processFramerContent, FRAMER_URL } = require('../utils/framerProcessor');
const { generateErrorPage } = require('../utils/errorPages');

/**
 * Handle English route
 */
async function handleEnglishRoute(req, res) {
    try {
        const modifiedHtml = await processFramerContent('', 'en');
        res.send(modifiedHtml);
    } catch (error) {
        console.error('Error fetching from Framer app:', error.message);
        const errorPage = generateErrorPage('en', error.message, FRAMER_URL, '/');
        res.status(500).send(errorPage);
    }
}

/**
 * Handle Vietnamese route
 */
async function handleVietnameseRoute(req, res) {
    try {
        const modifiedHtml = await processFramerContent('vi/', 'vi');
        res.send(modifiedHtml);
    } catch (error) {
        console.error('Error fetching Vietnamese content from Framer app:', error.message);
        const errorPage = generateErrorPage('vi', error.message, FRAMER_URL + 'vi/', '/vi');
        res.status(500).send(errorPage);
    }
}

module.exports = {
    handleEnglishRoute,
    handleVietnameseRoute
};
