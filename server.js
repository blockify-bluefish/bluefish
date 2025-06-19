const express = require('express');
// Node.js 18+ has built-in fetch, no need to import

const { handleEnglishRoute, handleVietnameseRoute } = require('./routes/handlers');
const { generate404Page } = require('./utils/errorPages');

const app = express();
const PORT = process.env.PORT || 3001;

// Routes
app.get('/', handleEnglishRoute);
app.get('/vi', handleVietnameseRoute);

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
