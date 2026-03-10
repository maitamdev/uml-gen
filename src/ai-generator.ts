// ============================================
// AI Diagram Generator - Multi-Provider (Groq / Hugging Face)
// ============================================

// ---- Provider Configuration ----
export type ProviderType = 'groq' | 'huggingface';

interface ProviderConfig {
  name: string;
  apiUrl: string;
  model: string;
  modelsUrl: string;
  keyPlaceholder: string;
  keyLink: string;
  keyLinkText: string;
}

const PROVIDERS: Record<ProviderType, ProviderConfig> = {
  groq: {
    name: 'Groq',
    apiUrl: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.3-70b-versatile',
    modelsUrl: 'https://api.groq.com/openai/v1/models',
    keyPlaceholder: 'gsk_xxxxxxxxxxxx',
    keyLink: 'https://console.groq.com/keys',
    keyLinkText: 'console.groq.com',
  },
  huggingface: {
    name: 'Hugging Face',
    apiUrl: 'https://router.huggingface.co/v1/chat/completions',
    model: 'Qwen/Qwen2.5-72B-Instruct',
    modelsUrl: 'https://router.huggingface.co/v1/models',
    keyPlaceholder: 'hf_xxxxxxxxxxxx',
    keyLink: 'https://huggingface.co/settings/tokens',
    keyLinkText: 'huggingface.co/settings/tokens',
  },
};

// ---- API Key & Provider Management ----
const STORAGE_KEY = 'uml-gen-api-key';
const PROVIDER_STORAGE_KEY = 'uml-gen-provider';

export function getApiKey(): string {
  return localStorage.getItem(STORAGE_KEY) || '';
}

export function setApiKey(key: string): void {
  localStorage.setItem(STORAGE_KEY, key.trim());
}

export function getProvider(): ProviderType {
  return (localStorage.getItem(PROVIDER_STORAGE_KEY) as ProviderType) || 'huggingface';
}

export function setProvider(provider: ProviderType): void {
  localStorage.setItem(PROVIDER_STORAGE_KEY, provider);
}

export function getProviderConfig(): ProviderConfig {
  return PROVIDERS[getProvider()];
}

