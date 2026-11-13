import { useEffect, useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Compass,
  LogIn,
  LogOut,
  Save,
  ShieldCheck,
  User,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { RIASEC_PROFILES } from '../data/riasecData';
import { GradeLevel } from '../types/bicara';

export function ProfileView() {
  const {
    profile,
    firebaseUser,
    signInWithGoogle,
    signOut,
    updateProfile,
    materials,
    quizResults,
    explorations,
    referrals,
    setSelectedMaterialId,
    setActiveTab,
  } = useApp();

  const [name, setName] = useState(profile.name);
  const [grade, setGrade] = useState<GradeLevel | 'Staff'>(profile.grade);
  const [school, setSchool] = useState(profile.school);
  const [photoUrl, setPhotoUrl] = useState(profile.photoUrl || '');
  const [guardianConsent, setGuardianConsent] = useState(profile.guardianConsent);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    setName(profile.name);
    setGrade(profile.grade);
    setSchool(profile.school);
    setPhotoUrl(profile.photoUrl || '');
    setGuardianConsent(profile.guardianConsent);
  }, [profile]);

  const publishedMaterials = materials.filter((m) => m.published);
  const completedCount = profile.completedMaterialIds.length;
  const totalCount = publishedMaterials.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const completedMaterials = publishedMaterials.filter((m) =>
    profile.completedMaterialIds.includes(m.id)
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !school.trim()) return;
    setSaving(true);
    setSaveMessage(null);
    try {
      await updateProfile({
        name: name.trim(),
        grade,
        school: school.trim(),
        photoUrl: photoUrl.trim() || undefined,
        guardianConsent,
      });
      setSaveMessage('Perubahan profil berhasil disimpan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Profile Hero Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          {profile.photoUrl ? (
            <img
              src={profile.photoUrl}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-[#0F1E3D] text-white flex items-center justify-center shrink-0">
              <User className="w-7 h-7" aria-hidden="true" />
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-sky-700">
              {profile.grade === 'Staff' ? 'Akun Guru BK / Admin' : `Siswa Kelas ${profile.grade} SMP`} ·{' '}
              {firebaseUser ? 'Akun Google Terhubung' : 'Mode Demo Lokal'}
            </p>
            <h1 className="font-display text-2xl font-bold text-slate-900 mt-0.5">{profile.name}</h1>
            <p className="text-xs text-slate-500 mt-0.5">{profile.school}</p>
          </div>
        </div>

        <div>
          {firebaseUser ? (
            <button
              type="button"
              onClick={() => void signOut()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              <span>Keluar Akun</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void signInWithGoogle()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold"
            >
              <LogIn className="w-4 h-4" aria-hidden="true" />
              <span>Masuk dengan Google Sekolah</span>
            </button>
          )}
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Editable Profile Form */}
        <section className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900">Data Identitas Siswa</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Kami menerapkan prinsip minimisasi data anak: tidak meminta alamat rumah, NIK, maupun nomor HP.
            </p>
          </div>

          <form onSubmit={(e) => void handleSave(e)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                maxLength={120}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kelas</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as GradeLevel | 'Staff')}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:border-sky-500"
              >
                <option value="VII">Kelas VII</option>
                <option value="VIII">Kelas VIII</option>
                <option value="IX">Kelas IX</option>
                {profile.role !== 'siswa' && <option value="Staff">Guru BK / Admin</option>}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Sekolah</label>
              <input
                type="text"
                required
                maxLength={160}
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                URL Foto Profil (Opsional)
              </label>
              <input
                type="url"
                maxLength={500}
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:border-sky-500"
              />
            </div>

            <label className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-3 cursor-pointer">
              <input
                type="checkbox"
                checked={guardianConsent}
                onChange={(e) => setGuardianConsent(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-sky-600"
              />
              <span>
                Saya menggunakan layanan bimbingan karier digital ini atas sepengetahuan dan persetujuan orang tua/wali atau pihak sekolah.
              </span>
            </label>

            {saveMessage && (
              <p role="status" className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2.5">
                {saveMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F1E3D] hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
            >
              <Save className="w-4 h-4" aria-hidden="true" />
              <span>{saving ? 'Menyimpan...' : 'Simpan Profil'}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex items-start gap-2.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed">
              Riwayat konsultasi Sahabat BK AI milikmu tersimpan privat dan tidak pernah ditampilkan
              secara otomatis kepada Guru BK atau Admin tanpa persetujuanmu.
            </p>
          </div>
        </section>

        {/* Progress, RIASEC & Activity History */}
        <div className="lg:col-span-7 space-y-6">
          {/* Learning Progress */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900">Progres Pembelajaran Karier</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {completedCount} dari {totalCount} materi telah diselesaikan
                </p>
              </div>
              <span className="font-mono-tabular text-lg font-bold text-sky-700">{progressPct}%</span>
            </div>

            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-600 rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {completedMaterials.length === 0 ? (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 flex items-center justify-between gap-3">
                <span>Belum ada materi yang ditandai selesai.</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('materi')}
                  className="font-semibold text-sky-700 hover:underline shrink-0"
                >
                  Mulai Belajar
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {completedMaterials.map((mat) => {
                  const qr = quizResults.find((r) => r.materialId === mat.id);
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => {
                        setSelectedMaterialId(mat.id);
                        setActiveTab('materi');
                      }}
                      className="w-full text-left px-4 py-3 bg-white hover:bg-slate-50 flex items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate">{mat.title}</p>
                          <p className="text-xs text-slate-500">
                            Kelas {mat.grade} · {mat.categoryName}
                          </p>
                        </div>
                      </div>
                      {qr && (
                        <span className="font-mono-tabular text-xs font-semibold text-sky-700 shrink-0">
                          Kuis {qr.score}%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {/* RIASEC Exploration Results */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-violet-600" aria-hidden="true" />
                <h2 className="font-display text-lg font-bold text-slate-900">Hasil Eksplorasi Minat RIASEC</h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('tes-minat')}
                className="text-xs font-semibold text-sky-700 hover:underline"
              >
                {explorations.length > 0 ? 'Tes Ulang' : 'Ikuti Tes'}
              </button>
            </div>

            {explorations.length === 0 ? (
              <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-xl p-4">
                Kamu belum menyimpan hasil Tes Minat RIASEC. Ikuti kuis 24 pernyataan untuk mengetahui 3 kelompok minat dominanmu.
              </p>
            ) : (
              <div className="space-y-3">
                {explorations.slice(0, 3).map((exp) => (
                  <div key={exp.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>3 Minat Teratas</span>
                      <span>{exp.createdAtLabel || 'Tersimpan'}</span>
                    </div>
                    <p className="font-display text-sm font-bold text-slate-900">
                      {exp.topThree.map((c) => RIASEC_PROFILES[c].indonesianTitle).join(' · ')}
                    </p>
                    <div className="grid grid-cols-6 gap-2 pt-1 text-center font-mono-tabular text-xs">
                      {(['R', 'I', 'A', 'S', 'E', 'C'] as const).map((code) => (
                        <div key={code} className="bg-white border border-slate-200 rounded-lg py-1.5">
                          <span className="block text-[10px] text-slate-500">{code}</span>
                          <span className="font-bold text-slate-900">{exp.scores[code]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Activity History */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-sky-600" aria-hidden="true" />
              <h2 className="font-display text-lg font-bold text-slate-900">Riwayat Aktivitas & Rujukan</h2>
            </div>

            <div className="space-y-2 text-xs">
              {quizResults.map((qr) => (
                <div key={qr.id} className="flex items-center justify-between gap-3 py-2 border-b border-slate-100 last:border-b-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <BookOpen className="w-3.5 h-3.5 text-sky-600 shrink-0" aria-hidden="true" />
                    <span className="text-slate-700 truncate">
                      Mengerjakan kuis <strong>{qr.materialTitle}</strong>
                    </span>
                  </div>
                  <span className="font-mono-tabular font-semibold text-slate-900 shrink-0">
                    Skor {qr.score}%
                  </span>
                </div>
              ))}

              {referrals.map((ref) => (
                <div key={ref.id} className="flex items-center justify-between gap-3 py-2 border-b border-slate-100 last:border-b-0">
                  <span className="text-slate-700 truncate">
                    Rujukan Konseling Guru BK: <strong>{ref.topic}</strong>
                  </span>
                  <span className="font-semibold text-violet-700 shrink-0 capitalize">{ref.status}</span>
                </div>
              ))}

              {quizResults.length === 0 && referrals.length === 0 && (
                <p className="text-slate-500 py-2">Belum ada riwayat aktivitas tercatat.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
