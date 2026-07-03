import { ImageResponse } from "next/og";

export const alt = "GOLDCHER — Electronic Music Producer & DJ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 42,
            letterSpacing: 8,
            color: "#0000FF",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Electronic Music · DJ
        </div>
        <div
          style={{
            fontSize: 200,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: -6,
            lineHeight: 1,
          }}
        >
          GOLDCHER
        </div>
        <div
          style={{
            fontSize: 34,
            color: "rgba(255,255,255,0.6)",
            marginTop: 32,
            letterSpacing: 2,
          }}
        >
          House · Afro House · Melodic House · French Touch
        </div>
      </div>
    ),
    { ...size }
  );
}
