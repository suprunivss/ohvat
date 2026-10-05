import AddButton from './AddButton';
import { IconPalette, IconVideo } from './icons';
import { staticCreativeCartItem, videoCreativeCartItem } from '../utils/cartItems';
import { formatRub } from '../utils/pricing';

function CreativeCard({ icon: Icon, title, sub, amount, added, onToggle }) {
  return (
    <div className="creative-card">
      <span className="creative-icon"><Icon size={17} /></span>
      <div className="creative-card-body">
        <div className="creative-card-title">{title}</div>
        <div className="creative-card-sub">{sub}</div>
      </div>
      <div className="creative-card-foot">
        <span className="creative-card-price">{formatRub(amount)}</span>
        <AddButton added={added} onClick={onToggle} />
      </div>
    </div>
  );
}

export default function CreativeSection({ staticItems, videoItems, isInCart, onToggle }) {
  const hasAny = staticItems.length > 0 || videoItems.length > 0;

  return (
    <div className="section">
      <div className="section-head">
        <h2>Изготовление креатива</h2>
        <div className="section-note">
          Макет или ролик под размещение — делаем с помощью нейросети и проверяем вручную. Не зависит от
          города, доступно для любого места из каталога.
        </div>
      </div>

      {hasAny ? (
        <div className="grid-compact">
          {staticItems.map((f) => (
            <CreativeCard
              key={f.id}
              icon={IconPalette}
              title={'Макет · ' + f.label}
              sub={f.dims}
              amount={f.amount}
              added={isInCart('creative-static-' + f.id)}
              onToggle={() => onToggle(staticCreativeCartItem(f))}
            />
          ))}
          {videoItems.map((d) => (
            <CreativeCard
              key={d.id}
              icon={IconVideo}
              title={'Видеоролик · ' + d.label}
              sub="рекламный ролик под размещение"
              amount={d.amount}
              added={isInCart('creative-video-' + d.id)}
              onToggle={() => onToggle(videoCreativeCartItem(d))}
            />
          ))}
        </div>
      ) : (
        <div className="empty">По запросу ничего не найдено среди услуг изготовления креатива</div>
      )}
    </div>
  );
}
