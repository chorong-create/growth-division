export default function PricingSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[var(--primary)] font-semibold text-sm mb-3 tracking-wide uppercase">
            PRICING
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            도입 비용
          </h2>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
            외부 리서치 비용, 교육비, 컨설팅비를 따로 쓰시던 것을
            <br className="hidden sm:block" />
            하나의 프로그램으로 해결합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {/* 정식 도입 비용 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col h-full">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 mb-3">정식 도입 비용</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                  30,000,000
                </span>
                <span className="text-base font-medium text-gray-500">원</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                리스닝마인드 전 기능 + LEP 포함
              </p>
            </div>

            <div className="space-y-4 flex-1">
              {[
                "리스닝마인드 전 기능 3개월 구독",
                "월 1회 정규교육 (주제별 심화)",
                "기업별 맞춤 온보딩 코칭",
                "비동기 Q&A 서포트",
                "실전 리포트 피드백",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <svg
                    className="w-4 h-4 text-[var(--success)] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 첫 출시 기념 특별가 */}
          <div className="relative bg-white rounded-2xl border-2 border-[var(--primary)] p-6 sm:p-8 flex flex-col h-full shadow-lg">
            {/* Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-[var(--primary)] text-white font-bold text-xs px-4 py-1.5 rounded-full shadow-md tracking-wide">
                첫 출시 기념 · 단 1회
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-1">
                <span className="text-lg text-gray-400 line-through">
                  30,000,000원
                </span>
                <span className="bg-[var(--primary-light)] text-[var(--primary)] text-xs font-bold px-2 py-0.5 rounded-full">
                  33% OFF
                </span>
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[var(--primary)]">
                  20,000,000
                </span>
                <span className="text-base font-medium text-gray-500">원</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                리스닝마인드 전 기능 + LEP 포함
              </p>
            </div>

            <div className="space-y-4 flex-1">
              {[
                "리스닝마인드 전 기능 3개월 구독",
                "월 1회 정규교육 (주제별 심화)",
                "기업별 맞춤 온보딩 코칭",
                "비동기 Q&A 서포트",
                "실전 리포트 피드백",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <svg
                    className="w-4 h-4 text-[var(--success)] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>

            {/* 희소성 강조 */}
            <div className="mt-6 bg-[var(--primary-light)] rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[var(--primary)] text-sm">🔒</span>
                <span className="text-sm font-semibold text-gray-800">
                  선착순 10개 기업 한정
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--primary)] text-sm">📅</span>
                <span className="text-sm text-gray-600">
                  2026년 3월 31일 마감
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--primary)] text-sm">⚠️</span>
                <span className="text-sm text-gray-600">
                  향후 동일 조건 재진행 계획 없음
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--primary)] text-sm">🎁</span>
                <span className="text-sm text-gray-600">
                  프로그램 종료 후 재구독 시 특별 할인 적용
                </span>
              </div>
            </div>

            <a
              href="#contact"
              className="mt-6 block w-full text-center bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold text-sm py-3.5 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              특별가로 시작하기 →
            </a>
          </div>
        </div>

        <p className="text-center text-sm mt-8 text-gray-500">
          <span className="text-[var(--primary)] font-bold">
            이번 프로모션은 첫 출시 기념으로 단 1회만 진행됩니다.
          </span>{" "}
          동일 조건의 재진행 계획이 없으므로 3월 내 확인해 주세요.
        </p>
      </div>
    </section>
  );
}
