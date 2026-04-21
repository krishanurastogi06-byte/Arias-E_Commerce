import React, { useState } from 'react';
import { Plus, Calendar, User } from 'lucide-react';
import { crudService } from '../data/mockData';
import TableView from '../components/shared/TableView';
import CardView from '../components/shared/CardView';
import Pagination from '../components/shared/Pagination';
import FilterBar from '../components/shared/FilterBar';
import Modal from '../components/shared/Modal';
import FormInput from '../components/shared/FormInput';

const Blog = () => {
  const [data, setData] = useState(crudService.getBlogs());
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [showingAll, setShowingAll] = useState(false);
  const itemsPerPage = 5;

  // CRUD State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '', author: 'Admin', category: '', image: '', excerpt: '', content: '', date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  });

  const categories = [...new Set(data.map(item => item.category))];

  // Filter Data
  const filteredData = data.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Pagination Logic
  const paginatedData = showingAll 
    ? filteredData 
    : filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        author: item.author || 'Admin',
        category: item.category,
        image: item.image,
        excerpt: item.excerpt || '',
        content: item.content || '',
        date: item.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '', author: 'Admin', category: '', image: '', excerpt: '', content: '', date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      const updated = crudService.updateBlog(editingItem.id, formData);
      setData(data.map(item => item.id === editingItem.id ? updated : item));
    } else {
      const created = crudService.addBlog(formData);
      setData([created, ...data]);
    }
    setIsModalOpen(false);
  };

  const headers = [
    { label: 'Post Title', key: 'title' },
    { label: 'Category', key: 'category' },
    { label: 'Author', key: 'author' },
    { label: 'Date', key: 'date' },
  ];

  const renderCell = (item, key) => {
    if (key === 'title') return (
      <div className="flex flex-col max-w-[300px]">
        <span className="font-serif font-bold text-foreground line-clamp-1">{item.title}</span>
        <span className="text-[10px] text-neutral-400 line-clamp-1">{item.excerpt}</span>
      </div>
    );
    if (key === 'category') return <span className="text-luxury-gold font-bold">{item.category}</span>;
    return item[key];
  };

  const renderCardContent = (item) => (
    <div className="space-y-4">
      <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">{item.excerpt}</p>
      <div className="flex items-center justify-between pt-4 border-t border-neutral-50">
        <div className="flex items-center gap-2">
          <User size={12} className="text-neutral-400" />
          <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-600">{item.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={12} className="text-neutral-400" />
          <span className="text-[10px] text-neutral-400">{item.date}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Blog Management</h1>
          <p className="text-neutral-500 text-sm">Publish and curate lifestyle content.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-luxury flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={18} />
          Create Post
        </button>
      </div>

      <FilterBar 
        search={search}
        onSearchChange={(val) => { setSearch(val); setCurrentPage(1); }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={(val) => { setSelectedCategory(val); setCurrentPage(1); }}
        placeholder="Search editorial content..."
      />

      {viewMode === 'table' ? (
        <TableView 
          headers={headers}
          data={paginatedData}
          renderCell={renderCell}
          onDelete={(item) => window.confirm('Delete post?') && setData(data.filter(i => i.id !== item.id))}
          onEdit={handleOpenModal}
        />
      ) : (
        <CardView 
          data={paginatedData}
          renderContent={renderCardContent}
          onDelete={(item) => window.confirm('Delete post?') && setData(data.filter(i => i.id !== item.id))}
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
        title={editingItem ? 'Edit Blog Post' : 'Create New Post'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput 
              label="Post Title" 
              id="blog-title" 
              value={formData.title} 
              onChange={(val) => setFormData({...formData, title: val})} 
              placeholder="e.g. The Art of Minimalist Living"
              required
            />
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-1">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-5 py-3.5 bg-neutral-50/50 border border-neutral-200 rounded-2xl outline-none focus:border-luxury-gold transition-all text-sm"
                required
              >
                <option value="">Select Category</option>
                <option value="Style Guide">Style Guide</option>
                <option value="Trends">Trends</option>
                <option value="Sustainability">Sustainability</option>
                <option value="Inside ARIA">Inside ARIA</option>
              </select>
            </div>
            <FormInput 
              label="Author Name" 
              id="blog-author" 
              value={formData.author} 
              onChange={(val) => setFormData({...formData, author: val})} 
              placeholder="Elena Rossi"
              required
            />
            <FormInput 
              label="Featured Image URL" 
              id="blog-image" 
              value={formData.image} 
              onChange={(val) => setFormData({...formData, image: val})} 
              placeholder="https://..."
              required
            />
          </div>

          <FormInput 
            label="Excerpt (Short Summary)" 
            id="blog-excerpt" 
            isTextarea
            rows={2}
            value={formData.excerpt} 
            onChange={(val) => setFormData({...formData, excerpt: val})} 
            placeholder="A brief summary for card view..."
            required
          />

          <FormInput 
            label="Post Content (HTML/Text)" 
            id="blog-content" 
            isTextarea
            rows={6}
            value={formData.content} 
            onChange={(val) => setFormData({...formData, content: val})} 
            placeholder="Write your beautiful story here..."
            required
          />
          
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
              {editingItem ? 'Update Post' : 'Publish Post'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Blog;
