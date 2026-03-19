const useCases = [
  {
    title: "전략 / 인사이트",
    description:
      "시장의 흐름을 읽고 고객의 숨겨진 의도를 파악하여 전략의 승률을 높입니다",
    tags: ["시장조사", "고객 구매 여정(CDJ) 분석", "CEP 발굴"],
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
  },
  {
    title: "상품 전략 및 트렌드 / 기회 발굴",
    description:
      "숨어있는 소비자 니즈에서 시장의 변화 신호를 포착해 비즈니스 기회를 앞서 발견합니다",
    tags: ["신상품 아이디어 발굴", "이슈 모니터링"],
  },
];

const tools = [
  {
    name: "쿼리파인더",
    description: "2억+ 키워드 기반 소비자 의도 분석",
  },
  {
    name: "패스파인더",
    description: "검색 경로 시각화 및 경쟁사 이탈 지점 파악",
  },
  {
    name: "클러스터파인더",
    description: "소비자 인지 현황 분석 및 CEP 발견",
  },
  {
    name: "저니파인더",
    description: "고객 구매 여정(CDJ) 시각화 및 도메인 점유 분석",
  },
];

const lepItems = [
  {
    title: "월 1회 프라이빗 정규 교육",
    description: "AI 시대 마케팅 전략 · 실무 노하우 매월 업데이트",
  },
  {
    title: "기업 맞춤 온보딩 코칭",
    description: "전담 컨설턴트의 1:1 분석 전략 설계 및 인사이트 도출",
  },
  {
    title: "상시 Q&A 서포트",
    description: "슬랙·메일로 실무 질문에 빠르게 대응",
  },
  {
    title: "성과 점검 리뷰",
    description: "데이터 활용 성과 점검 및 다음 단계 전략 조율",
  },
];

export default function ProgramSection() {
  return (
    <section id="program" className="py-16 sm:py-24 bg-[var(--gray-50)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[var(--primary)] font-semibold text-sm mb-3 tracking-widest uppercase">
            SOLUTION
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Business Accelerator 프로그램
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            단순한 SaaS 구독이 아닙니다.
            <br />
            우리가 지금 해결해야 할 비즈니스 과제에 맞춰,
            <br />
            리스닝마인드와 함께 3개월간 성과를 만들어가는 프로그램입니다.
          </p>
        </div>

        {/* 통합 패키지 컨테이너 */}
        {/* 통합 패키지 컨테이너 */}
        <div className="relative border-2 border-[var(--primary)]/20 rounded-3xl p-3 sm:p-4 bg-gradient-to-br from-[var(--primary)]/5 to-[var(--accent)]/5">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-stretch gap-0">
            {/* Professional Plan */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] px-6 sm:px-8 py-5">
                <h3 className="text-xl font-bold text-white">
                  리스닝마인드 전 기능{" "}
                  <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-xl font-bold">
                    3개월 구독
                  </span>
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  한국 · 미국 · 일본 데이터 중 택 1
                </p>
              </div>

              <div className="px-6 sm:px-8 py-6 space-y-4 flex-1">
                {tools.map((tool, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-[var(--primary)] shrink-0" />
                    <div className="flex-1">
                      <span className="font-semibold text-gray-900 text-sm">
                        {tool.name}
                      </span>
                      <p className="text-[13px] text-gray-400 mt-0.5 leading-snug">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* + 연결 요소 */}
            <div className="hidden lg:flex items-center justify-center px-2">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xl font-bold shadow-lg shrink-0">
                +
              </div>
            </div>
            <div className="flex lg:hidden justify-center py-2">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xl font-bold shadow-lg">
                +
              </div>
            </div>

            {/* LEP Package */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              <div className="bg-gradient-to-r from-[var(--accent)] to-rose-400 px-6 sm:px-8 py-5">
                <h3 className="text-xl font-bold text-white">
                  리스닝마인드 인에이블먼트 프로그램(LEP)
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  비즈니스 과제별 맞춤 교육 &amp; 코칭
                </p>
              </div>

              <div className="px-6 sm:px-8 py-6 space-y-4 flex-1">
                {lepItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" />
                    <div className="flex-1">
                      <span className="font-semibold text-gray-900 text-sm">
                        {item.title}
                      </span>
                      <p className="text-[13px] text-gray-400 mt-0.5 leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 활용 분야 */}
        <div className="mt-12 sm:mt-16">
          <h3 className="text-center text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            검색 데이터 하나로{" "}
            <span className="text-[var(--primary)]">전략 – 실행 – 기회발굴</span>이
            연결됩니다
          </h3>
          <p className="text-center text-gray-500 text-sm sm:text-base mb-8">
            리스닝마인드는 시장 분석부터 캠페인 최적화, 신상품 기획까지 데이터
            기반 의사결정의 전 과정을 지원합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100"
              >
                <h4 className="text-base font-bold text-gray-900 mb-2">
                  {useCase.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {useCase.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {useCase.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-[var(--gray-100)] text-gray-600 rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
