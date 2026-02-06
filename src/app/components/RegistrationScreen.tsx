import { useState } from 'react';
import { UserPlus, Mail, Lock, User, Phone } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface RegistrationScreenProps {
  onRegister: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => void;
  onNavigateToLogin: () => void;
}

export function RegistrationScreen({ onRegister, onNavigateToLogin }: RegistrationScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    }
    
    if (!formData.password) {
      newErrors.password = 'Please enter a password';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onRegister({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        <div className="pt-8 pb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <UserPlus className="w-8 h-8 text-primary" strokeWidth={2.5} />
          </div>
          
          <h1 className="mb-2">Create Account</h1>
          <p className="text-muted-foreground">
            Join MediCare Plus to manage your medications easily
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setErrors({ ...errors, name: '' });
            }}
            error={errors.name}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              setErrors({ ...errors, email: '' });
            }}
            error={errors.email}
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              setErrors({ ...errors, phone: '' });
            }}
            error={errors.phone}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              setErrors({ ...errors, password: '' });
            }}
            error={errors.password}
            helperText="At least 6 characters"
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
              setErrors({ ...errors, confirmPassword: '' });
            }}
            error={errors.confirmPassword}
          />

          <div className="mt-4">
            <Button type="submit" fullWidth>
              Register
            </Button>
          </div>

          <div className="text-center pt-4">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="text-primary hover:underline font-medium"
              >
                Login here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}