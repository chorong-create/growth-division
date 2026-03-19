import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, department, email, phone, concern } = body;

    if (!name || !company || !department || !email || !phone) {
      return NextResponse.json(
        { error: "필수 항목을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL) {
      console.error("GOOGLE_SCRIPT_URL is not configured");
      return NextResponse.json(
        { error: "서버 설정 오류" },
        { status: 500 }
      );
    }

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        company,
        department,
        email,
        phone,
        concern: concern || "",
        submittedAt: new Date().toISOString(),
      }),
      redirect: "follow",
    });

    // Google Apps Script returns 302 redirect then 200
    // Accept any 2xx or redirect-followed response
    if (!response.ok && response.status !== 302) {
      console.error("Google Sheets response:", response.status, await response.text().catch(() => ""));
      throw new Error("Google Sheets 전송 실패");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error instanceof Error ? error.message : error);
    console.error("GOOGLE_SCRIPT_URL configured:", !!process.env.GOOGLE_SCRIPT_URL);
    return NextResponse.json(
      { error: "전송에 실패했습니다. 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
