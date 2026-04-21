import { categories as initialCategories, products as initialProducts, blogs as initialBlogs } from './../../../frontend/src/data/data';

// Note: In a real app, this would be an API service.
// We are mimicking the structure from the frontend repo.

export const categories = [...initialCategories];
export const products = [...initialProducts];
export const blogs = [...initialBlogs];

// Helper to simulate API delays if needed
export const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// CRUD Helpers (Simulated)
export const crudService = {
  // Categories
  getCategories: () => [...categories],
  addCategory: (item) => {
    const newItem = { ...item, id: Date.now() };
    categories.unshift(newItem);
    return newItem;
  },
  updateCategory: (id, item) => {
    const index = categories.findIndex(c => c.id === id);
    if (index !== -1) {
      categories[index] = { ...categories[index], ...item };
      return categories[index];
    }
  },
  
  // Products
  getProducts: () => [...products],
  addProduct: (item) => {
    const newItem = { 
      ...item, 
      id: Date.now(), 
      slug: item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      rating: parseFloat(item.rating) || 0,
      reviewCount: parseInt(item.reviewCount) || 0,
      price: parseFloat(item.price) || 0,
      oldPrice: item.oldPrice ? parseFloat(item.oldPrice) : null,
      status: item.status || 'Published'
    };
    products.unshift(newItem);
    return newItem;
  },
  updateProduct: (id, item) => {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      const updatedItem = {
        ...products[index],
        ...item,
        price: parseFloat(item.price) || item.price,
        oldPrice: item.oldPrice ? parseFloat(item.oldPrice) : item.oldPrice,
        rating: parseFloat(item.rating) || item.rating,
        reviewCount: parseInt(item.reviewCount) || item.reviewCount
      };
      products[index] = updatedItem;
      return products[index];
    }
  },

  // Blogs
  getBlogs: () => [...blogs],
  addBlog: (item) => {
    const newItem = { ...item, id: Date.now(), slug: item.title.toLowerCase().replace(/ /g, '-') };
    blogs.unshift(newItem);
    return newItem;
  },
  updateBlog: (id, item) => {
    const index = blogs.findIndex(b => b.id === id);
    if (index !== -1) {
      blogs[index] = { ...blogs[index], ...item };
      return blogs[index];
    }
  }
};
