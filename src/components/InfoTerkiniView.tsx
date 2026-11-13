import { useMemo, useState } from 'react';
import { ExternalLink, Newspaper, Search, ShieldAlert, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { InfoArticle } from '../types/bicara';
import { SafeImage } from './SafeImage';

export function InfoTerkiniView() {
  const { articles } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activeArticle, setActiveArticle] = useState<InfoArticle | null>(null);

  const publishedArticles = useMemo(() => articles.filter((a) => a.published), [articles]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(publishedArticles.map((a) => a.category)));
    return ['Semua', ...unique];
  }, [publishedArticles]);

  const filtered = useMemo(() => {
    return publishedArticles.filter((art) => {
      if (selectedCategory !== 'Semua' && art.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          art.title.toLowerCase().includes(q) ||
          art.summary.toLowerCase().includes(q) ||
          art.sourceName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [publishedArticles, selectedCategory, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-sky-700">PUSAT INFORMASI PENDIDIKAN & KARIER</p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">Info Terkini</h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Kumpulan informasi pendidikan lanjutan SMA/SMK/MA, program beasiswa, sekolah kedinasan,
            lomba resmi, serta keterampilan masa depan yang dikelola langsung oleh Guru BK dan Admin sekolah.
          </p>
        </div>

        <div className="bg-sky-50 border border-sky-200 rounded-xl p-3.5 flex items-start gap-3 text-xs text-sky-950">
          <ShieldAlert className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" aria-hidden="true" />
          <p className="leading-relaxed">
            <strong>Prinsip Verifikasi Sumber:</strong> Informasi pada halaman ini dikurasi oleh Admin Sekolah/Guru BK
            dengan merujuk pada portal resmi pemerintah dan lembaga penyelenggara. Jadwal dan persyaratan resmi
            dapat berubah setiap tahun—selalu cek tautan sumber resmi yang tercantum pada masing-masing artikel.
          </p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4">
        <div className="relative">
          <Search
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari informasi PPDB/SPMB, beasiswa, SMK, lomba, atau lembaga sumber..."
            aria-label="Cari informasi terkini"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#0F1E3D] text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-2">
          <Newspaper className="w-10 h-10 text-slate-300 mx-auto" aria-hidden="true" />
          <p className="font-display text-base font-bold text-slate-800">Belum ada informasi yang cocok</p>
          <p className="text-sm text-slate-500">Ubah kata kunci pencarian atau pilih kategori lain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((art) => (
            <article
              key={art.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-sky-300 transition-colors"
            >
              <div>
                <div className="h-44 bg-slate-100">
                  <SafeImage src={art.imageUrl} alt={art.title} fallbackTitle={art.category} />
                </div>
                <div className="p-5 space-y-2.5">
                  <p className="text-xs text-slate-500">
                    {art.category} · {art.updatedAtLabel}
                  </p>
                  <h2 className="font-display text-base font-bold text-slate-900 leading-snug">
                    {art.title}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{art.summary}</p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] font-medium text-slate-500 truncate">{art.sourceName}</span>
                <button
                  type="button"
                  onClick={() => setActiveArticle(art)}
                  className="text-xs font-semibold text-sky-700 hover:underline whitespace-nowrap shrink-0"
                >
                  Baca Lengkap
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
        >
          <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between gap-4 z-10">
              <p className="text-xs font-semibold text-sky-700 truncate">
                {activeArticle.category} · {activeArticle.publishedDateLabel}
              </p>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label="Tutup artikel"
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="h-52 rounded-xl overflow-hidden bg-slate-100">
                <SafeImage
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  fallbackTitle={activeArticle.title}
                />
              </div>

              <h2 id="article-modal-title" className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                {activeArticle.title}
              </h2>

              <div className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line space-y-3">
                {activeArticle.content}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-500">Sumber Resmi Informasi</p>
                  <p className="text-sm font-semibold text-slate-900">{activeArticle.sourceName}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{activeArticle.publishedDateLabel}</p>
                </div>
                {activeArticle.sourceUrl && (
                  <a
                    href={activeArticle.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F1E3D] hover:bg-slate-800 text-white text-xs font-semibold whitespace-nowrap shrink-0"
                  >
                    <span>Kunjungi Situs Resmi</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
