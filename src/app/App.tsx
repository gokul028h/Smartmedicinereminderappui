import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegistrationScreen } from './components/RegistrationScreen';
import { HomeScreen } from './components/HomeScreen';
import { AddMedicineScreen } from './components/AddMedicineScreen';
import { MedicineListScreen } from './components/MedicineListScreen';
import { SaveConfirmation } from './components/SaveConfirmation';
import { ScheduleReminderScreen } from './components/ScheduleReminderScreen';
import { ReminderNotification } from './components/ReminderNotification';
import { DoseTrackingScreen } from './components/DoseTrackingScreen';
import { MedicineLogScreen } from './components/MedicineLogScreen';
import { RefillAlertsScreen } from './components/RefillAlertsScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { EmergencySOSScreen } from './components/EmergencySOSScreen';
import { SOSTriggeredScreen } from './components/SOSTriggeredScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { LogoutConfirmation } from './components/LogoutConfirmation';
import { DemoGuide } from './components/DemoGuide';

type Screen =
  | 'splash'
  | 'login'
  | 'register'
  | 'home'
  | 'add-medicine'
  | 'medicines'
  | 'save-confirmation'
  | 'schedule-reminder'
  | 'reminder-notification'
  | 'dose-tracking'
  | 'medicine-log'
  | 'refill-alerts'
  | 'analytics'
  | 'emergency'
  | 'sos-triggered'
  | 'profile'
  | 'logout-confirmation'
  | 'demo-guide';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  stockQuantity: string;
  expiryDate?: string;
}

interface DoseLog {
  id: string;
  medicineName: string;
  dosage: string;
  status: 'taken' | 'missed';
  timestamp: string;
  reason?: string;
}

interface User {
  name: string;
  email: string;
  phone: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [doseLogs, setDoseLogs] = useState<DoseLog[]>([]);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | undefined>();
  const [currentDoseTracking, setCurrentDoseTracking] = useState<{
    medicineName: string;
    dosage: string;
    status: 'taken' | 'missed';
  } | null>(null);
  const [saveMessage, setSaveMessage] = useState('');
  const [showReminderNotification, setShowReminderNotification] = useState(false);
  const [showDemoGuide, setShowDemoGuide] = useState(true);

  // Initialize with mock data for demonstration
  useEffect(() => {
    // Mock medicines
    const mockMedicines: Medicine[] = [
      {
        id: '1',
        name: 'Aspirin',
        dosage: '500mg',
        frequency: 'twice-daily',
        startDate: '2025-01-01',
        endDate: '',
        stockQuantity: '28',
        expiryDate: '2025-12-31',
      },
      {
        id: '2',
        name: 'Metformin',
        dosage: '1000mg',
        frequency: 'twice-daily',
        startDate: '2025-01-01',
        endDate: '',
        stockQuantity: '5',
        expiryDate: '2025-03-15',
      },
      {
        id: '3',
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'once-daily',
        startDate: '2025-01-01',
        endDate: '',
        stockQuantity: '15',
        expiryDate: '2025-11-20',
      },
    ];

    // Mock dose logs
    const mockLogs: DoseLog[] = [
      {
        id: '1',
        medicineName: 'Aspirin',
        dosage: '500mg',
        status: 'taken',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        medicineName: 'Metformin',
        dosage: '1000mg',
        status: 'taken',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: '3',
        medicineName: 'Lisinopril',
        dosage: '10mg',
        status: 'missed',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        reason: 'Forgot to take it',
      },
    ];

    setMedicines(mockMedicines);
    setDoseLogs(mockLogs);
  }, []);

