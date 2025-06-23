// Import cấu hình từ file dành cho người non-tech
const { BASE_URL, ROUTES } = require('./site-config');

// Server Configuration
const SERVER_CONFIG = {
    PORT: process.env.PORT || 3001,
    HOST: 'localhost'
};

// Framer Configuration
const FRAMER_CONFIG = {
    BASE_URL: BASE_URL,
    TRACKING_DOMAINS: ['events.framer.com'],
    ELEMENTS_TO_REMOVE: [
        '#__framer-badge-container',
        '#__framer-editorbar',
        '.__framer-badge'
    ]
};

// Feature Toggle Configuration
const FEATURE_TOGGLES = {
    USE_META_CONTENT: false,
    USE_MEDIA_CACHE: true,
};

// Meta Content for different languages
const META_CONTENT = {
    en: {
        title: 'Bluefish - The Secure Web3 Gateway',
        description: 'Your multi-chain wallet to explore DeFi, NFTs, and the future of Web3. Send tokens, swap on DEXs, and grow your community — all in one secure platform.',
        generator: 'Bluefish Web3 Gateway'
    },
    vi: {
        title: 'Bluefish - Cổng Web3 An Toàn',
        description: 'Ví đa chuỗi để khám phá DeFi, NFT và tương lai của Web3. Gửi token, swap trên DEX và phát triển cộng đồng — tất cả trong một nền tảng an toàn.',
        generator: 'Bluefish Web3 Gateway'
    }
};

module.exports = {
    SERVER_CONFIG,
    FRAMER_CONFIG,
    FEATURE_TOGGLES,
    META_CONTENT,
    ROUTES
}; 