# Nạp/Rút Wallet 2024

## 1. Tổng Quan Dự Án

**Tên dự án**: Nạp/Rút Wallet 2024  
**Mô tả ngắn**: Xây dựng UI animation cho ví điện tử.

---

## 2. Cấu Trúc Thư Mục

### Thư mục chính `src/`

- **assets/**: Chứa ảnh và các animation ảnh.
- **component/**: Chứa các function tạo dữ liệu giả, các icon, và các function dùng cho Three.js.
- **context/**: Chứa file Redux dùng để lưu trữ dữ liệu.
- **layouts/**: Chứa các component được tái sử dụng trong toàn bộ web.
- **page/**: Chứa các trang hiển thị.
- **scss/**: Chứa các file SCSS cấu hình cho web, bao gồm biến, breakpoint và frame.

### Bên trong thư mục `layouts/`

- **component/**: Lưu các component tái sử dụng.

---

## 3. Mô Tả Một Số File Component

### `BlockContent`
- Tạo các block bố cục chứa nội dung.
- Nhận vào:
  - `type`: Dạng block nội dung.
  - `listBox`: Mảng chứa nội dung cần hiển thị.
  - `onInputChange`: Hàm thay đổi dữ liệu nhập.
  - `showId`, `setShowId`: Sử dụng ID để truy xuất nội dung.

### `BlockContentTopWallet`
- Kết hợp với `BlockContent` để hiển thị thông tin ví, token hiện có.

### `BlockFilter`
- Tạo form tìm kiếm.

### `Image`
- Chứa hình động sử dụng trong Three.js.

### `NumericKeyBoard`
- Tạo bàn phím số tùy chỉnh dành cho mobile.

### `Charts`
- Tạo biểu đồ.

### `Popup`
- Tạo form dạng popup để hiển thị nội dung.
- Nhận vào:
  - `isAlert`: Kiểm tra popup dạng thông báo.
  - `isOpen`, `setIsOpen`: Bật/tắt popup.
  - `button`: Có thể truyền vào nút bấm.
  - `listAlert`: Mảng nội dung hiển thị.
  - `onClick`: Sự kiện click của button.

### `ShowHistory`
- Hiển thị danh sách giao dịch của ví.

### `ScanQR`
- Cho phép sử dụng camera để quét QR.
- Nhận vào:
  - `setScannedResult`: Set giá trị sau khi quét.
  - `isScanning`, `setIsScanning`: Kiểm soát quá trình scan.
  - `button`, `onClick`: Tùy chỉnh button và sự kiện.

### `FormOTP`
- Tạo form nhận OTP sau giao dịch.

### `SwiperNav`
- NavBar dạng swipe, điều hướng các trang.

---

## ✨ Các Component Khác

- Dùng để dựng bố cục form, tách code dễ quản lý...
- Các hiệu ứng chính được xây dựng bằng **GSAP** **ThreeJs** và các thư viện scroll animation hiện đại.

---
