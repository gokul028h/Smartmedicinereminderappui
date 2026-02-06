import { useState } from 'react';
import { ArrowLeft, Calendar, CheckCircle2, XCircle, Filter } from 'lucide-react';

interface DoseLog {
  id: string;
  medicineName: string;
  dosage: string;
  status: 'taken' | 'missed';
  timestamp: string;
  reason?: string;
}

interface MedicineLogScreenProps {
  logs: DoseLog[];
  onBack: () => void;
}

export function MedicineLogScreen({ logs, onBack }: MedicineLogScreenProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'taken' | 'missed'>('all');

  const filteredLogs = logs.filter((log) => {
    const logDate = new Date(log.timestamp).toISOString().split('T')[0];
    const dateMatch = logDate === selectedDate;
    const statusMatch = filterStatus === 'all' || log.status === filterStatus;
    return dateMatch && statusMatch;
  });

  const stats = {
    total: filteredLogs.length,
    taken: filteredLogs.filter(log => log.status === 'taken').length,
    missed: filteredLogs.filter(log => log.status === 'missed').length,
  };

  const adherenceRate = stats.total > 0 ? Math.round((stats.taken / stats.total) * 100) : 0;

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
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div>
              <h2>Medicine Log</h2>
              <p className="text-white/80 text-sm">
                Track your medication history
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 -mt-4">
        <div className="max-w-md mx-auto space-y-4">
          {/* Date Filter */}
          <div className="bg-card rounded-2xl shadow-md p-5">
            <label className="block mb-2 text-foreground">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-4 min-h-[56px] rounded-xl border-2 border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          {/* Statistics */}
          <div className="bg-card rounded-2xl shadow-md p-5">
            <h4 className="mb-4">Daily Summary</h4>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-medium text-foreground mb-1">
                  {stats.total}
                </div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-success mb-1">
                  {stats.taken}
                </div>
                <div className="text-sm text-muted-foreground">Taken</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-medium text-error mb-1">
                  {stats.missed}
                </div>
                <div className="text-sm text-muted-foreground">Missed</div>
              </div>
            </div>

            {stats.total > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Adherence Rate</span>
                  <span className="text-sm font-medium">{adherenceRate}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      adherenceRate >= 80 ? 'bg-success' : adherenceRate >= 50 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${adherenceRate}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground border border-border'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('taken')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                filterStatus === 'taken'
                  ? 'bg-success text-success-foreground'
                  : 'bg-card text-muted-foreground border border-border'
              }`}
            >
              Taken
            </button>
            <button
              onClick={() => setFilterStatus('missed')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                filterStatus === 'missed'
                  ? 'bg-error text-error-foreground'
                  : 'bg-card text-muted-foreground border border-border'
              }`}
            >
              Missed
            </button>
          </div>

          {/* Log Entries */}
          {filteredLogs.length === 0 ? (
            <div className="bg-card rounded-2xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-muted-foreground" strokeWidth={2} />
              </div>
              <h4 className="mb-2">No Records Found</h4>
              <p className="text-muted-foreground text-sm">
                No medication logs for this date
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <div key={log.id} className="bg-card rounded-xl shadow-md p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        log.status === 'taken' ? 'bg-success/10' : 'bg-error/10'
                      }`}
                    >
                      {log.status === 'taken' ? (
                        <CheckCircle2 className="w-5 h-5 text-success" strokeWidth={2.5} />
                      ) : (
                        <XCircle className="w-5 h-5 text-error" strokeWidth={2.5} />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm mb-1">{log.medicineName}</h4>
                      <p className="text-muted-foreground text-sm mb-1">
                        {log.dosage}
                      </p>
                      <div className="flex items-center gap-3 text-xs">
                        <span
                          className={`font-medium ${
                            log.status === 'taken' ? 'text-success' : 'text-error'
                          }`}
                        >
                          {log.status === 'taken' ? 'Taken' : 'Missed'}
                        </span>
                        <span className="text-muted-foreground">
                          {new Date(log.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      {log.reason && (
                        <p className="text-xs text-muted-foreground mt-2 italic">
                          Reason: {log.reason}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
