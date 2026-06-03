# Brownfield Discovery

Dùng tài liệu này khi project đã có code sẵn và tài liệu có thể thiếu, cũ, hoặc nằm ngoài cấu trúc chuẩn.

## Khi nào chạy

Với project cũ chưa từng dùng hero-vibe-kit:

```bash
npx hero-vibe-kit init
npx hero-vibe-kit discover
npx hero-vibe-kit doctor
```

`init` cài workflow. `discover` quét repo hiện tại và tạo `docs/BROWNFIELD_DISCOVERY.md` làm bản đồ bằng chứng ban đầu.

## AI phải làm gì sau `discover`

1. Đọc `docs/BROWNFIELD_DISCOVERY.md` trước.
2. Bắt đầu từ phần tóm tắt và danh sách **Đọc tiếp**; không load toàn bộ doc/config đã phát hiện theo mặc định.
3. Chỉ đọc doc/config/code cần cho task path đã chọn, rồi mở rộng context nếu bằng chứng chưa đủ.
4. Ghi nhận kết quả với nhãn độ chắc chắn:
   - **Đã thấy** — quan sát trực tiếp trong file.
   - **Có khả năng** — suy ra từ tên/cấu trúc, chưa chứng minh.
   - **Cần xác nhận** — cần người xác nhận hoặc thiếu ngữ cảnh nghiệp vụ.
5. Với các lần sửa code đầu tiên sau discovery, phân loại request theo router trong [AGENCY_WORKFLOW.md](./AGENCY_WORKFLOW.md). Nếu chạm > 2 file hoặc bất kỳ vùng **Cần xác nhận** nào, xử lý như Standard path: Plan Mode + impact analysis + review sub-agent, kể cả khi User không yêu cầu sub-agent.

## Kỷ luật context

- Không mặc định tài liệu luôn nằm trong `docs/`.
- Không kết luận thiếu docs nghĩa là thiếu hành vi.
- Không kết luận vai trò thư mục chỉ từ tên trước khi đọc file.
- Không nói một lệnh đã pass nếu chưa chạy.
- Không dán trích đoạn source dài vào report; dùng file path, ghi chú bằng chứng ngắn, và link tới artifact.

## Output mong đợi sau lượt đọc đầu tiên của AI

Cập nhật discovery report hoặc tạo report trong `docs/reports/` với cấu trúc tóm tắt trước:

1. **Tóm tắt** — mục đích project, luồng quan trọng, và kiến trúc có khả năng đúng trong 3–6 gạch đầu dòng.
2. **Đọc tiếp** — file/doc/config ưu tiên, mỗi mục có một dòng lý do.
3. **Bản đồ bằng chứng** — path quan trọng và đã thấy gì ở đó.
4. **Lệnh kiểm chứng** — lệnh đã quan sát hoặc đã chứng minh, gắn nhãn rõ.
5. **Rủi ro / chưa rõ** — vùng cần xác nhận trước khi sửa.
6. **Câu hỏi còn mở** — chỉ hỏi những điểm chặn bước tiếp theo an toàn.
