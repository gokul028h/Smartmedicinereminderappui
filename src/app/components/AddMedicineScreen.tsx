import { useState } from 'react';
import { ArrowLeft, Pill, Save } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  stockQuantity: string;
}

interface AddMedicineScreenProps {
  onBack: () => void;
  onSave: (medicine: Omit<Medicine, 'id'>) => void;
  editingMedicine?: Medicine;
}

export function AddMedicineScreen({ onBack, onSave, editingMedicine }: AddMedicineScreenProps) {
  const [formData, setFormData] = useState({
    name: editingMedicine?.name || '',
    dosage: editingMedicine?.dosage || '',
    frequency: editingMedicine?.frequency || 'once-daily',
    startDate: editingMedicine?.startDate || '',
    endDate: editingMedicine?.endDate || '',
    stockQuantity: editingMedicine?.stockQuantity || '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter medicine name';
    }
    
    if (!formData.dosage.trim()) {
      newErrors.dosage = 'Please enter dosage';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Please select start date';
    }
    
    if (!formData.stockQuantity || parseInt(formData.stockQuantity) < 0) {
      newErrors.stockQuantity = 'Please enter valid stock quantity';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSave(formData);
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
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Pill className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <div>
              <h2>{editingMedicine ? 'Edit Medicine' : 'Add New Medicine'}</h2>
              <p className="text-white/80 text-sm">
                Fill in the details below
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 -mt-4">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-card rounded-2xl shadow-md p-6">
          <div className="space-y-5">
            <Input
              label="Medicine Name"
              type="text"
              placeholder="e.g., Aspirin, Metformin"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                setErrors({ ...errors, name: '' });
              }}
              error={errors.name}
              helperText="Enter the full name of the medicine"
            />

            <Input
              label="Dosage"
              type="text"
              placeholder="e.g., 500mg, 1 tablet"
              value={formData.dosage}
              onChange={(e) => {
                setFormData({ ...formData, dosage: e.target.value });
                setErrors({ ...errors, dosage: '' });
              }}
              error={errors.dosage}
              helperText="How much to take each time"
            />

            <div>
              <label className="block mb-2 text-foreground">
                Frequency
              </label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                className="w-full px-4 py-4 min-h-[56px] rounded-xl border-2 border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="once-daily">Once Daily</option>
                <option value="twice-daily">Twice Daily</option>
                <option value="three-times-daily">Three Times Daily</option>
                <option value="four-times-daily">Four Times Daily</option>
                <option value="as-needed">As Needed</option>
                <option value="weekly">Weekly</option>
                <option value="custom">Custom Schedule</option>
              </select>
              <p className="mt-2 text-muted-foreground text-sm">
                How often to take this medicine
              </p>
            </div>

            <Input
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(e) => {
                setFormData({ ...formData, startDate: e.target.value });
                setErrors({ ...errors, startDate: '' });
              }}
              error={errors.startDate}
              helperText="When to start taking this medicine"
            />

            <Input
              label="End Date (Optional)"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              helperText="Leave blank for ongoing medication"
            />

            <Input
              label="Stock Quantity"
              type="number"
              placeholder="e.g., 30"
              value={formData.stockQuantity}
              onChange={(e) => {
                setFormData({ ...formData, stockQuantity: e.target.value });
                setErrors({ ...errors, stockQuantity: '' });
              }}
              error={errors.stockQuantity}
              helperText="Number of doses/pills remaining"
            />

            <div className="pt-4">
              <Button type="submit" fullWidth>
                <Save className="w-5 h-5" />
                {editingMedicine ? 'Update Medicine' : 'Save Medicine'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
