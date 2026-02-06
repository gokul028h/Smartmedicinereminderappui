import { CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

interface SaveConfirmationProps {
  message: string;
  onContinue: () => void;
}

export function SaveConfirmation({ message, onContinue }: SaveConfirmationProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-success" strokeWidth={2.5} />
        </div>
        
        <h2 className="mb-3">Success!</h2>
        
        <p className="text-muted-foreground mb-8">
          {message}
        </p>
        
        <Button onClick={onContinue} variant="success" fullWidth>
          Continue
        </Button>
      </div>
    </div>
  );
}
