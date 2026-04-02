import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart3, TrendingUp, Calendar, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function AnalyticsScreen() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('weekly');

  const dailyData = [
    { time: '8 AM', taken: 1, missed: 0 },
    { time: '1 PM', taken: 1, missed: 0 },
    { time: '6 PM', taken: 0, missed: 1 },
    { time: '10 PM', taken: 1, missed: 0 },
  ];
  const weeklyData = [
    { day: 'Mon', adherence: 100 }, { day: 'Tue', adherence: 100 },
    { day: 'Wed', adherence: 75 }, { day: 'Thu', adherence: 100 },
    { day: 'Fri', adherence: 100 }, { day: 'Sat', adherence: 50 }, { day: 'Sun', adherence: 100 },
  ];
  const monthlyData = [
    { week: 'Week 1', adherence: 95 }, { week: 'Week 2', adherence: 88 },
    { week: 'Week 3', adherence: 92 }, { week: 'Week 4', adherence: 85 },
  ];
  const adherenceByMedicine = [
    { name: 'Aspirin', value: 95, color: '#22c55e' },
    { name: 'Metformin', value: 88, color: '#3b82f6' },
    { name: 'Lisinopril', value: 92, color: '#8b5cf6' },
  ];

  const overallAdherence = 90;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-4 hover:opacity-80 text-sm">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Analytics & Reports</h1>
              <p className="text-white/70 text-sm">Track your medication adherence</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Overall Adherence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 bg-card rounded-2xl shadow-sm p-6 flex flex-col items-center">
            <div className="relative w-28 h-28 mb-4">
              <svg className="transform -rotate-90 w-28 h-28">
                <circle cx="56" cy="56" r="48" stroke="currentColor" className="text-muted/30" strokeWidth="10" fill="none" />
                <circle cx="56" cy="56" r="48" stroke="#22c55e" strokeWidth="10" fill="none"
                  strokeDasharray={`${(overallAdherence / 100) * 301.59} 301.59`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{overallAdherence}%</span>
              </div>
            </div>
            <span className="text-sm text-muted-foreground">Overall Adherence</span>
          </div>

          <div className="md:col-span-2 grid grid-cols-3 gap-4">
            {[
              { label: 'Total Doses', value: 120, color: 'text-foreground' },
              { label: 'Taken', value: 108, color: 'text-emerald-600' },
              { label: 'Missed', value: 12, color: 'text-red-500' },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-2xl shadow-sm p-5 text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Toggle */}
        <div className="flex gap-2">
          {(['daily', 'weekly', 'monthly'] as const).map((mode) => (
            <button key={mode} onClick={() => setViewMode(mode)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                viewMode === mode ? 'bg-violet-500 text-white shadow-md' : 'bg-card border border-border text-muted-foreground hover:bg-accent'
              }`}>
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>

        {/* Charts */}
        <div className="bg-card rounded-2xl shadow-sm p-6">
          <h4 className="font-semibold mb-4">
            {viewMode === 'daily' ? "Today's Doses" : viewMode === 'weekly' ? 'Weekly Trend' : 'Monthly Overview'}
          </h4>
          <ResponsiveContainer width="100%" height={280}>
            {viewMode === 'daily' ? (
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="taken" fill="#22c55e" radius={[6, 6, 0, 0]} />
                <Bar dataKey="missed" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            ) : viewMode === 'weekly' ? (
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="adherence" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 5 }} />
              </LineChart>
            ) : (
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="adherence" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
          <div className="mt-4 bg-violet-50 dark:bg-violet-500/10 rounded-xl p-3 text-sm text-center">
            <TrendingUp className="w-4 h-4 text-emerald-500 inline mr-2" />
            {viewMode === 'weekly' ? 'Average: 89% adherence this week' : viewMode === 'monthly' ? 'Average: 90% this month' : '3 of 4 doses taken today'}
          </div>
        </div>

        {/* By Medicine */}
        <div className="bg-card rounded-2xl shadow-sm p-6">
          <h4 className="font-semibold mb-4">Adherence by Medicine</h4>
          <div className="space-y-4">
            {adherenceByMedicine.map((med) => (
              <div key={med.name}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-medium">{med.name}</span>
                  <span className="text-sm font-bold">{med.value}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${med.value}%`, backgroundColor: med.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-border rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent transition-colors">
          <Download className="w-4 h-4" />
          Download Report (CSV/PDF)
        </button>
      </div>
    </div>
  );
}
