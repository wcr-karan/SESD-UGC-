import { useState, useEffect, useMemo } from 'react';
import {
  Package,
  AlertTriangle,
  Tag,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import Card, { CardSkeleton } from '../components/Card/Card';
import products, { categories } from '../data/products';
import './Dashboard.css';

const barColors = [
  'var(--primary)',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#06b6d4',
  '#10b981',
  '#f59e0b',
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
    const categoriesCount = new Set(products.map((p) => p.category)).size;
    const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
    return { totalProducts, lowStock, categoriesCount, totalValue };
  }, []);

  const categoryStats = useMemo(() => {
    const cats = categories.filter((c) => c !== 'All');
    const counts = cats.map((cat) => ({
      name: cat,
      count: products.filter((p) => p.category === cat).length,
    }));
    const max = Math.max(...counts.map((c) => c.count));
    return counts.map((c) => ({ ...c, percent: (c.count / max) * 100 }));
  }, []);

  const recentProducts = products.slice(0, 5);

  const chartData = useMemo(() => {
    const cats = categories.filter((c) => c !== 'All');
    return cats.map((cat) => {
      const catProducts = products.filter((p) => p.category === cat);
      const value = catProducts.reduce((s, p) => s + p.price * p.stock, 0);
      return { name: cat, value };
    });
  }, []);

  const maxChart = Math.max(...chartData.map((d) => d.value));

  const cards = [
    {
      icon: Package,
      label: 'Total Products',
      value: stats.totalProducts,
      color: 'blue',
      change: '+3 this week',
      changeDir: 'up',
    },
    {
      icon: AlertTriangle,
      label: 'Low Stock Items',
      value: stats.lowStock,
      color: 'orange',
      change: '2 need restock',
      changeDir: 'down',
    },
    {
      icon: Tag,
      label: 'Categories',
      value: stats.categoriesCount,
      color: 'purple',
    },
    {
      icon: DollarSign,
      label: 'Total Value',
      value: `$${stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      color: 'green',
      change: '+12% vs last month',
      changeDir: 'up',
    },
  ];

  return (
    <div className="page-content">
      
      <div className="dashboard-cards">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
          : cards.map((card, i) => (
              <Card key={i} {...card} />
            ))}
      </div>

      <div className="dashboard-chart-placeholder fade-in" style={{ animationDelay: '0.15s' }}>
        <div className="dashboard-chart-header">
          <h3>Inventory Value by Category</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--success)', fontSize: '0.85rem', fontWeight: 600 }}>
            <TrendingUp size={16} />
            Overview
          </div>
        </div>
        <div className="dashboard-chart-body">
          {!loading &&
            chartData.map((d, i) => (
              <div
                key={d.name}
                className="chart-bar"
                style={{
                  height: `${Math.max((d.value / maxChart) * 100, 8)}%`,
                  background: barColors[i % barColors.length],
                  animationDelay: `${i * 0.05}s`,
                }}
                title={`${d.name}: $${d.value.toLocaleString()}`}
              >
                <span className="chart-bar-label">
                  {d.name.split(' ')[0]}
                </span>
              </div>
            ))}
        </div>
      </div>

      <div className="dashboard-grid">
        
        <div className="dashboard-chart-placeholder fade-in" style={{ animationDelay: '0.25s' }}>
          <h3 className="dashboard-section-title">Recent Products</h3>
          <div className="dashboard-recent-list">
            {recentProducts.map((p) => (
              <div key={p.id} className="dashboard-recent-item">
                <img src={p.image} alt={p.name} />
                <div className="dashboard-recent-item-info">
                  <div className="dashboard-recent-item-name">{p.name}</div>
                  <div className="dashboard-recent-item-cat">{p.category}</div>
                </div>
                <div className="dashboard-recent-item-price">${p.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-chart-placeholder fade-in" style={{ animationDelay: '0.3s' }}>
          <h3 className="dashboard-section-title">Categories Breakdown</h3>
          <div className="dashboard-category-list">
            {categoryStats.map((cat) => (
              <div key={cat.name} className="dashboard-category-item">
                <span className="dashboard-category-name">{cat.name}</span>
                <div className="dashboard-category-bar">
                  <div
                    className="dashboard-category-bar-fill"
                    style={{ width: `${cat.percent}%` }}
                  />
                </div>
                <span className="dashboard-category-count">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
