import { Info } from 'lucide-react';
import { Button } from './Button';

interface DemoGuideProps {
  onDismiss: () => void;
}

export function DemoGuide({ onDismiss }: DemoGuideProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50 overflow-y-auto">
      <div className="max-w-2xl w-full bg-card rounded-2xl shadow-2xl p-8 my-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Info className="w-6 h-6 text-primary" strokeWidth={2.5} />
          </div>
          <div>
            <h2>MediCare Plus Demo Guide</h2>
            <p className="text-muted-foreground text-sm">
              Complete medicine reminder & tracking app
            </p>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <section>
            <h3 className="mb-3">🎯 App Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ <strong>Authentication Flow:</strong> Registration, Login, Logout</li>
              <li>✓ <strong>Medicine Management:</strong> Add, edit, delete, view medications</li>
              <li>✓ <strong>Smart Reminders:</strong> Schedule alerts and track doses</li>
              <li>✓ <strong>Dose Tracking:</strong> Log taken/missed doses with reasons</li>
              <li>✓ <strong>Medicine Log:</strong> Complete history with filters</li>
              <li>✓ <strong>Refill Alerts:</strong> Low stock and expiry warnings</li>
              <li>✓ <strong>Analytics:</strong> Daily, weekly, monthly adherence reports</li>
              <li>✓ <strong>Emergency SOS:</strong> Quick access to emergency contacts</li>
              <li>✓ <strong>Profile Settings:</strong> User management and preferences</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-3">📱 Available Screens</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-accent/30 p-3 rounded-lg">
                <strong>1. Splash Screen</strong>
                <p className="text-xs text-muted-foreground">App branding</p>
              </div>
              <div className="bg-accent/30 p-3 rounded-lg">
                <strong>2. Login</strong>
                <p className="text-xs text-muted-foreground">User authentication</p>
              </div>
              <div className="bg-accent/30 p-3 rounded-lg">
                <strong>3. Registration</strong>
                <p className="text-xs text-muted-foreground">New user signup</p>
              </div>
              <div className="bg-accent/30 p-3 rounded-lg">
                <strong>4. Home Dashboard</strong>
                <p className="text-xs text-muted-foreground">Main navigation</p>
              </div>
              <div className="bg-accent/30 p-3 rounded-lg">
                <strong>5. Add Medicine</strong>
                <p className="text-xs text-muted-foreground">Create/edit meds</p>
              </div>
              <div className="bg-accent/30 p-3 rounded-lg">
                <strong>6. Medicine List</strong>
                <p className="text-xs text-muted-foreground">View all meds</p>
              </div>
              <div className="bg-accent/30 p-3 rounded-lg">
                <strong>7. Schedule Reminder</strong>
                <p className="text-xs text-muted-foreground">Set alerts</p>
              </div>
              <div className="bg-accent/30 p-3 rounded-lg">
                <strong>8. Dose Tracking</strong>
                <p className="text-xs text-muted-foreground">Log doses</p>
              </div>
              <div className="bg-accent/30 p-3 rounded-lg">
                <strong>9. Medicine Log</strong>
                <p className="text-xs text-muted-foreground">History view</p>
              </div>
              <div className="bg-accent/30 p-3 rounded-lg">
                <strong>10. Refill Alerts</strong>
                <p className="text-xs text-muted-foreground">Stock warnings</p>
              </div>
              <div className="bg-accent/30 p-3 rounded-lg">
                <strong>11. Analytics</strong>
                <p className="text-xs text-muted-foreground">Reports & charts</p>
              </div>
              <div className="bg-accent/30 p-3 rounded-lg">
                <strong>12. Emergency SOS</strong>
                <p className="text-xs text-muted-foreground">Quick help</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-3">🎨 Design Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Elderly-Friendly:</strong> Large fonts (18px base), high contrast</li>
              <li>• <strong>Medical Theme:</strong> Soft blue/green color palette</li>
              <li>• <strong>Touch Targets:</strong> Minimum 56px height buttons</li>
              <li>• <strong>Visual Status:</strong> Green (taken), red (missed), yellow (warning)</li>
              <li>• <strong>Material Design:</strong> Rounded cards, smooth animations</li>
              <li>• <strong>Responsive:</strong> Works on various screen sizes</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-3">💡 Quick Demo Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>1. Wait for reminder notification (appears after 5 seconds on home)</li>
              <li>2. Explore medicine list to see low stock alerts</li>
              <li>3. Check analytics for adherence tracking charts</li>
              <li>4. Try the emergency SOS feature</li>
              <li>5. View medicine log to see dose history</li>
            </ul>
          </section>
        </div>

        <Button onClick={onDismiss} variant="primary" fullWidth>
          Start Exploring
        </Button>
      </div>
    </div>
  );
}
