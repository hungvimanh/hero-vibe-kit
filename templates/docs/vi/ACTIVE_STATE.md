# Project Active State

**Last Updated:** {{DATE}}
**Current Global Phase:** 0 — Initialization & Setup

> 📌 **Bảng "Active Features" dưới đây LÀ backlog bền vững xuyên session.** Đây là nguồn trạng thái chính khi resume.
> `TaskCreate`/`TaskList` chỉ sống **trong session hiện tại** (in-memory, mất khi đóng session) — chỉ dùng để theo dõi việc đang làm, KHÔNG dùng làm backlog dài hạn. Mỗi khi trạng thái một feature đổi → cập nhật bảng này và (nếu có) GitLab MR/issue tương ứng.

## Active Features in Pipeline

| Feature / Epic | Path | Phase hiện tại | Branch / MR | Status | PRD | TDD |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| N/A | N/A | N/A | - | Idle | - | - |

## Blockers / Pending Actions
- Chờ Product Owner đề xuất feature/ý tưởng đầu tiên.
- Chốt tech stack → điền placeholder trong [DEFINITION_OF_DONE.md](./DEFINITION_OF_DONE.md).
- Chốt design direction → cập nhật [TEAM_ROSTER.md](./TEAM_ROSTER.md) §4.

## Kỷ luật ngân sách context
File này là chỉ mục, không phải báo cáo. Giữ đủ ngắn để đọc ở đầu session.

Chỉ giữ ở đây:
- mục tiêu active và phase/status hiện tại,
- blocker đang mở và hành động tiếp theo,
- quyết định vẫn ảnh hưởng đến việc hiện tại,
- link tới PRD, TDD, report, MR, issue hoặc ghi chú đã archive.

Không dán ghi chú điều tra dài, transcript, ảnh chụp màn hình, log, PRD, hoặc report đã hoàn tất vào đây. Tóm tắt trong 1–2 dòng và link tới nguồn. Khi việc không còn active, archive chi tiết bền vững vào `docs/reports/` (hoặc artifact path chuẩn) và thay entry bằng link ngắn nếu agent sau có thể cần.

## Session Resume Protocol
*AI bắt đầu hoặc resume tracked work ĐỌC mục này:*
1. Đọc [AGENCY_WORKFLOW.md](./AGENCY_WORKFLOW.md) (SSOT) để nắm router & path.
2. Chỉ đọc [ARTIFACTS_AND_STORAGE.md](./ARTIFACTS_AND_STORAGE.md) nếu cần nơi lưu PRD, TDD, report, design asset, hoặc help content.
3. Xem bảng "Active Features" ở trên + các **GitLab MR đang mở** (`git branch`, MR list) — KHÔNG dựa vào TaskList của session cũ (đã mất).
4. Theo path & phase của từng feature:
   - **Read-only/Fast**: tiếp tục/hoàn tất rồi mở MR.
   - **Standard/Full ở Phase 1–2**: tiếp tục brainstorming/planning với User (qua Plan Mode gate).
   - **Standard/Full ở Phase 3–4**: chỉ mở PRD/TDD/report đã link và cần cho bước hiện tại, kiểm tra trạng thái code & branch, tái tạo task bằng `TaskCreate`, hỏi User trước khi resume code/test.
5. Cập nhật bảng này khi durable work state thay đổi.
