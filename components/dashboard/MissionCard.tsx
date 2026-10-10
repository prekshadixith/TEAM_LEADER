"use client";
import { MOCK_MISSION } from "@/lib/mockData";
import { Target, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const STATUS_STYLE: Record<string, { label: string; color: string; bg: string }> = {
  ACTIVE: { label: "ACTIVE", color: "var(--emerald)", bg: "rgba(0,255,157,0.12)" },
  PENDING: { label: "PENDING", color: "var(--primary)", bg: "rgba(253,191,21,0.12)" },
  COMPLETED: { label: "COMPLETED", color: "var(--cyan)", bg: "rgba(0,240,255,0.12)" },
  LOCKED: { label: "LOCKED", color: "var(--text-muted)", bg: "rgba(255,255,255,0.05)" },
};

export default function MissionCard() {
  const m = MOCK_MISSION;
  const st = STATUS_STYLE[m.status] || STATUS_STYLE.PENDING;
  return (
    <div className="vv-card vv-corners" style={{ padding: "1.75rem", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Target size={18} style={{ color: "var(--pink)" }} />
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, color: "var(--pink)", letterSpacing: "1px" }}>
            TACTICAL MISSION BRIEFING
          </h2>
        </div>
        <span className="vv-badge" style={{ color: st.color, background: st.bg, border: `1px solid ${st.color}55` }}>
          {st.label}
        </span>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <span
          className="vv-badge"
          style={{
            background: "rgba(253, 191, 21, 0.08)",
            color: "var(--primary)",
            border: "1px solid rgba(253, 191, 21, 0.3)",
          }}
        >
          ROUND {String(m.roundNumber).padStart(2, "0")} &middot; {m.category.toUpperCase()}
        </span>
      </div>

      <h3 className="text-glow-pink" style={{ fontFamily: "var(--font-heading)", fontSize: "1.45rem", fontWeight: 800, color: "#fff", marginBottom: "0.85rem", lineHeight: 1.25 }}>
        {m.missionName}
      </h3>

      <p style={{ color: "var(--text-dim)", fontSize: "0.92rem", lineHeight: 1.65, marginBottom: "1.5rem", flex: 1 }}>
        {m.description}
      </p>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "1.1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Clock size={16} style={{ color: "var(--primary)" }} />
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "1px" }}>DEADLINE</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", fontWeight: 700, color: "var(--primary)" }}>{m.deadline}</div>
          </div>
        </div>

        <Link
          href="/project"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-heading)",
            fontSize: "0.78rem",
            fontWeight: 700,
            color: "var(--pink)",
            background: "rgba(255,0,122,0.1)",
            border: "1px solid var(--border-pink)",
            borderRadius: "6px",
            padding: "0.55rem 1.1rem",
            textDecoration: "none",
            letterSpacing: "1px",
            transition: "var(--transition)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--pink)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,0,122,0.1)";
            e.currentTarget.style.color = "var(--pink)";
          }}
        >
          <span>MISSION SPECS</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}