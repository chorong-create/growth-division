const months = [
  {
    month: "MONTH 1",
    title: "온보딩 & 기초",
    subtitle: "Foundation",
    items: [
      "킥오프 미팅 — 비즈니스 목표 및 KPI 설정",
      "리스닝마인드 기초 교육 (전 기능 핸즈온)",
      "시장조사 실습 워크숍",
      "1차 인사이트 리포트 도출",
    ],
  },
  {
    month: "MONTH 2",
    title: "심화 & 실전",
    subtitle: "Deep Dive",
    items: [
      "CEP / GEO 심화 교육",
      "기업별 맞춤 분석 코칭 (1:1)",
      "실전 리포트 작성 & 전문가 리뷰",
      "경쟁사 포지셔닝 분석 완료",
    ],
  },
  {
    month: "MONTH 3",
    title: "내재화 & 성과",
    subtitle: "Outcome",
    items: [
      "전략 리포트 최종 완성",
      "내부 팀 공유 프레임워크 구축",
      "성과 리뷰 & 후속 로드맵 제안",
      "자체 운영 체계 확립",
    ],
  },
];

export default function CurriculumSection() {
  return (
    <section className="py-16 sm:py-24 bg-[var(--gray-50)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[var(--primary)] font-semibold text-sm mb-3 tracking-wide uppercase">
            HOW IT WORKS
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            3개월, 이렇게 진행됩니다
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            체계적인 커리큘럼으로 단계별 성과를 만들어갑니다.
            <br className="hidden sm:block" />
            3개월 후에는 데이터 기반 의사결정 체계가 내재화됩니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {months.map((month, index) => (
            <div key={index} className="relative">
              {/* Month badge */}
              <div className="flex justify-center mb-[-14px] relative z-10">
                <span
                  className="text-xs font-bold tracking-wider px-4 py-1.5 rounded-full border-2 border-[var(--primary)] bg-white"
                  style={{
                    color: "var(--primary)",
                  }}
                >
                  {month.month}
                </span>
              </div>

              {/* Card */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 pt-8 h-full shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="mt-2">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {month.title}
                  </h3>
                  <p className="text-[var(--primary)] font-semibold text-sm mb-5">
                    {month.subtitle}
                  </p>

                  <ul className="space-y-3">
                    {month.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-[var(--primary)] mt-1.5 shrink-0">
                          <svg
                            width="6"
                            height="6"
                            viewBox="0 0 6 6"
                            fill="currentColor"
                          >
                            <circle cx="3" cy="3" r="3" />
                          </svg>
                        </span>
                        <span className="text-sm text-gray-600 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
