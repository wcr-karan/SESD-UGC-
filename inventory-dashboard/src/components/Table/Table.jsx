import { Edit3, Trash2, PackageOpen, ArrowUpDown } from 'lucide-react';
import Button from '../Button/Button';
import './Table.css';

function getStockClass(stock) {
  if (stock === 0) return 'low';
  if (stock <= 5) return 'low';
  if (stock <= 20) return 'medium';
  return 'good';
}

export default function ProductTable({
  products,
  loading,
  onEdit,
  onDelete,
  sortField,
  sortDir,
  onSort,
}) {
  if (loading) {
    return (
      <div className="table-container">
        <div className="table-header">
          <div className="table-header-left">
            <div className="skeleton" style={{ width: 120, height: 20 }} />
          </div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div className="table-skeleton-row" key={i}>
            <div className="skeleton table-skel-img" />
            <div className="skeleton table-skel-name" />
            <div className="skeleton table-skel-cat" />
            <div className="skeleton table-skel-price" />
            <div className="skeleton table-skel-stock" />
            <div className="skeleton table-skel-status" />
            <div className="skeleton table-skel-actions" />
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="table-container">
        <div className="table-empty">
          <div className="table-empty-icon">
            <PackageOpen size={28} />
          </div>
          <h4>No products found</h4>
          <p>Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  const renderSortIcon = (field) => {
    return (
      <ArrowUpDown
        size={13}
        style={{ opacity: sortField === field ? 1 : 0.3 }}
      />
    );
  };

  return (
    <div className="table-container fade-in">
      <div className="table-scroll">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th onClick={() => onSort('price')} style={{ cursor: 'pointer' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  Price {renderSortIcon('price')}
                </span>
              </th>
              <th onClick={() => onSort('stock')} style={{ cursor: 'pointer' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  Stock {renderSortIcon('stock')}
                </span>
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="product-cell">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />
                    <div>
                      <div className="product-cell-name">{product.name}</div>
                      <div className="product-cell-id">SKU-{String(product.id).padStart(4, '0')}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="category-badge">{product.category}</span>
                </td>
                <td>
                  <span className="price-value">${product.price.toFixed(2)}</span>
                </td>
                <td>
                  <span className={`stock-value ${getStockClass(product.stock)}`}>
                    {product.stock}
                  </span>
                </td>
                <td>
                  <span
                    className={`status-badge ${
                      product.status === 'In Stock' ? 'in-stock' : 'out-of-stock'
                    }`}
                  >
                    <span className="dot"></span>
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <Button
                      variant="ghost"
                      size="icon"
                      icon={Edit3}
                      iconSize={15}
                      onClick={() => onEdit(product)}
                      aria-label={`Edit ${product.name}`}
                    />
                    <Button
                      variant="danger"
                      size="icon"
                      icon={Trash2}
                      iconSize={15}
                      onClick={() => onDelete(product.id)}
                      aria-label={`Delete ${product.name}`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
