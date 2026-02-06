import { ArrowLeft, AlertCircle, Bell, Calendar, Pill } from 'lucide-react';
import { Button } from './Button';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  stockQuantity: number;
  expiryDate?: string;
}

interface RefillAlertsScreenProps {
  medicines: Medicine[];
  onBack: () => void;
  onSendRefillReminder: (medicineId: string) => void;
}

export function RefillAlertsScreen({ medicines, onBack, onSendRefillReminder }: RefillAlertsScreenProps) {
  const getLowStockMedicines = () => {
    return medicines.filter((med) => med.stockQuantity <= 7);
  };

  const getExpiringMedicines = () => {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    return medicines.filter((med) => {
      if (!med.expiryDate) return false;
      const expiryDate = new Date(med.expiryDate);
      return expiryDate <= thirtyDaysFromNow && expiryDate >= new Date();
    });
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) {
      return { color: 'bg-error text-error-foreground', label: 'Out of Stock', icon: 'bg-error/10 text-error' };
    }
    if (quantity <= 3) {
      return { color: 'bg-error/90 text-error-foreground', label: 'Critical', icon: 'bg-error/10 text-error' };
    }
    if (quantity <= 7) {
      return { color: 'bg-warning text-warning-foreground', label: 'Low Stock', icon: 'bg-warning/10 text-warning' };
    }
    return { color: 'bg-success text-success-foreground', label: 'Good', icon: 'bg-success/10 text-success' };
  };

  const lowStockMedicines = getLowStockMedicines();
  const expiringMedicines = getExpiringMedicines();

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-warning text-white p-6 pb-8 rounded-b-3xl shadow-lg">
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
              <AlertCircle className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div>
              <h2>Refill & Alerts</h2>
              <p className="text-white/80 text-sm">
                {lowStockMedicines.length + expiringMedicines.length} alerts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 -mt-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* Low Stock Alerts */}
          <div>
            <h3 className="mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-error" />
              Low Stock Alerts
            </h3>

            {lowStockMedicines.length === 0 ? (
              <div className="bg-card rounded-2xl shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Pill className="w-6 h-6 text-success" strokeWidth={2} />
                </div>
                <p className="text-muted-foreground text-sm">
                  All medicines are well stocked
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockMedicines.map((medicine) => {
                  const status = getStockStatus(medicine.stockQuantity);
                  
                  return (
                    <div key={medicine.id} className="bg-card rounded-2xl shadow-md p-5">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${status.icon}`}>
                          <Pill className="w-6 h-6" strokeWidth={2.5} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="mb-1">{medicine.name}</h4>
                          <p className="text-muted-foreground text-sm mb-2">
                            {medicine.dosage}
                          </p>
                          
                          <div className="flex items-center gap-3">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}
                            >
                              <AlertCircle className="w-3 h-3" />
                              {status.label}
                            </span>
                            <span className="text-sm font-medium">
                              {medicine.stockQuantity} left
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => onSendRefillReminder(medicine.id)}
                        variant="outline"
                        size="md"
                        fullWidth
                      >
                        <Bell className="w-4 h-4" />
                        Send Refill Reminder
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Expiry Alerts */}
          <div>
            <h3 className="mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-warning" />
              Expiring Soon
            </h3>

            {expiringMedicines.length === 0 ? (
              <div className="bg-card rounded-2xl shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-success" strokeWidth={2} />
                </div>
                <p className="text-muted-foreground text-sm">
                  No medicines expiring in the next 30 days
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {expiringMedicines.map((medicine) => {
                  const daysUntilExpiry = Math.ceil(
                    (new Date(medicine.expiryDate!).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  );

                  return (
                    <div key={medicine.id} className="bg-card rounded-2xl shadow-md p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-6 h-6 text-warning" strokeWidth={2.5} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="mb-1">{medicine.name}</h4>
                          <p className="text-muted-foreground text-sm mb-2">
                            {medicine.dosage}
                          </p>
                          
                          <div className="bg-warning/10 border border-warning/20 rounded-lg px-3 py-2">
                            <p className="text-sm text-warning-foreground">
                              ⚠️ Expires in {daysUntilExpiry} {daysUntilExpiry === 1 ? 'day' : 'days'}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(medicine.expiryDate!).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* All Medicines Stock Status */}
          <div>
            <h3 className="mb-4">All Medicines</h3>
            
            <div className="bg-card rounded-2xl shadow-md p-5">
              <div className="space-y-3">
                {medicines.map((medicine) => {
                  const status = getStockStatus(medicine.stockQuantity);
                  
                  return (
                    <div key={medicine.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div className="flex-1">
                        <h4 className="text-sm mb-1">{medicine.name}</h4>
                        <p className="text-muted-foreground text-xs">
                          {medicine.dosage}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium mb-1">
                          {medicine.stockQuantity}
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
