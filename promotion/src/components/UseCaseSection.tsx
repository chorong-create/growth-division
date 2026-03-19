const useCases = [
  {
    title: "전략 / 인사이트",
    description:
      "시장의 흐름을 읽고 고객의 숨겨진 의도를 파악하여 전략의 승률을 높입니다",
    tags: ["시장조사", "고객 구매 여정(CDJ) 분석", "CEP 발굴"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
  },
  {
    title: "마케팅 실행 및 최적화",
    description:
      "정교한 의도 기반 타겟팅과 콘텐츠로 실행 성과를 극대화합니다",
    tags: [
      "퍼포먼스 마케팅",
      "콘텐츠 마케팅",
      "GEO 전략(생성형 엔진 최적화)",
      "마케팅 성과 측정",
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    title: "상품 전략 및 트렌드 / 비즈니스 기회 발굴",
    description:
      "숨어있는 소비자 니즈에서 시장의 변화 신호를 포착해 비즈니스 기회를 앞서 발견합니다",
    tags: ["신상품 아이디어 발굴", "이슈 모니터링"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
];

export default function UseCaseSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[var(--primary)] font-semibold text-sm mb-3 tracking-widest uppercase">
            USE CASES
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug mb-4">
            검색 데이터 하나로
            <br />
            <span className="text-[var(--primary)]">
              전략 – 실행 – 기회발굴이 연결
            </span>
            됩니다
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            리스닝마인드는 시장 분석부터 캠페인 최적화, 신상품 기획까지 데이터
            기반 의사결정의 전 과정을 지원합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group relative bg-[var(--gray-50)] hover:bg-white rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-[var(--primary)]/20"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[var(--primary-light)] text-[var(--primary)] rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300">
                {useCase.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">
                {useCase.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                {useCase.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {useCase.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-[var(--primary-light)] text-[var(--primary)] rounded-full px-3 py-1 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
