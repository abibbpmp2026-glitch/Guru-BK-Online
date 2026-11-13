import { ArrowRight, BookOpen, Compass, MessageCircle, Newspaper, Sparkles, Megaphone, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { HERO_BANNER_IMAGE } from '../data/seedData';
import { RIASEC_PROFILES } from '../data/riasecData';
import { SafeImage } from './SafeImage';

export function HomeView() {
  const {
    profile,
    materials,
    articles,
    announcements,
    siteSetting,
    quizResults,
    explorations,
    chatSessions,
    setActiveTab,
    setSelectedMaterialId,
  } = useApp();

  const publishedMaterials = materials.filter((m) => m.published);
  const completedCount = profile.completedMaterialIds.length;
  const totalCount = publishedMaterials.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const avgQuizScore =
    quizResults.length > 0
      ? Math.round(quizResults.reduce((acc, q) => acc + q.score, 0) / quizResults.length)
      : 0;

  const latestExploration = explorations[0];
  const topRiasecLabel = latestExploration
    ? latestExploration.topThree.map((code) => RIASEC_PROFILES[code].name).join(' · ')
    : 'Belum Dites';

  const targetGrade = profile.grade === 'Staff' ? 'IX' : profile.grade;
  const recommendedMaterials = publishedMaterials
    .filter((m) => m.grade === targetGrade)
    .slice(0, 3);

  const visibleAnnouncements = announcements.filter(
    (a) => a.active && (a.targetGrade === 'Semua' || a.targetGrade === profile.grade)
  );

  const publishedArticles = articles.filter((a) => a.published).slice(0, 3);

  const activitySuggestions = [
    {
      title: 'Selesaikan 1 Modul Kelas ' + targetGrade,
      detail: 'Baca materi ringkas, tulis refleksi pribadimu, dan jawab 5 soal kuis latihan.',
      actionLabel: 'Buka Materi',
      onClick: () => setActiveTab('materi'),
    },
    {
      title: 'Pemetaan Minat RIASEC (24 Pernyataan)',
      detail: 'Kenali 3 kelompok minat dominanmu untuk memilih ekstrakurikuler dan rencana SMA/SMK.',
      actionLabel: 'Ikuti Tes Minat',
      onClick: () => setActiveTab('tes-minat'),
    },
    {
      title: 'Konsultasi Santai dengan Sahabat BK AI',
      detail: 'Tanyakan strategi belajar, hubungan pertemanan, atau pilihan jurusan sekolah lanjutan.',
      actionLabel: 'Mulai Konsultasi',
      onClick: () => setActiveTab('tanya-bk'),
    },
  ];

  const openMaterial = (materialId: string) => {
    setSelectedMaterialId(materialId);
    setActiveTab('materi');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-8"
    >
      {/* Personal Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-sky-700">
            {profile.grade === 'Staff' ? 'Panel Guru BK & Pengelola' : `Kelas ${profile.grade} SMP`} · {profile.school}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1 text-balance">
            Halo, {profile.name.split(' ')[0]}! Siap merancang masa depanmu hari ini?
          </h1>
        </div>
        <button
          type="button"
          onClick={() => setActiveTab('profil')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
        >
          Lihat Profil & Progres
        </button>
      </div>

      {/* Active Announcements */}
      {visibleAnnouncements.length > 0 && (
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
            <Megaphone className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="space-y-1 min-w-0">
            <p className="text-xs font-semibold text-sky-900">
              {visibleAnnouncements[0].title} · Untuk Kelas {visibleAnnouncements[0].targetGrade}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">{visibleAnnouncements[0].message}</p>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold text-violet-700 tracking-wide">
              BICARA BK · BIMBINGAN KARIER DAN KONSELING DIGITAL
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight text-balance">
              {siteSetting.heroHeadline}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              {siteSetting.heroSubheadline}
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('tes-minat')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F1E3D] hover:bg-slate-800 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <Compass className="w-4 h-4 text-sky-300" aria-hidden="true" />
                <span>Mulai Eksplorasi Karier</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('tanya-bk')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Tanya AI BK</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs italic text-slate-600 leading-relaxed">
                “{siteSetting.motivationQuote}”
              </p>
              <p className="text-xs font-medium text-slate-500 mt-1">— {siteSetting.motivationAuthor}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 min-h-[220px] lg:min-h-full bg-slate-100">
          <SafeImage
            src={HERO_BANNER_IMAGE}
            alt="Ilustrasi siswa SMP mengeksplorasi cita-cita dan karier masa depan"
            className="w-full h-full object-cover"
            fallbackTitle="BICARA BK"
          />
        </div>
      </section>

      {/* 4-Column Career Progress Strip */}
      <section aria-label="Statistik Progres Eksplorasi Karier" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-medium text-slate-500">Materi Selesai</p>
          <p className="font-display text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            {completedCount} / {totalCount}
          </p>
          <div className="mt-3 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-sky-600 rounded-full" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-medium text-slate-500">Rata-rata Skor Kuis</p>
          <p className="font-display text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            {quizResults.length > 0 ? `${avgQuizScore}%` : '—'}
          </p>
          <p className="text-xs text-slate-500 mt-2 tabular-nums">
            {quizResults.length} kuis dikerjakan
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-medium text-slate-500">Profil Minat RIASEC</p>
          <p className="font-display text-base sm:text-lg font-bold text-violet-700 mt-1.5 truncate">
            {topRiasecLabel}
          </p>
          <button
            type="button"
            onClick={() => setActiveTab('tes-minat')}
            className="text-xs font-semibold text-sky-700 hover:underline mt-2"
          >
            {latestExploration ? 'Lihat detail hasil' : 'Ikuti tes 24 soal'}
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-medium text-slate-500">Sesi Sahabat BK AI</p>
          <p className="font-display text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            {chatSessions.length}
          </p>
          <button
            type="button"
            onClick={() => setActiveTab('tanya-bk')}
            className="text-xs font-semibold text-sky-700 hover:underline mt-2"
          >
            Mulai tanya jawab
          </button>
        </div>
      </section>

      {/* Main Feature Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-slate-900">Layanan Utama BICARA BK</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              tab: 'materi' as const,
              icon: BookOpen,
              title: 'Materi Bimbingan Karier',
              desc: '23 modul lengkap untuk Kelas VII, VIII, dan IX lengkap dengan refleksi dan kuis 5 soal.',
              tint: 'bg-sky-50 text-sky-700',
            },
            {
              tab: 'tes-minat' as const,
              icon: Compass,
              title: 'Tes Minat & Bakat',
              desc: 'Eksplorasi kecenderungan karier berbasis 6 kelompok RIASEC dengan diagram interaktif.',
              tint: 'bg-violet-50 text-violet-700',
            },
            {
              tab: 'tanya-bk' as const,
              icon: MessageCircle,
              title: 'Sahabat BK AI',
              desc: 'Konsultasi hangat dan privat mengenai belajar, pertemanan, dan rencana sekolah lanjutan.',
              tint: 'bg-indigo-50 text-indigo-700',
            },
            {
              tab: 'info' as const,
              icon: Newspaper,
              title: 'Info Pendidikan Terkini',
              desc: 'Informasi terverifikasi seputar SPMB/PPDB, beasiswa PIP, ajang talenta, dan SMK/SMA.',
              tint: 'bg-teal-50 text-teal-700',
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.tab}
                type="button"
                onClick={() => setActiveTab(card.tab)}
                className="group text-left bg-white border border-slate-200 hover:border-sky-300 rounded-2xl p-5 transition-all hover:-translate-y-0.5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.tint}`}>
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700">
                  <span>Buka Layanan</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Recommended Career Materials & Self-Development Activities */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">
                Rekomendasi Materi Kelas {targetGrade}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Dipilih sesuai jenjang kelasmu saat ini</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('materi')}
              className="text-xs font-semibold text-sky-700 hover:underline whitespace-nowrap"
            >
              Lihat Semua Materi
            </button>
          </div>

          <div className="space-y-3">
            {recommendedMaterials.map((mat) => {
              const done = profile.completedMaterialIds.includes(mat.id);
              return (
                <button
                  key={mat.id}
                  type="button"
                  onClick={() => openMaterial(mat.id)}
                  className="w-full text-left bg-white border border-slate-200 hover:border-sky-300 rounded-2xl p-4 flex items-center gap-4 transition-colors"
                >
                  <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <SafeImage src={mat.imageUrl} alt={mat.title} fallbackTitle={mat.title} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500">
                      Kelas {mat.grade} · {mat.categoryName} · 5 Soal Kuis
                    </p>
                    <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 truncate mt-0.5">
                      {mat.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{mat.learningObjective}</p>
                  </div>
                  {done ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 shrink-0">
                      <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                      <span className="hidden sm:inline">Selesai</span>
                    </span>
                  ) : (
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">Rekomendasi Aktivitas</h2>
            <p className="text-xs text-slate-500 mt-0.5">{siteSetting.featuredTip}</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
            {activitySuggestions.map((act) => (
              <div key={act.title} className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-sm font-bold text-slate-900">{act.title}</h3>
                  <Sparkles className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" aria-hidden="true" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{act.detail}</p>
                <button
                  type="button"
                  onClick={act.onClick}
                  className="text-xs font-semibold text-sky-700 hover:underline inline-flex items-center gap-1"
                >
                  <span>{act.actionLabel}</span>
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Verified Information */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">Info Pendidikan Terbaru</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Sumber terverifikasi yang dikelola Guru BK & Admin Sekolah
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className="text-xs font-semibold text-sky-700 hover:underline whitespace-nowrap"
          >
            Semua Informasi
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {publishedArticles.map((art) => (
            <button
              key={art.id}
              type="button"
              onClick={() => setActiveTab('info')}
              className="text-left bg-white border border-slate-200 hover:border-sky-300 rounded-2xl overflow-hidden flex flex-col transition-colors"
            >
              <div className="h-40 bg-slate-100">
                <SafeImage src={art.imageUrl} alt={art.title} fallbackTitle={art.category} />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-500">
                    {art.category} · {art.updatedAtLabel}
                  </p>
                  <h3 className="font-display text-sm font-bold text-slate-900 mt-1 line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">{art.summary}</p>
                </div>
                <p className="text-[11px] font-medium text-sky-700 truncate">Sumber: {art.sourceName}</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
