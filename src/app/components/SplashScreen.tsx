import { useEffect } from 'react';
import { Pill, Heart } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary via-[#3A8FA8] to-[#4CAF6E] p-6">
      <div className="flex items-center gap-4 mb-8 animate-pulse">
        <div className="relative">
          <Pill className="w-20 h-20 text-white" strokeWidth={2} />
          <Heart className="w-8 h-8 text-white absolute -bottom-1 -right-1 animate-pulse" strokeWidth={2.5} />
        </div>
      </div>
      
      <h1 className="text-white text-center mb-4">
        MediCare Plus
      </h1>
      
      <p className="text-white/90 text-center max-w-sm">
        Your trusted medicine reminder & health companion
      </p>
      
      <div className="mt-12 flex gap-2">
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
}
