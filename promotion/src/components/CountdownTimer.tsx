"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const deadline = new Date("2026-03-31T23:59:59+09:00").getTime();
  const now = new Date().getTime();
  const difference = deadline - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

interface Props {
  dark?: boolean;
}

export default function CountdownTimer({ dark = false }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const boxClass = dark
    ? "bg-white/[0.08] border border-white/10 text-white rounded-xl w-16 h-20 sm:w-20 sm:h-24 flex flex-col items-center justify-center tabular-nums animate-pulse-glow"
    : "bg-gray-900 text-white rounded-xl w-16 h-20 sm:w-20 sm:h-24 flex flex-col items-center justify-center tabular-nums shadow-lg animate-pulse-glow";

  const numberClass = "text-2xl sm:text-3xl font-bold leading-none";

  const labelClass = dark
    ? "text-[10px] sm:text-xs text-white/50 mt-1 font-medium"
    : "text-[10px] sm:text-xs text-white/60 mt-1 font-medium";

  if (!timeLeft) {
    return (
      <div className="flex gap-3 sm:gap-4 justify-center">
        {["일", "시간", "분", "초"].map((label) => (
          <div key={label} className={boxClass}>
            <span className={numberClass}>--</span>
            <span className={labelClass}>{label}</span>
          </div>
        ))}
      </div>
    );
  }

  const isExpired =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (isExpired) {
    return (
      <div className="text-center py-4">
        <p className={`text-xl font-bold ${dark ? "text-[var(--accent)]" : "text-[var(--danger)]"}`}>
          프로모션이 종료되었습니다
        </p>
      </div>
    );
  }

  const units: { value: number; label: string }[] = [
    { value: timeLeft.days, label: "일" },
    { value: timeLeft.hours, label: "시간" },
    { value: timeLeft.minutes, label: "분" },
    { value: timeLeft.seconds, label: "초" },
  ];

  return (
    <div className="flex gap-3 sm:gap-4 justify-center">
      {units.map(({ value, label }) => (
        <div key={label} className={boxClass}>
          <span className={numberClass}>{String(value).padStart(2, "0")}</span>
          <span className={labelClass}>{label}</span>
        </div>
      ))}
    </div>
  );
}
