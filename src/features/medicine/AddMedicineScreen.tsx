import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pill, Save } from 'lucide-react';
import { api } from '../../services/api';
import { toast } from 'sonner';

export default function AddMedicineScreen() {
  const navigate = useNavigate();
  const { id: editId } = useParams();
  const isEditing = !!editId;

  const [formData, setFormData] = useState({
    name: '', dosage: '', form: 'tablet', frequency: 'once-daily',
    instructions: '', startDate: '', endDate: '', stockQuantity: '',
    refillThreshold: '7', expiryDate: '', color: '#22c55e',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const formOptions = ['tablet', 'capsule', 'liquid', 'injection', 'cream', 'drops', 'inhaler', 'patch', 'other'];
  const frequencyOptions = [
    { value: 'once-daily', label: 'Once Daily' },
    { value: 'twice-daily', label: 'Twice Daily' },
    { value: 'three-times-daily', label: 'Three Times Daily' },
    { value: 'four-times-daily', label: 'Four Times Daily' },
    { value: 'as-needed', label: 'As Needed' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'custom', label: 'Custom' },
  ];

  const colorOptions = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Medicine name is required';
    if (!formData.dosage.trim()) newErrors.dosage = 'Dosage is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.stockQuantity || parseInt(formData.stockQuantity) < 0) newErrors.stockQuantity = 'Valid stock quantity is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: formData.name,
        dosage: formData.dosage,
        form: formData.form,
        frequency: formData.frequency,
        instructions: formData.instructions || undefined,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
        stockQuantity: parseInt(formData.stockQuantity),
        refillThreshold: parseInt(formData.refillThreshold) || 7,
        expiryDate: formData.expiryDate ? new Date(formData.expiryDate).toISOString() : null,
        color: formData.color,
      };

      if (isEditing) {
        await api.updateMedicine(editId, payload);
        toast.success('Medicine updated! 💊');
      } else {
        await api.createMedicine(payload);
        toast.success('Medicine added! 💊');
      }
      navigate('/medicines');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save');
      // Navigate anyway for demo
      navigate('/medicines');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity text-sm">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Pill className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{isEditing ? 'Edit Medicine' : 'Add Medicine'}</h1>
              <p className="text-white/70 text-sm">Fill in the details below</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card rounded-2xl shadow-sm p-6 space-y-5">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Basic Information</h3>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Medicine Name *</label>
              <input type="text" placeholder="e.g., Aspirin, Metformin" value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 bg-card focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${errors.name ? 'border-red-400' : 'border-border'}`} />
              {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name}</p>}
            </div>

            {/* Dosage + Form */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Dosage *</label>
                <input type="text" placeholder="e.g., 500mg" value={formData.dosage}
                  onChange={(e) => updateField('dosage', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-card focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${errors.dosage ? 'border-red-400' : 'border-border'}`} />
                {errors.dosage && <p className="mt-1 text-red-500 text-xs">{errors.dosage}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Form</label>
                <select value={formData.form} onChange={(e) => updateField('form', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                  {formOptions.map((f) => (
                    <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Frequency</label>
              <select value={formData.frequency} onChange={(e) => updateField('frequency', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                {frequencyOptions.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Special Instructions</label>
              <textarea placeholder="e.g., Take with food, avoid dairy" value={formData.instructions}
                onChange={(e) => updateField('instructions', e.target.value)} rows={2}
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none" />
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium mb-2">Color Tag</label>
              <div className="flex gap-2">
                {colorOptions.map((c) => (
                  <button key={c} type="button" onClick={() => updateField('color', c)}
                    className={`w-8 h-8 rounded-full transition-all ${formData.color === c ? 'ring-2 ring-offset-2 ring-emerald-500 scale-110' : 'hover:scale-105'}`}
                    style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl shadow-sm p-6 space-y-5">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Schedule & Stock</h3>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Start Date *</label>
                <input type="date" value={formData.startDate}
                  onChange={(e) => updateField('startDate', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-card focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${errors.startDate ? 'border-red-400' : 'border-border'}`} />
                {errors.startDate && <p className="mt-1 text-red-500 text-xs">{errors.startDate}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">End Date</label>
                <input type="date" value={formData.endDate}
                  onChange={(e) => updateField('endDate', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
              </div>
            </div>

            {/* Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Stock Quantity *</label>
                <input type="number" placeholder="30" value={formData.stockQuantity}
                  onChange={(e) => updateField('stockQuantity', e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-card focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${errors.stockQuantity ? 'border-red-400' : 'border-border'}`} />
                {errors.stockQuantity && <p className="mt-1 text-red-500 text-xs">{errors.stockQuantity}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Refill Alert At</label>
                <input type="number" placeholder="7" value={formData.refillThreshold}
                  onChange={(e) => updateField('refillThreshold', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
              </div>
            </div>

            {/* Expiry */}
            <div>
              <label className="block text-sm font-medium mb-1.5">Expiry Date</label>
              <input type="date" value={formData.expiryDate}
                onChange={(e) => updateField('expiryDate', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={saving}
            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/25 active:scale-[0.98]">
            {saving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                {isEditing ? 'Update Medicine' : 'Save Medicine'}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
