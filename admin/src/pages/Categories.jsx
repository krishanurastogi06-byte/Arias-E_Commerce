import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { crudService } from '../data/mockData';
import TableView from '../components/shared/TableView';
import Pagination from '../components/shared/Pagination';
import FilterBar from '../components/shared/FilterBar';
import Modal from '../components/shared/Modal';
import FormInput from '../components/shared/FormInput';

const Categories = () => {
  const [data, setData] = useState(crudService.getCategories());
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showingAll, setShowingAll] = useState(false);
  const itemsPerPage = 5;

  // CRUD State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ title: '', label: '', category: '', image: '' });

  // Filter Data
  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const paginatedData = showingAll
    ? filteredData
    : filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({ title: item.title, label: item.label, category: item.category, image: item.image });
    } else {
      setEditingItem(null);
      setFormData({ title: '', label: '', category: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      const updated = crudService.updateCategory(editingItem.id, formData);
      setData(data.map(item => item.id === editingItem.id ? updated : item));
    } else {
      const created = crudService.addCategory(formData);
      setData([created, ...data]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      const newData = data.filter(i => i.id !== item.id);
      setData(newData);
    }
  };

  const headers = [
    { label: 'Thumbnail', key: 'image' },
    { label: 'Title', key: 'title' },
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
    if (key === 'title') return <span className="font-serif font-bold text-foreground">{item.title}</span>;
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

      <TableView
        headers={headers}
        data={paginatedData}
        renderCell={renderCell}
        onDelete={handleDelete}
        onEdit={handleOpenModal}
      />

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
              label="Title"
              id="cat-title"
              value={formData.title}
              onChange={(val) => setFormData({ ...formData, title: val })}
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
              label="Category"
              id="cat-slug"
              value={formData.category}
              onChange={(val) => setFormData({ ...formData, category: val })}
              placeholder="e.g. Dresses"
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
              className="px-10 py-3 bg-black text-white rounded-2xl text-sm font-bold hover:bg-luxury-gold transition-all shadow-lg shadow-black/5"
            >
              {editingItem ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Categories;
