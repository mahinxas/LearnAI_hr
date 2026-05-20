export default function Logo({ dark = false, size = 'md', iconOnly = false }) {
  const textSize = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' }[size];
  const iconSize = { sm: 34, md: 44, lg: 54 }[size];
  const neutral = dark ? 'text-parchment-50' : 'text-midnight-950';

  if (iconOnly) {
    return (
      <img
        src="/icons/icon.png"
        alt="LeAIrn HR"
        width={iconSize}
        height={iconSize}
        className="shrink-0 object-contain"
      />
    );
  }

  return (
    <div className="flex items-center gap-2.5">
      <img
        src="/icons/icon.png"
        alt=""
        width={iconSize}
        height={iconSize}
        className="shrink-0 object-contain"
      />
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
