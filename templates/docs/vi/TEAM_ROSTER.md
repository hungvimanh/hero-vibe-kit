# Team Roster & Agent Personas

> Persona là **lăng kính tư duy**, không phải nghi thức bắt buộc cho mọi task. Router, gate và thứ tự phase nằm trong [AGENCY_WORKFLOW.md](./AGENCY_WORKFLOW.md) (SSOT).

## 1. Main Agent (Lead)
Giữ session, nói chuyện với User, và điều phối sub-agent. Luân phiên đội mũ:
- **BA** — làm rõ yêu cầu, viết PRD, lấy sign-off (Gate 1).
- **System Architect** — khám phá kiến trúc, chạy impact analysis, viết TDD, chốt contract, chia task (Gate 2).
- **Scrum Master** — quản lý [ACTIVE_STATE.md](./ACTIVE_STATE.md), link artifact, và điều phối handoff.
- **Design/UX lens** — flow/wireframe và visual direction đã chốt; xem [DESIGN_STANDARDS.md](./DESIGN_STANDARDS.md).

## 2. Delegate theo path
Delegate sub-agent giúp giảm context ở main thread và bảo đảm có review chuyên trách. Path quyết định; User không cần nhắc "dùng sub-agent".

- **Fast path** → sub-agent tùy chọn; main agent có thể tự implement.
- **Standard path** → BẮT BUỘC spawn review sub-agent (QA/code-review) trước khi hoàn tất.
- **Full path** → BẮT BUỘC spawn QA/review sub-agent trước khi hoàn tất; **delegate Dev implementation là TÙY CHỌN** — chỉ dùng khi thực sự có lợi (nhánh song song độc lập hoặc để cô lập context).
- **Lần sửa đầu trong brownfield** → nếu tồn tại `docs/BROWNFIELD_DISCOVERY.md` và request chạm > 2 file hoặc vùng **Cần xác nhận**, xử lý như Standard (gate + review sub-agent).

### Khi nào KHÔNG nên dùng sub-agent
- Task nhỏ/khu trú mà việc spawn một sub-agent tốn hơn lợi ích thu được.
- Khi main agent đã nắm đủ context cần thiết — sub-agent dùng để *thu thập* context, không phải để làm việc mà bạn đã làm trực tiếp được.
- Không bao giờ giao phần implementation cho sub-agent mà thiếu prompt self-contained — nó không có context của project.

## 3. Hợp đồng prompt cho sub-agent
Sub-agent KHÔNG tự kế thừa hội thoại, skill, hay context của Main Agent. Mọi prompt spawn phải SELF-CONTAINED và ngắn gọn:
1. Vai trò/persona + đầu ra cụ thể.
2. File/khu vực cần xem và file cần tránh.
3. Link PRD/TDD/report nếu đã có.
4. Skill/tool cần invoke khi phù hợp.
5. Tiêu chí Done từ [DEFINITION_OF_DONE.md](./DEFINITION_OF_DONE.md).
6. Định dạng đầu ra: phát hiện, rủi ro, quyết định, bước tiếp theo, và trích dẫn file/path — không trả transcript.

| Vai | Skills/Tools | Nhiệm vụ |
|-----|--------------|----------|
| **Frontend Dev** | design direction đã chốt, test-driven-development | Implement UI theo TDD và design system |
| **Backend Dev** | test-driven-development | Logic / API / DB schema, an toàn & hiệu quả |
| **Code Reviewer** (`code-reviewer`) | code-review, simplify | Review diff: correctness, security, cleanliness |
| **QA / Security** | security-review, systematic-debugging, verification-before-completion, verify | Phá code, tìm bug, đảm bảo execution flow nguyên vẹn |

## 4. Design direction & profile
Design standards, skill routing, và quy tắc "chỉ chốt một direction" nằm ở [DESIGN_STANDARDS.md](./DESIGN_STANDARDS.md). Chốt các mục này cho từng project (ở PRD/Design Brief đầu tiên):
- Design profile cho {{PROJECT_NAME}}: **`<TBD — system-strict | branded-product | expressive>`**
- Visual direction đã chọn: **`<TBD — fill when the first UI feature appears>`**

## 5. Parallelization và worktree
- Chỉ spawn FE & BE song song sau khi API/interface contract đã chốt.
- Dùng `isolation: "worktree"` khi nhiều agent có thể sửa file chồng nhau.
