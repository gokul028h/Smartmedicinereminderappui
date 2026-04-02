import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Globe, Settings, LogOut, ChevronRight, Edit, Shield, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import { ThemeToggle } from '../../components/shared/ThemeToggle';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { theme } = useUIStore();

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to logout?')) return;
    await logout();
    navigate('/login');
  };

  const settingsOptions = [
    { id: 'edit', label: 'Manage Profile', desc: 'Update your information', icon: Edit, color: 'text-emerald-500' },
    { id: 'notifications', label: 'Notifications', desc: 'Manage alerts & reminders', icon: Bell, color: 'text-blue-500' },
    { id: 'security', label: 'Security', desc: 'Password & authentication', icon: Shield, color: 'text-violet-500' },
    { id: 'language', label: 'Language', desc: 'English (US)', icon: Globe, color: 'text-cyan-500' },
    { id: 'settings', label: 'App Settings', desc: 'Privacy, data & more', icon: Settings, color: 'text-gray-500' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white p-6 pb-10">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-6 hover:opacity-80 text-sm">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>

          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl font-bold">
              {(user?.name || 'U').charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.name || 'User'}</h1>
              <p className="text-white/70 text-sm">{user?.email || 'user@example.com'}</p>
              {user?.phone && <p className="text-white/60 text-xs mt-0.5">{user.phone}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 -mt-4 space-y-6 pb-8">
        {/* Theme */}
        <div className="bg-card rounded-2xl shadow-sm p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? <Moon className="w-5 h-5 text-violet-500" /> : <Sun className="w-5 h-5 text-amber-500" />}
            <span className="font-medium text-sm">Appearance</span>
          </div>
          <ThemeToggle />
        </div>

        {/* Settings */}
        <div className="bg-card rounded-2xl shadow-sm overflow-hidden">
          {settingsOptions.map((option, i) => {
            const Icon = option.icon;
            return (
              <button key={option.id}
                className={`w-full flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors ${
                  i !== settingsOptions.length - 1 ? 'border-b border-border' : ''
                }`}>
                <div className="w-10 h-10 bg-accent/50 rounded-xl flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${option.color}`} />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="font-medium text-sm">{option.label}</h4>
                  <p className="text-xs text-muted-foreground">{option.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>

        {/* Account Info */}
        <div className="bg-card rounded-2xl shadow-sm p-5">
          <h4 className="font-semibold text-sm mb-3">Account Information</h4>
          <div className="space-y-3 text-sm divide-y divide-border">
            {[
              ['Member Since', user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'January 2025'],
              ['Active Medications', String(user?._count?.medicines || 3)],
              ['App Version', '2.0.0'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between pt-2">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 p-4 bg-card rounded-2xl shadow-sm hover:bg-red-50 dark:hover:bg-red-500/10 border-2 border-transparent hover:border-red-200 dark:hover:border-red-500/20 transition-all text-red-500 font-medium">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
