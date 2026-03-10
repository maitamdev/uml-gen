// ============================================
// UML Diagram Templates
// Pre-built Mermaid diagrams for common topics
// ============================================

export interface DiagramSet {
  usecase: string;
  activity: string;
  sequence: string;
  class: string;
  erd: string;
  state: string;
  component?: string;
  deployment?: string;
  dfd?: string;
  gantt?: string;
}

export interface Template {
  name: string;
  description: string;
  diagrams: DiagramSet;
  analyses?: Record<string, string>;
}

export const templates: Record<string, Template> = {
  library: {
    name: "Quản lý thư viện",
    description:
      "Hệ thống quản lý thư viện cho phép sinh viên mượn/trả sách, thủ thư quản lý sách và thẻ thư viện",
    diagrams: {
      usecase: `flowchart LR
  subgraph HệThống["🏛️ HỆ THỐNG QUẢN LÝ THƯ VIỆN"]
    UC1["📖 Mượn sách"]
    UC2["📗 Trả sách"]
    UC3["🔍 Tìm kiếm sách"]
    UC4["📋 Xem lịch sử mượn"]
    UC5["📚 Quản lý sách"]
    UC6["🪪 Quản lý thẻ thư viện"]
    UC7["👤 Quản lý tài khoản"]
    UC8["📊 Thống kê báo cáo"]
    UC9["🔐 Đăng nhập"]
    UC10["⏰ Gia hạn mượn sách"]
    UC11["💰 Xử lý phạt quá hạn"]
  end
  
  SV["🧑‍🎓 Sinh viên"]
  TT["👩‍💼 Thủ thư"]
  QTV["🧑‍💻 Quản trị viên"]
  
  SV --> UC9
  SV --> UC1
  SV --> UC2
  SV --> UC3
  SV --> UC4
  SV --> UC10
  
  TT --> UC9
  TT --> UC5
  TT --> UC6
  TT --> UC1
  TT --> UC2
  TT --> UC11
  
  QTV --> UC9
  QTV --> UC7
  QTV --> UC8`,

      activity: `flowchart TD
  Start(("🟢 Bắt đầu"))
  Login["🔐 Đăng nhập hệ thống"]
  CheckAuth{"✅ Xác thực?"}
  SearchBook["🔍 Tìm kiếm sách"]
  CheckAvail{"📖 Sách có sẵn?"}
  CheckCard{"🪪 Thẻ hợp lệ?"}
  CreateRequest["📝 Tạo phiếu mượn"]
  UpdateDB["💾 Cập nhật CSDL"]
  PrintReceipt["🧾 In phiếu mượn"]
  Notify["📢 Thông báo không có sách"]
  InvalidCard["⚠️ Yêu cầu gia hạn thẻ"]
  End(("🔴 Kết thúc"))
  
  Start --> Login
  Login --> CheckAuth
  CheckAuth -->|Thành công| SearchBook
  CheckAuth -->|Thất bại| Login
  SearchBook --> CheckAvail
  CheckAvail -->|Có| CheckCard
  CheckAvail -->|Không| Notify
  CheckCard -->|Hợp lệ| CreateRequest
  CheckCard -->|Hết hạn| InvalidCard
  CreateRequest --> UpdateDB
  UpdateDB --> PrintReceipt
  PrintReceipt --> End
  Notify --> End
  InvalidCard --> End`,

      sequence: `sequenceDiagram
  actor SV as 🧑‍🎓 Sinh viên
  participant HT as 🖥️ Hệ thống
  participant DB as 🗄️ Cơ sở dữ liệu
  actor TT as 👩‍💼 Thủ thư
  
  SV->>HT: 1. Đăng nhập
  HT->>DB: Kiểm tra tài khoản
  DB-->>HT: Xác thực OK
  HT-->>SV: Đăng nhập thành công
  
  SV->>HT: 2. Tìm kiếm sách
  HT->>DB: Truy vấn sách
  DB-->>HT: Danh sách kết quả
  HT-->>SV: Hiển thị sách
  
  SV->>HT: 3. Yêu cầu mượn sách
  HT->>DB: Kiểm tra thẻ thư viện
  DB-->>HT: Thẻ hợp lệ
  HT->>DB: Kiểm tra số lượng sách
  DB-->>HT: Sách có sẵn
  
  HT->>TT: 4. Thông báo yêu cầu mượn
  TT->>HT: 5. Duyệt yêu cầu
  HT->>DB: Tạo phiếu mượn
  HT->>DB: Cập nhật số lượng sách
  DB-->>HT: Lưu thành công
  HT-->>SV: 6. Gửi phiếu mượn
  HT-->>SV: Thông báo ngày trả`,

      class: `classDiagram
  class SinhVien {
    -maSV: String
    -hoTen: String
    -email: String
    -soDienThoai: String
    -khoa: String
    +dangNhap()
    +timKiemSach()
    +muonSach()
    +traSach()
    +xemLichSu()
  }
  
  class TheThuvien {
    -maThe: String
    -ngayCap: Date
    -ngayHetHan: Date
    -trangThai: String
    +kiemTraHopLe()
    +giaHan()
  }
  
  class Sach {
    -maSach: String
    -tenSach: String
    -tacGia: String
    -theLoai: String
    -namXuatBan: int
    -soLuong: int
    -moTa: String
    +kiemTraTonKho()
    +capNhatSoLuong()
  }
  
  class PhieuMuon {
    -maPhieu: String
    -ngayMuon: Date
    -ngayTraDuKien: Date
    -ngayTraThucTe: Date
    -trangThai: String
    +taoPhieu()
    +giaHan()
    +tinhPhat()
  }
  
  class ThuThu {
    -maNV: String
    -hoTen: String
    +duyetMuonSach()
    +nhanTraSach()
    +quanLySach()
  }
  
  class QuanTriVien {
    -maQTV: String
    -hoTen: String
    +quanLyTaiKhoan()
    +thongKe()
    +cauHinh()
  }
  
  SinhVien "1" --> "1" TheThuvien : sở hữu
  SinhVien "1" --> "*" PhieuMuon : tạo
  PhieuMuon "*" --> "1" Sach : chứa
  ThuThu "1" --> "*" PhieuMuon : duyệt
  QuanTriVien "1" --> "*" ThuThu : quản lý`,

      erd: `erDiagram
  SINH_VIEN {
    string ma_sv PK
    string ho_ten
    string email
    string sdt
    string khoa
    date ngay_sinh
  }
  
  THE_THU_VIEN {
    string ma_the PK
    string ma_sv FK
    date ngay_cap
    date ngay_het_han
    string trang_thai
  }
  
  SACH {
    string ma_sach PK
    string ten_sach
    string tac_gia
    string the_loai
    int nam_xb
    int so_luong
    string nha_xb
  }
  
  PHIEU_MUON {
    string ma_phieu PK
    string ma_sv FK
    string ma_nv FK
    date ngay_muon
    date ngay_tra_dk
    date ngay_tra_tt
    string trang_thai
  }
  
  CHI_TIET_MUON {
    string ma_phieu FK
    string ma_sach FK
    int so_luong
    string ghi_chu
  }
  
  NHAN_VIEN {
    string ma_nv PK
    string ho_ten
    string vai_tro
    string email
  }
  
  SINH_VIEN ||--o| THE_THU_VIEN : "sở hữu"
  SINH_VIEN ||--o{ PHIEU_MUON : "tạo"
  PHIEU_MUON ||--|{ CHI_TIET_MUON : "chứa"
  SACH ||--o{ CHI_TIET_MUON : "được mượn"
  NHAN_VIEN ||--o{ PHIEU_MUON : "duyệt"`,

      state: `stateDiagram-v2
  [*] --> ChuaMuon: Sách có sẵn
  
  ChuaMuon --> DangMuon: Sinh viên mượn
  DangMuon --> DaTraDungHan: Trả đúng hạn
  DangMuon --> QuaHan: Hết hạn mượn
  DangMuon --> GiaHan: Yêu cầu gia hạn
  GiaHan --> DangMuon: Duyệt gia hạn
  GiaHan --> QuaHan: Từ chối gia hạn
  QuaHan --> DaTraTreHan: Trả sách + đóng phạt
  DaTraDungHan --> ChuaMuon: Nhập lại kho
  DaTraTreHan --> ChuaMuon: Nhập lại kho
  DaTraDungHan --> [*]
  DaTraTreHan --> [*]
  
  state DangMuon {
    [*] --> BinhThuong
    BinhThuong --> SapHetHan: Còn 3 ngày
    SapHetHan --> BinhThuong: Gia hạn
  }`,
    },
  },

  student: {
    name: "Quản lý sinh viên",
    description:
      "Hệ thống quản lý sinh viên bao gồm đăng ký môn học, quản lý điểm, lớp học",
    diagrams: {
      usecase: `flowchart LR
  subgraph HệThống["🏫 HỆ THỐNG QUẢN LÝ SINH VIÊN"]
    UC1["📝 Đăng ký môn học"]
    UC2["📊 Xem điểm"]
    UC3["📅 Xem thời khóa biểu"]
    UC4["💰 Đóng học phí"]
    UC5["👤 Cập nhật thông tin"]
    UC6["📋 Quản lý lớp học"]
    UC7["✏️ Nhập điểm"]
    UC8["📃 Quản lý môn học"]
    UC9["📈 Thống kê"]
    UC10["🔐 Đăng nhập"]
  end
  
  SV["🧑‍🎓 Sinh viên"]
  GV["👨‍🏫 Giảng viên"]
  PĐT["🏢 Phòng Đào tạo"]
  
  SV --> UC10
  SV --> UC1
  SV --> UC2
  SV --> UC3
  SV --> UC4
  SV --> UC5
  
  GV --> UC10
  GV --> UC7
  GV --> UC6
  
  PĐT --> UC10
  PĐT --> UC8
  PĐT --> UC6
  PĐT --> UC9`,

      activity: `flowchart TD
  Start(("🟢 Bắt đầu"))
  Login["🔐 Đăng nhập"]
  CheckRole{"👤 Vai trò?"}
  ViewCourses["📚 Xem danh sách môn"]
  CheckPrereq{"✅ Đủ điều kiện?"}
  Register["📝 Đăng ký môn"]
  CheckCapacity{"🪑 Còn chỗ?"}
  Confirm["✅ Xác nhận đăng ký"]
  SaveDB["💾 Lưu vào CSDL"]
  ShowResult["📋 Hiện kết quả"]
  Reject["❌ Từ chối"]
  End(("🔴 Kết thúc"))
  
  Start --> Login
  Login --> CheckRole
  CheckRole -->|Sinh viên| ViewCourses
  ViewCourses --> CheckPrereq
  CheckPrereq -->|Đạt| CheckCapacity
  CheckPrereq -->|Chưa đạt| Reject
  CheckCapacity -->|Còn| Register
  CheckCapacity -->|Hết| Reject
  Register --> Confirm
  Confirm --> SaveDB
  SaveDB --> ShowResult
  ShowResult --> End
  Reject --> End`,

      sequence: `sequenceDiagram
  actor SV as 🧑‍🎓 Sinh viên
  participant HT as 🖥️ Hệ thống
  participant DB as 🗄️ CSDL
  actor GV as 👨‍🏫 Giảng viên
  
  SV->>HT: Đăng nhập
  HT->>DB: Xác thực
  DB-->>HT: OK
  HT-->>SV: Thành công
  
  SV->>HT: Xem danh sách môn học mở
  HT->>DB: Truy vấn môn học
  DB-->>HT: Danh sách môn
  HT-->>SV: Hiển thị môn học
  
  SV->>HT: Chọn môn đăng ký
  HT->>DB: Kiểm tra tiên quyết
  DB-->>HT: Đủ điều kiện
  HT->>DB: Kiểm tra sĩ số
  DB-->>HT: Còn chỗ
  HT->>DB: Lưu đăng ký
  DB-->>HT: Thành công
  HT-->>SV: Xác nhận đăng ký
  
  Note over GV,DB: Cuối kỳ - Nhập điểm
  GV->>HT: Nhập điểm sinh viên
  HT->>DB: Lưu điểm
  DB-->>HT: OK
  HT-->>SV: Thông báo có điểm mới`,

      class: `classDiagram
  class SinhVien {
    -maSV: String
    -hoTen: String
    -ngaySinh: Date
    -gioiTinh: String
    -diaChi: String
    -email: String
    +dangKyMon()
    +xemDiem()
    +xemTKB()
  }
  
  class MonHoc {
    -maMon: String
    -tenMon: String
    -soTinChi: int
    -moTa: String
    +kiemTraTienQuyet()
  }
  
  class LopHoc {
    -maLop: String
    -tenLop: String
    -siSoToiDa: int
    -phongHoc: String
    -lichHoc: String
    +kiemTraConCho()
  }
  
  class GiangVien {
    -maGV: String
    -hoTen: String
    -hocVi: String
    -chuyenNganh: String
    +nhapDiem()
    +xemDanhSachLop()
  }
  
  class DangKy {
    -maDK: String
    -ngayDK: Date
    -trangThai: String
    +xacNhan()
    +huy()
  }
  
  class Diem {
    -maDiem: String
    -diemGK: float
    -diemCK: float
    -diemTB: float
    +tinhDiemTB()
  }
  
  SinhVien "1" --> "*" DangKy : tạo
  DangKy "*" --> "1" LopHoc : thuộc
  LopHoc "*" --> "1" MonHoc : của
  GiangVien "1" --> "*" LopHoc : phụ trách
  SinhVien "1" --> "*" Diem : có
  Diem "*" --> "1" MonHoc : thuộc`,

      erd: `erDiagram
  SINH_VIEN {
    string ma_sv PK
    string ho_ten
    date ngay_sinh
    string gioi_tinh
    string email
    string lop
  }
  
  MON_HOC {
    string ma_mon PK
    string ten_mon
    int so_tin_chi
    string mo_ta
  }
  
  LOP_HOC {
    string ma_lop PK
    string ma_mon FK
    string ma_gv FK
    int si_so_max
    string phong
    string lich_hoc
  }
  
  GIANG_VIEN {
    string ma_gv PK
    string ho_ten
    string hoc_vi
    string chuyen_nganh
  }
  
  DANG_KY {
    string ma_sv FK
    string ma_lop FK
    date ngay_dk
    string trang_thai
  }
  
  DIEM {
    string ma_sv FK
    string ma_mon FK
    float diem_gk
    float diem_ck
    float diem_tb
  }
  
  SINH_VIEN ||--o{ DANG_KY : "đăng ký"
  LOP_HOC ||--o{ DANG_KY : "có"
  MON_HOC ||--o{ LOP_HOC : "mở"
  GIANG_VIEN ||--o{ LOP_HOC : "dạy"
  SINH_VIEN ||--o{ DIEM : "có"
  MON_HOC ||--o{ DIEM : "thuộc"`,

      state: `stateDiagram-v2
  [*] --> ChuaDangKy
  
  ChuaDangKy --> DaDangKy: SV đăng ký
  DaDangKy --> DaXacNhan: PĐT duyệt
  DaDangKy --> DaHuy: SV hủy đăng ký
  DaXacNhan --> DangHoc: Bắt đầu học kỳ
  DangHoc --> DaThi: Kết thúc môn
  DaThi --> DatMon: Điểm >= 4.0
  DaThi --> RotMon: Điểm < 4.0
  RotMon --> ChuaDangKy: Đăng ký lại
  DatMon --> [*]
  DaHuy --> ChuaDangKy: Đăng ký lại
  
  state DangHoc {
    [*] --> DiemDanh
    DiemDanh --> ThiGiuaKy
    ThiGiuaKy --> HocTiep
    HocTiep --> ThiCuoiKy
  }`,
    },
  },

  ecommerce: {
    name: "Bán hàng online",
    description:
      "Hệ thống bán hàng trực tuyến cho phép khách hàng duyệt sản phẩm, đặt hàng, thanh toán",
    diagrams: {
      usecase: `flowchart LR
  subgraph HệThống["🛒 HỆ THỐNG BÁN HÀNG ONLINE"]
    UC1["🔍 Tìm kiếm sản phẩm"]
    UC2["🛍️ Thêm vào giỏ hàng"]
    UC3["💳 Thanh toán"]
    UC4["📦 Theo dõi đơn hàng"]
    UC5["⭐ Đánh giá sản phẩm"]
    UC6["📋 Quản lý sản phẩm"]
    UC7["📊 Quản lý đơn hàng"]
    UC8["📈 Thống kê doanh thu"]
    UC9["🔐 Đăng nhập/Đăng ký"]
    UC10["🚚 Xử lý giao hàng"]
  end
  
  KH["🧑 Khách hàng"]
  NV["👩‍💼 Nhân viên"]
  QTV["🧑‍💻 Quản trị viên"]
  TT["🏦 Cổng thanh toán"]
  
  KH --> UC9
  KH --> UC1
  KH --> UC2
  KH --> UC3
  KH --> UC4
  KH --> UC5
  
  NV --> UC9
  NV --> UC7
  NV --> UC10
  
  QTV --> UC9
  QTV --> UC6
  QTV --> UC8
  
  UC3 --> TT`,

      activity: `flowchart TD
  Start(("🟢 Bắt đầu"))
  Browse["🔍 Duyệt sản phẩm"]
  AddCart["🛒 Thêm vào giỏ"]
  ViewCart["📋 Xem giỏ hàng"]
  Checkout{"💳 Thanh toán?"}
  Login["🔐 Đăng nhập"]
  EnterAddress["📍 Nhập địa chỉ"]
  SelectPayment["💰 Chọn phương thức"]
  ProcessPayment{"✅ TT thành công?"}
  CreateOrder["📦 Tạo đơn hàng"]
  SendConfirm["📧 Gửi xác nhận"]
  PayFailed["❌ Thanh toán thất bại"]
  End(("🔴 Kết thúc"))
  
  Start --> Browse
  Browse --> AddCart
  AddCart --> ViewCart
  ViewCart --> Checkout
  Checkout -->|Mua| Login
  Checkout -->|Tiếp tục mua| Browse
  Login --> EnterAddress
  EnterAddress --> SelectPayment
  SelectPayment --> ProcessPayment
  ProcessPayment -->|Thành công| CreateOrder
  ProcessPayment -->|Thất bại| PayFailed
  PayFailed --> SelectPayment
  CreateOrder --> SendConfirm
  SendConfirm --> End`,

      sequence: `sequenceDiagram
  actor KH as 🧑 Khách hàng
  participant Web as 🌐 Website
  participant Server as ⚙️ Server
  participant DB as 🗄️ CSDL
  participant Pay as 🏦 Thanh toán
  
  KH->>Web: Tìm kiếm sản phẩm
  Web->>Server: GET /products?q=...
  Server->>DB: Query sản phẩm
  DB-->>Server: Kết quả
  Server-->>Web: Danh sách SP
  Web-->>KH: Hiển thị SP
  
  KH->>Web: Thêm vào giỏ hàng
  Web->>Server: POST /cart
  Server->>DB: Lưu giỏ hàng
  DB-->>Server: OK
  Server-->>Web: Cập nhật giỏ
  
  KH->>Web: Tiến hành thanh toán
  Web->>Server: POST /orders
  Server->>DB: Tạo đơn hàng
  Server->>Pay: Yêu cầu thanh toán
  Pay-->>Server: Xác nhận TT
  Server->>DB: Cập nhật trạng thái
  Server-->>Web: Đơn hàng thành công
  Web-->>KH: Hiển thị xác nhận`,

      class: `classDiagram
  class KhachHang {
    -maKH: String
    -hoTen: String
    -email: String
    -matKhau: String
    -diaChi: String
    +dangKy()
    +dangNhap()
    +datHang()
    +xemDonHang()
  }
  
  class SanPham {
    -maSP: String
    -tenSP: String
    -gia: double
    -moTa: String
    -hinhAnh: String
    -soLuongTon: int
    +capNhatGia()
    +kiemTraTon()
  }
  
  class DonHang {
    -maDH: String
    -ngayDat: Date
    -tongTien: double
    -trangThai: String
    -diaChiGiao: String
    +tinhTongTien()
    +capNhatTrangThai()
  }
  
  class ChiTietDH {
    -soLuong: int
    -donGia: double
    -thanhTien: double
    +tinhThanhTien()
  }
  
  class GioHang {
    -maGH: String
    +themSP()
    +xoaSP()
    +tinhTong()
  }
  
  class ThanhToan {
    -maTT: String
    -phuongThuc: String
    -soTien: double
    -trangThai: String
    -ngayTT: Date
    +xuLyThanhToan()
  }
  
  KhachHang "1" --> "1" GioHang : có
  KhachHang "1" --> "*" DonHang : đặt
  DonHang "1" --> "*" ChiTietDH : chứa
  ChiTietDH "*" --> "1" SanPham : là
  DonHang "1" --> "1" ThanhToan : có
  GioHang "*" --> "*" SanPham : chứa`,

      erd: `erDiagram
  KHACH_HANG {
    string ma_kh PK
    string ho_ten
    string email
    string mat_khau
    string dia_chi
    string sdt
  }
  
  SAN_PHAM {
    string ma_sp PK
    string ten_sp
    float gia
    string mo_ta
    string hinh_anh
    int so_luong_ton
    string danh_muc
  }
  
  DON_HANG {
    string ma_dh PK
    string ma_kh FK
    date ngay_dat
    float tong_tien
    string trang_thai
    string dia_chi_giao
  }
  
  CHI_TIET_DH {
    string ma_dh FK
    string ma_sp FK
    int so_luong
    float don_gia
  }
  
  THANH_TOAN {
    string ma_tt PK
    string ma_dh FK
    string phuong_thuc
    float so_tien
    string trang_thai
    date ngay_tt
  }
  
  KHACH_HANG ||--o{ DON_HANG : "đặt"
  DON_HANG ||--|{ CHI_TIET_DH : "gồm"
  SAN_PHAM ||--o{ CHI_TIET_DH : "có trong"
  DON_HANG ||--|| THANH_TOAN : "thanh toán"`,

      state: `stateDiagram-v2
  [*] --> MoiTao: Khách đặt hàng
  
  MoiTao --> DaXacNhan: NV xác nhận
  MoiTao --> DaHuy: Khách hủy
  DaXacNhan --> DangGiao: Chuyển giao hàng
  DangGiao --> DaGiao: Giao thành công
  DangGiao --> GiaoThatBai: Giao thất bại
  GiaoThatBai --> DangGiao: Giao lại
  GiaoThatBai --> DaHuy: Hủy đơn
  DaGiao --> HoanThanh: KH xác nhận
  DaGiao --> YeuCauDoiTra: KH đổi/trả
  YeuCauDoiTra --> DangDoiTra: NV duyệt
  DangDoiTra --> HoanTien: Hoàn tiền
  HoanThanh --> [*]
  HoanTien --> [*]
  DaHuy --> [*]`,
    },
  },

  cinema: {
    name: "Đặt vé xem phim",
    description:
      "Hệ thống đặt vé xem phim online cho phép khách hàng chọn phim, suất chiếu, ghế và thanh toán",
    diagrams: {
      usecase: `flowchart LR
  subgraph HệThống["🎬 HỆ THỐNG ĐẶT VÉ XEM PHIM"]
    UC1["🎥 Xem lịch chiếu"]
    UC2["💺 Chọn ghế ngồi"]
    UC3["🎟️ Đặt vé"]
    UC4["💳 Thanh toán"]
    UC5["📱 Nhận vé điện tử"]
    UC6["🎞️ Quản lý phim"]
    UC7["📅 Quản lý suất chiếu"]
    UC8["📊 Thống kê doanh thu"]
    UC9["🔐 Đăng nhập"]
    UC10["🍿 Đặt combo bắp nước"]
  end
  
  KH["🧑 Khách hàng"]
  NV["👩‍💼 Nhân viên"]
  QTV["🧑‍💻 Quản trị viên"]
  
  KH --> UC9
  KH --> UC1
  KH --> UC2
  KH --> UC3
  KH --> UC4
  KH --> UC5
  KH --> UC10
  
  NV --> UC9
  NV --> UC3
  NV --> UC7
  
  QTV --> UC9
  QTV --> UC6
  QTV --> UC7
  QTV --> UC8`,

      activity: `flowchart TD
  Start(("🟢 Bắt đầu"))
  SelectMovie["🎥 Chọn phim"]
  SelectShowtime["📅 Chọn suất chiếu"]
  SelectSeats["💺 Chọn ghế"]
  AddCombo["🍿 Thêm combo?"]
  ChooseCombo["🥤 Chọn combo"]
  ShowTotal["💰 Hiển thị tổng tiền"]
  Payment["💳 Thanh toán"]
  PayOK{"✅ Thành công?"}
  GenTicket["🎟️ Tạo vé điện tử"]
  SendEmail["📧 Gửi email"]
  PayFail["❌ Thất bại"]
  End(("🔴 Kết thúc"))
  
  Start --> SelectMovie
  SelectMovie --> SelectShowtime
  SelectShowtime --> SelectSeats
  SelectSeats --> AddCombo
  AddCombo -->|Có| ChooseCombo
  AddCombo -->|Không| ShowTotal
  ChooseCombo --> ShowTotal
  ShowTotal --> Payment
  Payment --> PayOK
  PayOK -->|Có| GenTicket
  PayOK -->|Không| PayFail
  PayFail --> Payment
  GenTicket --> SendEmail
  SendEmail --> End`,

      sequence: `sequenceDiagram
  actor KH as 🧑 Khách hàng
  participant App as 📱 Ứng dụng
  participant Server as ⚙️ Server
  participant DB as 🗄️ CSDL
  participant Pay as 🏦 Thanh toán
  
  KH->>App: Chọn phim & suất chiếu
  App->>Server: GET /showtimes
  Server->>DB: Query suất chiếu
  DB-->>Server: Danh sách suất chiếu
  Server-->>App: Hiển thị suất chiếu
  
  KH->>App: Chọn ghế ngồi
  App->>Server: GET /seats?showtime=...
  Server->>DB: Query ghế trống
  DB-->>Server: Sơ đồ ghế
  Server-->>App: Hiển thị ghế
  
  KH->>App: Xác nhận đặt vé
  App->>Server: POST /bookings
  Server->>DB: Khóa ghế tạm thời
  Server-->>App: Chuyển sang thanh toán
  
  KH->>App: Thanh toán
  App->>Pay: Yêu cầu thanh toán
  Pay-->>App: Thành công
  App->>Server: Xác nhận thanh toán
  Server->>DB: Cập nhật booking
  Server-->>App: Tạo vé điện tử
  App-->>KH: Gửi vé qua email`,

      class: `classDiagram
  class KhachHang {
    -maKH: String
    -hoTen: String
    -email: String
    -soDT: String
    +datVe()
    +huyVe()
    +xemLichSu()
  }
  
  class Phim {
    -maPhim: String
    -tenPhim: String
    -theLoai: String
    -thoiLuong: int
    -daoDien: String
    -moTa: String
    -poster: String
    +layThongTin()
  }
  
  class SuatChieu {
    -maSuat: String
    -ngayChieu: Date
    -gioChieu: Time
    -giaVe: double
    +kiemTraGheTrong()
  }
  
  class PhongChieu {
    -maPhong: String
    -tenPhong: String
    -soGhe: int
    -loaiPhong: String
  }
  
  class GheNgoi {
    -maGhe: String
    -hang: String
    -so: int
    -loaiGhe: String
    +kiemTraTrangThai()
  }
  
  class VeXemPhim {
    -maVe: String
    -ngayDat: Date
    -trangThai: String
    -tongTien: double
    +taoVe()
    +huyVe()
  }
  
  Phim "1" --> "*" SuatChieu : có
  SuatChieu "*" --> "1" PhongChieu : tại
  PhongChieu "1" --> "*" GheNgoi : có
  KhachHang "1" --> "*" VeXemPhim : đặt
  VeXemPhim "*" --> "1" SuatChieu : thuộc
  VeXemPhim "*" --> "*" GheNgoi : chọn`,

      erd: `erDiagram
  KHACH_HANG {
    string ma_kh PK
    string ho_ten
    string email
    string sdt
  }
  
  PHIM {
    string ma_phim PK
    string ten_phim
    string the_loai
    int thoi_luong
    string dao_dien
    string poster
  }
  
  PHONG_CHIEU {
    string ma_phong PK
    string ten_phong
    int so_ghe
    string loai_phong
  }
  
  SUAT_CHIEU {
    string ma_suat PK
    string ma_phim FK
    string ma_phong FK
    date ngay_chieu
    time gio_chieu
    float gia_ve
  }
  
  GHE_NGOI {
    string ma_ghe PK
    string ma_phong FK
    string hang
    int so_ghe
    string loai_ghe
  }
  
  VE_XEM_PHIM {
    string ma_ve PK
    string ma_kh FK
    string ma_suat FK
    date ngay_dat
    float tong_tien
    string trang_thai
  }
  
  CHI_TIET_VE {
    string ma_ve FK
    string ma_ghe FK
  }
  
  KHACH_HANG ||--o{ VE_XEM_PHIM : "đặt"
  PHIM ||--o{ SUAT_CHIEU : "có"
  PHONG_CHIEU ||--o{ SUAT_CHIEU : "tại"
  PHONG_CHIEU ||--|{ GHE_NGOI : "có"
  SUAT_CHIEU ||--o{ VE_XEM_PHIM : "thuộc"
  VE_XEM_PHIM ||--|{ CHI_TIET_VE : "gồm"
  GHE_NGOI ||--o{ CHI_TIET_VE : "là"`,

      state: `stateDiagram-v2
  [*] --> Trong: Ghế trống
  
  Trong --> DangChon: KH chọn ghế
  DangChon --> DaKhoa: Xác nhận đặt
  DangChon --> Trong: KH bỏ chọn
  DaKhoa --> DaDat: Thanh toán OK
  DaKhoa --> Trong: Hết thời gian giữ
  DaDat --> DaSuDung: Check-in
  DaDat --> DaHuy: KH hủy vé
  DaHuy --> Trong: Mở lại ghế
  DaSuDung --> Trong: Hết suất chiếu
  DaSuDung --> [*]`,
    },
  },

  hotel: {
    name: "Quản lý khách sạn",
    description:
      "Hệ thống quản lý khách sạn cho phép đặt phòng, check-in/out, quản lý dịch vụ",
    diagrams: {
      usecase: `flowchart LR
  subgraph HệThống["🏨 HỆ THỐNG QUẢN LÝ KHÁCH SẠN"]
    UC1["🔍 Tìm phòng trống"]
    UC2["📝 Đặt phòng"]
    UC3["🔑 Check-in"]
    UC4["🚪 Check-out"]
    UC5["🍽️ Đặt dịch vụ"]
    UC6["💳 Thanh toán"]
    UC7["🏠 Quản lý phòng"]
    UC8["📊 Thống kê"]
    UC9["🔐 Đăng nhập"]
    UC10["⭐ Đánh giá"]
  end
  
  KH["🧑 Khách hàng"]
  LT["👩‍💼 Lễ tân"]
  QL["🧑‍💻 Quản lý"]
  
  KH --> UC9
  KH --> UC1
  KH --> UC2
  KH --> UC5
  KH --> UC6
  KH --> UC10
  
  LT --> UC9
  LT --> UC3
  LT --> UC4
  LT --> UC2
  LT --> UC7
  
  QL --> UC9
  QL --> UC7
  QL --> UC8`,

      activity: `flowchart TD
  Start(("🟢 Bắt đầu"))
  Search["🔍 Tìm phòng trống"]
  CheckAvail{"📋 Có phòng?"}
  SelectRoom["🏠 Chọn phòng"]
  EnterInfo["📝 Nhập thông tin"]
  Payment["💳 Thanh toán đặt cọc"]
  PayOK{"✅ Thành công?"}
  Confirm["✅ Xác nhận đặt phòng"]
  SendEmail["📧 Gửi xác nhận"]
  NoRoom["❌ Hết phòng"]
  PayFail["❌ TT thất bại"]
  End(("🔴 Kết thúc"))
  
  Start --> Search
  Search --> CheckAvail
  CheckAvail -->|Có| SelectRoom
  CheckAvail -->|Không| NoRoom
  SelectRoom --> EnterInfo
  EnterInfo --> Payment
  Payment --> PayOK
  PayOK -->|Có| Confirm
  PayOK -->|Không| PayFail
  PayFail --> Payment
  Confirm --> SendEmail
  SendEmail --> End
  NoRoom --> End`,

      sequence: `sequenceDiagram
  actor KH as 🧑 Khách hàng
  participant Web as 🌐 Website
  participant HT as ⚙️ Hệ thống
  participant DB as 🗄️ CSDL
  actor LT as 👩‍💼 Lễ tân
  
  KH->>Web: Tìm phòng trống
  Web->>HT: GET /rooms?date=...
  HT->>DB: Query phòng
  DB-->>HT: Danh sách phòng trống
  HT-->>Web: Hiển thị phòng
  
  KH->>Web: Đặt phòng
  Web->>HT: POST /bookings
  HT->>DB: Tạo đặt phòng
  DB-->>HT: OK
  HT-->>Web: Xác nhận
  Web-->>KH: Email xác nhận
  
  Note over KH,LT: Ngày check-in
  KH->>LT: Đến check-in
  LT->>HT: Xác nhận check-in
  HT->>DB: Cập nhật trạng thái
  DB-->>HT: OK
  LT-->>KH: Giao chìa khóa
  
  Note over KH,LT: Ngày check-out
  KH->>LT: Check-out
  LT->>HT: Tính tổng chi phí
  HT->>DB: Query dịch vụ đã dùng
  DB-->>HT: Chi tiết
  HT-->>LT: Hóa đơn tổng
  KH->>LT: Thanh toán
  LT->>HT: Xác nhận thanh toán
  HT->>DB: Cập nhật phòng trống`,

      class: `classDiagram
  class KhachHang {
    -maKH: String
    -hoTen: String
    -cmnd: String
    -soDT: String
    -email: String
    +datPhong()
    +checkIn()
    +checkOut()
  }
  
  class Phong {
    -maPhong: String
    -loaiPhong: String
    -gia: double
    -tang: int
    -trangThai: String
    -moTa: String
    +kiemTraTrong()
    +capNhatTrangThai()
  }
  
  class DatPhong {
    -maDat: String
    -ngayDat: Date
    -ngayNhan: Date
    -ngayTra: Date
    -trangThai: String
    -tongTien: double
    +xacNhan()
    +huy()
    +tinhTien()
  }
  
  class DichVu {
    -maDV: String
    -tenDV: String
    -gia: double
    -moTa: String
    +datDV()
  }
  
  class HoaDon {
    -maHD: String
    -ngayLap: Date
    -tongTien: double
    -trangThai: String
    +tinhTong()
    +xuatHD()
  }
  
  class LeTan {
    -maNV: String
    -hoTen: String
    +checkIn()
    +checkOut()
    +taoHoaDon()
  }
  
  KhachHang "1" --> "*" DatPhong : đặt
  DatPhong "*" --> "1" Phong : cho
  KhachHang "1" --> "*" HoaDon : có
  HoaDon "*" --> "*" DichVu : gồm
  LeTan "1" --> "*" HoaDon : tạo`,

      erd: `erDiagram
  KHACH_HANG {
    string ma_kh PK
    string ho_ten
    string cmnd
    string sdt
    string email
  }
  
  PHONG {
    string ma_phong PK
    string loai_phong
    float gia
    int tang
    string trang_thai
  }
  
  DAT_PHONG {
    string ma_dat PK
    string ma_kh FK
    string ma_phong FK
    date ngay_nhan
    date ngay_tra
    string trang_thai
    float tong_tien
  }
  
  DICH_VU {
    string ma_dv PK
    string ten_dv
    float gia
  }
  
  SU_DUNG_DV {
    string ma_dat FK
    string ma_dv FK
    int so_luong
    date ngay_sd
  }
  
  HOA_DON {
    string ma_hd PK
    string ma_dat FK
    string ma_nv FK
    date ngay_lap
    float tong_tien
  }
  
  NHAN_VIEN {
    string ma_nv PK
    string ho_ten
    string vai_tro
  }
  
  KHACH_HANG ||--o{ DAT_PHONG : "đặt"
  PHONG ||--o{ DAT_PHONG : "được đặt"
  DAT_PHONG ||--o{ SU_DUNG_DV : "sử dụng"
  DICH_VU ||--o{ SU_DUNG_DV : "được dùng"
  DAT_PHONG ||--|| HOA_DON : "có"
  NHAN_VIEN ||--o{ HOA_DON : "lập"`,

      state: `stateDiagram-v2
  [*] --> Trong: Phòng trống
  
  Trong --> DaDat: KH đặt phòng
  DaDat --> DaCheckIn: Check-in
  DaDat --> DaHuy: KH hủy
  DaHuy --> Trong: Mở lại
  DaCheckIn --> DangO: KH ở
  DangO --> DangDonDep: Check-out
  DangDonDep --> Trong: Dọn xong
  DangO --> [*]
  
  state DangO {
    [*] --> BinhThuong
    BinhThuong --> CoYeuCauDV: Đặt dịch vụ
    CoYeuCauDV --> BinhThuong: Phục vụ xong
  }`,
    },
  },
};

export function getTemplate(key: string): Template | null {
  return templates[key] || null;
}

export function getTemplateList(): Array<{
  key: string;
  name: string;
  description: string;
}> {
  return Object.entries(templates).map(([key, tpl]) => ({
    key,
    name: tpl.name,
    description: tpl.description,
  }));
}
