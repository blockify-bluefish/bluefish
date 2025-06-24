// ========================================
// CẤU HÌNH WEBSITE - DÀNH CHO NGƯỜI KHÔNG CHUYÊN
// ========================================

// URL của website Framer (thay đổi khi cần)
const BASE_URL = 'https://internal-area-042798.framer.app/';

// Danh sách các trang của website
// Thêm URL mới vào đây khi cần tạo trang mới
const ROUTES = [
    '/',
    '/vi',
    '/privacy-policy',
    '/term-of-service',
    '/vi/privacy-policy',
    '/vi/term-of-service',
    '/download-app',
    '/vi/download-app',
];

// ========================================
// HƯỚNG DẪN SỬ DỤNG:
// ========================================
// 1. Để thay đổi website Framer:
//    - Thay đổi BASE_URL thành URL mới
//
// 2. Để thêm trang mới:
//    - Thêm URL vào mảng ROUTES
//    - Ví dụ: '/about', '/vi/about'
//
// 3. Để xóa trang:
//    - Xóa URL khỏi mảng ROUTES
//
// 4. Lưu file và restart server
// ========================================

module.exports = {
    BASE_URL,
    ROUTES
}; 