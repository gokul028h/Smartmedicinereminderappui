import { CheckCircle2, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from './Button';

interface SOSTriggeredScreenProps {
  onDismiss: () => void;
}

export function SOSTriggeredScreen({ onDismiss }: SOSTriggeredScreenProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle2 className="w-12 h-12 text-success" strokeWidth={2.5} />
          </div>
          
          <h2 className="mb-3">SOS Triggered</h2>
          
          <p className="text-muted-foreground">
            Emergency contacts have been notified
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-success/10 border border-success/20 rounded-xl p-4">
            <div className="flex items-start gap-3 mb-2">
              <Phone className="w-5 h-5 text-success flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm mb-1">Contacts Notified</h4>
                <p className="text-muted-foreground text-xs">
                  Emergency contacts have received your SOS alert
                </p>
              </div>
            </div>
          </div>

          <div className="bg-success/10 border border-success/20 rounded-xl p-4">
            <div className="flex items-start gap-3 mb-2">
              <MapPin className="w-5 h-5 text-success flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm mb-1">Location Shared</h4>
                <p className="text-muted-foreground text-xs">
                  Your current location has been sent
                </p>
              </div>
            </div>
          </div>

          <div className="bg-success/10 border border-success/20 rounded-xl p-4">
            <div className="flex items-start gap-3 mb-2">
              <Clock className="w-5 h-5 text-success flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm mb-1">Medical Info Sent</h4>
                <p className="text-muted-foreground text-xs">
                  Your medical information has been included
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-accent/30 rounded-xl p-4 mb-6">
          <p className="text-sm text-center text-muted-foreground">
            Help is on the way. Stay calm and wait for assistance.
          </p>
        </div>

        <Button onClick={onDismiss} variant="success" fullWidth>
          Dismiss
        </Button>
      </div>
    </div>
  );
}
