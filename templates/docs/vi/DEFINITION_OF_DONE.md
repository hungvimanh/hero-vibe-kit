# Definition of Done (DoD)

> Tiêu chí hoàn thành **đo được**. Một thay đổi chỉ được coi là "xong" khi thỏa DoD của path tương ứng. Path do [AGENCY_WORKFLOW.md §1](./AGENCY_WORKFLOW.md#1-bảng-phân-loại-task--workflow-router) quyết định.

## ⚙️ Placeholder cần điền khi chốt tech stack
Stack chưa chốt — điền các giá trị sau ở PRD/TDD đầu tiên rồi cập nhật file này:

| Biến | Giá trị | Ví dụ |
|------|---------|-------|
| `<TEST_CMD>` | lệnh chạy test | `npm test` / `pytest` |
| `<LINT_CMD>` | lệnh lint + format check | `npm run lint` / `ruff check .` |
| `<BUILD_CMD>` | lệnh build | `npm run build` / `—` |
| `<COVERAGE_MIN>` | ngưỡng coverage tối thiểu | `80%` |
| `<TYPECHECK_CMD>` | type check (nếu có) | `tsc --noEmit` / `mypy .` |

---

## Checklist theo path

### Read-only (Q&A / Explain)
- [ ] Trả lời đúng trọng tâm câu hỏi.
- [ ] Có trích dẫn `file:line` cho mọi khẳng định về code.
- [ ] Không tạo branch / không commit / không sửa file.

### Fast path (Chore / Docs / Config / Bugfix nhỏ / Hotfix)
- [ ] Đúng tiền tố branch ([BRANCHING.md](./BRANCHING.md)).
- [ ] `<TEST_CMD>` xanh · `<LINT_CMD>` xanh · `<BUILD_CMD>` xanh.
- [ ] **Bugfix/Hotfix:** có test tái hiện bug, đã chuyển từ ĐỎ → XANH; regression suite không hỏng.
- [ ] **Chore/Docs:** không thay đổi hành vi runtime.
- [ ] Commit theo Conventional Commits; MR mô tả ngắn gọn *what + why*.
- [ ] Đã chạy `gitnexus_detect_changes` (khi đã có code) — phạm vi đúng dự kiến.
- [ ] Đạt các kiểm tra security/performance nhẹ áp dụng: không commit secret mới, không gây hồi quy rõ rệt / N+1 ([SECURITY_STANDARDS.md](./SECURITY_STANDARDS.md), [PERFORMANCE_STANDARDS.md](./PERFORMANCE_STANDARDS.md)).

### Standard path (Sửa logic / Refactor)
Bao gồm toàn bộ Fast path, cộng thêm:
- [ ] Đã qua **Gate** (Plan Mode) và User đã duyệt cách tiếp cận.
- [ ] `gitnexus_impact` (upstream) đã chạy & **blast radius + mức rủi ro được báo cáo**; rủi ro HIGH/CRITICAL đã được User chấp thuận.
- [ ] `<TYPECHECK_CMD>` xanh (nếu áp dụng).
- [ ] **Refactor:** cùng bộ test pass trước & sau (hành vi không đổi); rename dùng `gitnexus_rename`, không find-replace tay.
- [ ] **Sửa logic:** regression test cũ còn xanh + có test mới cho hành vi mới.
- [ ] QA sub-agent đã review (`code-review`); `security-review` nếu chạm bề mặt nhạy cảm.
- [ ] Đạt kiểm tra security/performance Standard: input validation cho boundary đã chạm, authz nếu chạm quyền, bench trước/sau cho hot-path, giữ prompt caching AI khi liên quan ([SECURITY_STANDARDS.md](./SECURITY_STANDARDS.md), [PERFORMANCE_STANDARDS.md](./PERFORMANCE_STANDARDS.md)).
- [ ] **Nếu thay đổi có UI:** đáp ứng checklist "Thiết kế / Công việc UI" bên dưới.

### Full path (Feature mới)
Bao gồm toàn bộ Standard path, cộng thêm:
- [ ] **PRD** đã được duyệt (Gate 1) và có link trong ACTIVE_STATE.
- [ ] **TDD** đã được duyệt (Gate 2): có threat model nhẹ + API/interface contract.
- [ ] Coverage ≥ `<COVERAGE_MIN>` cho code mới.
- [ ] Đáp ứng toàn bộ acceptance criteria trong PRD.
- [ ] `security-review` đã chạy, không có finding mới chưa xử lý.
- [ ] Security standards mức Full pass; feature AI có ca lạm dụng OWASP LLM Top 10 ([SECURITY_STANDARDS.md](./SECURITY_STANDARDS.md)).
- [ ] Performance standards mức Full pass; feature AI đạt token/latency ceiling và có số đo luồng chính ([PERFORMANCE_STANDARDS.md](./PERFORMANCE_STANDARDS.md)).
- [ ] **Handover:** CLAUDE.md cập nhật quyết định kiến trúc mới (nếu có); retro 3 dòng đã ghi; ghi chú Serena tùy chọn cập nhật dạng con trỏ; task `completed` + ACTIVE_STATE cập nhật.
- [ ] **Nếu thay đổi có UI:** đáp ứng checklist "Thiết kế / Công việc UI" bên dưới.

### Thiết kế / Công việc UI (áp dụng mỗi khi thay đổi có UI — Standard/Full)
- [ ] Design profile + một visual direction đã chốt và được tuân theo ([DESIGN_STANDARDS.md](./DESIGN_STANDARDS.md)).
- [ ] Visual QA checklist pass: responsive, a11y AA, không hardcode giá trị thiết kế, đầy đủ states, nguồn token chung cho web+mobile, asset DoD/budget khi liên quan.
- [ ] Entry trợ giúp/hướng dẫn trong sản phẩm tồn tại và chính xác khi thay đổi ảnh hưởng user.
- [ ] Bằng chứng Visual QA đã ghi lại (`reports/.../design-qa.md`).

---

## Quy tắc bất biến (mọi path)
1. **Không claim "đã xong/đã pass" mà chưa chạy lệnh kiểm chứng** — bằng chứng trước, khẳng định sau (`verification-before-completion`).
2. **Test phải thực sự kiểm thử hành vi**, không phải test rỗng/mock toàn bộ để qua cho có.
3. **ACTIVE_STATE.md được cập nhật** khi trạng thái công việc đổi.
