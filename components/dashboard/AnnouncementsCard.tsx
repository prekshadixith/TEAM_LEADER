"use client";
import { MOCK_ANNOUNCEMENTS } from "@/lib/mockData";
import { Radio, AlertCircle } from "lucide-react";

const PRIORITY_STYLE: Record<string, { color: string; bg: string }> = {
  HIGH: { color: "var(--pink)", bg: "rgba(255,0,122,0.12)" },
  NORMAL: { color: "var(--cyan)", bg: "rgba(0,240,255,0.12)" },
  LOW: { color: "var(--text-muted)", bg: "rgba(255,255,255,0.06)" },
};

export default function AnnouncementsCard() {
  return (
    <div className="vv-card vv-corners" style={{ padding: "1.75rem", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Radio size={18} style={{ color: "var(--cyan)" }} className="animate-pulse" />
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, color: "#fff", letterSpacing: "1px" }}>
            LIVE INTEL BROADCAST
          </h2>
        </div>
        <span className="vv-badge" style={{ background: "rgba(0,240,255,0.12)", color: "var(--cyan)", border: "1px solid rgba(0,240,255,0.3)" }}>
          {MOCK_ANNOUNCEMENTS.length} SIGNALS
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {MOCK_ANNOUNCEMENTS.map((a) => {
          const ps = PRIORITY_STYLE[a.priority] || PRIORITY_STYLE.NORMAL;
          return (
            <div
              key={a.id}
              style={{
                display: "flex",
                gap: "1rem",
                padding: "1rem",
                background: "rgba(10, 15, 30, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderLeft: `3px solid ${ps.color}`,
                borderRadius: "8px",
                transition: "var(--transition)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(15, 22, 44, 0.8)";
                e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(10, 15, 30, 0.6)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  color: ps.color,
                  opacity: 0.7,
                  lineHeight: 1,
                  flexShrink: 0,
                  width: "28px",
                  textAlign: "center",
                }}
              >
                {a.code}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.25rem" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.88rem", fontWeight: 700, color: "#fff", letterSpacing: "0.5px" }}>
                    {a.title}
                  </div>
                  <span className="vv-badge" style={{ color: ps.color, background: ps.bg, fontSize: "0.55rem" }}>
                    {a.priority}
                  </span>
                </div>

                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--text-dim)", lineHeight: 1.5 }}>
                  {a.body}
                </div>

                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-muted)", marginTop: "0.45rem" }}>
                  {a.timestamp}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}