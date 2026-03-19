const problems = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
    title: "시장조사, 어디서부터 시작해야 할지 모르겠다",
    description: "리서치 업체에 외주를 맡기면 비용은 높고 속도는 느립니다. 내부에서 직접 하고 싶지만, 방법론과 도구가 부족합니다.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: "툴을 도입했지만 실무에 활용하지 못하고 있다",
    description: "로그인만 하고 방치되는 SaaS 구독. 기능은 많은데 우리 업무에 어떻게 적용해야 할지 막막합니다.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    title: "마케팅 전략에 소비자 인텐트를 반영하고 싶다",
    description: "감이 아닌 데이터 기반의 의사결정을 하고 싶지만, 인텐트 데이터를 어디서 어떻게 확보하고 해석해야 하는지 모릅니다.",
  },
];

export default function ProblemSection() {
  return (
    <section className="py-10 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-16">
          <p className="text-[var(--primary)] font-semibold text-sm mb-3 tracking-wide uppercase">
            Problem
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            이런 고민, 계속 미루고 계신가요?
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            검색 데이터에는 소비자의 진짜 의도가 담겨 있습니다.
            <br className="hidden sm:block" />
            하지만 대부분의 기업은 이 데이터를 제대로 활용하지 못하고 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group relative bg-[var(--gray-50)] hover:bg-white rounded-2xl p-5 sm:p-8 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-[var(--primary)]/20"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[var(--primary-light)] text-[var(--primary)] rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300">
                {problem.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
                {problem.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
