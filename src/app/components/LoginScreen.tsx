import { useState } from 'react';
import { LogIn, Mail, Lock, Pill, Heart } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onNavigateToRegister: () => void;
  onForgotPassword: () => void;
}

export function LoginScreen({ onLogin, onNavigateToRegister, onForgotPassword }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Please enter your password';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full justify-center">
        <div className="mb-12 text-center">
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="relative">
              <Pill className="w-14 h-14 text-primary" strokeWidth={2} />
              <Heart className="w-6 h-6 text-success absolute -bottom-1 -right-1" strokeWidth={2.5} />
            </div>
          </div>
          
          <h1 className="mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            Login to manage your medications
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="Email / Phone Number"
            type="text"
            placeholder="Enter your email or phone"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: '' });
            }}
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: '' });
            }}
            error={errors.password}
          />

          <button
            type="button"
            onClick={onForgotPassword}
            className="text-primary hover:underline text-right text-sm"
          >
            Forgot Password?
          </button>

          <div className="mt-2">
            <Button type="submit" fullWidth>
              <LogIn className="w-5 h-5" />
              Login
            </Button>
          </div>

          <div className="text-center pt-6">
            <p className="text-muted-foreground">
              New user?{' '}
              <button
                type="button"
                onClick={onNavigateToRegister}
                className="text-primary hover:underline font-medium"
              >
                Register here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}