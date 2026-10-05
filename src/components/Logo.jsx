export default function Logo({ className = '' }) {
  return (
    <span className={`brand ${className}`}>
      <span className="brand-mark">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
          <path d="M12 2v3M12 19v3M22 12h-3M5 12H2M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M18.4 18.4l-2.1-2.1M7.7 7.7 5.6 5.6" opacity=".55" />
        </svg>
      </span>
      Охват
    </span>
  );
}
