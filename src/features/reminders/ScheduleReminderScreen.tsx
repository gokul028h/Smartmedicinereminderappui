import { useState } from 'react';
import { Bell, Clock, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ScheduleReminderScreen() {
  const navigate = useNavigate();
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [frequency, setFrequency] = useState('once-daily');
  const [times, setTimes] = useState<string[]>(['08:00']);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [snoozeMinutes, setSnoozeMinutes] = useState(10);

  // Mock medicines
  const medicines = [
    { id: '1', name: 'Aspirin', dosage: '500mg' },
    { id: '2', name: 'Metformin', dosage: '1000mg' },
    { id: '3', name: 'Lisinopril', dosage: '10mg' },
  ];

  const frequencyOptions = [
    { value: 'once-daily', label: 'Once Daily', count: 1 },
    { value: 'twice-daily', label: 'Twice Daily', count: 2 },
    { value: 'three-times-daily', label: '3x Daily', count: 3 },
    { value: 'four-times-daily', label: '4x Daily', count: 4 },
  ];

  const handleFrequencyChange = (val: string) => {
    const opt = frequencyOptions.find((o) => o.value === val);
    if (opt) {
      const defaults = ['08:00', '13:00', '18:00', '22:00'];
      setTimes(defaults.slice(0, opt.count));
      setFrequency(val);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMedicine) { toast.error('Please select a medicine'); return; }
    toast.success('Reminder scheduled! 🔔');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-4 hover:opacity-80 text-sm">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Schedule Reminder</h1>
              <p className="text-white/70 text-sm">Set up medication alerts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card rounded-2xl shadow-sm p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Select Medicine</label>
              <select value={selectedMedicine} onChange={(e) => setSelectedMedicine(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                <option value="">Choose a medicine...</option>
                {medicines.map((m) => (
                  <option key={m.id} value={m.id}>{m.name} - {m.dosage}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Frequency</label>
              <div className="grid grid-cols-2 gap-2">
                {frequencyOptions.map((opt) => (
                  <button key={opt.value} type="button"
                    onClick={() => handleFrequencyChange(opt.value)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all ${
                      frequency === opt.value
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Reminder Times</label>
              <div className="space-y-3">
                {times.map((time, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 dark:bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="text-sm text-muted-foreground min-w-[60px]">Dose {i + 1}</span>
                    <input type="time" value={time}
                      onChange={(e) => { const t = [...times]; t[i] = e.target.value; setTimes(t); }}
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-border bg-card focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Snooze Duration</label>
              <div className="flex gap-2">
                {[5, 10, 15, 30].map((min) => (
                  <button key={min} type="button"
                    onClick={() => setSnoozeMinutes(min)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      snoozeMinutes === min ? 'bg-blue-500 text-white' : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {min} min
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <div>
                <span className="text-sm font-medium">Push Notifications</span>
                <p className="text-xs text-muted-foreground">Get reminded on your device</p>
              </div>
              <button type="button" onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative w-12 h-7 rounded-full transition-colors ${notificationsEnabled ? 'bg-blue-500' : 'bg-muted'}`}>
                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${notificationsEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>

          <button type="submit"
            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98]">
            <Save className="w-5 h-5" />
            Set Reminder
          </button>
        </form>
      </div>
    </div>
  );
}
