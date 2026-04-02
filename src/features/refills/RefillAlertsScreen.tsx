import { useNavigate } from 'react-router-dom';
import { AlertCircle, Bell, Calendar, Pill, ArrowLeft } from 'lucide-react';

export default function RefillAlertsScreen() {
  const navigate = useNavigate();

  const medicines = [
    { id: '1', name: 'Aspirin', dosage: '500mg', stockQuantity: 28, expiryDate: '2025-12-31' },
    { id: '2', name: 'Metformin', dosage: '1000mg', stockQuantity: 5, expiryDate: '2025-03-15' },
    { id: '3', name: 'Lisinopril', dosage: '10mg', stockQuantity: 15, expiryDate: '2025-11-20' },
  ];

  const lowStock = medicines.filter((m) => m.stockQuantity <= 7);
  const expiring = medicines.filter((m) => {
    if (!m.expiryDate) return false;
    const exp = new Date(m.expiryDate);
    const future = new Date(); future.setDate(future.getDate() + 30);
    return exp <= future && exp >= new Date();
  });

  const getStockBadge = (qty: number) => {
    if (qty === 0) return { bg: 'bg-red-100 dark:bg-red-500/10', text: 'text-red-600 dark:text-red-400', label: 'Out of Stock' };
    if (qty <= 3) return { bg: 'bg-red-50 dark:bg-red-500/10', text: 'text-red-500', label: 'Critical' };
    if (qty <= 7) return { bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400', label: 'Low Stock' };
    return { bg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-600', label: 'Good' };
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-4 hover:opacity-80 text-sm">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Refill & Alerts</h1>
              <p className="text-white/70 text-sm">{lowStock.length + expiring.length} alerts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-8">
        {/* Low Stock */}
        <section>
          <h3 className="font-semibold flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-500" /> Low Stock Alerts
          </h3>
          {lowStock.length === 0 ? (
            <div className="bg-card rounded-2xl shadow-sm p-6 text-center">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Pill className="w-6 h-6 text-emerald-500" />
              </div>
              <p className="text-sm text-muted-foreground">All medicines are well stocked</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lowStock.map((med) => {
                const badge = getStockBadge(med.stockQuantity);
                return (
                  <div key={med.id} className="bg-card rounded-2xl shadow-sm p-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${badge.bg} rounded-xl flex items-center justify-center`}>
                        <Pill className={`w-6 h-6 ${badge.text}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{med.name}</h4>
                        <p className="text-xs text-muted-foreground">{med.dosage}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                            {badge.label}
                          </span>
                          <span className="text-xs font-medium">{med.stockQuantity} left</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl text-xs font-medium hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors flex items-center gap-1">
                        <Bell className="w-3 h-3" /> Remind
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Expiring */}
        <section>
          <h3 className="font-semibold flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-amber-500" /> Expiring Soon
          </h3>
          {expiring.length === 0 ? (
            <div className="bg-card rounded-2xl shadow-sm p-6 text-center">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-emerald-500" />
              </div>
              <p className="text-sm text-muted-foreground">No medicines expiring in the next 30 days</p>
            </div>
          ) : (
            <div className="space-y-3">
              {expiring.map((med) => {
                const days = Math.ceil((new Date(med.expiryDate).getTime() - Date.now()) / 86400000);
                return (
                  <div key={med.id} className="bg-card rounded-2xl shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{med.name}</h4>
                      <p className="text-xs text-muted-foreground">{med.dosage}</p>
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium">
                        ⚠️ Expires in {days} {days === 1 ? 'day' : 'days'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* All Stock */}
        <section>
          <h3 className="font-semibold mb-4">All Medicines Stock</h3>
          <div className="bg-card rounded-2xl shadow-sm divide-y divide-border">
            {medicines.map((med) => {
              const badge = getStockBadge(med.stockQuantity);
              return (
                <div key={med.id} className="flex items-center justify-between p-4">
                  <div>
                    <h4 className="font-medium text-sm">{med.name}</h4>
                    <p className="text-xs text-muted-foreground">{med.dosage}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{med.stockQuantity}</div>
                    <span className={`text-xs font-medium ${badge.text}`}>{badge.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
