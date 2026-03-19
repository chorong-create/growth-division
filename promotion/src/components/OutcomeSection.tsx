const outcomes = [
  {
    number: "01",
    title: "시장 인사이트 리포트 확보",
    description:
      "검색 데이터 기반으로 소비자 행동과 시장 트렌드를 분석한 자체 리포트를 보유하게 됩니다.",
  },
  {
    number: "02",
    title: "CEP X GEO 전략 수립",
    description:
      "소비자가 우리 카테고리에 진입하는 핵심 순간을 파악하고, 이를 마케팅 전략에 반영합니다.",
  },
  {
    number: "03",
    title: "데이터 드리븐 의사결정 내재화",
    description:
      "외부 리서치 의존 없이, 내부 팀이 직접 데이터를 분석하고 의사결정하는 체계를 갖춥니다.",
  },
  {
    number: "04",
    title: "콘텐츠 & 포지셔닝 전략 도출",
    description:
      "경쟁사 대비 차별화된 포지셔닝을 확립하고, 검색 데이터 기반 콘텐츠 전략을 실행합니다.",
  },
];

export default function OutcomeSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[var(--gray-50)] to-[var(--primary-light)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[var(--primary)] font-semibold text-sm mb-3 tracking-wide uppercase">
            EXPECTED OUTCOMES
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            3개월 후, 이런 성과를 가져갑니다
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {outcomes.map((outcome, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[var(--primary)]/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl sm:text-4xl font-extrabold text-[var(--primary)] leading-none shrink-0 opacity-80">
                  {outcome.number}
                </span>
                <div className="flex-1 pt-1">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                    {outcome.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {outcome.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
