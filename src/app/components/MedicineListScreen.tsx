import { ArrowLeft, Pill, Edit2, Trash2, Plus } from 'lucide-react';
import { Button } from './Button';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  stockQuantity: string;
}

interface MedicineListScreenProps {
  medicines: Medicine[];
  onBack: () => void;
  onAdd: () => void;
  onEdit: (medicine: Medicine) => void;
  onDelete: (id: string) => void;
}

export function MedicineListScreen({ medicines, onBack, onAdd, onEdit, onDelete }: MedicineListScreenProps) {
  const getFrequencyLabel = (frequency: string) => {
    const labels: Record<string, string> = {
      'once-daily': 'Once Daily',
      'twice-daily': 'Twice Daily',
      'three-times-daily': '3x Daily',
      'four-times-daily': '4x Daily',
      'as-needed': 'As Needed',
      'weekly': 'Weekly',
      'custom': 'Custom',
    };
    return labels[frequency] || frequency;
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { color: 'text-error', label: 'Out of Stock' };
    if (quantity <= 7) return { color: 'text-warning', label: 'Low Stock' };
    return { color: 'text-success', label: 'In Stock' };
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="bg-primary text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="max-w-md mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Pill className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <div>
                <h2>My Medicines</h2>
                <p className="text-white/80 text-sm">
                  {medicines.length} {medicines.length === 1 ? 'medicine' : 'medicines'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 -mt-4">
        <div className="max-w-md mx-auto">
          <Button onClick={onAdd} fullWidth className="mb-6">
            <Plus className="w-5 h-5" />
            Add New Medicine
          </Button>

          {medicines.length === 0 ? (
            <div className="bg-card rounded-2xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
                <Pill className="w-8 h-8 text-muted-foreground" strokeWidth={2} />
              </div>
              <h4 className="mb-2">No Medicines Yet</h4>
              <p className="text-muted-foreground text-sm">
                Add your first medicine to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {medicines.map((medicine) => {
                const stockStatus = getStockStatus(parseInt(medicine.stockQuantity));
                
                return (
                  <div key={medicine.id} className="bg-card rounded-2xl shadow-md p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Pill className="w-6 h-6 text-primary" strokeWidth={2.5} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="mb-1 truncate">{medicine.name}</h4>
                        <p className="text-muted-foreground text-sm mb-2">
                          {medicine.dosage} • {getFrequencyLabel(medicine.frequency)}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <span className={`font-medium ${stockStatus.color}`}>
                            {medicine.stockQuantity} left
                          </span>
                          <span className="text-muted-foreground">
                            Since {new Date(medicine.startDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => onEdit(medicine)}
                          className="p-2 hover:bg-accent rounded-lg transition-colors"
                        >
                          <Edit2 className="w-5 h-5 text-primary" strokeWidth={2} />
                        </button>
                        <button
                          onClick={() => onDelete(medicine.id)}
                          className="p-2 hover:bg-error/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5 text-error" strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
