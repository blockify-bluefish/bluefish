const { processFramerContent } = require('../utils/framerProcessor');
const { generateErrorPage } = require('../utils/errorPages');
const { FRAMER_CONFIG, ROUTES } = require('../configs');

/**
 * Handle English route
 */
async function handleEnglishRoute(req, res) {
    try {
        const modifiedHtml = await processFramerContent('');
        res.send(modifiedHtml);
    } catch (error) {
        console.error('Error fetching from Framer app:', error.message);
        const errorPage = generateErrorPage('en', error.message, FRAMER_CONFIG.BASE_URL, ROUTES.ENGLISH);
        res.status(500).send(errorPage);
    }
}

/**
 * Handle Vietnamese route
 */
async function handleVietnameseRoute(req, res) {
    try {
        const modifiedHtml = await processFramerContent('vi/');
        res.send(modifiedHtml);
    } catch (error) {
        console.error('Error fetching Vietnamese content from Framer app:', error.message);
        const errorPage = generateErrorPage('vi', error.message, FRAMER_CONFIG.BASE_URL + 'vi/', ROUTES.VIETNAMESE);
        res.status(500).send(errorPage);
    }
}

/**
 * Handle English Privacy Policy route
 */
async function handleEnglishPrivacyPolicyRoute(req, res) {
    try {
        const modifiedHtml = await processFramerContent('privacy-policy');
        res.send(modifiedHtml);
    } catch (error) {
        console.error('Error fetching English Privacy Policy from Framer app:', error.message);
        const errorPage = generateErrorPage('en', error.message, FRAMER_CONFIG.BASE_URL + 'privacy-policy', ROUTES.PRIVACY_POLICY);
        res.status(500).send(errorPage);
    }
}

/**
 * Handle English Terms of Service route
 */
async function handleEnglishTermsOfServiceRoute(req, res) {
    try {
        const modifiedHtml = await processFramerContent('term-of-service');
        res.send(modifiedHtml);
    } catch (error) {
        console.error('Error fetching English Terms of Service from Framer app:', error.message);
        const errorPage = generateErrorPage('en', error.message, FRAMER_CONFIG.BASE_URL + 'term-of-service', ROUTES.TERMS_OF_SERVICE);
        res.status(500).send(errorPage);
    }
}

/**
 * Handle Vietnamese Privacy Policy route
 */
async function handleVietnamesePrivacyPolicyRoute(req, res) {
    try {
        const modifiedHtml = await processFramerContent('vi/privacy-policy');
        res.send(modifiedHtml);
    } catch (error) {
        console.error('Error fetching Vietnamese Privacy Policy from Framer app:', error.message);
        const errorPage = generateErrorPage('vi', error.message, FRAMER_CONFIG.BASE_URL + 'vi/privacy-policy', ROUTES.VIETNAMESE_PRIVACY_POLICY);
        res.status(500).send(errorPage);
    }
}

/**
 * Handle Vietnamese Terms of Service route
 */
async function handleVietnameseTermsOfServiceRoute(req, res) {
    try {
        const modifiedHtml = await processFramerContent('vi/term-of-service');
        res.send(modifiedHtml);
    } catch (error) {
        console.error('Error fetching Vietnamese Terms of Service from Framer app:', error.message);
        const errorPage = generateErrorPage('vi', error.message, FRAMER_CONFIG.BASE_URL + 'vi/term-of-service', ROUTES.VIETNAMESE_TERMS_OF_SERVICE);
        res.status(500).send(errorPage);
    }
}

module.exports = {
    handleEnglishRoute,
    handleVietnameseRoute,
    handleEnglishPrivacyPolicyRoute,
    handleEnglishTermsOfServiceRoute,
    handleVietnamesePrivacyPolicyRoute,
    handleVietnameseTermsOfServiceRoute
};
