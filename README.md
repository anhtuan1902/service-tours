# Hệ thống Quản lý Phiếu đề nghị Đặt dịch vụ Tour

## 1. Bài toán

Xây dựng một mini system quản lý Phiếu đề nghị đặt dịch vụ tour, cho phép:

- Tạo phiếu đề nghị với thông tin tour và danh sách dịch vụ đi kèm
- Xem danh sách tất cả các phiếu đã tạo
- Xem chi tiết từng phiếu


## 2. Giả định nghiệp vụ

Trong quá trình phân tích, các giả định sau được đặt ra:

### 2.1 Phân loại Tour

- **FIT (Foreign Independent Tour)**: Tour cá nhân, khách lẻ
- **GIT (Group Inclusive Tour)**: Tour nhóm có hướng dẫn viên
- **MICE**: Hội thảo, hội nghị, sự kiện doanh nghiệp

### 2.2 Business Rules

1. **Validation bắt buộc**: TourName, DepartureDate, TourType, GuestCount là bắt buộc
2. **Ít nhất 1 dịch vụ**: Mỗi phiếu phải có tối thiểu 1 dịch vụ
3. **Số lượng > 0**: Quantity và UnitPrice phải lớn hơn 0
4. **Tính tổng tiền tự động**:
   - LineTotal = Quantity × UnitPrice
   - TotalCost = Sum(LineTotal)
5. **Cảnh báo MICE**: Nếu TourType = MICE và GuestCount < 10 → hiển thị cảnh báo
6. **Xét trạng thái tự động**:
   - TotalCost > 100,000,000 → "Chờ duyệt quản lý"
   - Ngược lại → "Đã tiếp nhận"

### 2.3 Giả định triển khai

- Dữ liệu được lưu trữ in-memory (Demo)
- Không yêu cầu authentication/authorization
- API trả về JSON format
- Frontend là Next.js App Router với TypeScript

---

## 3. Cơ hội mở rộng

Nếu triển khai thực tế, có thể xem xét các cải tiến sau:

### 3.1 Về nghiệp vụ

- **Phê duyệt nhiều cấp**: Phân quyền duyệt theo số tiền (cấp trưởng phòng, giám đốc)
- **Lịch sử thay đổi**: Audit log khi phiếu được cập nhật trạng thái
- **Phản hồi phiếu**: Người duyệt có thể ghi chú lý do từ chối
- **Gia hạn phiếu**: Phiếu có thể bị hết hạn sau X ngày

### 3.2 Về tính năng

- **Quản lý dịch vụ**: CRUD danh mục dịch vụ, nhà cung cấp
- **Tìm kiếm & Lọc**: Filter theo ngày, loại tour, trạng thái, khoảng tiền
- **Xuất báo cáo**: Export Excel/PDF danh sách phiếu
- **Dashboard**: Thống kê số lượng phiếu, doanh thu theo tháng/quý
- **Notification**: Email/SMS khi phiếu được duyệt hoặc từ chối

### 3.3 Về kỹ thuật

- **Authentication**: JWT-based auth với role (admin, user, approver)
- **Validation nâng cao**: FluentValidation thay vì manual check
- **Real-time**: WebSocket cho cập nhật trạng thái real-time
- **API Documentation**: Swagger/OpenAPI

---