import { ArrowLeft, User, Bell, Globe, Settings, LogOut, ChevronRight, Edit } from 'lucide-react';

interface ProfileScreenProps {
  userName: string;
  userEmail: string;
  onBack: () => void;
  onEditProfile: () => void;
  onNotificationSettings: () => void;
  onLanguageSettings: () => void;
  onAppSettings: () => void;
  onLogout: () => void;
}

export function ProfileScreen({
  userName,
  userEmail,
  onBack,
  onEditProfile,
  onNotificationSettings,
  onLanguageSettings,
  onAppSettings,
  onLogout,
}: ProfileScreenProps) {
  const settingsOptions = [
    {
      id: 'edit-profile',
      label: 'Manage Profile',
      description: 'Update your personal information',
      icon: Edit,
      onClick: onEditProfile,
      color: 'text-primary',
    },
    {
      id: 'notifications',
      label: 'Notification Preferences',
      description: 'Manage alerts and reminders',
      icon: Bell,
      onClick: onNotificationSettings,
      color: 'text-success',
    },
    {
      id: 'language',
      label: 'Language',
      description: 'English (US)',
      icon: Globe,
      onClick: onLanguageSettings,
      color: 'text-[#60A5FA]',
    },
    {
      id: 'settings',
      label: 'App Settings',
      description: 'Privacy, security & more',
      icon: Settings,
      onClick: onAppSettings,
      color: 'text-muted-foreground',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-primary text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="max-w-md mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="mb-1">{userName}</h2>
              <p className="text-white/80 text-sm">
                {userEmail}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 -mt-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* Settings Options */}
          <div className="bg-card rounded-2xl shadow-md overflow-hidden">
            {settingsOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={option.onClick}
                  className={`w-full flex items-center gap-4 p-5 hover:bg-accent/50 transition-colors ${
                    index !== settingsOptions.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className={`w-12 h-12 bg-accent/50 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${option.color}`} strokeWidth={2} />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h4 className="text-sm mb-1">{option.label}</h4>
                    <p className="text-muted-foreground text-xs">
                      {option.description}
                    </p>
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-muted-foreground" strokeWidth={2} />
                </button>
              );
            })}
          </div>

          {/* Account Info */}
          <div className="bg-card rounded-2xl shadow-md p-6">
            <h4 className="mb-4">Account Information</h4>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">User ID</span>
                <span className="font-medium">#MCP-{Math.floor(Math.random() * 10000)}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-border">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-medium">January 2025</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground">Active Medications</span>
                <span className="font-medium">3</span>
              </div>
            </div>
          </div>

          {/* App Info */}
          <div className="bg-card rounded-2xl shadow-md p-6">
            <h4 className="mb-4">App Information</h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Version</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Privacy Policy</span>
                <button className="text-primary hover:underline">View</button>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Terms of Service</span>
                <button className="text-primary hover:underline">View</button>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 p-5 bg-card rounded-2xl shadow-md hover:bg-error/5 border-2 border-transparent hover:border-error/20 transition-colors text-error"
          >
            <LogOut className="w-6 h-6" strokeWidth={2} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
