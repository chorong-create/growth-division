"use client";

import { useState, type FormEvent } from "react";

interface FormData {
  name: string;
  company: string;
  department: string;
  email: string;
  phone: string;
  concern: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    department: "",
    email: "",
    phone: "",
    concern: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "전송에 실패했습니다.");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "전송에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-16 sm:py-24 bg-[var(--gray-50)]">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-[var(--success)] text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8"
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
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              상담 신청이 완료되었습니다!
            </h3>
            <p className="text-gray-500 leading-relaxed">
              입력하신 연락처로 담당 컨설턴트가
              <br />
              <strong className="text-gray-700">영업일 기준 1일 이내</strong>에
              연락드리겠습니다.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[var(--gray-50)]">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-[var(--primary)] font-semibold text-sm mb-3 tracking-wide uppercase">
            GET STARTED
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            지금 시작하면 3개월 후,
            <br />
            <span className="text-[var(--primary)]">성과</span>가 달라집니다
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  이름 <span className="text-[var(--danger)]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  placeholder="홍길동"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  기업명 <span className="text-[var(--danger)]">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  required
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  placeholder="기업명을 입력해 주세요"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                부서/직급 <span className="text-[var(--danger)]">*</span>
              </label>
              <input
                type="text"
                id="department"
                required
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                placeholder="예: 마케팅팀 / 팀장"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                이메일 <span className="text-[var(--danger)]">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                placeholder="example@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                연락처 <span className="text-[var(--danger)]">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                placeholder="010-0000-0000"
              />
            </div>

            <div>
              <label
                htmlFor="concern"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                현재 가장 고민되는 비즈니스 아젠다{" "}
                <span className="text-gray-400">(선택)</span>
              </label>
              <textarea
                id="concern"
                rows={3}
                value={formData.concern}
                onChange={(e) =>
                  setFormData({ ...formData, concern: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all resize-none"
                placeholder="예: 검색 데이터를 활용해 콘텐츠 전략을 세우고 싶습니다."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] disabled:bg-gray-300 text-white font-bold text-base py-4 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                전송 중...
              </>
            ) : (
              "맞춤 성장 전략 받아보기"
            )}
          </button>

          {error && (
            <p className="text-sm text-[var(--danger)] text-center mt-4 font-medium">
              {error}
            </p>
          )}

          <p className="text-xs text-gray-400 text-center mt-4">
            입력하신 정보는 상담 목적으로만 사용되며, 제3자에게 제공되지 않습니다.
          </p>
        </form>
      </div>
    </section>
  );
}
