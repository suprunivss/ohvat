function Svg({ children, size = 20, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...rest}
    >
      {children}
    </svg>
  );
}

export function IconBuilding(props) {
  return (
    <Svg {...props}>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M9 8h.01M9 12h.01M9 16h.01M15 8h.01M15 12h.01M15 16h.01" />
      <path d="M10 21v-3h4v3" />
    </Svg>
  );
}

export function IconBus(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="12" rx="2.5" />
      <path d="M3 11h18" />
      <path d="M7.5 17v2M16.5 17v2" />
      <circle cx="7.5" cy="19" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="19" r="0.6" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function IconGradCap(props) {
  return (
    <Svg {...props}>
      <path d="M2 9.5 12 5l10 4.5-10 4.5-10-4.5Z" />
      <path d="M6 11.6V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.4" />
      <path d="M21 10v5" />
    </Svg>
  );
}

export function IconRoute(props) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <path d="M8.2 17 15.8 8" strokeDasharray="2.6 2.6" />
    </Svg>
  );
}

export function IconArrowRight(props) {
  return (
    <Svg {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function IconCheck(props) {
  return (
    <Svg {...props}>
      <path d="M5 12.5 9.5 17 19 7" />
    </Svg>
  );
}

export function IconSearch(props) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21 16.65 16.65" />
    </Svg>
  );
}

export function IconLink(props) {
  return (
    <Svg {...props}>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11 6.5 12.4 5.1a3.8 3.8 0 1 1 5.4 5.4L16.2 12" />
      <path d="M13 17.5 11.6 18.9a3.8 3.8 0 1 1-5.4-5.4L7.8 12" />
    </Svg>
  );
}

export function IconMapPin(props) {
  return (
    <Svg {...props}>
      <path d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.6" />
    </Svg>
  );
}

export function IconPlus(props) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

export function IconArrowBigRight(props) {
  return (
    <Svg {...props}>
      <path d="M4 12h13M13 6l6 6-6 6" />
    </Svg>
  );
}

export function IconImage(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="m4 17 4.5-4.5a2 2 0 0 1 2.8 0L15 16" />
      <path d="m14 15 1.5-1.5a2 2 0 0 1 2.8 0L20 15" />
    </Svg>
  );
}
