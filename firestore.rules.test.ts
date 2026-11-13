/**
 * Security Rule Verification Suite — BICARA BK
 * Verifies the 12 Dirty Dozen adversarial payloads defined in security_spec.md
 * against the Firestore rules invariants.
 */

export interface AdversarialCase {
  id: number;
  name: string;
  collection: string;
  operation: 'create' | 'update' | 'get' | 'list';
  expected: 'PERMISSION_DENIED';
  reason: string;
  payload: Record<string, unknown>;
}

export const DIRTY_DOZEN_CASES: AdversarialCase[] = [
  {
    id: 1,
    name: 'Self-Role Escalation',
    collection: 'users/student_1',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    reason: 'Student profile creation enforces incoming().role == "siswa" for non-admins.',
    payload: { uid: 'student_1', role: 'admin', name: 'Siswa Uji', grade: 'VII' }
  },
  {
    id: 2,
    name: 'Ghost Field Injection',
    collection: 'quiz_results/qr_1',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    reason: 'isValidQuizResult enforces strict keys().hasOnly(...) without shadow fields.',
    payload: { id: 'qr_1', userId: 'student_1', isBypassed: true }
  },
  {
    id: 3,
    name: 'Unverified Admin Email Spoof',
    collection: 'staff_roles/spoof_1',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    reason: 'isBootstrappedAdmin() requires request.auth.token.email_verified == true.',
    payload: { uid: 'spoof_1', email: 'abi.bbpmp2026@gmail.com', role: 'admin' }
  },
  {
    id: 4,
    name: 'Private Chat Transcript Snooping',
    collection: 'chat_messages/msg_1',
    operation: 'get',
    expected: 'PERMISSION_DENIED',
    reason: 'chat_messages allows read strictly when existing().userId == request.auth.uid.',
    payload: { sessionId: 'sess_1', userId: 'student_1' }
  },
  {
    id: 5,
    name: 'ID Poisoning',
    collection: 'chat_sessions/invalid$id!123',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    reason: 'isValidId() rejects non-alphanumeric/dash/underscore IDs and >128 chars.',
    payload: { id: 'invalid$id!123', userId: 'student_1' }
  },
  {
    id: 6,
    name: 'Client Timestamp Tampering',
    collection: 'career_explorations/exp_1',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    reason: 'Rule mandates incoming().createdAt == request.time.',
    payload: { id: 'exp_1', createdAt: '2020-01-01T00:00:00Z' }
  },
  {
    id: 7,
    name: 'Orphan Chat Message',
    collection: 'chat_messages/msg_orphan',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    reason: 'Rule verifies exists(/chat_sessions/$(incoming().sessionId)) and owner match.',
    payload: { id: 'msg_orphan', sessionId: 'nonexistent_session', userId: 'student_1' }
  },
  {
    id: 8,
    name: 'Cross-Owner Ownership Hijack',
    collection: 'quiz_results/qr_1',
    operation: 'update',
    expected: 'PERMISSION_DENIED',
    reason: 'Rule mandates incoming().userId == existing().userId and affectedKeys allowlist.',
    payload: { userId: 'other_student' }
  },
  {
    id: 9,
    name: 'Unconsented Counseling Referral',
    collection: 'counseling_referrals/ref_1',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    reason: 'Rule enforces incoming().consentGiven == true and status == "menunggu".',
    payload: { id: 'ref_1', consentGiven: false, status: 'selesai' }
  },
  {
    id: 10,
    name: 'Terminal Referral Mutation',
    collection: 'counseling_referrals/ref_done',
    operation: 'update',
    expected: 'PERMISSION_DENIED',
    reason: 'Once status == "selesai", non-admin updates are blocked.',
    payload: { status: 'menunggu' }
  },
  {
    id: 11,
    name: 'Unpublished Material Scraping',
    collection: 'materials',
    operation: 'list',
    expected: 'PERMISSION_DENIED',
    reason: 'allow list mandates existing().published == true || isCounselorOrAdmin().',
    payload: { published: false }
  },
  {
    id: 12,
    name: 'PII List Scraping',
    collection: 'users',
    operation: 'list',
    expected: 'PERMISSION_DENIED',
    reason: 'allow list on /users requires isCounselorOrAdmin().',
    payload: {}
  }
];
