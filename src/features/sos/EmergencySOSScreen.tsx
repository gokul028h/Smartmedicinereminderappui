import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function EmergencySOSScreen() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [triggering, setTriggering] = useState(false);

  const emergencyContacts = [
    { name: 'Emergency Services', number: '911', relation: 'emergency' },
    { name: 'Primary Contact', number: '+1 (555) 123-4567', relation: 'Spouse' },
    { name: 'Dr. Smith', number: '+1 (555) 987-6543', relation: 'Doctor' },
  ];

  const handleTrigger = async () => {
    setTriggering(true);
    // Simulate SOS
    await new Promise((r) => setTimeout(r, 1500));
    setTriggering(false);
    setShowConfirmation(false);
    toast.success('🚨 SOS triggered! Emergency contacts have been notified.');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-red-500 to-rose-600 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-4 hover:opacity-80 text-sm">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Emergency SOS</h1>
              <p className="text-white/70 text-sm">Quick emergency access</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-6 space-y-6">
        {/* SOS Button */}
        <div className="bg-card rounded-2xl shadow-sm p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">Need Emergency Help?</h3>
          <p className="text-sm text-muted-foreground mb-8">Press the button below to trigger emergency SOS</p>

          <button onClick={() => setShowConfirmation(true)}
            className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-2xl hover:shadow-red-500/40 active:scale-95 transition-all flex items-center justify-center group">
            <div className="text-center text-white">
              <Phone className="w-12 h-12 mb-1 mx-auto animate-pulse group-hover:animate-none" />
              <span className="text-xl font-bold">SOS</span>
            </div>
          </button>

          <div className="mt-6 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-4 text-left">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-red-600 dark:text-red-400 mb-1">When you trigger SOS:</p>
                <ul className="text-muted-foreground space-y-0.5 text-xs">
                  <li>• Emergency contacts will be notified</li>
                  <li>• Your location will be shared</li>
                  <li>• Medical information will be sent</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contacts */}
        <div className="bg-card rounded-2xl shadow-sm p-6">
          <h4 className="font-semibold mb-4">Emergency Contacts</h4>
          <div className="space-y-3">
            {emergencyContacts.map((contact, i) => (
              <a key={i} href={`tel:${contact.number}`}
                className="flex items-center justify-between p-4 bg-accent/30 rounded-xl hover:bg-accent/50 transition-colors">
                <div>
                  <h4 className="font-medium text-sm">{contact.name}</h4>
                  <p className="text-xs text-muted-foreground">{contact.number} • {contact.relation}</p>
                </div>
                <Phone className="w-5 h-5 text-emerald-500" />
              </a>
            ))}
          </div>
        </div>

        {/* Medical Info */}
        <div className="bg-card rounded-2xl shadow-sm p-6">
          <h4 className="font-semibold mb-4">Medical Information</h4>
          <div className="space-y-3 text-sm divide-y divide-border">
            {[
              ['Blood Type', 'O+'],
              ['Allergies', 'Penicillin'],
              ['Active Medications', '3'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="max-w-sm w-full bg-card rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Trigger Emergency SOS?</h3>
              <p className="text-sm text-muted-foreground">This will notify your emergency contacts and share your location</p>
            </div>
            <div className="space-y-3">
              <button onClick={handleTrigger} disabled={triggering}
                className="w-full py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                {triggering ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Yes, Send SOS'}
              </button>
              <button onClick={() => setShowConfirmation(false)} disabled={triggering}
                className="w-full py-3 border-2 border-border rounded-xl font-medium text-muted-foreground hover:bg-accent transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
