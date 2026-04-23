import React, { useState, useEffect } from 'react';
import { Plus, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import TableView from '../components/shared/TableView';
import Pagination from '../components/shared/Pagination';
import FilterBar from '../components/shared/FilterBar';
import Modal from '../components/shared/Modal';
import FormInput from '../components/shared/FormInput';

const Categories = () => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showingAll, setShowingAll] = useState(false);
  const itemsPerPage = 5;

  // CRUD State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ categoryName: '', label: '', image: '' });

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/category/all`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const result = await response.json();
      // Map backend 'categoryName' to frontend 'category' for local display if needed, 
      // but easier to just use the objects as they come and fix the mapping in the form.
      setData(result.categories || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter Data
  const filteredData = data.filter(item =>
    (item.categoryName || '').toLowerCase().includes(search.toLowerCase()) ||
    (item.categoryName || '').toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const paginatedData = showingAll
    ? filteredData
    : filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        categoryName: item.categoryName || '',
        label: item.label || '',
        image: item.image || ''
      });
    } else {
      setEditingItem(null);
      setFormData({ categoryName: '', label: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      categoryName: formData.categoryName,
      label: formData.label,
      image: formData.image
    };

    try {
      const url = editingItem
        ? `${import.meta.env.VITE_API_URL}/category/update`
        : `${import.meta.env.VITE_API_URL}/category/create`;

      const method = editingItem ? 'PUT' : 'POST';

      if (editingItem) {
        payload.id = editingItem._id;
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Operation failed');

      if (editingItem) {
        setData(data.map(item => item._id === editingItem._id ? result.category : item));
      } else {
        setData([result.category, ...data]);
      }
      setIsModalOpen(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.categoryName}"?`)) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/category/delete`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ id: item._id })
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.message || 'Delete failed');
        }

        setData(data.filter(i => i._id !== item._id));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const headers = [
    { label: 'Thumbnail', key: 'image' },
    { label: 'Category Name', key: 'categoryName' },
    { label: 'Label', key: 'label' },
  ];

  const renderCell = (item, key) => {
    if (key === 'image') {
      return (
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-100">
          <img src={item.image} alt="" className="w-full h-full object-cover" />
        </div>
      );
    }
    if (key === 'categoryName') return <span className="font-serif font-bold text-foreground">{item.categoryName}</span>;
    return item[key];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Categories</h1>
          <p className="text-neutral-500 text-sm">Organize your products into elegant collections.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="btn-luxury flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <FilterBar
        search={search}
        onSearchChange={(val) => { setSearch(val); setCurrentPage(1); }}
        showViewToggle={false}
        placeholder="Filter categories..."
      />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
          <Loader2 className="animate-spin text-luxury-gold" size={40} />
          <p className="text-neutral-400 font-medium">Loading collections...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-center">
          <AlertCircle className="text-red-400" size={40} />
          <div>
            <h3 className="text-lg font-bold text-foreground">Failed to load categories</h3>
            <p className="text-neutral-500">{error}</p>
          </div>
          <button onClick={fetchCategories} className="btn-luxury px-6 py-2">Try Again</button>
        </div>
      ) : (
        <TableView
          headers={headers}
          data={paginatedData}
          renderCell={renderCell}
          onDelete={handleDelete}
          onEdit={handleOpenModal}
        />
      )}

      <Pagination
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onShowAll={() => setShowingAll(!showingAll)}
        showingAll={showingAll}
      />

      {/* CRUD Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Category' : 'Add New Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Category"
              id="cat-categoryName"
              value={formData.categoryName}
              onChange={(val) => setFormData({ ...formData, categoryName: val })}
              placeholder="e.g. Elegant Dresses"
              required
            />
            <FormInput
              label="Label"
              id="cat-label"
              value={formData.label}
              onChange={(val) => setFormData({ ...formData, label: val })}
              placeholder="e.g. Evening & Party Wear"
              required
            />
            <FormInput
              label="Image URL"
              id="cat-image"
              value={formData.image}
              onChange={(val) => setFormData({ ...formData, image: val })}
              placeholder="https://images.unsplash.com/..."
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-50">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-3 rounded-2xl text-sm font-bold text-neutral-400 hover:text-black transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-3 bg-black text-white rounded-2xl text-sm font-bold hover:bg-luxury-gold transition-all shadow-lg shadow-black/5 flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="animate-spin" size={16} />}
              {editingItem ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Categories;
