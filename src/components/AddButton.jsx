import { IconCheck, IconPlus } from './icons';

export default function AddButton({ added, onClick }) {
  return (
    <button type="button" className={`addbtn ${added ? 'added' : ''}`} onClick={onClick}>
      {added ? <IconCheck size={15} /> : <IconPlus size={15} />}
    </button>
  );
}
