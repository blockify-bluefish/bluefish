const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Fetch and serve content from Framer app
app.get('/', async (req, res) => {
    try {
        const response = await fetch('https://internal-area-042798.framer.app/');
        const html = await response.text();
        res.send(html);
    } catch (error) {
        console.error('Error fetching from Framer app:', error);
        res.status(500).send('Error loading content from Framer app');
    }
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
});
