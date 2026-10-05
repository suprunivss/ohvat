import { IconBuilding, IconBus, IconGradCap, IconRoute, IconPalette, IconSearch } from './icons';

const CATEGORIES = [
  { id: 'all', label: 'Все места' },
  { id: 'bc', label: 'Бизнес-центры', icon: IconBuilding },
  { id: 'av', label: 'Автовокзалы', icon: IconBus },
  { id: 'vuz', label: 'ВУЗы', icon: IconGradCap },
  { id: 'tr', label: 'Транспорт', icon: IconRoute },
  { id: 'cr', label: 'Креатив', icon: IconPalette },
];

export default function CatalogFilters({ activeTab, onTabChange, query, onQueryChange, counts }) {
  return (
    <aside className="catalog-sidebar">
      <div className="sidebar-search">
        <IconSearch size={14} />
        <input
          type="text"
          placeholder="Поиск по названию или адресу"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </div>

      <div className="sidebar-label">Категория</div>
      <nav className="sidebar-cats">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`sidebar-cat ${activeTab === cat.id ? 'active' : ''}`}
            onClick={() => onTabChange(cat.id)}
          >
            {cat.icon ? <cat.icon size={16} /> : <span className="sidebar-cat-dot" />}
            <span className="sidebar-cat-label">{cat.label}</span>
            <span className="sidebar-cat-count">{counts[cat.id]}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
