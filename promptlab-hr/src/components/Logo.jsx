function LogoMark({ dark, iconSize, alt }) {
  const shared = 'shrink-0 object-contain';

  if (dark) {
    return (
      <img
        src="/icons/icon-light.png"
        alt={alt}
        width={iconSize}
        height={iconSize}
        className={shared}
      />
    );
  }

  return (
    <span
      className="relative inline-grid shrink-0"
      style={{ width: iconSize, height: iconSize }}
    >
      <img
        src="/icons/icon.png"
        alt={alt}
        width={iconSize}
        height={iconSize}
        className={`${shared} col-start-1 row-start-1 h-full w-full dark:hidden`}
      />
      <img
        src="/icons/icon-light.png"
        alt=""
        aria-hidden="true"
        width={iconSize}
        height={iconSize}
        className={`${shared} col-start-1 row-start-1 hidden h-full w-full dark:block`}
      />
    </span>
  );
}

export default function Logo({ dark = false, size = 'md', iconOnly = false }) {
  const textSize = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' }[size];
  const iconSize = { sm: 34, md: 44, lg: 54 }[size];
  const neutral = dark ? 'text-parchment-50' : 'text-midnight-950 dark:text-parchment-50';

  if (iconOnly) {
    return <LogoMark dark={dark} iconSize={iconSize} alt="LeAIrn HR" />;
  }

  return (
    <div className="flex items-center gap-2.5">
      <LogoMark dark={dark} iconSize={iconSize} alt="" />
      <div className={`flex flex-col leading-none font-black tracking-tight ${textSize}`}>
        <span>
          <span className={neutral}>Le</span>
          <span className="text-coral-500">AI</span>
          <span className={neutral}>rn</span>
        </span>
        <span className="mt-0.5 text-coral-500">HR</span>
      </div>
    </div>
  );
}
