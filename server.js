const express = require('express');
// Node.js 18+ has built-in fetch, no need to import

const { handleRoute, getRoutePaths } = require('./routes/handlers');
const { generate404Page } = require('./utils/errorPages');
const { SERVER_CONFIG } = require('./configs');
const { ROUTES } = require('./site-config');

const app = express();
const PORT = SERVER_CONFIG.PORT;

// Automatically register all routes from ROUTES configuration
const routePaths = getRoutePaths();
routePaths.forEach(path => {
    app.get(path, handleRoute);
    console.log(`✅ Registered route: ${path}`);
});

// Handle 404 errors
app.use((req, res) => {
    const errorPage = generate404Page(req.path);
    res.status(404).send(errorPage);
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`🔗 Total routes registered: ${routePaths.length}`);
});
