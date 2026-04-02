import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/shared/ProtectedRoute';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { LoadingSkeleton } from './components/shared/LoadingSkeleton';
import { useUIStore } from './store/uiStore';
import { useAuthStore } from './store/authStore';

// Lazy load feature screens for code splitting
const LoginScreen = lazy(() => import('./features/auth/LoginScreen'));
const RegistrationScreen = lazy(() => import('./features/auth/RegistrationScreen'));
const HomeScreen = lazy(() => import('./features/dashboard/HomeScreen'));
const MedicineListScreen = lazy(() => import('./features/medicine/MedicineListScreen'));
const AddMedicineScreen = lazy(() => import('./features/medicine/AddMedicineScreen'));
const ScheduleReminderScreen = lazy(() => import('./features/reminders/ScheduleReminderScreen'));
const MedicineLogScreen = lazy(() => import('./features/history/MedicineLogScreen'));
const AnalyticsScreen = lazy(() => import('./features/analytics/AnalyticsScreen'));
const RefillAlertsScreen = lazy(() => import('./features/refills/RefillAlertsScreen'));
const EmergencySOSScreen = lazy(() => import('./features/sos/EmergencySOSScreen'));
const ProfileScreen = lazy(() => import('./features/profile/ProfileScreen'));

function PageLoader() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <LoadingSkeleton variant="card" count={3} />
    </div>
  );
}

export default function App() {
  const { theme } = useUIStore();
  const { isAuthenticated } = useAuthStore();

  // Apply theme on mount and changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // Listen for auth:logout events from API client
  useEffect(() => {
    const handleLogout = () => {
      useAuthStore.getState().logout();
    };
    window.addEventListener('auth:logout', handleLogout);
    return () => window.removeEventListener('auth:logout', handleLogout);
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginScreen />
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegistrationScreen />
              }
            />

            {/* Protected routes with layout */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<HomeScreen />} />
              <Route path="/medicines" element={<MedicineListScreen />} />
              <Route path="/medicines/add" element={<AddMedicineScreen />} />
              <Route path="/medicines/edit/:id" element={<AddMedicineScreen />} />
              <Route path="/reminders" element={<ScheduleReminderScreen />} />
              <Route path="/history" element={<MedicineLogScreen />} />
              <Route path="/analytics" element={<AnalyticsScreen />} />
              <Route path="/refills" element={<RefillAlertsScreen />} />
              <Route path="/emergency" element={<EmergencySOSScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
            </Route>

            {/* Redirects */}
            <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '12px',
              fontFamily: 'inherit',
            },
          }}
        />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
