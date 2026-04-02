import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Sidebar } from './Sidebar';
import { useUIStore } from '../../store/uiStore';
import { useEffect } from 'react';

export function AppLayout() {
  const { isMobile, setIsMobile, sidebarOpen } = useUIStore();
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobile]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && <Sidebar />}

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          !isMobile && sidebarOpen ? 'lg:ml-64' : !isMobile ? 'lg:ml-20' : ''
        }`}
      >
        <div className={`${isMobile ? 'pb-20' : ''}`}>
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && <BottomNav />}
    </div>
  );
}
