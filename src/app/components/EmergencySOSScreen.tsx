import { useState } from 'react';
import { ArrowLeft, Phone, MapPin, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface EmergencySOSScreenProps {
  onBack: () => void;
  onTriggerSOS: () => void;
}

export function EmergencySOSScreen({ onBack, onTriggerSOS }: EmergencySOSScreenProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSOSPress = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    onTriggerSOS();
  };

  const emergencyContacts = [
    { name: 'Emergency Services', number: '911', type: 'emergency' },
    { name: 'Primary Contact', number: '+1 (555) 123-4567', type: 'personal' },
    { name: 'Doctor', number: '+1 (555) 987-6543', type: 'medical' },
  ];

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-error to-[#DC2626] text-white p-6 pb-8 rounded-b-3xl shadow-lg">
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
              <Phone className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div>
              <h2>Emergency SOS</h2>
              <p className="text-white/80 text-sm">
                Quick emergency access
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 -mt-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* SOS Button */}
          <div className="bg-card rounded-2xl shadow-md p-8">
            <div className="text-center mb-6">
              <h3 className="mb-2">Need Emergency Help?</h3>
              <p className="text-muted-foreground">
                Press the button below to trigger emergency SOS
              </p>
            </div>

            <button
              onClick={handleSOSPress}
              className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-error to-[#DC2626] shadow-2xl hover:shadow-error/50 active:scale-95 transition-all duration-200 flex items-center justify-center group"
            >
              <div className="text-center">
                <Phone className="w-16 h-16 text-white mb-2 mx-auto animate-pulse" strokeWidth={2.5} />
                <span className="text-white text-2xl font-medium">SOS</span>
              </div>
            </button>

            <div className="mt-6 bg-error/10 border border-error/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-error mb-1">When you trigger SOS:</p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Emergency contacts will be notified</li>
                    <li>• Your location will be shared</li>
                    <li>• Medical information will be sent</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-card rounded-2xl shadow-md p-6">
            <h4 className="mb-4">Emergency Contacts</h4>
            
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <a
                  key={index}
                  href={`tel:${contact.number}`}
                  className="flex items-center justify-between p-4 bg-accent/30 rounded-xl hover:bg-accent/50 transition-colors"
                >
                  <div>
                    <h4 className="text-sm mb-1">{contact.name}</h4>
                    <p className="text-muted-foreground text-sm">
                      {contact.number}
                    </p>
                  </div>
                  <Phone className="w-5 h-5 text-primary" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Medical Information Quick Access */}
          <div className="bg-card rounded-2xl shadow-md p-6">
            <h4 className="mb-4">Medical Information</h4>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Blood Type</span>
                <span className="font-medium">O+</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Allergies</span>
                <span className="font-medium">Penicillin</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Active Medications</span>
                <span className="font-medium">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SOS Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="max-w-md w-full bg-card rounded-2xl shadow-2xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-error" strokeWidth={2.5} />
              </div>
              <h3 className="mb-2">Trigger Emergency SOS?</h3>
              <p className="text-muted-foreground">
                This will notify your emergency contacts and share your location
              </p>
            </div>

            <div className="space-y-3">
              <Button onClick={handleConfirm} variant="destructive" fullWidth>
                Yes, Send SOS
              </Button>
              <Button
                onClick={() => setShowConfirmation(false)}
                variant="outline"
                fullWidth
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
