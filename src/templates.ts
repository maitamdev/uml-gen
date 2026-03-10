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