  // Simulate a reminder notification after 5 seconds on home screen
  useEffect(() => {
    if (currentScreen === 'home' && medicines.length > 0) {
      const timer = setTimeout(() => {
        setShowReminderNotification(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [currentScreen, medicines]);

  const handleSplashComplete = () => {
    setCurrentScreen('login');
  };

  const handleLogin = (email: string, password: string) => {
    // Mock login
    setUser({
      name: 'John Doe',
      email: email,
      phone: '+1 (555) 123-4567',
    });
    setIsAuthenticated(true);
    setCurrentScreen('home');
  };

  const handleRegister = (data: { name: string; email: string; phone: string; password: string }) => {
    // Mock registration
    setUser({
      name: data.name,
      email: data.email,
      phone: data.phone,
    });
    setIsAuthenticated(true);
    setCurrentScreen('home');
  };

  const handleSaveMedicine = (medicineData: Omit<Medicine, 'id'>) => {
    if (editingMedicine) {
      // Update existing medicine
      setMedicines(
        medicines.map((med) =>
          med.id === editingMedicine.id ? { ...medicineData, id: editingMedicine.id } : med
        )
      );
      setSaveMessage('Medicine updated successfully!');
    } else {
      // Add new medicine
      const newMedicine: Medicine = {
        ...medicineData,
        id: Date.now().toString(),
      };
      setMedicines([...medicines, newMedicine]);
      setSaveMessage('Medicine added successfully!');
    }
    setEditingMedicine(undefined);
    setCurrentScreen('save-confirmation');
  };

  const handleDeleteMedicine = (id: string) => {
    setMedicines(medicines.filter((med) => med.id !== id));
  };

  const handleScheduleReminder = (reminder: {
    medicineId: string;
    times: string[];
    frequency: string;
    notificationsEnabled: boolean;
  }) => {
    setSaveMessage('Reminder scheduled successfully!');
    setCurrentScreen('save-confirmation');
  };

  const handleDoseTaken = () => {
    const medicine = medicines[0]; // Mock - use first medicine
    setCurrentDoseTracking({
      medicineName: medicine.name,
      dosage: medicine.dosage,
      status: 'taken',
    });
    setShowReminderNotification(false);
    setCurrentScreen('dose-tracking');
  };

  const handleDoseMissed = () => {
    const medicine = medicines[0]; // Mock - use first medicine
    setCurrentDoseTracking({
      medicineName: medicine.name,
      dosage: medicine.dosage,
      status: 'missed',
    });
    setShowReminderNotification(false);
    setCurrentScreen('dose-tracking');
  };

  const handleConfirmDoseTracking = (data: {
    status: 'taken' | 'missed';
    reason?: string;
    timestamp: string;
  }) => {
    if (currentDoseTracking) {
      const newLog: DoseLog = {
        id: Date.now().toString(),
        medicineName: currentDoseTracking.medicineName,
        dosage: currentDoseTracking.dosage,
        status: data.status,
        timestamp: data.timestamp,
        reason: data.reason,
      };
      setDoseLogs([newLog, ...doseLogs]);

      // Update stock if taken
      if (data.status === 'taken') {
        setMedicines(
          medicines.map((med) => {
            if (med.name === currentDoseTracking.medicineName) {
              return {
                ...med,
                stockQuantity: String(Math.max(0, parseInt(med.stockQuantity) - 1)),
              };
            }
            return med;
          })
        );
      }
    }
    setCurrentDoseTracking(null);
    setCurrentScreen('home');
  };

  const handleSendRefillReminder = (medicineId: string) => {
    setSaveMessage('Refill reminder sent!');
    setCurrentScreen('save-confirmation');
  };

  const handleTriggerSOS = () => {
    setCurrentScreen('sos-triggered');
  };

  const handleLogout = () => {
    setCurrentScreen('logout-confirmation');
  };

  const handleConfirmLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentScreen('login');
  };

  const handleNavigate = (screen: string) => {
    if (screen === 'home') {
      setCurrentScreen('home');
    } else if (screen === 'add-medicine') {
      setEditingMedicine(undefined);
      setCurrentScreen('add-medicine');
    } else if (screen === 'medicines') {
      setCurrentScreen('medicines');
    } else if (screen === 'schedule-reminder') {
      setCurrentScreen('schedule-reminder');
    } else if (screen === 'medicine-log') {
      setCurrentScreen('medicine-log');
    } else if (screen === 'refill-alerts') {
      setCurrentScreen('refill-alerts');
    } else if (screen === 'analytics') {
      setCurrentScreen('analytics');
    } else if (screen === 'emergency') {
      setCurrentScreen('emergency');
    } else if (screen === 'profile') {
      setCurrentScreen('profile');
    } else if (screen === 'demo-guide') {
      setCurrentScreen('demo-guide');
    }
  };

  return (
    <div className="size-full">
      {currentScreen === 'splash' && <SplashScreen onComplete={handleSplashComplete} />}

      {currentScreen === 'login' && (
        <LoginScreen
          onLogin={handleLogin}
          onNavigateToRegister={() => setCurrentScreen('register')}
          onForgotPassword={() => alert('Password reset feature coming soon!')}
        />
      )}

      {currentScreen === 'register' && (
        <RegistrationScreen
          onRegister={handleRegister}
          onNavigateToLogin={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'home' && user && (
        <HomeScreen userName={user.name} onNavigate={handleNavigate} />
      )}

      {currentScreen === 'add-medicine' && (
        <AddMedicineScreen
          onBack={() => setCurrentScreen('home')}
          onSave={handleSaveMedicine}
          editingMedicine={editingMedicine}
        />
      )}

      {currentScreen === 'medicines' && (
        <MedicineListScreen
          medicines={medicines}
          onBack={() => setCurrentScreen('home')}
          onAdd={() => {
            setEditingMedicine(undefined);
            setCurrentScreen('add-medicine');
          }}
          onEdit={(medicine) => {
            setEditingMedicine(medicine);
            setCurrentScreen('add-medicine');
          }}
          onDelete={handleDeleteMedicine}
        />
      )}

      {currentScreen === 'save-confirmation' && (
        <SaveConfirmation
          message={saveMessage}
          onContinue={() => setCurrentScreen('home')}
        />
      )}

      {currentScreen === 'schedule-reminder' && (
        <ScheduleReminderScreen
          medicines={medicines}
          onBack={() => setCurrentScreen('home')}
          onSchedule={handleScheduleReminder}
        />
      )}

      {currentScreen === 'dose-tracking' && currentDoseTracking && (
        <DoseTrackingScreen
          medicineName={currentDoseTracking.medicineName}
          dosage={currentDoseTracking.dosage}
          status={currentDoseTracking.status}
          onBack={() => setCurrentScreen('home')}
          onConfirm={handleConfirmDoseTracking}
        />
      )}

      {currentScreen === 'medicine-log' && (
        <MedicineLogScreen logs={doseLogs} onBack={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'refill-alerts' && (
        <RefillAlertsScreen
          medicines={medicines.map((med) => ({
            ...med,
            stockQuantity: parseInt(med.stockQuantity),
          }))}
          onBack={() => setCurrentScreen('home')}
          onSendRefillReminder={handleSendRefillReminder}
        />
      )}

      {currentScreen === 'analytics' && (
        <AnalyticsScreen onBack={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'emergency' && (
        <EmergencySOSScreen onBack={() => setCurrentScreen('home')} onTriggerSOS={handleTriggerSOS} />
      )}

      {currentScreen === 'sos-triggered' && (
        <SOSTriggeredScreen onDismiss={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'profile' && user && (
        <ProfileScreen
          userName={user.name}
          userEmail={user.email}
          onBack={() => setCurrentScreen('home')}
          onEditProfile={() => alert('Edit profile feature coming soon!')}
          onNotificationSettings={() => alert('Notification settings coming soon!')}
          onLanguageSettings={() => alert('Language settings coming soon!')}
          onAppSettings={() => alert('App settings coming soon!')}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === 'logout-confirmation' && (
        <LogoutConfirmation
          onConfirm={handleConfirmLogout}
          onCancel={() => setCurrentScreen('profile')}
        />
      )}

      {/* Reminder Notification Overlay */}
      {showReminderNotification && medicines.length > 0 && (
        <ReminderNotification
          medicineName={medicines[0].name}
          dosage={medicines[0].dosage}
          scheduledTime={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          onTaken={handleDoseTaken}
          onMissed={handleDoseMissed}
          onClose={() => setShowReminderNotification(false)}
        />
      )}

      {/* Demo Guide */}
      {showDemoGuide && <DemoGuide onDismiss={() => setShowDemoGuide(false)} />}
    </div>
  );
}