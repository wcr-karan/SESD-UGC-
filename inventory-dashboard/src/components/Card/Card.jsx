import './Card.css';

export default function Card({ icon: Icon, label, value, color = 'blue', change, changeDir }) {
  return (
    <div className="stat-card fade-in">
      <div className={`stat-card-icon ${color}`}>
        <Icon size={24} />
      </div>
      <div className="stat-card-info">
        <p className="stat-card-label">{label}</p>
        <h3 className="stat-card-value">{value}</h3>
        {change && (
          <p className={`stat-card-change ${changeDir}`}>
            {changeDir === 'up' ? '↑' : '↓'} {change}
          </p>
        )}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="stat-card-skeleton">
      <div className="icon-skel skeleton" />
      <div className="text-skel">
        <div className="label-skel skeleton" />
        <div className="value-skel skeleton" />
      </div>
    </div>
  );
}
