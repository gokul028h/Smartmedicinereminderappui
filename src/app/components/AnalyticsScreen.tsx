import { useState } from 'react';
import { ArrowLeft, BarChart3, TrendingUp, Calendar, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Button } from './Button';

interface AnalyticsScreenProps {
  onBack: () => void;
}

export function AnalyticsScreen({ onBack }: AnalyticsScreenProps) {
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Mock data for demonstration
  const dailyData = [
    { time: '8 AM', taken: 1, missed: 0 },
    { time: '1 PM', taken: 1, missed: 0 },
    { time: '6 PM', taken: 0, missed: 1 },
    { time: '10 PM', taken: 1, missed: 0 },
  ];

  const weeklyData = [
    { day: 'Mon', adherence: 100 },
    { day: 'Tue', adherence: 100 },
    { day: 'Wed', adherence: 75 },
    { day: 'Thu', adherence: 100 },
    { day: 'Fri', adherence: 100 },
    { day: 'Sat', adherence: 50 },
    { day: 'Sun', adherence: 100 },
  ];

  const monthlyData = [
    { week: 'Week 1', adherence: 95 },
    { week: 'Week 2', adherence: 88 },
    { week: 'Week 3', adherence: 92 },
    { week: 'Week 4', adherence: 85 },
  ];

  const adherenceByMedicine = [
    { name: 'Aspirin', value: 95, color: '#2E7D9A' },
    { name: 'Metformin', value: 88, color: '#4CAF6E' },
    { name: 'Lisinopril', value: 92, color: '#60A5FA' },
  ];

  const overallAdherence = 90;
  const totalDoses = 120;
  const takenDoses = 108;
  const missedDoses = 12;

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="max-w-md mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div>
              <h2>Analytics & Reports</h2>
              <p className="text-white/80 text-sm">
                Track your medication adherence
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 -mt-4">
        <div className="max-w-md mx-auto space-y-4">
          {/* Overall Stats */}
          <div className="bg-card rounded-2xl shadow-md p-6">
            <h3 className="mb-4">Overall Adherence</h3>
            
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg className="transform -rotate-90 w-32 h-32">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#EFF3F5"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke={overallAdherence >= 80 ? '#4CAF6E' : overallAdherence >= 50 ? '#F59E0B' : '#EF4444'}
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(overallAdherence / 100) * 351.86} 351.86`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-medium">{overallAdherence}%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="text-center">
                <div className="text-xl font-medium text-foreground mb-1">
                  {totalDoses}
                </div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-medium text-success mb-1">
                  {takenDoses}
                </div>
                <div className="text-xs text-muted-foreground">Taken</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-medium text-error mb-1">
                  {missedDoses}
                </div>
                <div className="text-xs text-muted-foreground">Missed</div>
              </div>
            </div>
          </div>

          {/* Time Period Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('daily')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                viewMode === 'daily'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground border border-border'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setViewMode('weekly')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                viewMode === 'weekly'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground border border-border'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setViewMode('monthly')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                viewMode === 'monthly'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground border border-border'
              }`}
            >
              Monthly
            </button>
          </div>

          {/* Charts */}
          {viewMode === 'daily' && (
            <div className="bg-card rounded-2xl shadow-md p-6">
              <h4 className="mb-4">Today's Doses</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EFF3F5" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="taken" fill="#4CAF6E" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="missed" fill="#EF4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded"></div>
                  <span>Taken</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-error rounded"></div>
                  <span>Missed</span>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'weekly' && (
            <div className="bg-card rounded-2xl shadow-md p-6">
              <h4 className="mb-4">Weekly Adherence Trend</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EFF3F5" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="adherence"
                    stroke="#2E7D9A"
                    strokeWidth={3}
                    dot={{ fill: '#2E7D9A', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 bg-accent/30 rounded-lg p-3 text-sm text-center">
                <TrendingUp className="w-4 h-4 text-success inline mr-2" />
                Average: 89% adherence this week
              </div>
            </div>
          )}

          {viewMode === 'monthly' && (
            <div className="bg-card rounded-2xl shadow-md p-6">
              <h4 className="mb-4">Monthly Overview</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EFF3F5" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="adherence" fill="#2E7D9A" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 bg-accent/30 rounded-lg p-3 text-sm text-center">
                <Calendar className="w-4 h-4 text-primary inline mr-2" />
                Average: 90% adherence this month
              </div>
            </div>
          )}

          {/* Adherence by Medicine */}
          <div className="bg-card rounded-2xl shadow-md p-6">
            <h4 className="mb-4">Adherence by Medicine</h4>
            
            <div className="space-y-3">
              {adherenceByMedicine.map((medicine) => (
                <div key={medicine.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{medicine.name}</span>
                    <span className="text-sm font-medium">{medicine.value}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${medicine.value}%`,
                        backgroundColor: medicine.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Report */}
          <Button variant="outline" fullWidth>
            <Download className="w-5 h-5" />
            Download Report
          </Button>
        </div>
      </div>
    </div>
  );
}
