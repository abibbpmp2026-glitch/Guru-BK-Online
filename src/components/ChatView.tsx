import { useEffect, useMemo, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Check,
  Copy,
  History,
  MessageCircle,
  Plus,
  Send,
  ShieldCheck,
  Trash2,
  UserCheck,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

const STARTER_PROMPTS = [
  'Aku belum tahu cita-citaku, bagaimana?',
  'Bagaimana cara mengetahui minat dan bakatku?',
  'Apa perbedaan SMA dan SMK?',
  'Aku kesulitan belajar matematika, apa yang harus kulakukan?',
  'Bagaimana cara menghadapi teman yang suka mengejek?',
  'Profesi apa yang cocok untuk orang yang suka menggambar?',
  'Bagaimana mempersiapkan diri masuk SMA?',
];

export function ChatView() {
  const {
    profile,
    chatSessions,
    chatMessages,
    createChatSession,
    appendChatMessage,
    deleteChatSession,
    submitCounselingReferral,
  } = useApp();

  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [historyOpenMobile, setHistoryOpenMobile] = useState(false);

  // Explicit-consent counseling referral modal
  const [referralModalOpen, setReferralModalOpen] = useState(false);
  const [referralTopic, setReferralTopic] = useState('');
  const [referralSummary, setReferralSummary] = useState('');
  const [referralConsent, setReferralConsent] = useState(false);
  const [referralStatus, setReferralStatus] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeSessionId && chatSessions.length > 0) {
      setActiveSessionId(chatSessions[0].id);
    } else if (activeSessionId && !chatSessions.some((s) => s.id === activeSessionId)) {
      setActiveSessionId(chatSessions[0]?.id || null);
    }
  }, [chatSessions, activeSessionId]);

  const activeMessages = useMemo(() => {
    if (!activeSessionId) return [];
    return chatMessages.filter((m) => m.sessionId === activeSessionId);
  }, [chatMessages, activeSessionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages.length, isSending]);

  const handleNewConversation = () => {
    setActiveSessionId(null);
    setErrorMsg(null);
    setHistoryOpenMobile(false);
  };

  const handleDeleteCurrent = async (sessionId: string) => {
    await deleteChatSession(sessionId);
    if (activeSessionId === sessionId) {
      setActiveSessionId(null);
    }
  };

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Fallback ignored
    }
  };

  const sendMessage = async (textOverride?: string) => {
    const clean = (textOverride ?? inputText).trim();
    if (!clean || isSending) return;

    setErrorMsg(null);
    setInputText('');
    setIsSending(true);

    try {
      let sessionId = activeSessionId;
      if (!sessionId) {
        const created = await createChatSession(clean.slice(0, 56), 'Konsultasi Umum');
        sessionId = created.id;
        setActiveSessionId(created.id);
      }

      const historyPayload = chatMessages
        .filter((m) => m.sessionId === sessionId)
        .map((m) => ({ role: m.role, content: m.content }));

      await appendChatMessage(sessionId, 'user', clean, 'Konsultasi Umum');

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: clean,
          history: historyPayload,
          studentContext: {
            firstName: profile.name.split(' ')[0],
            grade: profile.grade,
          },
        }),
      });

      const data = (await response.json()) as {
        reply?: string;
        topicCategory?: string;
        error?: string;
      };

      if (!response.ok || !data.reply) {
        throw new Error(data.error || 'Gagal mendapatkan balasan dari Sahabat BK AI.');
      }

      await appendChatMessage(
        sessionId,
        'model',
        data.reply,
        data.topicCategory || 'Konsultasi Umum'
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Terjadi kendala saat mengirim pesan.';
      setErrorMsg(msg);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmitReferral = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralConsent || !referralTopic.trim() || !referralSummary.trim()) return;
    await submitCounselingReferral(referralTopic, referralSummary);
    setReferralStatus('Permintaan tindak lanjut berhasil dikirim ke Guru BK dengan persetujuanmu.');
    setReferralTopic('');
    setReferralSummary('');
    setReferralConsent(false);
    setTimeout(() => {
      setReferralModalOpen(false);
      setReferralStatus(null);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      {/* Privacy & Safety Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0">
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-display text-lg sm:text-xl font-bold text-slate-900">Sahabat BK AI</h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Ruang tanya jawab ramah siswa SMP · Percakapan bersifat privat dan tidak otomatis ditampilkan kepada admin.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setHistoryOpenMobile(!historyOpenMobile)}
            className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700"
          >
            <History className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Riwayat ({chatSessions.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setReferralModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-sky-200 bg-sky-50 hover:bg-sky-100 text-xs font-semibold text-sky-900 transition-colors whitespace-nowrap"
          >
            <UserCheck className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Hubungi Guru BK</span>
          </button>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px] max-h-[75vh]">
        {/* Sessions Sidebar */}
        <aside
          className={`${
            historyOpenMobile ? 'block' : 'hidden'
          } lg:block lg:col-span-4 xl:col-span-3 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/60 flex flex-col`}
        >
          <div className="p-3.5 border-b border-slate-200">
            <button
              type="button"
              onClick={handleNewConversation}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F1E3D] hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>Percakapan Baru</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5 max-h-64 lg:max-h-none">
            {chatSessions.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8 px-3">
                Belum ada riwayat percakapan. Mulai bertanya di kolom chat!
              </p>
            ) : (
              chatSessions.map((sess) => {
                const isActive = sess.id === activeSessionId;
                return (
                  <div
                    key={sess.id}
                    className={`group flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border transition-colors ${
                      isActive
                        ? 'bg-white border-sky-300 text-slate-900'
                        : 'bg-transparent border-transparent hover:bg-white text-slate-700'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSessionId(sess.id);
                        setHistoryOpenMobile(false);
                      }}
                      className="flex-1 text-left min-w-0"
                    >
                      <p className="text-xs font-semibold truncate">{sess.title}</p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {sess.topicCategory} · {sess.messageCount} pesan
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDeleteCurrent(sess.id)}
                      aria-label="Hapus percakapan"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* Conversation Thread */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col min-h-[500px] max-h-[75vh]">
          {activeSessionId && (
            <div className="px-4 sm:px-6 py-3 border-b border-slate-100 flex items-center justify-between gap-3">
              <p className="text-xs font-semibold text-slate-600 truncate">
                {chatSessions.find((s) => s.id === activeSessionId)?.title || 'Percakapan Aktif'}
              </p>
              <button
                type="button"
                onClick={() => void handleDeleteCurrent(activeSessionId)}
                className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700 whitespace-nowrap"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Hapus Percakapan</span>
              </button>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-white">
            {activeMessages.length === 0 ? (
              <div className="max-w-2xl mx-auto py-4 space-y-6">
                <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 space-y-2">
                  <p className="font-display text-base font-bold text-slate-900">
                    Hai {profile.name.split(' ')[0]}, aku Sahabat BK AI!
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Kamu bisa bercerita atau bertanya tentang minat dan bakat, pilihan SMA/SMK/MA,
                    strategi belajar, hingga cara menjaga pertemanan yang sehat. Jangan membagikan
                    password, alamat rumah lengkap, atau nomor identitas pribadimu ya.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <p className="text-xs font-semibold text-slate-500">Saran pertanyaan untuk memulai:</p>
                  <div className="flex flex-wrap gap-2">
                    {STARTER_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => void sendMessage(prompt)}
                        className="text-left px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 text-xs font-medium text-slate-800 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              activeMessages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[88%] sm:max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        isUser
                          ? 'bg-[#0F1E3D] text-white'
                          : 'bg-slate-50 border border-slate-200 text-slate-800'
                      }`}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        <div className="space-y-2 prose prose-sm prose-slate max-w-none">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                          <div className="pt-2 border-t border-slate-200/70 flex items-center justify-end">
                            <button
                              type="button"
                              onClick={() => void handleCopy(msg.id, msg.content)}
                              className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-sky-700"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                                  <span className="text-emerald-700">Tersalin</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" aria-hidden="true" />
                                  <span>Salin Jawaban</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {isSending && (
              <div className="flex justify-start">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-medium text-slate-600">
                  Sahabat BK AI sedang mengetik...
                </div>
              </div>
            )}

            {errorMsg && (
              <div
                role="alert"
                className="bg-rose-50 border border-rose-200 text-rose-900 rounded-xl px-4 py-3 text-xs leading-relaxed"
              >
                {errorMsg}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void sendMessage();
            }}
            className="p-3.5 sm:p-4 border-t border-slate-200 bg-slate-50/70 flex items-end gap-2.5"
          >
            <textarea
              rows={1}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void sendMessage();
                }
              }}
              maxLength={2000}
              placeholder="Tulis pertanyaan atau ceritamu di sini..."
              aria-label="Tulis pesan untuk Sahabat BK AI"
              className="flex-1 resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 max-h-32"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isSending}
              aria-label="Kirim pesan"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors shrink-0 min-h-[42px]"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Kirim</span>
            </button>
          </form>
        </div>
      </div>

      {/* Explicit-Consent Counseling Referral Modal */}
      {referralModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="referral-title"
        >
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-sky-700" aria-hidden="true" />
                <h2 id="referral-title" className="font-display text-lg font-bold text-slate-900">
                  Minta Pendampingan Guru BK
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setReferralModalOpen(false)}
                aria-label="Tutup"
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Isi riwayat chatmu tetap privat. Melalui formulir ini, hanya ringkasan topik yang kamu
              tulis sendiri yang akan dikirim ke Guru BK atas persetujuanmu.
            </p>

            <form onSubmit={(e) => void handleSubmitReferral(e)} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Topik Konsultasi
                </label>
                <input
                  type="text"
                  required
                  maxLength={120}
                  value={referralTopic}
                  onChange={(e) => setReferralTopic(e.target.value)}
                  placeholder="Contoh: Pemilihan jurusan SMK vs SMA atau masalah pertemanan"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ringkasan yang Ingin Disampaikan ke Guru BK
                </label>
                <textarea
                  rows={4}
                  required
                  maxLength={2000}
                  value={referralSummary}
                  onChange={(e) => setReferralSummary(e.target.value)}
                  placeholder="Tuliskan hal yang ingin kamu diskusikan saat bertemu Guru BK..."
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={referralConsent}
                  onChange={(e) => setReferralConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-sky-600"
                />
                <span>
                  Saya setuju membagikan ringkasan di atas kepada Guru BK sekolah untuk keperluan
                  tindak lanjut bimbingan dan konseling.
                </span>
              </label>

              {referralStatus && (
                <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                  {referralStatus}
                </p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReferralModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!referralConsent || !referralTopic.trim() || !referralSummary.trim()}
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 text-white text-xs font-semibold"
                >
                  Kirim dengan Persetujuan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
