import { useState, useEffect, useRef } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import { categories } from '../../data/products';
import Button from '../Button/Button';
import './Modal.css';

const initialForm = {
  name: '',
  category: '',
  price: '',
  stock: '',
  description: '',
  image: '',
};

export default function ProductModal({ isOpen, onClose, onSave, editProduct }) {
  const [form, setForm] = useState(initialForm);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editProduct) {
      setForm({
        name: editProduct.name,
        category: editProduct.category,
        price: String(editProduct.price),
        stock: String(editProduct.stock),
        description: editProduct.description || '',
        image: editProduct.image || '',
      });
    } else {
      setForm(initialForm);
    }
  }, [editProduct, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setForm((prev) => ({ ...prev, image: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setForm((prev) => ({ ...prev, image: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price || !form.stock) return;

    onSave({
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
      status: parseInt(form.stock, 10) > 0 ? 'In Stock' : 'Out of Stock',
      image: form.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
    });

    setForm(initialForm);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const filteredCategories = categories.filter((c) => c !== 'All');

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-header">
          <h2>{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="product-name">Product Name</label>
              <input
                id="product-name"
                className="form-input"
                type="text"
                name="name"
                placeholder="Enter product name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="product-category">Category</label>
              <select
                id="product-category"
                className="form-select"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select category</option>
                {filteredCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="product-price">Price ($)</label>
                <input
                  id="product-price"
                  className="form-input"
                  type="number"
                  step="0.01"
                  min="0"
                  name="price"
                  placeholder="0.00"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="product-stock">Quantity</label>
                <input
                  id="product-stock"
                  className="form-input"
                  type="number"
                  min="0"
                  name="stock"
                  placeholder="0"
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Product Image</label>
              <div
                className={`form-file-upload ${isDragging ? 'dragging' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {form.image ? (
                  <div className="image-preview-container">
                    <img src={form.image} alt="Preview" className="image-preview" />
                    <button
                      type="button"
                      className="image-remove-btn"
                      onClick={removeImage}
                      title="Remove image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload size={24} />
                    <p>
                      <span>Click to upload</span> or drag and drop
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: 4 }}>
                      PNG, JPG or WEBP (max. 5MB)
                    </p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="product-desc">Description</label>
              <textarea
                id="product-desc"
                className="form-textarea"
                name="description"
                placeholder="Brief product description..."
                value={form.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="modal-footer">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editProduct ? 'Save Changes' : 'Add Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
