import { useMemo, useState } from 'react';
import { CheckCircle2, Compass, Info, RotateCcw, Save } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { RIASEC_PROFILES, RIASEC_QUESTIONS } from '../data/riasecData';
import { RiasecCode, RiasecScores } from '../types/bicara';

const SCALE_LABELS: { value: number; label: string }[] = [
  { value: 1, label: 'Sangat Tidak Sesuai' },
  { value: 2, label: 'Kurang Sesuai' },
  { value: 3, label: 'Netral' },
  { value: 4, label: 'Sesuai' },
  { value: 5, label: 'Sangat Sesuai' },
];

const RIASEC_CODES: RiasecCode[] = ['R', 'I', 'A', 'S', 'E', 'C'];

export function RiasecTestView() {
  const { explorations, saveRiasecResult } = useApp();

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentResult, setCurrentResult] = useState<{
    scores: RiasecScores;
    topThree: RiasecCode[];
    saved: boolean;
  } | null>(() => {
    if (explorations.length > 0) {
      return {
        scores: explorations[0].scores,
        topThree: explorations[0].topThree,
        saved: true,
      };
    }
    return null;
  });
  const [isEditingQuiz, setIsEditingQuiz] = useState(explorations.length === 0);
  const [saving, setSaving] = useState(false);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = RIASEC_QUESTIONS.length;
  const progressPct = Math.round((answeredCount / totalQuestions) * 100);
  const allAnswered = answeredCount === totalQuestions;

  const computedPreview = useMemo(() => {
    const scores: RiasecScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    RIASEC_QUESTIONS.forEach((q) => {
      scores[q.code] += answers[q.id] || 0;
    });
    const sorted = [...RIASEC_CODES].sort((a, b) => scores[b] - scores[a]);
    return {
      scores,
      topThree: sorted.slice(0, 3),
    };
  }, [answers]);

  const handleCalculateResult = () => {
    if (!allAnswered) return;
    setCurrentResult({
      scores: computedPreview.scores,
      topThree: computedPreview.topThree,
      saved: false,
    });
    setIsEditingQuiz(false);
    setSaveNotice(null);
  };

  const handleSaveResult = async () => {
    if (!currentResult) return;
    setSaving(true);
    try {
      await saveRiasecResult(currentResult.scores, currentResult.topThree, totalQuestions);
      setCurrentResult({ ...currentResult, saved: true });
      setSaveNotice('Hasil eksplorasi minat RIASEC berhasil disimpan ke profilmu!');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setIsEditingQuiz(true);
    setSaveNotice(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Header + Disclaimer */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-violet-700">EKSPLORASI MINAT KARIER RIASEC</p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Tes Minat dan Bakat
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Jawab 24 pernyataan singkat berikut dengan jujur sesuai hal yang paling kamu nikmati
              sebagai siswa SMP untuk memetakan kecenderungan minat Realistic, Investigative,
              Artistic, Social, Enterprising, dan Conventional.
            </p>
          </div>
          {!isEditingQuiz && (
            <button
              type="button"
              onClick={handleReset}
              className="self-start inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Ulangi Tes</span>
            </button>
          )}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-950">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">
            <strong>Catatan Penting:</strong> Hasil kuis ini merupakan <strong>alat eksplorasi awal</strong> untuk
            membantumu mengenali minat dan pilihan aktivitas, bukan tes psikologi profesional maupun
            penentu mutlak masa depanmu. Diskusikan hasilnya bersama Guru BK dan orang tua.
          </p>
        </div>
      </div>

      {/* Interactive 24-Question Form */}
      {isEditingQuiz && (
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sticky top-16 lg:top-4 z-20">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Progres Pengisian Kuesioner</span>
              <span className="font-mono-tabular">
                {answeredCount}/{totalQuestions} pernyataan ({progressPct}%)
              </span>
            </div>
            <div className="mt-2 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-600 rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {RIASEC_QUESTIONS.map((item, idx) => {
              const selected = answers[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-3"
                >
                  <p className="text-sm sm:text-base font-semibold text-slate-900">
                    <span className="font-mono-tabular text-sky-700 mr-2">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    {item.statement}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {SCALE_LABELS.map((opt) => {
                      const active = selected === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setAnswers((prev) => ({ ...prev, [item.id]: opt.value }))}
                          className={`px-3 py-2.5 rounded-xl border text-xs font-medium transition-colors text-center ${
                            active
                              ? 'bg-[#0F1E3D] border-[#0F1E3D] text-white font-semibold'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-sky-50 hover:border-sky-300'
                          }`}
                        >
                          <span className="font-mono-tabular block text-sm font-bold">{opt.value}</span>
                          <span className="block text-[11px] mt-0.5 leading-tight">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-slate-600">
              {allAnswered
                ? 'Semua 24 pernyataan sudah terjawab! Klik tombol di samping untuk melihat peta minatmu.'
                : `Jawab ${totalQuestions - answeredCount} pernyataan lagi untuk melihat hasil analisis RIASEC.`}
            </p>
            <button
              type="button"
              disabled={!allAnswered}
              onClick={handleCalculateResult}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors whitespace-nowrap"
            >
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>Lihat Hasil Eksplorasi</span>
            </button>
          </div>
        </div>
      )}

      {/* Results View */}
      {!isEditingQuiz && currentResult && (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-sky-700">3 KELOMPOK MINAT TERTINGGIMU</p>
              <h2 className="font-display text-xl font-bold text-slate-900 mt-0.5">
                {currentResult.topThree.map((code) => RIASEC_PROFILES[code].name).join(' · ')}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                disabled={saving || currentResult.saved}
                onClick={() => void handleSaveResult()}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  currentResult.saved
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-[#0F1E3D] hover:bg-slate-800 text-white'
                }`}
              >
                {currentResult.saved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                    <span>Tersimpan di Profil</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" aria-hidden="true" />
                    <span>Simpan Hasil ke Profil</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Ulangi Tes</span>
              </button>
            </div>
          </div>

          {saveNotice && (
            <div role="status" className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl px-4 py-3 text-xs font-semibold">
              {saveNotice}
            </div>
          )}

          {/* Chart & Score Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center">
              <h3 className="font-display text-base font-bold text-slate-900 mb-2 self-start">
                Diagram Peta Minat RIASEC
              </h3>
              <RiasecRadarChart scores={currentResult.scores} />
            </div>

            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
              <h3 className="font-display text-base font-bold text-slate-900">
                Rincian Skor 6 Kelompok Minat (Skala Maks. 20)
              </h3>
              <div className="space-y-3.5">
                {[...RIASEC_CODES]
                  .sort((a, b) => currentResult.scores[b] - currentResult.scores[a])
                  .map((code) => {
                    const info = RIASEC_PROFILES[code];
                    const score = currentResult.scores[code];
                    const pct = Math.round((score / 20) * 100);
                    const isTop = currentResult.topThree.includes(code);
                    return (
                      <div key={code} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-900">
                            {info.indonesianTitle}
                            {isTop ? ' · Teratas' : ''}
                          </span>
                          <span className="font-mono-tabular font-bold text-slate-800">
                            {score} / 20 ({pct}%)
                          </span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${pct}%`, backgroundColor: info.accentHex }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Top 3 Detailed Recommendations */}
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900">
              Eksplorasi Aktivitas, Jalur Pendidikan & Profesi untuk 3 Minat Teratasmu
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {currentResult.topThree.map((code, rank) => {
                const info = RIASEC_PROFILES[code];
                return (
                  <article
                    key={code}
                    className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-sky-700">
                          Peringkat {rank + 1} · Kode {code}
                        </p>
                        <h3 className="font-display text-lg font-bold text-slate-900 mt-0.5">
                          {info.indonesianTitle}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{info.description}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 space-y-1.5">
                        <p className="text-xs font-bold text-slate-900">Aktivitas & Ekstrakurikuler</p>
                        <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                          {info.schoolActivities.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-slate-100 space-y-1.5">
                        <p className="text-xs font-bold text-slate-900">Bidang Pendidikan Lanjutan</p>
                        <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                          {info.educationPaths.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-slate-100 space-y-1.5">
                        <p className="text-xs font-bold text-slate-900">Contoh Profesi untuk Dieksplorasi</p>
                        <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                          {info.exampleProfessions.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 bg-slate-50 rounded-xl p-3 space-y-1">
                      <p className="text-xs font-bold text-violet-800">Rekomendasi Pengembangan Diri</p>
                      {info.selfDevRecommendations.map((rec) => (
                        <p key={rec} className="text-xs text-slate-700 leading-relaxed">
                          • {rec}
                        </p>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function RiasecRadarChart({ scores }: { scores: RiasecScores }) {
  const cx = 150;
  const cy = 145;
  const maxR = 95;
  const codes: RiasecCode[] = ['R', 'I', 'A', 'S', 'E', 'C'];

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / codes.length - Math.PI / 2;
    const radius = (value / 20) * maxR;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  };

  const rings = [5, 10, 15, 20];
  const polygonPoints = codes
    .map((code, i) => {
      const pt = getPoint(i, scores[code]);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 300 290" className="w-full max-w-[290px]" role="img" aria-label="Diagram Radar Skor Minat RIASEC">
      {rings.map((ring) => {
        const pts = codes
          .map((_, i) => {
            const p = getPoint(i, ring);
            return `${p.x},${p.y}`;
          })
          .join(' ');
        return (
          <polygon
            key={ring}
            points={pts}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
        );
      })}

      {codes.map((code, i) => {
        const end = getPoint(i, 20);
        const labelPos = getPoint(i, 24);
        return (
          <g key={code}>
            <line x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="#E2E8F0" strokeWidth="1" />
            <text
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-slate-700 text-[11px] font-bold"
            >
              {RIASEC_PROFILES[code].name}
            </text>
          </g>
        );
      })}

      <polygon
        points={polygonPoints}
        fill="rgba(124, 58, 237, 0.22)"
        stroke="#7C3AED"
        strokeWidth="2.5"
      />

      {codes.map((code, i) => {
        const pt = getPoint(i, scores[code]);
        return <circle key={code} cx={pt.x} cy={pt.y} r="4" fill="#0F1E3D" stroke="#FFFFFF" strokeWidth="1.5" />;
      })}
    </svg>
  );
}
