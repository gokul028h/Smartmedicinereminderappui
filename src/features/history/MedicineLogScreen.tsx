import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Calendar, CheckCircle2, XCircle, Filter, Download, TrendingUp,
} from 'lucide-react';
import { EmptyState } from '../../components/shared/EmptyState';

export default function MedicineLogScreen() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'taken' | 'missed'>('all');

  // Mock data
  const allLogs = [
    { id: '1', medicineName: 'Aspirin', dosage: '500mg', status: 'taken' as const, timestamp: new Date().toISOString() },
    { id: '2', medicineName: 'Metformin', dosage: '1000mg', status: 'taken' as const, timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: '3', medicineName: 'Lisinopril', dosage: '10mg', status: 'missed' as const, timestamp: new Date(Date.now() - 7200000).toISOString(), reason: 'Forgot to take it' },
  ];

  const filteredLogs = allLogs.filter((log) => {
    const logDate = new Date(log.timestamp).toISOString().split('T')[0];
    const dateMatch = logDate === selectedDate;
    const statusMatch = filterStatus === 'all' || log.status === filterStatus;
    return dateMatch && statusMatch;
  });

  const stats = {
    total: filteredLogs.length,
    taken: filteredLogs.filter((l) => l.status === 'taken').length,
    missed: filteredLogs.filter((l) => l.status === 'missed').length,
  };
  const adherenceRate = stats.total > 0 ? Math.round((stats.taken / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-4 hover:opacity-80 text-sm">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Medicine Log</h1>
              <p className="text-white/70 text-sm">Track your medication history</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Date Picker + Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-2xl shadow-sm p-5">
            <label className="block text-sm font-medium mb-2">Select Date</label>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>

          <div className="bg-card rounded-2xl shadow-sm p-5">
            <h4 className="text-sm font-medium mb-3">Daily Summary</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-xl font-bold">{stats.total}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-emerald-600">{stats.taken}</div>
                <div className="text-xs text-muted-foreground">Taken</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-red-500">{stats.missed}</div>
                <div className="text-xs text-muted-foreground">Missed</div>
              </div>
            </div>
            {stats.total > 0 && (
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Adherence</span>
                  <span className="font-medium">{adherenceRate}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div className={`h-full transition-all duration-500 rounded-full ${
                    adherenceRate >= 80 ? 'bg-emerald-500' : adherenceRate >= 50 ? 'bg-amber-500' : 'bg-red-500'
                  }`} style={{ width: `${adherenceRate}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {(['all', 'taken', 'missed'] as const).map((f) => (
            <button key={f} onClick={() => setFilterStatus(f)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                filterStatus === f
                  ? f === 'taken' ? 'bg-emerald-500 text-white' : f === 'missed' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                  : 'bg-card border border-border text-muted-foreground hover:bg-accent'
              }`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Logs */}
        {filteredLogs.length === 0 ? (
          <EmptyState icon={Calendar} title="No Records" description="No medication logs for this date and filter" />
        ) : (
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <div key={log.id} className="bg-card rounded-xl shadow-sm p-4 flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  log.status === 'taken' ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-red-50 dark:bg-red-500/10'
                }`}>
                  {log.status === 'taken'
                    ? <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    : <XCircle className="w-5 h-5 text-red-500" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{log.medicineName}</h4>
                  <p className="text-xs text-muted-foreground">{log.dosage}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <span className={log.status === 'taken' ? 'text-emerald-600 font-medium' : 'text-red-500 font-medium'}>
                      {log.status === 'taken' ? 'Taken' : 'Missed'}
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {log.reason && <p className="text-xs text-muted-foreground mt-1 italic">Reason: {log.reason}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Export */}
        <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-border rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>
    </div>
  );
}
