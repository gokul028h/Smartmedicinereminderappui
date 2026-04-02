import { NavLink } from 'react-router-dom';
import {
  Home,
  Pill,
  Calendar,
  BarChart3,
  Bell,
  Phone,
  User,
  Menu,
  X,
  LogOut,
  Sun,
  Moon,
  ChevronLeft,
  Heart,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/medicines', label: 'Medicines', icon: Pill },
  { to: '/reminders', label: 'Reminders', icon: Bell },
  { to: '/history', label: 'History', icon: Calendar },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/refills', label: 'Refills', icon: Bell },
  { to: '/emergency', label: 'Emergency', icon: Phone },
  { to: '/profile', label: 'Profile', icon: User },
];

export function Sidebar() {
  const { user, logout } = useAuthStore();
  const { theme, setTheme, sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-card border-r border-border shadow-sm z-40 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {sidebarOpen && (
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-foreground text-sm">MediCare+</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-accent transition-colors"
        >
          {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                } ${!sidebarOpen ? 'justify-center' : ''}`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground transition-colors ${
            !sidebarOpen ? 'justify-center' : ''
          }`}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {sidebarOpen && <span className="text-sm">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors ${
            !sidebarOpen ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
