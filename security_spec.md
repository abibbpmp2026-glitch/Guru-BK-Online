# Security Specification — BICARA BK

## 1. Data Invariants
1. **Role Integrity**: No student can self-assign `role: "admin"` or `role: "guru_bk"` on `/users/{userId}` or write to `/staff_roles/{userId}`.
2. **Child Privacy & Chat Confidentiality**: `/chat_sessions` and `/chat_messages` are strictly readable and writable ONLY by `request.auth.uid == resource.data.userId`. Admins and Guru BK cannot read private chat transcripts. Counseling follow-ups require explicit student opt-in via `/counseling_referrals` with `consentGiven == true`.
3. **Strict Schema & Bounds**: Every string has `.size()` bounds, every ID matches `^[a-zA-Z0-9_\-]+$` with length <= 128, and every document enforces `keys().hasAll(...)` and `keys().hasOnly(...)` on creation plus `affectedKeys().hasOnly(...)` on updates.
4. **Temporal Integrity**: `createdAt` and `updatedAt` must equal `request.time`, and `createdAt` / `userId` / `uid` are immutable after creation.
5. **Email Verification**: All authenticated mutations require `request.auth.token.email_verified == true`.
6. **No Blanket Reads**: Every `list` rule evaluates `resource.data` directly without calling `get()`/`exists()` inside `allow list`.

## 2. Dirty Dozen Adversarial Payloads
1. **Self-Role Escalation**: Student creates `/users/{uid}` with `role: "admin"` -> `PERMISSION_DENIED`.
2. **Ghost Field Injection**: User creates `/quiz_results/{id}` with extra field `isBypassed: true` -> `PERMISSION_DENIED`.
3. **Unverified Admin Email Spoof**: Request with `email == "abi.bbpmp2026@gmail.com"` and `email_verified == false` -> `PERMISSION_DENIED`.
4. **Private Chat Transcript Snooping**: Admin attempts `get` or `list` on `/chat_messages/{msgId}` owned by another student -> `PERMISSION_DENIED`.
5. **ID Poisoning**: User creates `/chat_sessions/invalid$id!123` or 500-char ID -> `PERMISSION_DENIED`.
6. **Client Timestamp Tampering**: User creates `/career_explorations/{id}` with backdated `createdAt` -> `PERMISSION_DENIED`.
7. **Orphan Chat Message**: User creates `/chat_messages/{id}` pointing to non-existent `sessionId` -> `PERMISSION_DENIED`.
8. **Cross-Owner Ownership Hijack**: Student updates `/quiz_results/{id}` to change `userId` to another UID -> `PERMISSION_DENIED`.
9. **Unconsented Counseling Referral**: Student creates `/counseling_referrals/{id}` with `consentGiven: false` or `status: "selesai"` -> `PERMISSION_DENIED`.
10. **Terminal Referral Mutation**: Student tries to update `/counseling_referrals/{id}` after `status == "selesai"` -> `PERMISSION_DENIED`.
11. **Unpublished Material Scraping**: Unauthenticated user queries `/materials` where `published == false` -> `PERMISSION_DENIED`.
12. **PII List Scraping**: Authenticated student executes `list` on `/users` -> `PERMISSION_DENIED`.
