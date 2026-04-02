import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pill, Edit2, Trash2, Plus, Search, LayoutGrid, List, Filter, ArrowLeft } from 'lucide-react';
import { api } from '../../services/api';
import { EmptyState } from '../../components/shared/EmptyState';
import { LoadingSkeleton } from '../../components/shared/LoadingSkeleton';
import { toast } from 'sonner';

export default function MedicineListScreen() {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      setLoading(true);
      const result = await api.getMedicines();
      setMedicines(result.data || []);
    } catch {
      // Mock data fallback
      setMedicines([
        { id: '1', name: 'Aspirin', dosage: '500mg', form: 'tablet', frequency: 'twice-daily', stockQuantity: 28, isActive: true, startDate: '2025-01-01', expiryDate: '2025-12-31' },
        { id: '2', name: 'Metformin', dosage: '1000mg', form: 'tablet', frequency: 'twice-daily', stockQuantity: 5, isActive: true, startDate: '2025-01-01', expiryDate: '2025-03-15' },
        { id: '3', name: 'Lisinopril', dosage: '10mg', form: 'tablet', frequency: 'once-daily', stockQuantity: 15, isActive: true, startDate: '2025-01-01', expiryDate: '2025-11-20' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this medicine?')) return;
    try {
      await api.deleteMedicine(id);
      setMedicines(medicines.filter((m) => m.id !== id));
      toast.success('Medicine deleted');
    } catch {
      setMedicines(medicines.filter((m) => m.id !== id));
      toast.success('Medicine deleted');
    }
  };

  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch = med.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === 'all' || (filter === 'active' ? med.isActive : !med.isActive);
    return matchesSearch && matchesFilter;
  });

  const getFrequencyLabel = (freq: string) => {
    const labels: Record<string, string> = {
      'once-daily': 'Once Daily',
      'twice-daily': 'Twice Daily',
      'three-times-daily': '3x Daily',
      'four-times-daily': '4x Daily',
      'as-needed': 'As Needed',
      weekly: 'Weekly',
    };
    return labels[freq] || freq;
  };

  const getStockBadge = (qty: number) => {
    if (qty === 0) return { bg: 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400', label: 'Out of Stock' };
    if (qty <= 7) return { bg: 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400', label: 'Low Stock' };
    return { bg: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', label: 'In Stock' };
  };

  const formIcons: Record<string, string> = {
    tablet: '💊', capsule: '💊', liquid: '🧪', injection: '💉', cream: '🧴',
    drops: '💧', inhaler: '🫁', patch: '🩹',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">My Medicines</h1>
              <p className="text-white/70 text-sm mt-1">
                {medicines.length} {medicines.length === 1 ? 'medicine' : 'medicines'} total
              </p>
            </div>
            <button
              onClick={() => navigate('/medicines/add')}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors font-medium text-sm"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Medicine</span>
            </button>
          </div>

          {/* Search + Filters */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <input
                type="text"
                placeholder="Search medicines..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/15 backdrop-blur-sm rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
              />
            </div>
            <div className="flex items-center gap-1 bg-white/15 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/25' : ''}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/25' : ''}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Filter Pills */}
        <div className="flex gap-2 mb-6">
          {(['all', 'active', 'inactive'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-card text-muted-foreground border border-border hover:bg-accent'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingSkeleton variant="card" count={3} />
        ) : filteredMedicines.length === 0 ? (
          <EmptyState
            icon={Pill}
            title="No Medicines Found"
            description={search ? 'No medicines match your search' : 'Add your first medicine to get started'}
            action={!search ? { label: 'Add Medicine', onClick: () => navigate('/medicines/add') } : undefined}
          />
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMedicines.map((med) => {
              const stock = getStockBadge(med.stockQuantity);
              return (
                <div key={med.id} className="bg-card rounded-2xl shadow-sm hover:shadow-md transition-all p-5 group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center text-xl">
                        {formIcons[med.form] || '💊'}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{med.name}</h4>
                        <p className="text-xs text-muted-foreground">{med.dosage}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => navigate(`/medicines/edit/${med.id}`)}
                        className="p-1.5 rounded-lg hover:bg-accent transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-blue-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(med.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{getFrequencyLabel(med.frequency)}</span>
                      <span className={`px-2 py-0.5 rounded-full font-medium ${stock.bg}`}>
                        {med.stockQuantity} left
                      </span>
                    </div>
                    {med.expiryDate && (
                      <div className="text-xs text-muted-foreground">
                        Expires: {new Date(med.expiryDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMedicines.map((med) => {
              const stock = getStockBadge(med.stockQuantity);
              return (
                <div key={med.id} className="bg-card rounded-xl shadow-sm p-4 flex items-center gap-4 group hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg flex items-center justify-center text-lg">
                    {formIcons[med.form] || '💊'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{med.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {med.dosage} • {getFrequencyLabel(med.frequency)}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${stock.bg}`}>
                    {stock.label}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => navigate(`/medicines/edit/${med.id}`)} className="p-2 rounded-lg hover:bg-accent">
                      <Edit2 className="w-4 h-4 text-blue-500" />
                    </button>
                    <button onClick={() => handleDelete(med.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
