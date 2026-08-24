import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Atum Finance — The Protection Layer for Digital Assets";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          color: "#F3F5F4",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 18,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#00D897",
          }}
        >
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <path d="M6 22.5h20v5.5H6z" fill="#00D897" fillOpacity="0.14" />
            <path
              d="M6 22.5h20"
              stroke="#00D897"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
            <path
              d="M6 20.5C10 8.5 18 7 26 17.5"
              stroke="#F3F5F4"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Atum Finance
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
              maxWidth: 920,
            }}
          >
            The Protection Layer for Digital Assets.
          </div>
          <div
            style={{
              width: 920,
              height: 1,
              background: "#00D897",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
