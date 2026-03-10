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
