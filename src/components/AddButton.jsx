export default function AddButton({ added, onClick }) {
  return (
    <button type="button" className={`addbtn ${added ? 'added' : ''}`} onClick={onClick}>
      {added ? '✓' : '+'}
    </button>
  );
}
