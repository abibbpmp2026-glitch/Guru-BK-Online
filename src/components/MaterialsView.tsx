import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Search,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { CareerMaterial, GradeLevel } from '../types/bicara';
import { SafeImage } from './SafeImage';

export function MaterialsView() {
  const {
    materials,
    quizzes,
    categories,
    profile,
    quizResults,
    selectedMaterialId,
    setSelectedMaterialId,
    saveQuizCompletion,
  } = useApp();

  const [gradeFilter, setGradeFilter] = useState<'Semua' | GradeLevel>('Semua');
  const [categoryFilter, setCategoryFilter] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const publishedMaterials = useMemo(() => materials.filter((m) => m.published), [materials]);

  const filteredMaterials = useMemo(() => {
    return publishedMaterials.filter((mat) => {
      if (gradeFilter !== 'Semua' && mat.grade !== gradeFilter) return false;
      if (categoryFilter !== 'Semua' && mat.categoryId !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          mat.title.toLowerCase().includes(q) ||
          mat.learningObjective.toLowerCase().includes(q) ||
          mat.categoryName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [publishedMaterials, gradeFilter, categoryFilter, searchQuery]);

  const selectedMaterial = useMemo(
    () => publishedMaterials.find((m) => m.id === selectedMaterialId) || null,
    [publishedMaterials, selectedMaterialId]
  );

  const completedCount = profile.completedMaterialIds.length;
  const totalCount = publishedMaterials.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const availableCategories = useMemo(() => {
    if (gradeFilter === 'Semua') return categories;
    return categories.filter((c) => c.grade === gradeFilter);
  }, [categories, gradeFilter]);

  if (selectedMaterial) {
    const quiz = quizzes.find((q) => q.materialId === selectedMaterial.id);
    const existingResult = quizResults.find((r) => r.materialId === selectedMaterial.id);
    return (
      <MaterialDetail
        material={selectedMaterial}
        questions={quiz?.questions || []}
        existingScore={existingResult?.score}
        existingReflection={existingResult?.reflectionNote || ''}
        isCompleted={profile.completedMaterialIds.includes(selectedMaterial.id)}
        onBack={() => setSelectedMaterialId(null)}
        onSave={async (score, totalQuestions, reflectionNote, markCompleted) => {
          await saveQuizCompletion({
            material: selectedMaterial,
            score,
            totalQuestions,
            reflectionNote,
            markCompleted,
          });
        }}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Header + Progress */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <p className="text-xs font-semibold text-sky-700">PERPUSTAKAAN BIMBINGAN KARIER</p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Materi Bimbingan Karier SMP
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Pelajari modul terstruktur dari Kelas VII hingga IX. Setiap materi dilengkapi contoh sehari-hari,
            refleksi pribadi, dan kuis interaktif 5 soal beserta pembahasannya.
          </p>
        </div>

        <div className="md:w-64 shrink-0 bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs font-medium text-slate-600">
            <span>Progres Penyelesaian</span>
            <span className="font-mono-tabular font-semibold text-slate-900">
              {completedCount}/{totalCount} ({progressPct}%)
            </span>
          </div>
          <div className="mt-2.5 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-600 rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-fit max-w-full overflow-x-auto">
          {(
            [
              { id: 'Semua', label: 'Semua Jenjang' },
              { id: 'VII', label: 'Kelas VII · Mengenal Diri' },
              { id: 'VIII', label: 'Kelas VIII · Eksplorasi Karier' },
              { id: 'IX', label: 'Kelas IX · Masa Depan' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setGradeFilter(tab.id);
                setCategoryFilter('Semua');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                gradeFilter === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul materi, topik, atau tujuan belajar..."
              aria-label="Cari materi bimbingan karier"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter kategori materi"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white focus:outline-none focus:border-sky-500"
            >
              <option value="Semua">Semua Kategori</option>
              {availableCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  Kelas {cat.grade} — {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      {filteredMaterials.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" aria-hidden="true" />
          <p className="font-display text-base font-bold text-slate-800">Materi belum ditemukan</p>
          <p className="text-sm text-slate-500">
            Coba ubah kata kunci pencarian atau pilih jenjang kelas lainnya.
          </p>
          <button
            type="button"
            onClick={() => {
              setGradeFilter('Semua');
              setCategoryFilter('Semua');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700"
          >
            Tampilkan Semua Materi
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMaterials.map((mat) => {
            const done = profile.completedMaterialIds.includes(mat.id);
            const result = quizResults.find((r) => r.materialId === mat.id);
            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => setSelectedMaterialId(mat.id)}
                className="group text-left bg-white border border-slate-200 hover:border-sky-300 rounded-2xl overflow-hidden flex flex-col transition-all hover:-translate-y-0.5"
              >
                <div className="h-44 bg-slate-100 relative overflow-hidden">
                  <SafeImage src={mat.imageUrl} alt={mat.title} fallbackTitle={mat.title} />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500">
                      Kelas {mat.grade} · {mat.categoryName}
                      {done ? ' · Selesai' : ''}
                    </p>
                    <h2 className="font-display text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                      {mat.title}
                    </h2>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {mat.learningObjective}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    {done ? (
                      <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                        <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                        <span>Selesai {result ? `(Skor ${result.score}%)` : ''}</span>
                      </span>
                    ) : (
                      <span className="font-medium text-slate-500">5 Soal Kuis & Refleksi</span>
                    )}
                    <span className="inline-flex items-center gap-1 font-semibold text-sky-700">
                      <span>Pelajari</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

interface MaterialDetailProps {
  material: CareerMaterial;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  existingScore?: number;
  existingReflection: string;
  isCompleted: boolean;
  onBack: () => void;
  onSave: (score: number, totalQuestions: number, reflectionNote: string, markCompleted: boolean) => Promise<void>;
}

function MaterialDetail({
  material,
  questions,
  existingScore,
  existingReflection,
  isCompleted,
  onBack,
  onSave,
}: MaterialDetailProps) {
  const [reflectionNote, setReflectionNote] = useState(existingReflection);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    setReflectionNote(existingReflection);
    setAnswers({});
    setQuizSubmitted(false);
    setSaveMessage(null);
  }, [material.id, existingReflection]);

  const correctCount = questions.reduce((acc, q, idx) => {
    return answers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const computedScore =
    questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : existingScore ?? 100;

  const allAnswered = questions.length === 0 || questions.every((_, idx) => answers[idx] !== undefined);

  const handleSubmitQuiz = async () => {
    if (!allAnswered) return;
    setQuizSubmitted(true);
    setSaving(true);
    try {
      await onSave(computedScore, Math.max(1, questions.length), reflectionNote, isCompleted);
      setSaveMessage(`Kuis diperiksa! Skormu ${computedScore}% (${correctCount}/${questions.length} benar).`);
    } finally {
      setSaving(false);
    }
  };

  const handleMarkCompleted = async () => {
    setSaving(true);
    try {
      const scoreToSave = quizSubmitted
        ? computedScore
        : existingScore !== undefined
          ? existingScore
          : 0;
      await onSave(scoreToSave, Math.max(1, questions.length), reflectionNote, true);
      setSaveMessage('Materi ditandai selesai dan refleksimu telah disimpan!');
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-sky-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        <span>Kembali ke Daftar Materi</span>
      </button>

      {/* Main Content Card */}
      <article className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="h-56 sm:h-72 bg-slate-100">
          <SafeImage src={material.imageUrl} alt={material.title} fallbackTitle={material.title} />
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-500">
              Kelas {material.grade} · {material.categoryName} ·{' '}
              {isCompleted ? 'Sudah Selesai' : 'Belum Selesai'}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
              {material.title}
            </h1>
          </div>

          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 sm:p-5">
            <p className="text-xs font-semibold text-sky-900">Tujuan Pembelajaran</p>
            <p className="text-sm text-slate-800 mt-1 leading-relaxed">{material.learningObjective}</p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-bold text-slate-900">Penjelasan Materi</h2>
            <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
              {material.explanation}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Contoh dalam Kehidupan Sehari-hari
            </h2>
            <ul className="space-y-2.5">
              {material.dailyExamples.map((example, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-slate-700 bg-slate-50 border border-slate-200/80 rounded-xl p-3.5"
                >
                  <span className="font-mono-tabular text-xs font-bold text-sky-700 mt-0.5 shrink-0">
                    0{idx + 1}.
                  </span>
                  <span className="leading-relaxed">{example}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      {/* Reflection Card */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-violet-700">AKTIVITAS REFLEKSI SISWA</p>
          <h2 className="font-display text-lg font-bold text-slate-900">Renungkan & Tuliskan Pikiranmu</h2>
          <p className="text-sm text-slate-700 leading-relaxed">{material.reflectionPrompt}</p>
        </div>

        <textarea
          rows={4}
          value={reflectionNote}
          onChange={(e) => setReflectionNote(e.target.value)}
          maxLength={2000}
          placeholder="Tuliskan refleksimu di sini (disimpan ke progres belajarmu)..."
          className="w-full rounded-xl border border-slate-200 p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-violet-500"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-500 font-mono-tabular">{reflectionNote.length}/2000 karakter</span>
          <button
            type="button"
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              try {
                await onSave(
                  quizSubmitted ? computedScore : existingScore ?? 0,
                  Math.max(1, questions.length),
                  reflectionNote,
                  isCompleted
                );
                setSaveMessage('Catatan refleksimu berhasil disimpan.');
              } finally {
                setSaving(false);
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-xs font-semibold transition-colors"
          >
            <Send className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Simpan Refleksi</span>
          </button>
        </div>
      </section>

      {/* Interactive 5-Question Quiz */}
      {questions.length > 0 && (
        <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-sky-700">KUIS INTERAKTIF ({questions.length} SOAL)</p>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Uji Pemahaman & Pembahasan
              </h2>
            </div>
            {quizSubmitted && (
              <div className="px-4 py-2 rounded-xl bg-sky-50 border border-sky-200 text-sm font-bold text-sky-900 font-mono-tabular">
                Skor: {computedScore}% ({correctCount}/{questions.length})
              </div>
            )}
          </div>

          <div className="space-y-6">
            {questions.map((q, qIdx) => {
              const selected = answers[qIdx];
              const isCorrect = selected === q.correctIndex;
              return (
                <div key={q.id} className="space-y-3 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0">
                  <p className="text-sm sm:text-base font-semibold text-slate-900">
                    <span className="font-mono-tabular text-sky-700 mr-2">{qIdx + 1}.</span>
                    {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const chosen = selected === optIdx;
                      let optionStyle =
                        'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
                      if (quizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          optionStyle = 'border-emerald-400 bg-emerald-50 text-emerald-950 font-medium';
                        } else if (chosen && optIdx !== q.correctIndex) {
                          optionStyle = 'border-rose-300 bg-rose-50 text-rose-900';
                        } else {
                          optionStyle = 'border-slate-200 bg-slate-50 text-slate-500';
                        }
                      } else if (chosen) {
                        optionStyle = 'border-sky-500 bg-sky-50 text-sky-950 font-medium';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() => setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))}
                          className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors flex items-start gap-3 ${optionStyle}`}
                        >
                          <span className="font-mono-tabular text-xs font-bold mt-0.5 shrink-0">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div
                      className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-amber-50 border-amber-200 text-amber-950'
                      }`}
                    >
                      <p className="font-bold mb-1">
                        {isCorrect ? 'Jawaban Tepat!' : `Kurang tepat. Jawaban benar: ${String.fromCharCode(65 + q.correctIndex)}.`}
                      </p>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            {!quizSubmitted ? (
              <button
                type="button"
                disabled={!allAnswered || saving}
                onClick={() => void handleSubmitQuiz()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
              >
                <HelpCircle className="w-4 h-4" aria-hidden="true" />
                <span>Periksa Jawaban Kuis</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setQuizSubmitted(false);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Ulangi Kuis</span>
              </button>
            )}

            <button
              type="button"
              disabled={saving}
              onClick={() => void handleMarkCompleted()}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-[#0F1E3D] hover:bg-slate-800 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>{isCompleted ? 'Materi Sudah Selesai' : 'Tandai Selesai'}</span>
            </button>
          </div>
        </section>
      )}

      {saveMessage && (
        <div
          role="status"
          className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl px-4 py-3 text-sm font-medium"
        >
          {saveMessage}
        </div>
      )}
    </motion.div>
  );
}
