import { NextRequest, NextResponse } from "next/server";

const CDN_BASE =
  "https://gcore.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis@master/Emojis";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const cdnUrl = `${CDN_BASE}/${path.join("/")}`;

  try {
    const response = await fetch(cdnUrl, {
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: response.status },
      );
    }

    const buffer = await response.arrayBuffer();
    const contentType =
      response.headers.get("content-type") ?? "image/png";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 502 },
    );
  }
}
