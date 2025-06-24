const fs = require('fs').promises;
const path = require('path');
const { getCacheStats, clearAllCache, clearSiteCache, CACHE_CONFIG } = require('./assetCache');

/**
 * Hiển thị thông tin cache
 */
async function showCacheInfo() {
    const stats = await getCacheStats();
    
    if (!stats) {
        console.log('❌ Cache directory not accessible');
        return;
    }
    
    console.log('\n📊 Asset Cache Statistics:');
    console.log('==========================');
    console.log(`📁 Total sites: ${stats.totalSites}`);
    console.log(`📄 Total files: ${stats.totalFiles}`);
    console.log(`💾 Total size: ${stats.totalSizeMB} MB`);
    console.log(`📂 Cache directory: ${CACHE_CONFIG.CACHE_DIR}`);
    
    if (stats.sites.length > 0) {
        console.log('\n📋 Cached sites:');
        stats.sites.forEach(site => {
            console.log(`  - ${site.site} (${site.files} files, ${site.sizeMB} MB)`);
        });
    } else {
        console.log('\n📭 No sites cached yet');
    }
}

/**
 * Xóa cache của một site cụ thể
 */
async function clearSiteCacheCLI(siteUrl) {
    try {
        console.log(`🗑️ Clearing cache for: ${siteUrl}`);
        const success = await clearSiteCache(siteUrl);
        
        if (success) {
            console.log(`✅ Cache cleared for: ${siteUrl}`);
        } else {
            console.log(`❌ Failed to clear cache for: ${siteUrl}`);
        }
        
        return success;
    } catch (error) {
        console.error('Error clearing site cache:', error);
        return false;
    }
}

/**
 * Xóa tất cả cache
 */
async function clearAllCacheCLI() {
    try {
        console.log('🗑️ Clearing all cache...');
        const success = await clearAllCache();
        
        if (success) {
            console.log('✅ All cache cleared successfully');
        } else {
            console.log('❌ Failed to clear all cache');
        }
        
        return success;
    } catch (error) {
        console.error('Error clearing all cache:', error);
        return false;
    }
}

/**
 * Xóa cache cũ (quá thời gian)
 */
async function cleanExpiredCache() {
    try {
        const stats = await getCacheStats();
        if (!stats || stats.sites.length === 0) {
            console.log('📭 No cache to clean');
            return 0;
        }
        
        let deletedCount = 0;
        const currentTime = Date.now();
        
        for (const site of stats.sites) {
            const sitePath = path.join(CACHE_CONFIG.CACHE_DIR, site.site);
            const indexPath = path.join(sitePath, 'index.html');
            
            try {
                const stats = await fs.stat(indexPath);
                const age = currentTime - stats.mtime.getTime();
                
                if (age > CACHE_CONFIG.CACHE_DURATION) {
                    await fs.rm(sitePath, { recursive: true, force: true });
                    deletedCount++;
                    console.log(`🧹 Cleaned expired cache: ${site.site}`);
                }
            } catch (error) {
                // File không tồn tại hoặc lỗi khác, bỏ qua
            }
        }
        
        console.log(`🧹 Cleaned ${deletedCount} expired cache sites`);
        return deletedCount;
    } catch (error) {
        console.error('Error cleaning expired cache:', error);
        return 0;
    }
}

module.exports = {
    showCacheInfo,
    clearSiteCacheCLI,
    clearAllCacheCLI,
    cleanExpiredCache
}; 