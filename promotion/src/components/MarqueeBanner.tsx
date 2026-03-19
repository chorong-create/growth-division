export default function MarqueeBanner() {
  const text =
    '3월 한정 특별 프로그램 론칭 "10개 기업 한정"';

  return (
    <div className="bg-[var(--primary)] overflow-hidden whitespace-nowrap h-9 flex items-center">
      <div className="animate-marquee inline-flex gap-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="text-xs font-medium text-white tracking-wide px-8"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
