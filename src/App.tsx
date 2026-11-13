/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { NavigationShell } from './components/NavigationShell';
import { LoginView } from './components/LoginView';
import { HomeView } from './components/HomeView';
import { MaterialsView } from './components/MaterialsView';
import { InfoTerkiniView } from './components/InfoTerkiniView';
import { ChatView } from './components/ChatView';
import { RiasecTestView } from './components/RiasecTestView';
import { ProfileView } from './components/ProfileView';
import { AdminDashboardView } from './components/AdminDashboardView';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

class AppErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full space-y-3 text-center">
            <h1 className="font-display text-lg font-bold text-slate-900">Terjadi Kendala Tampilan</h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              Aplikasi mengalami kendala sementara. Silakan muat ulang halaman untuk melanjutkan.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-xl bg-[#0F1E3D] text-white text-xs font-semibold"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function MainRouter() {
  const { activeTab } = useApp();

  switch (activeTab) {
    case 'beranda':
      return <HomeView />;
    case 'materi':
      return <MaterialsView />;
    case 'info':
      return <InfoTerkiniView />;
    case 'tanya-bk':
      return <ChatView />;
    case 'tes-minat':
      return <RiasecTestView />;
    case 'profil':
      return <ProfileView />;
    case 'admin':
      return <AdminDashboardView />;
    default:
      return <HomeView />;
  }
}

function AppGate() {
  const { authReady, hasEnteredSession } = useApp();

  if (!authReady) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center space-y-2">
          <p className="font-display text-lg font-bold text-slate-900">BICARA BK</p>
          <p className="text-xs text-slate-500">Menyiapkan layanan SMPN Wonogiri...</p>
        </div>
      </div>
    );
  }

  if (!hasEnteredSession) {
    return <LoginView />;
  }

  return (
    <NavigationShell>
      <MainRouter />
    </NavigationShell>
  );
}

export default function App() {
  return (
    <AppErrorBoundary>
      <AppProvider>
        <AppGate />
      </AppProvider>
    </AppErrorBoundary>
  );
}
