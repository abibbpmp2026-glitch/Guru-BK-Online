import { useState } from 'react';
import { ArrowRight, BookOpen, Compass, LogIn, MessageCircle, ShieldCheck, Sparkles, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { HERO_BANNER_IMAGE } from '../data/seedData';
import { GradeLevel } from '../types/bicara';
import { SafeImage } from './SafeImage';

export function LoginView() {
  const { loginWithStudentName, signInWithGoogle, enterGuruBkPreview, authError, clearAuthError, profile } = useApp();

  const [studentName, setStudentName] = useState(
    profile.name && profile.name !== 'Rafi Pratama' ? profile.name : ''
  );
  const [grade, setGrade] = useState<GradeLevel>(
    profile.grade === 'VII' || profile.grade === 'VIII' || profile.grade === 'IX' ? profile.grade : 'VII'
  );
  const [guardianConsent, setGuardianConsent] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmitStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = studentName.trim();
    if (clean.length < 2) {
      setValidationError('Silakan masukkan nama lengkapmu minimal 2 huruf untuk melanjutkan.');
      return;
    }
    if (!guardianConsent) {
      setValidationError('Centang persetujuan penggunaan layanan bersama orang tua atau sekolah terlebih dahulu.');
      return;
    }
    setValidationError(null);
    loginWithStudentName({
      name: clean,
      grade,
      guardianConsent,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="max-w-5xl w-full mx-auto bg-white border border-slate-200 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
      >
        {/* Left Brand & Illustration Column */}
        <div className="lg:col-span-6 bg-[#0F1E3D] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-violet-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <span className="font-display text-lg font-bold tracking-tight block leading-tight">
                  BICARA BK
                </span>
                <span className="text-xs text-sky-200/90 block leading-tight mt-0.5">
                  SMPN Wonogiri
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <p className="text-xs font-semibold text-sky-300 tracking-wide">
                BIMBINGAN KARIER DAN KONSELING DIGITAL
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-balance">
                Selamat Datang, Siswa SMPN Wonogiri
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                Kenali potensi dirimu, jelajahi materi bimbingan karier kelas VII–IX, ikuti tes minat
                RIASEC, dan berdiskusi aman bersama Sahabat BK AI.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 h-44 sm:h-52 bg-slate-900">
              <SafeImage
                src={HERO_BANNER_IMAGE}
                alt="Siswa SMPN Wonogiri mengeksplorasi cita-cita masa depan"
                className="w-full h-full object-cover"
                fallbackTitle="BICARA BK SMPN Wonogiri"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs text-slate-200">
            <div className="space-y-1">
              <BookOpen className="w-4 h-4 text-sky-300" aria-hidden="true" />
              <p className="font-semibold text-white">23 Materi</p>
              <p className="text-[11px] text-slate-300">Kelas VII–IX</p>
            </div>
            <div className="space-y-1">
              <Compass className="w-4 h-4 text-violet-300" aria-hidden="true" />
              <p className="font-semibold text-white">Tes RIASEC</p>
              <p className="text-[11px] text-slate-300">24 Pernyataan</p>
            </div>
            <div className="space-y-1">
              <MessageCircle className="w-4 h-4 text-sky-300" aria-hidden="true" />
              <p className="font-semibold text-white">Sahabat BK AI</p>
              <p className="text-[11px] text-slate-300">Privat & Aman</p>
            </div>
          </div>
        </div>

        {/* Right Student Name Login Form */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                Masuk dengan Nama Siswa
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Masukkan nama lengkap dan kelasmu untuk memulai layanan bimbingan karier SMPN Wonogiri.
              </p>
            </div>

            {(authError || validationError) && (
              <div
                role="alert"
                className="bg-rose-50 border border-rose-200 text-rose-900 rounded-xl px-4 py-3 text-xs flex items-center justify-between gap-3"
              >
                <span>{validationError || authError}</span>
                {authError && (
                  <button
                    type="button"
                    onClick={clearAuthError}
                    className="font-semibold underline shrink-0"
                  >
                    Tutup
                  </button>
                )}
              </div>
            )}

            <form onSubmit={handleSubmitStudent} className="space-y-4">
              <div>
                <label htmlFor="login-student-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nama Lengkap Siswa
                </label>
                <div className="relative">
                  <User
                    className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                    aria-hidden="true"
                  />
                  <input
                    id="login-student-name"
                    type="text"
                    required
                    autoFocus
                    maxLength={120}
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Contoh: Aulia Rahma Putri"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold text-slate-700 mb-1.5">Pilih Kelas</span>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['VII', 'VIII', 'IX'] as const).map((g) => {
                    const active = grade === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGrade(g)}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-colors ${
                          active
                            ? 'bg-[#0F1E3D] border-[#0F1E3D] text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-sky-50 hover:border-sky-300'
                        }`}
                      >
                        Kelas {g}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Sekolah</label>
                <input
                  type="text"
                  readOnly
                  value="SMPN Wonogiri"
                  aria-label="Nama Sekolah"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700"
                />
              </div>

              <label className="flex items-start gap-2.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-xl p-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={guardianConsent}
                  onChange={(e) => setGuardianConsent(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-sky-600"
                />
                <span>
                  Saya menggunakan BICARA BK dengan sepengetahuan orang tua/wali atau Guru BK SMPN Wonogiri.
                </span>
              </label>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold transition-colors"
              >
                <span>Masuk ke BICARA BK</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          </div>

          {/* Google Cloud & Guru BK Access */}
          <div className="pt-5 border-t border-slate-200 space-y-3">
            <p className="text-xs font-medium text-slate-500 text-center">
              Ingin menyimpan progres di cloud atau masuk sebagai Guru BK / Admin?
            </p>
            <button
              type="button"
              onClick={() => void signInWithGoogle()}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors"
            >
              <LogIn className="w-4 h-4 text-sky-700" aria-hidden="true" />
              <span>Masuk dengan Akun Google Sekolah</span>
            </button>

            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-700" aria-hidden="true" />
                <span>Privasi data siswa terjaga</span>
              </span>
              <button
                type="button"
                onClick={enterGuruBkPreview}
                className="text-[11px] font-semibold text-violet-700 hover:underline"
              >
                Pratinjau Mode Guru BK
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
