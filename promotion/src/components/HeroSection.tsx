import CountdownTimer from "./CountdownTimer";
import ParticleCanvas from "./ParticleCanvas";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[var(--primary-light)] to-rose-50 flex items-center justify-center">
      {/* Particle background */}
      <ParticleCanvas />

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-20 sm:pt-24 pb-12 sm:pb-16">
        {/* Promotion label */}
        <p className="text-sm sm:text-base text-[var(--primary)] mb-5 sm:mb-8 font-semibold tracking-wide">
          2026 3월 Business Accelerator 프로그램
        </p>

        {/* Main headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4 sm:mb-6 tracking-tight">
          비즈니스 아젠다를
          <br />
          <span className="text-[var(--primary)]">검색 데이터로 해결합니다</span>
        </h1>

        {/* Sub copy */}
        <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium leading-relaxed mb-4 sm:mb-5">
          미팅 때마다 가장 많이 받은 요청,
          <br />
          <span className="text-[var(--primary)] font-bold">이번 3월에만 특별히</span> 진행합니다
        </p>
        {/* 강조 박스 */}
        <div className="inline-block bg-white/80 backdrop-blur-sm border border-[var(--primary)]/20 rounded-2xl px-6 py-3 sm:px-8 sm:py-4 shadow-sm mb-6 sm:mb-10">
          <p className="text-sm sm:text-base text-[var(--primary)] font-bold tracking-wide">
            최초 출시 · 10개 기업 한정 · 선착순 마감
          </p>
        </div>

        {/* Countdown */}
        <p className="text-sm text-gray-500 mb-4 font-medium">
          프로모션 종료까지 남은 시간
        </p>
        <CountdownTimer />

        <div className="mt-10 sm:mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold text-base sm:text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              지금 상담 신청하기
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href="/listeningmind-service-guide-2026-03.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary-light)] font-bold text-base sm:text-lg px-8 py-4 rounded-full transition-all duration-200 hover:-translate-y-0.5"
            >
              서비스소개서 다운로드
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
