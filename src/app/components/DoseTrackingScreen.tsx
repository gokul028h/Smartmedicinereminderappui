import { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, MessageSquare } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface DoseTrackingScreenProps {
  medicineName: string;
  dosage: string;
  status: 'taken' | 'missed';
  onBack: () => void;
  onConfirm: (data: {
    status: 'taken' | 'missed';
    reason?: string;
    timestamp: string;
  }) => void;
}

export function DoseTrackingScreen({
  medicineName,
  dosage,
  status,
  onBack,
  onConfirm,
}: DoseTrackingScreenProps) {
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    onConfirm({
      status,
      reason: status === 'missed' ? reason : undefined,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className={`${status === 'taken' ? 'bg-success' : 'bg-warning'} text-white p-6 pb-8 rounded-b-3xl shadow-lg`}>
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
              {status === 'taken' ? (
                <CheckCircle2 className="w-6 h-6" strokeWidth={2.5} />
              ) : (
                <XCircle className="w-6 h-6" strokeWidth={2.5} />
              )}
            </div>
            <div>
              <h2>{status === 'taken' ? 'Dose Taken' : 'Dose Missed'}</h2>
              <p className="text-white/80 text-sm">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 -mt-4">
        <div className="max-w-md mx-auto bg-card rounded-2xl shadow-md p-6">
          <div className="bg-accent/30 rounded-xl p-5 mb-6">
            <h4 className="mb-2">{medicineName}</h4>
            <p className="text-muted-foreground">
              {dosage}
            </p>
          </div>

          {status === 'taken' && (
            <div>
              <div className="flex items-center gap-3 mb-4 text-success">
                <CheckCircle2 className="w-8 h-8" strokeWidth={2.5} />
                <div>
                  <h4>Great job!</h4>
                  <p className="text-muted-foreground text-sm">
                    Dose logged successfully
                  </p>
                </div>
              </div>
              
              <div className="bg-success/10 border border-success/20 rounded-xl p-4 mb-6">
                <p className="text-sm">
                  ✓ Stock count updated<br />
                  ✓ Daily log updated<br />
                  ✓ Adherence tracked
                </p>
              </div>
            </div>
          )}

          {status === 'missed' && (
            <div>
              <div className="flex items-center gap-3 mb-4 text-warning">
                <XCircle className="w-8 h-8" strokeWidth={2.5} />
                <div>
                  <h4>Dose Missed</h4>
                  <p className="text-muted-foreground text-sm">
                    This will be recorded in your log
                  </p>
                </div>
              </div>

              <Input
                label="Reason (Optional)"
                placeholder="Why did you miss this dose?"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                helperText="Help track patterns and improve adherence"
              />

              <div className="mt-6 bg-warning/10 border border-warning/20 rounded-xl p-4">
                <p className="text-sm text-warning-foreground">
                  ⚠️ Missing doses can affect treatment effectiveness. Set multiple reminders if needed.
                </p>
              </div>
            </div>
          )}

          <div className="mt-6">
            <Button
              onClick={handleConfirm}
              variant={status === 'taken' ? 'success' : 'primary'}
              fullWidth
            >
              Confirm & Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}