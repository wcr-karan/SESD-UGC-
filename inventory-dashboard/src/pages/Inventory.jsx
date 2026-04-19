import { useState, useEffect, useMemo } from 'react';
import { Plus } from 'lucide-react';
import productsData, { categories } from '../data/products';
import ProductTable from '../components/Table/Table';
import ProductModal from '../components/Modal/Modal';
import Button from '../components/Button/Button';
import './Inventory.css';

export default function Inventory({ searchQuery = '' }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortField, setSortField] = useState('');
  const [sortDir, setSortDir] = useState('asc');

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (categoryFilter !== 'All') {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (sortField) {
      result.sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (sortDir === 'asc') return aVal - bVal;
        return bVal - aVal;
      });
    }

    return result;
  }, [products, categoryFilter, searchQuery, sortField, sortDir]);

  const handleSave = (productData) => {
    if (editProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editProduct.id ? { ...p, ...productData } : p
        )
      );
    } else {
      const newProduct = {
        ...productData,
        id: Math.max(...products.map((p) => p.id)) + 1,
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
    setEditProduct(null);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddNew = () => {
    setEditProduct(null);
    setModalOpen(true);
  };

  return (
    <div className="page-content">
      <div className="inventory-toolbar fade-in">
        <div className="inventory-toolbar-left">
          <select
            className="table-filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
        <div className="inventory-toolbar-right">
          <Button
            variant="primary"
            icon={Plus}
            iconSize={18}
            onClick={handleAddNew}
          >
            Add Product
          </Button>
        </div>
      </div>

      <ProductTable
        products={filteredProducts}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        sortField={sortField}
        sortDir={sortDir}
        onSort={handleSort}
      />

      <ProductModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditProduct(null);
        }}
        onSave={handleSave}
        editProduct={editProduct}
      />
    </div>
  );
}
