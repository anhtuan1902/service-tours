# Report

## Tổng quan

Dự án Fullstack C#/.NET Core + Next.js.

---

## Prompt chính đã sử dụng

### 1. Phân tích đề thi

```
GIúp tôi phân tích yêu cầu và nghiệp vụ cần xử lý, lập kế hoạch chi tiết để phân chia các phần cần làm. Đưa ra bản kế hoạch từng bước để tôi review.

[Đính kèm: Yêu cầu nghiệp vụ]
```

### 2. Review và thực hiện kế hoạch

```
Thực hiện theo kế hoạch đã đề ra, kế hoạch được đính kèm để bạn tham khảo.
```

---

## Cách dùng AI

### Giai đoạn 1: Phân tích & Lập kế hoạch

AI đã hỗ trợ:
- Đọc và phân tích đề thi từ file PDF
- Bóc tách business rules từ yêu cầu nghiệp vụ
- Thiết kế cấu trúc project (folder structure)
- Lên kế hoạch chi tiết với timeline 90 phút
- Tạo todo list để track progress

### Giai đoạn 2: Review, chỉnh sửa và thực hiện kế hoạch

Code:

**Backend (ASP.NET Core):**
- Tạo Models: TourRequest, ServiceItem, TourType enum
- Tạo DTOs cho request/response
- Implement Business Logic trong Service layer
- Tạo Controller với 3 endpoints
- Setup CORS cho kết nối frontend

**Frontend (Next.js):**
- Setup project với TypeScript + Tailwind
- Tạo TypeScript types
- Tạo API client
- Build components: ServiceItemRow, TourRequestForm, RequestTable
- Build pages: Home (danh sách), Create, Detail

---
