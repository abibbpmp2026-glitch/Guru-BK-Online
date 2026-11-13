import { useMemo, useState } from 'react';
import {
  BarChart3,
  BookOpen,
  Megaphone,
  Newspaper,
  Pencil,
  Plus,
  ShieldCheck,
  Trash2,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { RIASEC_PROFILES } from '../data/riasecData';
import {
  Announcement,
  CareerMaterial,
  CounselingReferral,
  GradeLevel,
  InfoArticle,
  MaterialQuiz,
  RiasecCode,
  UserRole,
} from '../types/bicara';

type AdminSubTab = 'statistik' | 'materi' | 'info' | 'pengumuman' | 'akun';

const DEFAULT_IMAGES: Record<GradeLevel, string> = {
  VII: '/src/assets/images/materi_kelas_7_1794573084191.jpg',
  VIII: '/src/assets/images/materi_kelas_8_1794573084599.jpg',
  IX: '/src/assets/images/materi_kelas_9_1794573084699.jpg',
};

export function AdminDashboardView() {
  const {
    effectiveRole,
    firebaseUser,
    demoAdminPreview,
    categories,
    materials,
    quizzes,
    articles,
    announcements,
    siteSetting,
    allUsers,
    allExplorations,
    allQuizResults,
    explorations,
    quizResults,
    chatbotStats,
    referrals,
    staffRoles,
    saveMaterial,
    deleteMaterial,
    saveCategory,
    saveArticle,
    deleteArticle,
    saveAnnouncement,
    deleteAnnouncement,
    saveSiteSetting,
    updateReferralStatus,
    updateStudentAccount,
    assignStaffRole,
    removeStaffRole,
  } = useApp();

  const [subTab, setSubTab] = useState<AdminSubTab>('statistik');

  // Material editor state
  const [editingMaterial, setEditingMaterial] = useState<CareerMaterial | null>(null);
  const [matTitle, setMatTitle] = useState('');
  const [matGrade, setMatGrade] = useState<GradeLevel>('VII');
  const [matCatId, setMatCatId] = useState(categories[0]?.id || 'cat-vii-mengenal-diri');
  const [matObj, setMatObj] = useState('');
  const [matExp, setMatExp] = useState('');
  const [matExamples, setMatExamples] = useState('');
  const [matReflection, setMatReflection] = useState('');
  const [matPublished, setMatPublished] = useState(true);

  // Category quick form
  const [catName, setCatName] = useState('');
  const [catGrade, setCatGrade] = useState<GradeLevel>('VII');
  const [catDesc, setCatDesc] = useState('');

  // Article editor state
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [artTitle, setArtTitle] = useState('');
  const [artCat, setArtCat] = useState('Penerimaan Murid Baru');
  const [artSummary, setArtSummary] = useState('');
  const [artContent, setArtContent] = useState('');
  const [artSourceName, setArtSourceName] = useState('');
  const [artSourceUrl, setArtSourceUrl] = useState('https://');
  const [artPublished, setArtPublished] = useState(true);

  // Announcement form state
  const [annTitle, setAnnTitle] = useState('');
  const [annMsg, setAnnMsg] = useState('');
  const [annGrade, setAnnGrade] = useState<'Semua' | GradeLevel>('Semua');
  const [annActive, setAnnActive] = useState(true);

  // Home content form state
  const [heroHeadline, setHeroHeadline] = useState(siteSetting.heroHeadline);
  const [heroSubheadline, setHeroSubheadline] = useState(siteSetting.heroSubheadline);
  const [motivationQuote, setMotivationQuote] = useState(siteSetting.motivationQuote);
  const [motivationAuthor, setMotivationAuthor] = useState(siteSetting.motivationAuthor);
  const [featuredTip, setFeaturedTip] = useState(siteSetting.featuredTip);

  // Staff role assignment state
  const [staffUid, setStaffUid] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [staffName, setStaffName] = useState('');
  const [staffRoleType, setStaffRoleType] = useState<'guru_bk' | 'admin'>('guru_bk');

  const [statusBanner, setStatusBanner] = useState<string | null>(null);

  const isStaff = effectiveRole === 'admin' || effectiveRole === 'guru_bk';

  const activeExplorations = firebaseUser ? allExplorations : explorations;
  const activeQuizResults = firebaseUser ? allQuizResults : quizResults;

  // Aggregate RIASEC distribution
  const riasecTopCounts = useMemo(() => {
    const counts: Record<RiasecCode, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    activeExplorations.forEach((exp) => {
      if (exp.topThree && exp.topThree[0]) {
        counts[exp.topThree[0]] = (counts[exp.topThree[0]] || 0) + 1;
      }
    });
    return counts;
  }, [activeExplorations]);

  // Aggregate Chatbot Topic counts (no personal chat text!)
  const chatbotTopicCounts = useMemo(() => {
    const map: Record<string, number> = {};
    chatbotStats.forEach((s) => {
      map[s.topicCategory] = (map[s.topicCategory] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [chatbotStats]);

  if (!isStaff) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3">
        <ShieldCheck className="w-10 h-10 text-slate-400 mx-auto" aria-hidden="true" />
        <h1 className="font-display text-xl font-bold text-slate-900">Akses Khusus Guru BK & Admin</h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Halaman ini hanya tersedia untuk akun Guru BK dan Administrator sekolah yang terdaftar.
        </p>
      </div>
    );
  }

  const notify = (msg: string) => {
    setStatusBanner(msg);
    setTimeout(() => setStatusBanner(null), 3000);
  };

  const resetMaterialForm = () => {
    setEditingMaterial(null);
    setMatTitle('');
    setMatGrade('VII');
    setMatCatId(categories[0]?.id || 'cat-vii-mengenal-diri');
    setMatObj('');
    setMatExp('');
    setMatExamples('');
    setMatReflection('');
    setMatPublished(true);
  };

  const startEditMaterial = (mat: CareerMaterial) => {
    setEditingMaterial(mat);
    setMatTitle(mat.title);
    setMatGrade(mat.grade);
    setMatCatId(mat.categoryId);
    setMatObj(mat.learningObjective);
    setMatExp(mat.explanation);
    setMatExamples(mat.dailyExamples.join('\n'));
    setMatReflection(mat.reflectionPrompt);
    setMatPublished(mat.published);
  };

  const handleSaveMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingMaterial?.id || `mat-${matGrade.toLowerCase()}-${Date.now()}`;
    const cat = categories.find((c) => c.id === matCatId);
    const examplesArr = matExamples
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: Omit<CareerMaterial, 'authorId' | 'createdAt' | 'updatedAt'> = {
      id,
      title: matTitle.trim(),
      grade: matGrade,
      categoryId: matCatId,
      categoryName: cat?.name || 'Bimbingan Karier',
      learningObjective: matObj.trim(),
      imageUrl: editingMaterial?.imageUrl || DEFAULT_IMAGES[matGrade],
      explanation: matExp.trim(),
      dailyExamples: examplesArr.length > 0 ? examplesArr : ['Diskusikan topik ini bersama teman dan Guru BK.'],
      reflectionPrompt: matReflection.trim() || 'Apa hal terpenting yang kamu pelajari dari materi ini?',
      published: matPublished,
    };

    const existingQuiz = quizzes.find((q) => q.materialId === id);
    const fallbackQuiz: MaterialQuiz = existingQuiz || {
      id: `quiz-${id}`,
      materialId: id,
      published: matPublished,
      questions: [
        {
          id: 'q1',
          question: `Apa tujuan utama mempelajari materi "${matTitle.trim()}"?`,
          options: [
            matObj.trim() || 'Memahami pengembangan diri dan perencanaan karier secara bertahap',
            'Menghafal tanpa memahami maknanya',
            'Menunda semua rencana sekolah',
            'Mengabaikan minat pribadi',
          ],
          correctIndex: 0,
          explanation: 'Setiap modul dirancang untuk memperluas pemahaman diri dan wawasan masa depanmu.',
        },
      ],
    };

    await saveMaterial(payload, fallbackQuiz);
    resetMaterialForm();
    notify('Materi karier berhasil disimpan.');
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;
    const id = `cat-${catGrade.toLowerCase()}-${Date.now()}`;
    await saveCategory({
      id,
      name: catName.trim(),
      grade: catGrade,
      description: catDesc.trim() || `Kategori materi untuk kelas ${catGrade}`,
      order: categories.length + 1,
    });
    setCatName('');
    setCatDesc('');
    notify('Kategori baru berhasil ditambahkan.');
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingArticleId || `info-${Date.now()}`;
    const todayLabel = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const payload: Omit<InfoArticle, 'authorId' | 'createdAt' | 'updatedAt'> = {
      id,
      title: artTitle.trim(),
      category: artCat,
      publishedDateLabel: `Diperbarui oleh Admin BK · ${todayLabel}`,
      updatedAtLabel: `Diperbarui ${todayLabel}`,
      summary: artSummary.trim(),
      content: artContent.trim(),
      sourceName: artSourceName.trim(),
      sourceUrl: artSourceUrl.trim(),
      imageUrl: '/src/assets/images/info_terkini_cover_1794573084483.jpg',
      published: artPublished,
    };
    await saveArticle(payload);
    setEditingArticleId(null);
    setArtTitle('');
    setArtSummary('');
    setArtContent('');
    setArtSourceName('');
    setArtSourceUrl('https://');
    notify('Artikel Info Terkini berhasil disimpan.');
  };

  const startEditArticle = (art: InfoArticle) => {
    setEditingArticleId(art.id);
    setArtTitle(art.title);
    setArtCat(art.category);
    setArtSummary(art.summary);
    setArtContent(art.content);
    setArtSourceName(art.sourceName);
    setArtSourceUrl(art.sourceUrl);
    setArtPublished(art.published);
  };

  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = `ann-${Date.now()}`;
    const payload: Omit<Announcement, 'authorId' | 'createdAt' | 'updatedAt'> = {
      id,
      title: annTitle.trim(),
      message: annMsg.trim(),
      targetGrade: annGrade,
      active: annActive,
    };
    await saveAnnouncement(payload);
    setAnnTitle('');
    setAnnMsg('');
    notify('Pengumuman baru berhasil diterbitkan.');
  };

  const handleSaveHome = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSiteSetting({
      heroHeadline: heroHeadline.trim(),
      heroSubheadline: heroSubheadline.trim(),
      motivationQuote: motivationQuote.trim(),
      motivationAuthor: motivationAuthor.trim(),
      featuredTip: featuredTip.trim(),
    });
    notify('Konten halaman Beranda berhasil diperbarui.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Dashboard Header */}
      <div className="bg-[#0F1E3D] text-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-sky-300">
            PANEL PENGELOLAAN · {effectiveRole === 'admin' ? 'ADMINISTRATOR SEKOLAH' : 'GURU BIMBINGAN & KONSELING'}
          </p>
          <h1 className="font-display text-2xl font-bold">Dashboard Guru BK & Admin</h1>
          <p className="text-xs text-slate-300 max-w-2xl">
            Kelola materi bimbingan karier, informasi pendidikan terverifikasi, pengumuman, dan pantau
            progres eksplorasi siswa tanpa melanggar privasi percakapan pribadi.
          </p>
        </div>
        {demoAdminPreview && !firebaseUser && (
          <div className="px-3.5 py-2 rounded-xl bg-amber-400/20 border border-amber-300/40 text-xs text-amber-100 shrink-0">
            Mode Pratinjau Lokal (Data Demo)
          </div>
        )}
      </div>

      {statusBanner && (
        <div role="status" className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl px-4 py-3 text-xs font-semibold">
          {statusBanner}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-2xl overflow-x-auto">
        {(
          [
            { id: 'statistik', label: 'Statistik & Konseling', icon: BarChart3 },
            { id: 'materi', label: 'Kelola Materi & Kategori', icon: BookOpen },
            { id: 'info', label: 'Kelola Info Terkini', icon: Newspaper },
            { id: 'pengumuman', label: 'Pengumuman & Beranda', icon: Megaphone },
            { id: 'akun', label: 'Akun Siswa & Peran', icon: Users },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const active = subTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSubTab(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                active ? 'bg-[#0F1E3D] text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: STATISTIK & KONSELING */}
      {subTab === 'statistik' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="text-xs text-slate-500">Akun Siswa Terdaftar</p>
              <p className="font-display text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                {firebaseUser ? allUsers.filter((u) => u.role === 'siswa').length : 1}
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="text-xs text-slate-500">Total Pengerjaan Kuis</p>
              <p className="font-display text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                {activeQuizResults.length}
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="text-xs text-slate-500">Tes Minat RIASEC Tersimpan</p>
              <p className="font-display text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                {activeExplorations.length}
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <p className="text-xs text-slate-500">Interaksi Chatbot (Agregat)</p>
              <p className="font-display text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                {chatbotStats.length}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* RIASEC Aggregate */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <h2 className="font-display text-base font-bold text-slate-900">
                Statistik Minat RIASEC Dominan Siswa
              </h2>
              <div className="space-y-3">
                {(['R', 'I', 'A', 'S', 'E', 'C'] as const).map((code) => {
                  const count = riasecTopCounts[code];
                  const total = Math.max(1, activeExplorations.length);
                  const pct = Math.round((count / total) * 100);
                  return (
                    <div key={code} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-slate-700">{RIASEC_PROFILES[code].indonesianTitle}</span>
                        <span className="font-mono-tabular font-semibold text-slate-900">{count} siswa</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: RIASEC_PROFILES[code].accentHex }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chatbot Aggregate Topics (No Private Content) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <div>
                <h2 className="font-display text-base font-bold text-slate-900">
                  Statistik Topik Konsultasi Sahabat BK AI (Agregat)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Hanya menampilkan kategori topik secara agregat. Isi percakapan pribadi siswa dilindungi dan tidak ditampilkan di sini.
                </p>
              </div>
              {chatbotTopicCounts.length === 0 ? (
                <p className="text-xs text-slate-500 py-6 text-center bg-slate-50 rounded-xl">
                  Belum ada log topik agregat yang masuk saat sesi aktif.
                </p>
              ) : (
                <div className="divide-y divide-slate-100">
                  {chatbotTopicCounts.map(([topic, count]) => (
                    <div key={topic} className="py-2.5 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-800">{topic}</span>
                      <span className="font-mono-tabular font-bold text-sky-700">{count} pertanyaan</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Consented Counseling Referrals */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div>
              <h2 className="font-display text-base font-bold text-slate-900">
                Permintaan Tindak Lanjut Konseling (Dengan Persetujuan Siswa)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Hanya siswa yang secara sukarela menyetujui berbagi ringkasan topik yang muncul di daftar ini.
              </p>
            </div>
            {referrals.length === 0 ? (
              <p className="text-xs text-slate-500 bg-slate-50 rounded-xl p-4">
                Belum ada permintaan tindak lanjut konseling dari siswa.
              </p>
            ) : (
              <div className="space-y-3">
                {referrals.map((ref) => (
                  <ReferralRow
                    key={ref.id}
                    referral={ref}
                    onUpdate={async (status, note) => {
                      await updateReferralStatus(ref.id, status, note);
                      notify('Status tindak lanjut konseling diperbarui.');
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: KELOLA MATERI & KATEGORI */}
      {subTab === 'materi' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-6">
            <form onSubmit={(e) => void handleSaveMaterial(e)} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base font-bold text-slate-900">
                  {editingMaterial ? 'Edit Materi Karier' : 'Tambah Materi Karier'}
                </h2>
                {editingMaterial && (
                  <button type="button" onClick={resetMaterialForm} className="text-xs text-sky-700 hover:underline">
                    Batal Edit
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Materi</label>
                <input
                  type="text"
                  required
                  value={matTitle}
                  onChange={(e) => setMatTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kelas</label>
                  <select
                    value={matGrade}
                    onChange={(e) => setMatGrade(e.target.value as GradeLevel)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white"
                  >
                    <option value="VII">Kelas VII</option>
                    <option value="VIII">Kelas VIII</option>
                    <option value="IX">Kelas IX</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={matCatId}
                    onChange={(e) => setMatCatId(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.grade} — {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tujuan Pembelajaran</label>
                <textarea
                  rows={2}
                  required
                  value={matObj}
                  onChange={(e) => setMatObj(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Penjelasan Materi</label>
                <textarea
                  rows={4}
                  required
                  value={matExp}
                  onChange={(e) => setMatExp(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contoh Sehari-hari (pisahkan per baris)
                </label>
                <textarea
                  rows={3}
                  value={matExamples}
                  onChange={(e) => setMatExamples(e.target.value)}
                  placeholder="Contoh 1&#10;Contoh 2"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pertanyaan Refleksi Siswa</label>
                <input
                  type="text"
                  value={matReflection}
                  onChange={(e) => setMatReflection(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
              </div>

              <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={matPublished}
                  onChange={(e) => setMatPublished(e.target.checked)}
                />
                <span>Publikasikan langsung untuk siswa</span>
              </label>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>{editingMaterial ? 'Simpan Perubahan' : 'Tambah Materi'}</span>
              </button>
            </form>

            {/* Category Manager */}
            <form onSubmit={(e) => void handleSaveCategory(e)} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
              <h2 className="font-display text-base font-bold text-slate-900">Tambah Kategori Materi</h2>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="Nama kategori"
                  className="col-span-2 rounded-xl border border-slate-200 px-3 py-2 text-xs"
                />
                <select
                  value={catGrade}
                  onChange={(e) => setCatGrade(e.target.value as GradeLevel)}
                  className="rounded-xl border border-slate-200 px-2 py-2 text-xs bg-white"
                >
                  <option value="VII">Kelas VII</option>
                  <option value="VIII">Kelas VIII</option>
                  <option value="IX">Kelas IX</option>
                </select>
              </div>
              <input
                type="text"
                value={catDesc}
                onChange={(e) => setCatDesc(e.target.value)}
                placeholder="Deskripsi singkat kategori..."
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#0F1E3D] text-white text-xs font-semibold"
              >
                Simpan Kategori
              </button>
            </form>
          </div>

          {/* Materials Table */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-base font-bold text-slate-900">
              Daftar Materi ({materials.length})
            </h2>
            <div className="divide-y divide-slate-100 max-h-[680px] overflow-y-auto">
              {materials.map((mat) => (
                <div key={mat.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">
                      Kelas {mat.grade} · {mat.categoryName} · {mat.published ? 'Terbit' : 'Draft'}
                    </p>
                    <p className="text-sm font-semibold text-slate-900 truncate">{mat.title}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEditMaterial(mat)}
                      aria-label={`Edit ${mat.title}`}
                      className="p-2 rounded-lg text-slate-500 hover:text-sky-700 hover:bg-sky-50"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => void deleteMaterial(mat.id)}
                      aria-label={`Hapus ${mat.title}`}
                      className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: KELOLA INFO TERKINI */}
      {subTab === 'info' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <form onSubmit={(e) => void handleSaveArticle(e)} className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-base font-bold text-slate-900">
              {editingArticleId ? 'Edit Artikel Info Terkini' : 'Terbitkan Informasi Pendidikan Baru'}
            </h2>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Informasi</label>
              <input
                type="text"
                required
                value={artTitle}
                onChange={(e) => setArtTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kategori</label>
              <select
                value={artCat}
                onChange={(e) => setArtCat(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white"
              >
                <option>Penerimaan Murid Baru</option>
                <option>Beasiswa</option>
                <option>SMA & SMK</option>
                <option>Pendidikan Lanjutan</option>
                <option>Sekolah Kedinasan</option>
                <option>Lomba & Prestasi</option>
                <option>Profesi & Keterampilan Digital</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ringkasan</label>
              <textarea
                rows={2}
                required
                value={artSummary}
                onChange={(e) => setArtSummary(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Isi Lengkap</label>
              <textarea
                rows={4}
                required
                value={artContent}
                onChange={(e) => setArtContent(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Sumber Resmi</label>
              <input
                type="text"
                required
                value={artSourceName}
                onChange={(e) => setArtSourceName(e.target.value)}
                placeholder="Contoh: Kemendikdasmen RI"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tautan Resmi (.go.id / sekolah)</label>
              <input
                type="url"
                required
                value={artSourceUrl}
                onChange={(e) => setArtSourceUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={artPublished}
                onChange={(e) => setArtPublished(e.target.checked)}
              />
              <span>Publikasikan artikel</span>
            </label>
            <button type="submit" className="w-full py-2.5 rounded-xl bg-sky-600 text-white text-xs font-semibold">
              {editingArticleId ? 'Perbarui Informasi' : 'Terbitkan Informasi'}
            </button>
          </form>

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-base font-bold text-slate-900">
              Daftar Info Terkini ({articles.length})
            </h2>
            <div className="divide-y divide-slate-100">
              {articles.map((art) => (
                <div key={art.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">
                      {art.category} · {art.sourceName}
                    </p>
                    <p className="text-sm font-semibold text-slate-900 truncate">{art.title}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEditArticle(art)}
                      className="p-2 rounded-lg text-slate-500 hover:text-sky-700 hover:bg-sky-50"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => void deleteArticle(art.id)}
                      className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PENGUMUMAN & KONTEN BERANDA */}
      {subTab === 'pengumuman' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
            <h2 className="font-display text-base font-bold text-slate-900">Kelola Pengumuman</h2>
            <form onSubmit={(e) => void handleSaveAnnouncement(e)} className="space-y-3">
              <input
                type="text"
                required
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                placeholder="Judul pengumuman"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <textarea
                rows={3}
                required
                value={annMsg}
                onChange={(e) => setAnnMsg(e.target.value)}
                placeholder="Isi pesan pengumuman..."
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <div className="flex items-center justify-between gap-3">
                <select
                  value={annGrade}
                  onChange={(e) => setAnnGrade(e.target.value as 'Semua' | GradeLevel)}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-xs bg-white"
                >
                  <option value="Semua">Semua Kelas</option>
                  <option value="VII">Kelas VII</option>
                  <option value="VIII">Kelas VIII</option>
                  <option value="IX">Kelas IX</option>
                </select>
                <label className="flex items-center gap-2 text-xs">
                  <input type="checkbox" checked={annActive} onChange={(e) => setAnnActive(e.target.checked)} />
                  <span>Aktif</span>
                </label>
              </div>
              <button type="submit" className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold">
                Terbitkan Pengumuman
              </button>
            </form>

            <div className="divide-y divide-slate-100 pt-2">
              {announcements.map((a) => (
                <div key={a.id} className="py-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-900">
                      {a.title} · Kelas {a.targetGrade}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">{a.message}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void deleteAnnouncement(a.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={(e) => void handleSaveHome(e)} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-base font-bold text-slate-900">Kelola Konten Halaman Beranda</h2>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Utama Hero</label>
              <input
                type="text"
                required
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Subjudul Hero</label>
              <textarea
                rows={3}
                required
                value={heroSubheadline}
                onChange={(e) => setHeroSubheadline(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kutipan Motivasi</label>
              <textarea
                rows={2}
                required
                value={motivationQuote}
                onChange={(e) => setMotivationQuote(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Penulis Kutipan</label>
              <input
                type="text"
                required
                value={motivationAuthor}
                onChange={(e) => setMotivationAuthor(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tip Mingguan Beranda</label>
              <input
                type="text"
                required
                value={featuredTip}
                onChange={(e) => setFeaturedTip(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <button type="submit" className="px-4 py-2.5 rounded-xl bg-[#0F1E3D] text-white text-xs font-semibold">
              Simpan Konten Beranda
            </button>
          </form>
        </div>
      )}

      {/* TAB 5: AKUN SISWA & PERAN GURU BK */}
      {subTab === 'akun' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-base font-bold text-slate-900">
              Daftar Akun Terhubung ({allUsers.length})
            </h2>
            {allUsers.length === 0 ? (
              <p className="text-xs text-slate-500 bg-slate-50 rounded-xl p-4">
                Daftar akun live akan tampil saat Anda masuk menggunakan akun Google Admin/Guru BK.
              </p>
            ) : (
              <div className="divide-y divide-slate-100">
                {allUsers.map((u) => (
                  <div key={u.uid} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{u.name}</p>
                      <p className="text-xs text-slate-500 truncate">
                        {u.email} · UID: <span className="font-mono-tabular">{u.uid}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={u.grade}
                        disabled={effectiveRole !== 'admin'}
                        onChange={(e) =>
                          void updateStudentAccount(u.uid, e.target.value as GradeLevel | 'Staff', u.role)
                        }
                        className="rounded-lg border border-slate-200 px-2 py-1 text-xs bg-white"
                      >
                        <option value="VII">VII</option>
                        <option value="VIII">VIII</option>
                        <option value="IX">IX</option>
                        <option value="Staff">Staff</option>
                      </select>
                      <select
                        value={u.role}
                        disabled={effectiveRole !== 'admin'}
                        onChange={(e) =>
                          void updateStudentAccount(u.uid, u.grade, e.target.value as UserRole)
                        }
                        className="rounded-lg border border-slate-200 px-2 py-1 text-xs bg-white"
                      >
                        <option value="siswa">Siswa</option>
                        <option value="guru_bk">Guru BK</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h2 className="font-display text-base font-bold text-slate-900">Kelola Peran Guru BK & Admin</h2>
            <p className="text-xs text-slate-600">
              Hanya Administrator utama yang dapat menetapkan peran Guru BK pada tabel otorisasi tepercaya.
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!staffUid.trim() || !staffEmail.trim() || !staffName.trim()) return;
                await assignStaffRole(staffUid.trim(), staffEmail.trim(), staffName.trim(), staffRoleType);
                setStaffUid('');
                setStaffEmail('');
                setStaffName('');
                notify('Peran staf berhasil ditambahkan.');
              }}
              className="space-y-3"
            >
              <input
                type="text"
                required
                value={staffUid}
                onChange={(e) => setStaffUid(e.target.value)}
                placeholder="UID Pengguna Google"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
              />
              <input
                type="email"
                required
                value={staffEmail}
                onChange={(e) => setStaffEmail(e.target.value)}
                placeholder="Email Guru BK"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
              />
              <input
                type="text"
                required
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                placeholder="Nama Guru BK"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
              />
              <select
                value={staffRoleType}
                onChange={(e) => setStaffRoleType(e.target.value as 'guru_bk' | 'admin')}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs bg-white"
              >
                <option value="guru_bk">Guru BK</option>
                <option value="admin">Administrator</option>
              </select>
              <button
                type="submit"
                disabled={effectiveRole !== 'admin'}
                className="w-full py-2.5 rounded-xl bg-[#0F1E3D] disabled:bg-slate-300 text-white text-xs font-semibold"
              >
                Tetapkan Peran Staf
              </button>
            </form>

            {staffRoles.length > 0 && (
              <div className="divide-y divide-slate-100 pt-2">
                {staffRoles.map((sr) => (
                  <div key={sr.uid} className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-900">{sr.name}</p>
                      <p className="text-slate-500">
                        {sr.email} · {sr.role}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void removeStaffRole(sr.uid)}
                      className="text-rose-600 hover:underline"
                    >
                      Cabut
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function ReferralRow({
  referral,
  onUpdate,
}: {
  referral: CounselingReferral;
  onUpdate: (status: CounselingReferral['status'], note: string) => Promise<void>;
}) {
  const [status, setStatus] = useState<CounselingReferral['status']>(referral.status);
  const [note, setNote] = useState(referral.counselorNote);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-bold text-slate-900">
          {referral.userName} (Kelas {referral.grade}) · {referral.topic}
        </p>
        <span className="text-[11px] font-semibold text-sky-700 capitalize">Status: {referral.status}</span>
      </div>
      <p className="text-xs text-slate-700 leading-relaxed">{referral.studentSummary}</p>
      <div className="flex flex-col sm:flex-row gap-2 pt-1">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as CounselingReferral['status'])}
          className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs bg-white"
        >
          <option value="menunggu">Menunggu</option>
          <option value="ditindaklanjuti">Ditindaklanjuti</option>
          <option value="selesai">Selesai</option>
        </select>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Catatan tindak lanjut Guru BK..."
          className="flex-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs bg-white"
        />
        <button
          type="button"
          onClick={() => void onUpdate(status, note)}
          className="px-3.5 py-1.5 rounded-lg bg-[#0F1E3D] text-white text-xs font-semibold shrink-0"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}
