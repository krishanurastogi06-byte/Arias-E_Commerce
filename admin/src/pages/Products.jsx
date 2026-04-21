import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { crudService } from '../data/mockData';
import TableView from '../components/shared/TableView';
import CardView from '../components/shared/CardView';
import Pagination from '../components/shared/Pagination';
import FilterBar from '../components/shared/FilterBar';
import Modal from '../components/shared/Modal';
import FormInput from '../components/shared/FormInput';

const Products = () => {
  const [data, setData] = useState(crudService.getProducts());
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [showingAll, setShowingAll] = useState(false);
  const itemsPerPage = 5;

  // CRUD State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const initialFormState = {
    title: '', 
    price: '', 
    oldPrice: '',
    discount: '',
    category: '', 
    brand: 'ARIA Exclusive',
    status: 'Published',
    isNewArrival: false,
    isPopular: false,
    rating: '4.5', 
    reviewCount: '0',
    description: '',
    image: '', 
    sizes: '',
    colors: '',
    material: '',
    fit: '',
    care: '',
    slug: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);

  const categories = [...new Set(data.map(item => item.category))];

  // Filter Data
  const filteredData = data.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
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
        ...initialFormState,
        ...item,
        sizes: Array.isArray(item.sizes) ? item.sizes.join(', ') : (item.sizes || ''),
        colors: Array.isArray(item.colors) ? item.colors.join(', ') : (item.colors || ''),
        price: item.price?.toString() || '',
        oldPrice: item.oldPrice?.toString() || '',
        rating: item.rating?.toString() || '4.5',
        reviewCount: item.reviewCount?.toString() || '0'
      });
    } else {
      setEditingItem(null);
      setFormData(initialFormState);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process comma-separated strings into arrays
    const processedData = {
      ...formData,
      sizes: formData.sizes.split(',').map(s => s.trim()).filter(s => s !== ''),
      colors: formData.colors.split(',').map(c => c.trim()).filter(c => c !== ''),
      price: parseFloat(formData.price),
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
      rating: parseFloat(formData.rating),
      reviewCount: parseInt(formData.reviewCount)
    };
    
    if (editingItem) {
      const updated = crudService.updateProduct(editingItem.id, processedData);
      setData(data.map(item => item.id === editingItem.id ? updated : item));
    } else {
      const created = crudService.addProduct(processedData);
      setData([created, ...data]);
    }
    setIsModalOpen(false);
  };

  const headers = [
    { label: 'Product', key: 'title' },
    { label: 'Price', key: 'price' },
    { label: 'Category', key: 'category' },
    { label: 'Status', key: 'status' },
  ];

  const renderCell = (item, key) => {
    if (key === 'title') return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
          <img src={item.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="font-serif font-bold text-foreground text-sm">{item.title}</span>
          <span className="text-[10px] text-neutral-400 font-mono tracking-tighter uppercase">{item.brand}</span>
        </div>
      </div>
    );
    if (key === 'price') return (
      <div className="flex flex-col">
        <span className="font-bold text-foreground">₹{item.price}</span>
        {item.oldPrice && <span className="text-[10px] text-neutral-400 line-through">₹{item.oldPrice}</span>}
      </div>
    );
    if (key === 'status') return (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${item.status === 'Published' ? 'bg-green-50 text-green-600' : 'bg-neutral-50 text-neutral-400'}`}>
        {item.status || 'Published'}
      </span>
    );
    return item[key];
  };

  const renderCardContent = (item) => (
    <div className="flex flex-col gap-2 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xl font-bold text-foreground">₹{item.price}</span>
          {item.oldPrice && <span className="text-xs text-neutral-400 line-through">₹{item.oldPrice}</span>}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-yellow-500 text-xs">★</span>
          <span className="text-xs font-bold">{item.rating}</span>
        </div>
      </div>
      <div className="flex gap-2">
        {item.status === 'Draft' && <span className="text-[10px] bg-neutral-100 px-2 py-0.5 rounded-md font-bold uppercase text-neutral-500">Draft</span>}
        {item.isNewArrival && <span className="text-[10px] bg-black px-2 py-0.5 rounded-md font-bold uppercase text-white">New</span>}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Products</h1>
          <p className="text-neutral-500 text-sm">Manage your luxury product inventory.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-luxury flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus size={18} />
          New Product
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
      />

      {viewMode === 'table' ? (
        <TableView 
          headers={headers}
          data={paginatedData}
          renderCell={renderCell}
          onDelete={(item) => window.confirm('Delete product?') && setData(data.filter(i => i.id !== item.id))}
          onEdit={handleOpenModal}
        />
      ) : (
        <CardView 
          data={paginatedData}
          renderContent={renderCardContent}
          onDelete={(item) => window.confirm('Delete product?') && setData(data.filter(i => i.id !== item.id))}
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
        title={editingItem ? 'Edit Product' : 'Add New Product'}
      >
        <form onSubmit={handleSubmit} className="space-y-8 max-h-[80vh] overflow-y-auto pr-2 px-1">
          {/* Section 1: General Info */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-4 border-b pb-2">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput 
                label="Product Title" 
                id="prod-title" 
                value={formData.title} 
                onChange={(val) => setFormData({...formData, title: val})} 
                placeholder="e.g. Silk Wrap Gown"
                required
              />
              <FormInput 
                label="Brand" 
                id="prod-brand" 
                value={formData.brand} 
                onChange={(val) => setFormData({...formData, brand: val})} 
                placeholder="ARIA Exclusive"
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
                  {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 ml-1">Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-5 py-3.5 bg-neutral-50/50 border border-neutral-200 rounded-2xl outline-none focus:border-luxury-gold transition-all text-sm"
                  required
                >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Promotion */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-4 border-b pb-2">Pricing & Promotion</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormInput 
                label="Sale Price (₹)" 
                id="prod-price" 
                type="number"
                value={formData.price} 
                onChange={(val) => setFormData({...formData, price: val})} 
                placeholder="249.99"
                required
              />
              <FormInput 
                label="Original Price (₹)" 
                id="prod-oldPrice" 
                type="number"
                value={formData.oldPrice} 
                onChange={(val) => setFormData({...formData, oldPrice: val})} 
                placeholder="350.00"
              />
              <FormInput 
                label="Discount Text" 
                id="prod-discount" 
                value={formData.discount} 
                onChange={(val) => setFormData({...formData, discount: val})} 
                placeholder="30% OFF"
              />
            </div>
            <div className="flex gap-8 mt-4 ml-1">
               <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={formData.isNewArrival} 
                    onChange={(e) => setFormData({...formData, isNewArrival: e.target.checked})}
                    className="w-4 h-4 rounded border-neutral-300 text-black focus:ring-black"
                  />
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-600 group-hover:text-black transition-colors">New Arrival</span>
               </label>
               <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={formData.isPopular} 
                    onChange={(e) => setFormData({...formData, isPopular: e.target.checked})}
                    className="w-4 h-4 rounded border-neutral-300 text-black focus:ring-black"
                  />
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-600 group-hover:text-black transition-colors">Popular</span>
               </label>
            </div>
          </div>

          {/* Section 3: Attributes & Variants */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-4 border-b pb-2">Attributes & Variants</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput 
                label="Sizes (Comma separated)" 
                id="prod-sizes" 
                value={formData.sizes} 
                onChange={(val) => setFormData({...formData, sizes: val})} 
                placeholder="e.g. XS, S, M, L, XL"
              />
              <FormInput 
                label="Colors (Comma separated)" 
                id="prod-colors" 
                value={formData.colors} 
                onChange={(val) => setFormData({...formData, colors: val})} 
                placeholder="e.g. Midnight Black, Emerald Green"
              />
              <FormInput 
                label="Material" 
                id="prod-material" 
                value={formData.material} 
                onChange={(val) => setFormData({...formData, material: val})} 
                placeholder="100% Pure Silk"
              />
              <FormInput 
                label="Fit" 
                id="prod-fit" 
                value={formData.fit} 
                onChange={(val) => setFormData({...formData, fit: val})} 
                placeholder="Relaxed wrap silhouette"
              />
            </div>
          </div>

          {/* Section 4: Media & Specs */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-4 border-b pb-2">Media & Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FormInput 
                label="Main Image URL" 
                id="prod-image" 
                value={formData.image} 
                onChange={(val) => setFormData({...formData, image: val})} 
                placeholder="https://..."
                required
              />
              <FormInput 
                label="Slug (URL Path)" 
                id="prod-slug" 
                value={formData.slug} 
                onChange={(val) => setFormData({...formData, slug: val})} 
                placeholder="auto-generated-if-empty"
              />
              <FormInput 
                label="Rating (1-5)" 
                id="prod-rating" 
                type="number"
                value={formData.rating} 
                onChange={(val) => setFormData({...formData, rating: val})} 
                placeholder="4.8"
              />
               <FormInput 
                label="Review Count" 
                id="prod-reviews" 
                type="number"
                value={formData.reviewCount} 
                onChange={(val) => setFormData({...formData, reviewCount: val})} 
                placeholder="124"
              />
            </div>
            <FormInput 
              label="Product Description" 
              id="prod-desc" 
              isTextarea
              value={formData.description} 
              onChange={(val) => setFormData({...formData, description: val})} 
              placeholder="Full product story..."
            />
             <FormInput 
              label="Care Instructions" 
              id="prod-care" 
              isTextarea
              value={formData.care} 
              onChange={(val) => setFormData({...formData, care: val})} 
              placeholder="Dry clean only..."
            />
          </div>
          
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-50 sticky bottom-0 bg-white z-10">
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
              {editingItem ? 'Update Product' : 'List Product'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Products;
