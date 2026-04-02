import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Pill, Bell, ClipboardList, AlertCircle, BarChart3, Phone, TrendingUp,
  Clock, CheckCircle2, XCircle, Calendar, Plus, ArrowRight, Activity,
  AlertTriangle, Sparkles,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../services/api';
import { LoadingSkeleton } from '../../components/shared/LoadingSkeleton';
import { toast } from 'sonner';

interface DashboardData {
  medicines: any[];
  todaySchedules: any[];
  adherenceStats: any;
  lowStock: any[];
}

export default function HomeScreen() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? 'Good Morning' : currentHour < 17 ? 'Good Afternoon' : 'Good Evening';

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      // Try to load from API, fall back to mock data
      try {
        const [medsRes, schedulesRes, adherenceRes] = await Promise.all([
          api.getMedicines({ isActive: true }),
          api.getTodaySchedules(),
          api.getAdherenceStats(7),
        ]);
        setData({
          medicines: medsRes.data || [],
          todaySchedules: schedulesRes.data || [],
          adherenceStats: adherenceRes.data || null,
          lowStock: [],
        });
      } catch {
        // Use mock data for demo
        setData({
          medicines: [
            { id: '1', name: 'Aspirin', dosage: '500mg', form: 'tablet', stockQuantity: 28, isActive: true },
            { id: '2', name: 'Metformin', dosage: '1000mg', form: 'tablet', stockQuantity: 5, isActive: true },
            { id: '3', name: 'Lisinopril', dosage: '10mg', form: 'tablet', stockQuantity: 15, isActive: true },
          ],
          todaySchedules: [
            { time: '08:00', medicine: { name: 'Aspirin', dosage: '500mg', color: '#22c55e' } },
            { time: '13:00', medicine: { name: 'Metformin', dosage: '1000mg', color: '#3b82f6' } },
            { time: '20:00', medicine: { name: 'Lisinopril', dosage: '10mg', color: '#8b5cf6' } },
          ],
          adherenceStats: { overall: { adherenceRate: 90, taken: 18, missed: 2, total: 20 } },
          lowStock: [{ id: '2', name: 'Metformin', stockQuantity: 5 }],
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { label: 'Add Medicine', icon: Plus, color: 'from-emerald-500 to-teal-600', to: '/medicines/add' },
    { label: 'Set Reminder', icon: Bell, color: 'from-blue-500 to-indigo-600', to: '/reminders' },
    { label: 'View History', icon: ClipboardList, color: 'from-violet-500 to-purple-600', to: '/history' },
    { label: 'Emergency', icon: Phone, color: 'from-red-500 to-rose-600', to: '/emergency' },
  ];

  const navigationCards = [
    { title: 'My Medicines', desc: 'Manage medications', icon: Pill, color: 'from-emerald-500 to-teal-600', to: '/medicines' },
    { title: 'Reminders', desc: 'Schedule alerts', icon: Bell, color: 'from-blue-500 to-indigo-600', to: '/reminders' },
    { title: 'Medicine Log', desc: 'View records', icon: ClipboardList, color: 'from-cyan-500 to-blue-600', to: '/history' },
    { title: 'Refill Alerts', desc: 'Stock & expiry', icon: AlertCircle, color: 'from-amber-500 to-orange-600', to: '/refills' },
    { title: 'Analytics', desc: 'Adherence insights', icon: BarChart3, color: 'from-violet-500 to-purple-600', to: '/analytics' },
    { title: 'Emergency SOS', desc: 'Quick access', icon: Phone, color: 'from-red-500 to-rose-600', to: '/emergency' },
  ];

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <LoadingSkeleton variant="card" count={4} />
      </div>
    );
  }

  const adherenceRate = data?.adherenceStats?.overall?.adherenceRate || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 text-white">
        <div className="max-w-6xl mx-auto px-6 py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-emerald-200" />
                <span className="text-emerald-100 text-sm">{greeting}</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                {user?.name || 'User'} 👋
              </h1>
              <p className="text-white/70 text-sm">{currentDate}</p>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4">
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-3 text-center min-w-[100px]">
                <div className="text-2xl font-bold">{data?.medicines.length || 0}</div>
                <div className="text-xs text-white/70">Medicines</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-3 text-center min-w-[100px]">
                <div className="text-2xl font-bold">{adherenceRate}%</div>
                <div className="text-xs text-white/70">Adherence</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-3 text-center min-w-[100px]">
                <div className="text-2xl font-bold">{data?.todaySchedules.length || 0}</div>
                <div className="text-xs text-white/70">Today</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => navigate(action.to)}
                className="bg-card rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-4 flex flex-col items-center gap-2 active:scale-95 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-foreground">{action.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 bg-card rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                Today's Schedule
              </h3>
              <button
                onClick={() => navigate('/reminders')}
                className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                View All <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {(data?.todaySchedules.length || 0) === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No scheduled doses for today</p>
              </div>
            ) : (
              <div className="space-y-3">
                {data?.todaySchedules.map((schedule: any, i: number) => {
                  const now = new Date();
                  const [h, m] = schedule.time.split(':').map(Number);
                  const isPast = now.getHours() > h || (now.getHours() === h && now.getMinutes() > m);
                  const isCurrent = now.getHours() === h;

                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                        isCurrent
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20'
                          : isPast
                          ? 'bg-muted/30 opacity-60'
                          : 'bg-muted/20 hover:bg-muted/40'
                      }`}
                    >
                      <div
                        className="w-1.5 h-12 rounded-full"
                        style={{ backgroundColor: schedule.medicine?.color || '#22c55e' }}
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{schedule.medicine?.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {schedule.medicine?.dosage}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{schedule.time}</div>
                        {isPast ? (
                          <span className="text-xs text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Done
                          </span>
                        ) : isCurrent ? (
                          <span className="text-xs text-amber-600 flex items-center gap-1">
                            <Activity className="w-3 h-3" /> Now
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">Upcoming</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Adherence Ring + Alerts */}
          <div className="space-y-6">
            {/* Adherence Circle */}
            <div className="bg-card rounded-2xl shadow-md p-6 text-center">
              <h4 className="text-sm font-medium text-muted-foreground mb-4">Weekly Adherence</h4>
              <div className="relative w-28 h-28 mx-auto mb-4">
                <svg className="transform -rotate-90 w-28 h-28">
                  <circle cx="56" cy="56" r="48" stroke="currentColor" className="text-muted/30" strokeWidth="10" fill="none" />
                  <circle
                    cx="56" cy="56" r="48"
                    stroke={adherenceRate >= 80 ? '#22c55e' : adherenceRate >= 50 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${(adherenceRate / 100) * 301.59} 301.59`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-2xl font-bold">{adherenceRate}%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center text-xs">
                <div>
                  <span className="font-semibold text-emerald-600">{data?.adherenceStats?.overall?.taken || 0}</span>
                  <span className="text-muted-foreground ml-1">Taken</span>
                </div>
                <div>
                  <span className="font-semibold text-red-500">{data?.adherenceStats?.overall?.missed || 0}</span>
                  <span className="text-muted-foreground ml-1">Missed</span>
                </div>
              </div>
            </div>

            {/* Low Stock Alert */}
            {(data?.lowStock?.length || 0) > 0 && (
              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-400">Low Stock</span>
                </div>
                {data?.lowStock.map((med: any) => (
                  <div key={med.id} className="text-xs text-amber-600 dark:text-amber-300">
                    {med.name} — {med.stockQuantity} left
                  </div>
                ))}
                <button
                  onClick={() => navigate('/refills')}
                  className="mt-2 text-xs text-amber-700 dark:text-amber-400 hover:underline font-medium"
                >
                  View Refill Alerts →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Feature Navigation Grid */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Quick Navigation</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {navigationCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.title}
                  onClick={() => navigate(card.to)}
                  className="bg-card rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 p-5 text-left active:scale-[0.97] group"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-sm mb-0.5">{card.title}</h4>
                  <p className="text-xs text-muted-foreground">{card.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
