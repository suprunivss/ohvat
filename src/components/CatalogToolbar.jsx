import { IconSearch } from './icons';

const CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'bc', label: 'Бизнес-центры' },
  { id: 'av', label: 'Автовокзалы' },
  { id: 'vuz', label: 'ВУЗы' },
  { id: 'tr', label: 'Транспорт' },
];

export default function CatalogToolbar({ activeTab, onTabChange, query, onQueryChange }) {
  return (
    <div className="catalog-toolbar">
      <div className="toolbar-inner">
        <div className="controls">
          <div className="tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`tab ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => onTabChange(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="search-wrap">
            <IconSearch size={14} />
            <input
              type="text"
              placeholder="Поиск по названию или адресу"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
