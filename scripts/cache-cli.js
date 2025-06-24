#!/usr/bin/env node

const { showCacheInfo, clearAllCacheCLI, clearSiteCacheCLI, cleanExpiredCache } = require('../utils/cacheManager');

const command = process.argv[2];
const siteUrl = process.argv[3];

async function main() {
    switch (command) {
        case 'info':
        case 'stats':
            await showCacheInfo();
            break;
            
        case 'clear':
            if (siteUrl) {
                await clearSiteCacheCLI(siteUrl);
            } else {
                await clearAllCacheCLI();
            }
            break;
            
        case 'clean':
            console.log('🧹 Cleaning expired cache...');
            const cleanedCount = await cleanExpiredCache();
            console.log(`✅ Cleaned ${cleanedCount} expired sites`);
            break;
            
        default:
            console.log(`
🎯 Asset Cache CLI Tool

Usage: node scripts/cache-cli.js <command> [siteUrl]

Commands:
  info, stats           Show cache statistics
  clear [siteUrl]       Clear cache (all or specific site)
  clean                 Clean expired cache sites

Examples:
  node scripts/cache-cli.js info
  node scripts/cache-cli.js clear
  node scripts/cache-cli.js clear "https://example.framer.app"
  node scripts/cache-cli.js clean
            `);
            break;
    }
}

main().catch(console.error); 