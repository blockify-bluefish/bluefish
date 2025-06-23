const express = require('express');
// Node.js 18+ has built-in fetch, no need to import

const { 
    handleEnglishRoute, 
    handleVietnameseRoute,
    handleEnglishPrivacyPolicyRoute,
    handleEnglishTermsOfServiceRoute,
    handleVietnamesePrivacyPolicyRoute,
    handleVietnameseTermsOfServiceRoute
} = require('./routes/handlers');
const { generate404Page } = require('./utils/errorPages');
const { SERVER_CONFIG } = require('./configs');

const app = express();
const PORT = SERVER_CONFIG.PORT;

// Routes
app.get('/', handleEnglishRoute);
app.get('/vi', handleVietnameseRoute);
app.get('/privacy-policy', handleEnglishPrivacyPolicyRoute);
app.get('/term-of-service', handleEnglishTermsOfServiceRoute);
app.get('/vi/privacy-policy', handleVietnamesePrivacyPolicyRoute);
app.get('/vi/term-of-service', handleVietnameseTermsOfServiceRoute);

// Handle 404 errors
app.use((req, res) => {
    const errorPage = generate404Page(req.path);
    res.status(404).send(errorPage);
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
});
