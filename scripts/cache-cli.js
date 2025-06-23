#!/usr/bin/env node

const { showCacheInfo, clearCache, cleanExpiredCache } = require('../utils/cacheManager');

const command = process.argv[2];

async function main() {
    switch (command) {
        case 'info':
        case 'stats':
            await showCacheInfo();
            break;
            
        case 'clear':
            console.log('🗑️ Clearing all cache...');
            const deletedCount = await clearCache();
            console.log(`✅ Cleared ${deletedCount} files`);
            break;
            
        case 'clean':
            console.log('🧹 Cleaning expired cache...');
            const cleanedCount = await cleanExpiredCache();
            console.log(`✅ Cleaned ${cleanedCount} expired files`);
            break;
            
        default:
            console.log(`
🎯 Media Cache CLI Tool

Usage: node scripts/cache-cli.js <command>

Commands:
  info, stats    Show cache statistics
  clear          Clear all cached files
  clean          Clean expired cache files

Examples:
  node scripts/cache-cli.js info
  node scripts/cache-cli.js clear
  node scripts/cache-cli.js clean
            `);
            break;
    }
}

main().catch(console.error); 