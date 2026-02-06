import { useState } from 'react';
import { ArrowLeft, Bell, Clock, Save } from 'lucide-react';
import { Button } from './Button';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
}

interface ScheduleReminderScreenProps {
  medicines: Medicine[];
  onBack: () => void;
  onSchedule: (reminder: {
    medicineId: string;
    times: string[];
    frequency: string;
    notificationsEnabled: boolean;
  }) => void;
}

export function ScheduleReminderScreen({ medicines, onBack, onSchedule }: ScheduleReminderScreenProps) {
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [frequency, setFrequency] = useState('once-daily');
  const [times, setTimes] = useState<string[]>(['08:00']);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const frequencyOptions = [
    { value: 'once-daily', label: 'Once Daily', times: 1 },
    { value: 'twice-daily', label: 'Twice Daily', times: 2 },
    { value: 'three-times-daily', label: 'Three Times Daily', times: 3 },
    { value: 'four-times-daily', label: 'Four Times Daily', times: 4 },
  ];

  const handleFrequencyChange = (newFrequency: string) => {
    const option = frequencyOptions.find(opt => opt.value === newFrequency);
    if (option) {
      const defaultTimes = ['08:00', '13:00', '18:00', '22:00'];
      setTimes(defaultTimes.slice(0, option.times));
      setFrequency(newFrequency);
    }
  };

  const handleTimeChange = (index: number, value: string) => {
    const newTimes = [...times];
    newTimes[index] = value;
    setTimes(newTimes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!selectedMedicine) {
      newErrors.medicine = 'Please select a medicine';
    }
    
    if (times.some(time => !time)) {
      newErrors.times = 'Please set all reminder times';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSchedule({
      medicineId: selectedMedicine,
      times,
      frequency,
      notificationsEnabled,
    });
  };

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
              <Bell className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div>
              <h2>Schedule Reminder</h2>
              <p className="text-white/80 text-sm">
                Set up medication alerts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 -mt-4">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-card rounded-2xl shadow-md p-6">
          <div className="space-y-5">
            <div>
              <label className="block mb-2 text-foreground">
                Select Medicine
              </label>
              <select
                value={selectedMedicine}
                onChange={(e) => {
                  setSelectedMedicine(e.target.value);
                  setErrors({ ...errors, medicine: '' });
                }}
                className="w-full px-4 py-4 min-h-[56px] rounded-xl border-2 border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="">Choose a medicine...</option>
                {medicines.map((medicine) => (
                  <option key={medicine.id} value={medicine.id}>
                    {medicine.name} - {medicine.dosage}
                  </option>
                ))}
              </select>
              {errors.medicine && (
                <p className="mt-2 text-error text-sm">{errors.medicine}</p>
              )}
              <p className="mt-2 text-muted-foreground text-sm">
                Select the medicine for this reminder
              </p>
            </div>

            <div>
              <label className="block mb-2 text-foreground">
                Frequency
              </label>
              <select
                value={frequency}
                onChange={(e) => handleFrequencyChange(e.target.value)}
                className="w-full px-4 py-4 min-h-[56px] rounded-xl border-2 border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {frequencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-muted-foreground text-sm">
                How often to take this medicine
              </p>
            </div>

            <div>
              <label className="block mb-3 text-foreground">
                Reminder Times
              </label>
              <div className="space-y-3">
                {times.map((time, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => handleTimeChange(index, e.target.value)}
                      className="flex-1 px-4 py-4 min-h-[56px] rounded-xl border-2 border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                ))}
              </div>
              {errors.times && (
                <p className="mt-2 text-error text-sm">{errors.times}</p>
              )}
              <p className="mt-2 text-muted-foreground text-sm">
                Set times for your daily reminders
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-accent/50 rounded-xl">
              <div>
                <label className="text-foreground font-medium">
                  Enable Notifications
                </label>
                <p className="text-muted-foreground text-sm">
                  Receive push notifications
                </p>
              </div>
              <button
                type="button"
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  notificationsEnabled ? 'bg-success' : 'bg-muted'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                    notificationsEnabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="pt-4">
              <Button type="submit" fullWidth>
                <Save className="w-5 h-5" />
                Set Reminder
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
