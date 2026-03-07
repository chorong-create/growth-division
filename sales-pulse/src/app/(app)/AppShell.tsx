'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MobileHeader from '@/components/layout/MobileHeader';

export default function AppShell({ email, children }: { email: string; children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar email={email} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MobileHeader onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <main className="md:ml-60 pt-14 md:pt-0 min-h-screen">
        <div className="max-w-[1280px] mx-auto p-4 md:p-6">
          {children}
        </div>
      </main>
    </>
  );
}
