import { ImageResponse } from "next/og";

import { personalConfig } from "@/config/personal";

export const runtime = "edge";
export const alt = personalConfig.openGraph.alt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0b0f11 0%, #1a1f25 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {personalConfig.person.name}
          </h1>
          <p
            style={{
              fontSize: 32,
              color: "#8cc9fe",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            {personalConfig.openGraph.title}
          </p>
          <p
            style={{
              fontSize: 24,
              color: "#888888",
              margin: 0,
              marginTop: "8px",
            }}
          >
            {new URL(personalConfig.site.url).hostname}
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