export async function checkProviderStatus(): Promise<boolean> {
  const apiKey = getApiKey();
  if (!apiKey) return false;
  
  const config = getProviderConfig();
  
  try {
    const response = await fetch(config.modelsUrl, {
      headers: { 'Authorization': `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}


// ---- Prompts ----
const SYSTEM_PROMPT = `Bạn là chuyên gia phân tích và thiết kế hệ thống phần mềm UML.

QUY TẮC TUYỆT ĐỐI PHẢI TUÂN THỦ:
1. CHỈ trả về code Mermaid thuần túy. KHÔNG giải thích, KHÔNG markdown, KHÔNG \`\`\`, KHÔNG text nào khác.
2. Dùng TIẾNG VIỆT cho tất cả tên, nhãn, mô tả.
3. Sơ đồ phải RÕ RÀNG, GỌN, DỄ ĐỌC — tránh quá nhiều đường nối chồng chéo.
4. Ưu tiên đọc hiểu hơn là đầy đủ — nếu hệ thống phức tạp, chọn các use case/flow CHÍNH.
5. ID node phải ngắn gọn: A1, B1, UC1... KHÔNG dùng tên dài làm ID.
6. KHÔNG dùng ký tự đặc biệt trong ID node (chỉ dùng chữ cái, số, gạch dưới).`;

// ---- Analysis Prompts (Text explanations) ----
const ANALYSIS_SYSTEM_PROMPT = `Bạn là chuyên gia phân tích và thiết kế hệ thống phần mềm (Software Engineering).
Bạn sẽ phân tích đề bài và trả lời bằng TIẾNG VIỆT, định dạng Markdown.

QUY TẮC:
1. Trả lời có cấu trúc rõ ràng, dùng heading ##, ###, bảng, danh sách.
2. Dùng TIẾNG VIỆT hoàn toàn.
3. Phân tích phải CHÍNH XÁC, CHUYÊN NGHIỆP, đúng chuẩn UML/Software Engineering.
4. Nội dung phải PHÙ HỢP với sơ đồ sẽ được vẽ — tức là phân tích này là BÀI GIẢI kèm theo sơ đồ.
5. Viết ngắn gọn, súc tích, tránh lan man. Tập trung vào phân tích kỹ thuật.`;

const ANALYSIS_PROMPTS: Record<string, string> = {
  usecase: `Phân tích Use Case cho hệ thống được mô tả. Trả về BÀI PHÂN TÍCH có cấu trúc sau:

## 1. Xác định các Actor
Liệt kê từng actor, mô tả vai trò ngắn gọn bằng bảng:
| STT | Actor | Mô tả vai trò |
|-----|-------|---------------|

## 2. Xác định các Use Case chính
Liệt kê từng use case, actor liên quan, và mô tả ngắn bằng bảng:
| STT | Use Case | Actor liên quan | Mô tả |
|-----|----------|-----------------|-------|

## 3. Mối quan hệ giữa Actor và Use Case
Mô tả từng actor tương tác với những use case nào, theo dạng:
- **Actor A**: UC1, UC2, UC3
- **Actor B**: UC4, UC5

## 4. Quan hệ Include và Extend
Nếu có quan hệ include/extend, liệt kê bằng bảng:
| Loại quan hệ | Use Case gốc | Use Case liên quan | Giải thích |
|--------------|--------------|--------------------|-----------|

Giải thích ngắn gọn tại sao dùng include (bắt buộc thực hiện) hoặc extend (tùy chọn, có điều kiện).

## 5. Tổng kết
Tóm tắt ngắn 2-3 câu về hệ thống.`,

  activity: `Phân tích Activity Diagram (Sơ đồ hoạt động) cho hệ thống được mô tả. Trả về BÀI PHÂN TÍCH có cấu trúc sau:

## 1. Xác định quy trình chính
Chọn 1 quy trình nghiệp vụ quan trọng nhất của hệ thống (ví dụ: quy trình mượn sách, quy trình đặt hàng...) và giải thích tại sao chọn quy trình này.

## 2. Các bước trong quy trình
Liệt kê tuần tự các bước xử lý bằng bảng:
| Bước | Tên hoạt động | Mô tả chi tiết | Actor thực hiện |
|------|---------------|----------------|----------------|

## 3. Các điểm quyết định (Decision Points)
Liệt kê các điều kiện rẽ nhánh:
| Điểm quyết định | Điều kiện | Nhánh Đúng (Yes) | Nhánh Sai (No) |
|-----------------|-----------|-------------------|----------------|

## 4. Luồng xử lý
Mô tả luồng chính (happy path) từ đầu đến cuối bằng ký hiệu mũi tên:
Bắt đầu → Bước 1 → Bước 2 → Điều kiện? → [Có] Bước 3 → Kết thúc

Nếu có luồng ngoại lệ (exception flow), mô tả ngắn gọn.

## 5. Tổng kết
Tóm tắt quy trình, nhận xét về độ phức tạp và các điểm cần lưu ý.`,

  sequence: `Phân tích Sequence Diagram (Sơ đồ tuần tự) cho hệ thống được mô tả. Trả về BÀI PHÂN TÍCH có cấu trúc sau:

## 1. Kịch bản tương tác
Chọn 1 kịch bản sử dụng cụ thể quan trọng nhất (ví dụ: "Sinh viên mượn sách", "Khách hàng đặt hàng") và mô tả ngắn gọn kịch bản.

## 2. Các đối tượng tham gia (Participants)
Liệt kê bằng bảng:
| STT | Đối tượng | Loại (Actor/System/Database) | Vai trò trong kịch bản |
|-----|-----------|------------------------------|----------------------|

## 3. Luồng tương tác chi tiết
Mô tả từng message theo thứ tự thời gian bằng bảng:
| STT | Từ | Đến | Message | Loại (Request/Response) | Mô tả |
|-----|-----|-----|---------|------------------------|-------|

## 4. Xử lý điều kiện (Alt/Opt)
Nếu có, mô tả các trường hợp rẽ nhánh:
- **Trường hợp 1 (alt)**: Điều kiện → Hành động
- **Trường hợp 2 (else)**: Điều kiện → Hành động

## 5. Tổng kết
Tóm tắt luồng tương tác, số lượng message, nhận xét.`,

  class: `Phân tích Class Diagram (Sơ đồ lớp) cho hệ thống được mô tả. Trả về BÀI PHÂN TÍCH có cấu trúc sau:

## 1. Xác định các lớp (Classes)
Liệt kê bằng bảng:
| STT | Tên lớp | Mô tả | Vai trò trong hệ thống |
|-----|---------|-------|----------------------|

## 2. Thuộc tính của từng lớp
Cho mỗi lớp, liệt kê thuộc tính:

### Lớp [Tên]
| Thuộc tính | Kiểu dữ liệu | Phạm vi truy cập | Mô tả |
|-----------|---------------|-------------------|-------|

## 3. Phương thức của từng lớp
Cho mỗi lớp, liệt kê phương thức chính:

### Lớp [Tên]
| Phương thức | Tham số | Kiểu trả về | Mô tả |
|------------|---------|-------------|-------|

## 4. Quan hệ giữa các lớp
Liệt kê bằng bảng:
| Lớp A | Quan hệ | Lớp B | Bản số (Multiplicity) | Mô tả |
|-------|---------|-------|----------------------|-------|

Các loại quan hệ: Association (liên kết), Aggregation (tập hợp), Composition (hợp thành), Inheritance (kế thừa), Dependency (phụ thuộc).

## 5. Tổng kết
Tóm tắt kiến trúc lớp, nhận xét về thiết kế.`,

  erd: `Phân tích ERD (Entity Relationship Diagram) cho hệ thống được mô tả. Trả về BÀI PHÂN TÍCH:

## 1. Xác định các thực thể (Entities)
| STT | Thực thể | Mô tả |

## 2. Thuộc tính của từng thực thể
Cho mỗi thực thể, liệt kê thuộc tính, khóa chính (PK), khóa ngoại (FK).

## 3. Mối quan hệ giữa các thực thể
| Thực thể A | Quan hệ | Thực thể B | Bản số | Mô tả |

## 4. Tổng kết
Nhận xét về mô hình dữ liệu.`,

  state: `Phân tích State Diagram (Sơ đồ trạng thái) cho hệ thống. Trả về BÀI PHÂN TÍCH:

## 1. Đối tượng được phân tích
Chọn 1 đối tượng chính và giải thích.

## 2. Các trạng thái
| STT | Trạng thái | Mô tả | Trạng thái đầu/cuối? |

## 3. Các chuyển đổi trạng thái
| Từ trạng thái | Sự kiện/Điều kiện | Đến trạng thái |

## 4. Tổng kết`,

  component: `Phân tích Component Diagram cho hệ thống. Trả về BÀI PHÂN TÍCH:

## 1. Các tầng kiến trúc (Layers)
## 2. Các component trong mỗi tầng
## 3. Interface/API giữa các tầng
## 4. Tổng kết`,

  deployment: `Phân tích Deployment Diagram cho hệ thống. Trả về BÀI PHÂN TÍCH:

## 1. Các node vật lý (Server, Client)
## 2. Component trên mỗi node
## 3. Kết nối giữa các node (protocol)
## 4. Tổng kết`,

  dfd: `Phân tích Data Flow Diagram (DFD) Level 0 cho hệ thống. Trả về BÀI PHÂN TÍCH:

## 1. External Entities (Thực thể bên ngoài)
## 2. Processes (Tiến trình)
## 3. Data Stores (Kho dữ liệu)
## 4. Data Flows (Luồng dữ liệu)
## 5. Tổng kết`,

  gantt: `Phân tích và lập kế hoạch Gantt Chart cho dự án. Trả về BÀI PHÂN TÍCH:

## 1. Các giai đoạn dự án
## 2. Công việc trong mỗi giai đoạn
| Giai đoạn | Công việc | Thời gian | Phụ thuộc |
## 3. Timeline tổng quan
## 4. Tổng kết`
};

const DIAGRAM_PROMPTS: Record<string, string> = {
  usecase: `Tạo Use Case Diagram bằng Mermaid flowchart LR.

QUY TẮC BỐ CỤC (RẤT QUAN TRỌNG - tuân thủ nghiêm ngặt):
1. Dùng flowchart LR
2. Đặt TẤT CẢ các Actor ở BÊN TRÁI, mỗi actor khai báo trên 1 dòng riêng với emoji:
   A1["👤 Tên Actor 1"]
   A2["👨‍⚕️ Tên Actor 2"]
3. Tạo 1 subgraph DUY NHẤT chứa tất cả use case:
   subgraph SYS["🏥 Tên Hệ Thống"]
4. Mỗi use case dùng ID ngắn và emoji:
   UC1["📝 Tên chức năng"]
5. Nối: A1 --> UC1
6. GIỚI HẠN: Tối đa 8-10 use case chính, 3-5 actor. KHÔNG liệt kê quá nhiều.
7. Nếu 1 actor có nhiều use case, nhóm các use case liên quan lại gần nhau trong subgraph.
8. KHÔNG dùng subgraph lồng nhau.
9. Cuối cùng đóng subgraph: end`,

  activity: `Tạo Activity Diagram bằng Mermaid flowchart TD cho LUỒNG XỬ LÝ CHÍNH của hệ thống.

QUY TẮC:
1. Dùng flowchart TD
2. Node bắt đầu: S(("🟢 Bắt đầu"))
3. Node kết thúc: E(("🔴 Kết thúc"))
4. Bước xử lý: B1["📝 Mô tả bước"]
5. Điều kiện: C1{"❓ Điều kiện?"}
6. Nối tuần tự: S --> B1 --> B2 --> C1
7. Rẽ nhánh từ điều kiện: C1 -->|Có| B3 và C1 -->|Không| B4
8. GIỚI HẠN: Tối đa 10-12 node, 1-2 điều kiện rẽ nhánh.
9. Chọn 1 quy trình nghiệp vụ CHÍNH (ví dụ: quy trình khám bệnh, quy trình đặt hàng...) — KHÔNG vẽ toàn bộ hệ thống.
10. Luồng phải có hướng đi rõ ràng từ trên xuống dưới, KHÔNG quay ngược lên.`,

  sequence: `Tạo Sequence Diagram bằng Mermaid sequenceDiagram cho 1 tình huống sử dụng CHÍNH.

QUY TẮC:
1. Dùng sequenceDiagram
2. Khai báo actor/participant:
   actor BN as 👤 Bệnh nhân
   participant HT as 🖥️ Hệ thống
   participant DB as 🗄️ CSDL
3. Message request: BN->>HT: Nội dung
4. Message response: HT-->>BN: Kết quả
5. Dùng activate/deactivate cho participant đang xử lý
6. Dùng Note over để ghi chú quan trọng
7. Dùng alt/else cho điều kiện (tối đa 1-2 block)
8. GIỚI HẠN: Tối đa 4-5 participant, 10-15 message.
9. Chọn 1 kịch bản cụ thể (ví dụ: "Đặt lịch khám", "Thanh toán") — KHÔNG vẽ toàn bộ.`,

  class: `Tạo Class Diagram bằng Mermaid classDiagram.

QUY TẮC:
1. Dùng classDiagram
2. Mỗi class có 2-4 thuộc tính chính và 1-3 phương thức chính:
   class TenLop {
     -int id
     -String ten
     +getTen() String
     +capNhat() void
   }
3. Quan hệ:
   LopCha <|-- LopCon : kế thừa
   LopA "1" --> "*" LopB : chứa
   LopA o-- LopB : tập hợp
4. GIỚI HẠN: Tối đa 6-8 class chính.
5. Đặt tên class bằng tiếng Việt KHÔNG DẤU hoặc tiếng Anh ngắn gọn (ví dụ: BenhNhan, BacSi, HoaDon).
6. KHÔNG dùng ký tự đặc biệt hay khoảng trắng trong tên class.`,

  erd: `Tạo ERD bằng Mermaid erDiagram.

QUY TẮC:
1. Dùng erDiagram
2. Mỗi entity có 3-5 thuộc tính chính:
   BENH_NHAN {
     int ma_bn PK
