import { LogOut, X } from 'lucide-react';
import { Button } from './Button';

interface LogoutConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function LogoutConfirmation({ onConfirm, onCancel }: LogoutConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-2xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut className="w-8 h-8 text-error" strokeWidth={2.5} />
          </div>
          
          <h3 className="mb-2">Logout Confirmation</h3>
          
          <p className="text-muted-foreground">
            Are you sure you want to logout? You'll need to login again to access your medications.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={onConfirm} variant="destructive" fullWidth>
            <LogOut className="w-5 h-5" />
            Yes, Logout
          </Button>
          
          <Button onClick={onCancel} variant="outline" fullWidth>
            <X className="w-5 h-5" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
