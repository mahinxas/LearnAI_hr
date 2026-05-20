function ChatBubble({ size = 24 }) {
  return (
    <svg width={size} height={Math.round(size * 0.85)} viewBox="0 0 40 34" fill="none">
      <rect x="0" y="0" width="40" height="26" rx="7" fill="#f04924" />
      <path d="M2 26 L2 34 L13 26 Z" fill="#f04924" />
      <circle cx="11" cy="13" r="3.5" fill="white" />
      <circle cx="20" cy="13" r="3.5" fill="white" />
      <circle cx="29" cy="13" r="3.5" fill="white" />
    </svg>
  );
}

export default function Logo({ dark = false, size = 'md' }) {
  const textSize = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' }[size];
  const bubbleSize = { sm: 18, md: 24, lg: 30 }[size];
  const neutral = dark ? 'text-parchment-50' : 'text-midnight-950';

  return (
    <div className={`flex flex-col leading-none font-black tracking-tight ${textSize}`}>
      <span>
        <span className={neutral}>Le</span>
        <span className="text-coral-500">AI</span>
        <span className={neutral}>rn</span>
      </span>
      <span className="flex items-center gap-1.5 mt-0.5">
        <span className="text-coral-500">HR</span>
        <ChatBubble size={bubbleSize} />
      </span>
    </div>
  );
}
