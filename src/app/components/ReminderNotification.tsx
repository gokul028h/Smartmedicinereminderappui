import { Bell, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from './Button';

interface ReminderNotificationProps {
  medicineName: string;
  dosage: string;
  scheduledTime: string;
  onTaken: () => void;
  onMissed: () => void;
  onClose: () => void;
}

export function ReminderNotification({
  medicineName,
  dosage,
  scheduledTime,
  onTaken,
  onMissed,
  onClose,
}: ReminderNotificationProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-[#3A8FA8] text-white p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center animate-pulse">
              <Bell className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div>
              <h3>Medicine Reminder</h3>
              <p className="text-white/80 text-sm">
                {scheduledTime}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-accent/30 rounded-xl p-5 mb-6">
            <h4 className="mb-2">{medicineName}</h4>
            <p className="text-muted-foreground">
              Take {dosage}
            </p>
          </div>

          <p className="text-center text-muted-foreground mb-6">
            Did you take your medication?
          </p>

          <div className="space-y-3">
            <Button
              onClick={onTaken}
              variant="success"
              fullWidth
            >
              <CheckCircle2 className="w-5 h-5" />
              Yes, I Took It
            </Button>

            <Button
              onClick={onMissed}
              variant="outline"
              fullWidth
            >
              <XCircle className="w-5 h-5" />
              I Missed It
            </Button>

            <button
              onClick={onClose}
              className="w-full py-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              Remind Me Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
