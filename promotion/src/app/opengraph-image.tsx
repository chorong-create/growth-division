import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";
export const alt =
  "리스닝마인드 비즈니스 액셀러레이터 | 3월 한정 프로모션";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Load logo as base64
  const logoData = await readFile(
    join(process.cwd(), "public", "logo-horizontal.png")
  );
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  // Load Noto Sans KR from Google Fonts (request woff format via user-agent)
  const cssResponse = await fetch(
    "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500;700&display=swap",
    { headers: { "User-Agent": "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)" } }
  );
  const css = await cssResponse.text();

  // Extract font URLs for each weight
  const boldMatch = css.match(new RegExp("font-weight: 700;[^}]*src: url\\(([^)]+)\\)", "s"));
  const mediumMatch = css.match(new RegExp("font-weight: 500;[^}]*src: url\\(([^)]+)\\)", "s"));

  const fontData = await fetch(boldMatch![1]).then((res) => res.arrayBuffer());
  const fontRegularData = await fetch(mediumMatch![1]).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0f13 0%, #1a1a2e 50%, #16213e 100%)",
          padding: "60px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            display: "flex",
          }}
        />

        {/* Red accent line at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #FF0000, #DC143C, #FF1493)",
            display: "flex",
          }}
        />

        {/* Logo */}
        <img
          src={logoBase64}
          alt="ListeningMind"
          height={50}
          style={{
            marginBottom: "48px",
            filter: "brightness(0) invert(1)",
          }}
        />

        {/* Main headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              fontSize: "44px",
              fontFamily: "Noto Sans KR",
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.3,
              display: "flex",
            }}
          >
            비즈니스 아젠다를
          </div>
          <div
            style={{
              fontSize: "44px",
              fontFamily: "Noto Sans KR",
              textAlign: "center",
              lineHeight: 1.3,
              display: "flex",
              background: "linear-gradient(90deg, #FF4444, #FF1493)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            검색데이터로 해결합니다.
          </div>
        </div>

        {/* Sub text with badge style */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px 32px",
            borderRadius: "40px",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            background: "rgba(255, 255, 255, 0.05)",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontFamily: "Noto Sans KR Medium",
              color: "rgba(255, 255, 255, 0.9)",
              display: "flex",
            }}
          >
            3월 Business Accelerator 프로그램
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Sans KR",
          data: fontData,
          style: "normal",
          weight: 700,
        },
        {
          name: "Noto Sans KR Medium",
          data: fontRegularData,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
