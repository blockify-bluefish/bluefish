const fs = require('fs').promises;
const path = require('path');
const { CACHE_CONFIG } = require('./mediaCache');

/**
 * Lấy thống kê cache
 */
async function getCacheStats() {
    try {
        const files = await fs.readdir(CACHE_CONFIG.CACHE_DIR);
        let totalSize = 0;
        const fileStats = [];
        
        for (const file of files) {
            const filePath = path.join(CACHE_CONFIG.CACHE_DIR, file);
            const stats = await fs.stat(filePath);
            totalSize += stats.size;
            fileStats.push({
                name: file,
                size: stats.size,
                modified: stats.mtime
            });
        }
        
        return {
            totalFiles: files.length,
            totalSize: totalSize,
            totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
            files: fileStats
        };
    } catch (error) {
        console.error('Error getting cache stats:', error);
        return null;
    }
}

/**
 * Xóa tất cả cache
 */
async function clearCache() {
    try {
        const files = await fs.readdir(CACHE_CONFIG.CACHE_DIR);
        
        for (const file of files) {
            const filePath = path.join(CACHE_CONFIG.CACHE_DIR, file);
            await fs.unlink(filePath);
        }
        
        console.log(`🗑️ Cleared ${files.length} cached files`);
        return files.length;
    } catch (error) {
        console.error('Error clearing cache:', error);
        return 0;
    }
}

/**
 * Xóa cache cũ (quá thời gian)
 */
async function cleanExpiredCache() {
    try {
        const files = await fs.readdir(CACHE_CONFIG.CACHE_DIR);
        let deletedCount = 0;
        
        for (const file of files) {
            const filePath = path.join(CACHE_CONFIG.CACHE_DIR, file);
            const stats = await fs.stat(filePath);
            
            const age = Date.now() - stats.mtime.getTime();
            if (age > CACHE_CONFIG.CACHE_DURATION) {
                await fs.unlink(filePath);
                deletedCount++;
            }
        }
        
        console.log(`🧹 Cleaned ${deletedCount} expired cache files`);
        return deletedCount;
    } catch (error) {
        console.error('Error cleaning expired cache:', error);
        return 0;
    }
}

/**
 * Hiển thị thông tin cache
 */
async function showCacheInfo() {
    const stats = await getCacheStats();
    
    if (!stats) {
        console.log('❌ Cache directory not accessible');
        return;
    }
    
    console.log('\n📊 Media Cache Statistics:');
    console.log('========================');
    console.log(`📁 Total files: ${stats.totalFiles}`);
    console.log(`💾 Total size: ${stats.totalSizeMB} MB`);
    console.log(`📅 Cache duration: ${CACHE_CONFIG.CACHE_DURATION / (1000 * 60 * 60)} hours`);
    console.log(`📂 Cache directory: ${CACHE_CONFIG.CACHE_DIR}`);
    
    if (stats.files.length > 0) {
        console.log('\n📋 Cached files:');
        stats.files.forEach(file => {
            const sizeKB = (file.size / 1024).toFixed(1);
            console.log(`  - ${file.name} (${sizeKB} KB) - ${file.modified.toLocaleString()}`);
        });
    }
}

module.exports = {
    getCacheStats,
    clearCache,
    cleanExpiredCache,
    showCacheInfo
}; 