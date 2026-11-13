import React, { useState } from 'react';
import {
  BookOpen,
  Compass,
  Home,
  LogIn,
  LogOut,
  Menu,
  MessageCircle,
  Newspaper,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NavTab } from '../types/bicara';

interface NavItem {
  id: NavTab;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  staffOnly?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'beranda', label: 'Beranda', shortLabel: 'Beranda', icon: Home },
  { id: 'materi', label: 'Materi Karier', shortLabel: 'Materi', icon: BookOpen },
  { id: 'info', label: 'Info Terkini', shortLabel: 'Info', icon: Newspaper },
  { id: 'tanya-bk', label: 'Sahabat BK AI', shortLabel: 'Tanya BK', icon: MessageCircle },
  { id: 'tes-minat', label: 'Tes Minat & Bakat', shortLabel: 'Minat', icon: Compass },
  { id: 'profil', label: 'Profil Saya', shortLabel: 'Profil', icon: User },
  { id: 'admin', label: 'Dashboard Guru BK', shortLabel: 'Guru BK', icon: ShieldCheck, staffOnly: true },
];

export function NavigationShell({ children }: { children: React.ReactNode }) {
  const {
    activeTab,
    setActiveTab,
    setSelectedMaterialId,
    profile,
    effectiveRole,
    firebaseUser,
    signInWithGoogle,
    signOut,
    authError,
    clearAuthError,
    demoAdminPreview,
    setDemoAdminPreview,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isStaff = effectiveRole === 'admin' || effectiveRole === 'guru_bk';
  const visibleItems = NAV_ITEMS.filter((item) => !item.staffOnly || isStaff);
  const mobileBottomItems = visibleItems.slice(0, 5);

  const navigate = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab !== 'materi') {
      setSelectedMaterialId(null);
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row">
      {/* Desktop Sidebar (260px) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[264px] lg:fixed lg:inset-y-0 bg-[#0F1E3D] text-white border-r border-slate-800/60 z-30">
        <div className="px-6 py-6 border-b border-white/10">
          <button
            type="button"
            onClick={() => navigate('beranda')}
            className="flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-sky-400 rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-violet-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-tight text-white block leading-tight whitespace-nowrap">
                BICARA BK
              </span>
              <span className="text-xs text-sky-200/80 block leading-tight mt-0.5">
                SMPN Wonogiri
              </span>
            </div>
          </button>
        </div>

        <nav aria-label="Menu Utama" className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-sky-400 ${
                  active
                    ? 'bg-sky-500/20 text-white border border-sky-400/40'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-sky-300' : 'text-slate-400'}`} aria-hidden="true" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs font-semibold text-white truncate">{profile.name}</p>
            <p className="text-xs text-sky-200/80 truncate mt-0.5">
              {profile.grade === 'Staff' ? 'Guru BK / Admin' : `Kelas ${profile.grade}`} ·{' '}
              {firebaseUser ? 'Akun Terhubung' : 'Mode Demo'}
            </p>
          </div>

          {firebaseUser ? (
            <button
              type="button"
              onClick={() => void signOut()}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors whitespace-nowrap"
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Keluar Akun</span>
            </button>
          ) : (
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => void signInWithGoogle()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 transition-colors whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Masuk dengan Google</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const next = !demoAdminPreview;
                  setDemoAdminPreview(next);
                  if (next) navigate('admin');
                  else if (activeTab === 'admin') navigate('beranda');
                }}
                className="w-full px-3 py-1.5 rounded-lg text-[11px] font-medium text-sky-200 hover:text-white hover:bg-white/5 transition-colors text-center"
              >
                {demoAdminPreview ? 'Kembali ke Mode Siswa' : 'Pratinjau Mode Guru BK'}
              </button>
              <button
                type="button"
                onClick={() => void signOut()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors whitespace-nowrap"
              >
                <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Ganti Siswa / Keluar</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Top Header (compact, <= 56px) */}
      <header className="lg:hidden sticky top-0 z-30 bg-[#0F1E3D] text-white border-b border-slate-800 px-4 h-14 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate('beranda')}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-violet-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <span className="font-display text-base font-bold tracking-tight">BICARA BK</span>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          {!firebaseUser ? (
            <button
              type="button"
              onClick={() => void signInWithGoogle()}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-xs font-semibold text-white whitespace-nowrap"
            >
              Masuk
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate('profil')}
              className="px-2.5 py-1 rounded-lg bg-white/10 text-xs font-medium text-white truncate max-w-[120px]"
            >
              {profile.name.split(' ')[0]}
            </button>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Buka menu navigasi"
            className="p-2 rounded-lg text-slate-200 hover:bg-white/10 min-w-[40px] min-h-[40px] flex items-center justify-center"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/60"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative ml-auto w-72 max-w-[85vw] bg-[#0F1E3D] text-white h-full flex flex-col p-5 z-10">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-display font-bold text-base">Menu BICARA BK</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Tutup menu"
                className="p-2 rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
              {visibleItems.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigate(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium ${
                      active ? 'bg-sky-500/20 text-white' : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-white/10 space-y-2">
              {firebaseUser ? (
                <button
                  type="button"
                  onClick={() => {
                    void signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 text-xs font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar Akun</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      void signInWithGoogle();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-sky-600 text-xs font-semibold"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Masuk dengan Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const next = !demoAdminPreview;
                      setDemoAdminPreview(next);
                      setMobileMenuOpen(false);
                      if (next) navigate('admin');
                      else if (activeTab === 'admin') navigate('beranda');
                    }}
                    className="w-full py-2 rounded-xl bg-white/5 text-xs text-sky-200"
                  >
                    {demoAdminPreview ? 'Kembali ke Mode Siswa' : 'Pratinjau Mode Guru BK'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      void signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 text-xs font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Ganti Siswa / Keluar</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-[264px] pb-20 lg:pb-10 min-w-0">
        {authError && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-xs text-amber-900 flex items-center justify-between gap-4">
            <span>{authError}</span>
            <button
              type="button"
              onClick={clearAuthError}
              className="font-semibold underline hover:no-underline shrink-0"
            >
              Tutup
            </button>
          </div>
        )}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation (5 items, <= 56px height) */}
      <nav
        aria-label="Navigasi Bawah"
        className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-slate-200 h-14 grid grid-cols-5"
      >
        {mobileBottomItems.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors ${
                active ? 'text-sky-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-sky-600' : ''}`} aria-hidden="true" />
              <span className="truncate max-w-[64px]">{item.shortLabel}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
