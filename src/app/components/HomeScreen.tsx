import { Pill, Bell, ClipboardList, AlertCircle, BarChart3, Phone, User, Home, Calendar } from 'lucide-react';

interface HomeScreenProps {
  userName: string;
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ userName, onNavigate }: HomeScreenProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const navigationCards = [
    {
      id: 'add-medicine',
      title: 'Add / Edit Medicine',
      description: 'Manage your medications',
      icon: Pill,
      color: 'bg-gradient-to-br from-primary to-[#3A8FA8]',
      screen: 'add-medicine',
    },
    {
      id: 'schedule-reminder',
      title: 'Schedule Reminder',
      description: 'Set medication alerts',
      icon: Bell,
      color: 'bg-gradient-to-br from-[#4CAF6E] to-[#3D9B5D]',
      screen: 'schedule-reminder',
    },
    {
      id: 'medicine-log',
      title: 'Medicine Log & History',
      description: 'View your medication records',
      icon: ClipboardList,
      color: 'bg-gradient-to-br from-[#60A5FA] to-[#3B82F6]',
      screen: 'medicine-log',
    },
    {
      id: 'refill-alerts',
      title: 'Refill Reminder & Alerts',
      description: 'Track stock and expiry',
      icon: AlertCircle,
      color: 'bg-gradient-to-br from-[#F59E0B] to-[#D97706]',
      screen: 'refill-alerts',
    },
    {
      id: 'analytics',
      title: 'Analytics & Report',
      description: 'View adherence insights',
      icon: BarChart3,
      color: 'bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED]',
      screen: 'analytics',
    },
    {
      id: 'emergency',
      title: 'Emergency & SOS',
      description: 'Quick emergency access',
      icon: Phone,
      color: 'bg-gradient-to-br from-[#EF4444] to-[#DC2626]',
      screen: 'emergency',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col pb-20">
      {/* Header */}
      <div className="bg-primary text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="max-w-md mx-auto">
          <h2 className="mb-1">Hello, {userName}! 👋</h2>
          <p className="text-white/80 text-sm">
            {currentDate}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 -mt-4">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-1 gap-4">
            {navigationCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
                  onClick={() => onNavigate(card.screen)}
                  className="bg-card rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-98 overflow-hidden"
                >
                  <div className="flex items-center gap-4 p-5">
                    <div className={`${card.color} w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                      <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="mb-1">{card.title}</h4>
                      <p className="text-muted-foreground text-sm">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-around px-6 py-3">
            <button
              onClick={() => onNavigate('home')}
              className="flex flex-col items-center gap-1 py-2 px-4 text-primary"
            >
              <Home className="w-6 h-6" strokeWidth={2.5} />
              <span className="text-xs font-medium">Home</span>
            </button>
            
            <button
              onClick={() => onNavigate('medicines')}
              className="flex flex-col items-center gap-1 py-2 px-4 text-muted-foreground hover:text-primary transition-colors"
            >
              <Pill className="w-6 h-6" strokeWidth={2} />
              <span className="text-xs">Medicines</span>
            </button>
            
            <button
              onClick={() => onNavigate('medicine-log')}
              className="flex flex-col items-center gap-1 py-2 px-4 text-muted-foreground hover:text-primary transition-colors"
            >
              <Calendar className="w-6 h-6" strokeWidth={2} />
              <span className="text-xs">History</span>
            </button>
            
            <button
              onClick={() => onNavigate('profile')}
              className="flex flex-col items-center gap-1 py-2 px-4 text-muted-foreground hover:text-primary transition-colors"
            >
              <User className="w-6 h-6" strokeWidth={2} />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
