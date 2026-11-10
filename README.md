# 🚗 SmartPark Campus - Fullstack Hệ Thống Điều Hướng Bãi Xe & Đi Bộ Đúng Giờ (ITSS)

Dự án Full-stack hoàn chỉnh giải quyết bài toán giao ca 10 phút giữa 2 tiết học:
- **Ảnh 1**: Sơ đồ chuyển màn hình chuẩn (`S01` ➔ `Tình trạng bãi` ➔ `S02`/`S03` ➔ `S04` ➔ `Đến lớp đúng giờ`).
- **Ảnh 2 & 3**: Hiện thực hóa đầy đủ các giải pháp ITSS (Kiểm tra thời gian thực, điều hướng bãi thay thế, ước tính thời gian tìm chỗ & đi bộ từng bước đến cửa phòng học, báo cáo 1 chạm hết hạn sau 10 phút).

---

## 🏗️ Kiến trúc Fullstack

- **Frontend**: React 18, Tailwind CSS, Lucide Icons, Vite.
- **Backend**: Node.js + Express 5, REST API, Server-Sent Events (SSE Real-time).
- **Database**: Portable JSON Document Store tự động lưu thay đổi vào `server/data/db.json`.
- **Deploy Ready**: Chạy toàn bộ cả Frontend + Backend trên cùng 1 cổng `PORT` duy nhất.

---

## ⚡ Chạy dưới Local

### 1. Cài đặt thư viện
```bash
npm install
```

### 2. Chạy toàn bộ hệ thống (Fullstack)
```bash
# Build frontend
npm run build

# Chạy server (Vừa phục vụ API vừa phục vụ Web)
npm start
```
Mở trình duyệt: **http://localhost:5000**

---

## 🚀 Hướng Dẫn Deploy Lên Cloud (Miễn Phí)

### Cách 1: Deploy lên Render.com (Khuyên dùng - Cực dễ)
1. Đẩy code dự án lên kho GitHub của bạn:
   ```bash
   git init
   git add .
   git commit -m "feat: fullstack smart parking app"
   git remote add origin https://github.com/YOUR_USERNAME/campus-parking.git
   git push -u origin main
   ```
2. Đăng nhập vào [Render.com](https://render.com).
3. Bấm **New** ➔ Chọn **Web Service** ➔ Kết nối với repo GitHub vừa tạo.
4. Điền cấu hình:
   - **Name**: `campus-smart-parking`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Bấm **Create Web Service**. Sau 1-2 phút, Render sẽ cấp cho bạn một đường link HTTPS công khai (ví dụ `https://campus-smart-parking.onrender.com`) để ai cũng có thể vào được!

---

### Cách 2: Deploy lên Railway.app
1. Truy cập [Railway.app](https://railway.app), chọn **New Project** ➔ **Deploy from GitHub repo**.
2. Chọn repo của bạn.
3. Railway sẽ tự động nhận diện `npm run build` và `npm start`.
4. Trong mục **Settings**, chọn **Generate Domain** để nhận link công khai.

---

### Cách 3: Deploy bằng Docker
Dự án đã có sẵn `Dockerfile` đa tầng tối ưu:
```bash
docker build -t smartpark-campus .
docker run -p 5000:5000 smartpark-campus
```

---

## 📡 Danh sách API Backend

| Phương thức | Đường dẫn | Chức năng |
| :--- | :--- | :--- |
| `GET` | `/api/lots` | Lấy danh sách toàn bộ bãi xe, số chỗ trống, trạng thái màu (Xanh/Vàng/Đỏ) |
| `GET` | `/api/lots/:id` | Xem chi tiết 1 bãi xe và lộ trình đi bộ đến từng tòa nhà |
| `GET` | `/api/buildings` | Danh sách các phòng học/giảng đường đích đến |
| `GET` | `/api/recommend?destination=b-a2&avoidLot=lot-a` | Thuật toán gợi ý bãi xe thay thế tối ưu nhất khi bãi chính quá tải |
| `GET` | `/api/reports` | Lấy danh sách chia sẻ nhanh của cộng đồng sinh viên |
| `POST` | `/api/reports` | Gửi Báo cáo 1 chạm (tự động hết hạn sau 10 phút và phát tín hiệu Realtime) |
| `GET` | `/api/stream` | Server-Sent Events (SSE) để đồng bộ thay đổi giữa các máy theo thời gian thực |
| `GET` | `/health` | Kiểm tra trạng thái hoạt động của server |
