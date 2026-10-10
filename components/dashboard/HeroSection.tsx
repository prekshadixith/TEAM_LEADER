"use client";
import { usePortal } from "@/context/PortalContext";
import { MOCK_MISSION, MOCK_TEAM } from "@/lib/mockData";
import { Shield, Zap, Target, Clock, Sparkles } from "lucide-react";

export default function HeroSection() {
  const { authUser } = usePortal();
  const leaderName = authUser?.teamName ?? MOCK_TEAM.teamName;
  const firstName = authUser?.email?.split("@")[0] ?? "Commander";

  return (
    <div
      className="hero-section vv-card vv-corners"
      style={{
        padding: "2.5rem 2.25rem",
        background: "linear-gradient(135deg, rgba(0,240,255,0.08) 0%, rgba(13,18,34,0.85) 50%, rgba(255,0,122,0.08) 100%)",
        border: "1px solid rgba(0, 240, 255, 0.25)",
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
      }}
    >
      {/* Background Ambient Glow & Grid Lines */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          right: "-10%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.85rem", flexWrap: "wrap" }}>
          <span
            className="vv-badge"
            style={{
              background: "linear-gradient(135deg, var(--pink) 0%, #c0005a 100%)",
              color: "#fff",
              boxShadow: "0 0 12px rgba(255,0,122,0.4)",
            }}
          >
            ROUND {MOCK_MISSION.roundNumber} &middot; PHASE 1
          </span>

          <span
            className="vv-badge"
            style={{
              background: "rgba(0, 240, 255, 0.1)",
              color: "var(--cyan)",
              border: "1px solid rgba(0, 240, 255, 0.3)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <Zap size={12} className="animate-pulse" /> MISSION LIVE
          </span>
        </div>

        <h1
          className="text-glow-cyan"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "0.6rem",
            color: "#ffffff",
          }}
        >
          SQUAD {leaderName}
        </h1>

        <p style={{ color: "var(--text-dim)", fontSize: "1.05rem", marginBottom: "1.75rem", maxWidth: "680px", lineHeight: 1.6 }}>
          Welcome back, <span style={{ color: "var(--cyan)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{firstName.toUpperCase()}</span>. Your tactical ideathon control deck is operational. Verify squad roster, select your target domain, and submit project deliverables.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1.25rem", padding: "1.25rem", background: "rgba(6, 10, 22, 0.6)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px" }}>
          {[
            { label: "TEAM ID", value: MOCK_TEAM.teamId, color: "var(--primary)", icon: Shield },
            { label: "CATEGORY", value: MOCK_TEAM.category, color: "var(--cyan)", icon: Target },
            { label: "MISSION", value: MOCK_MISSION.missionName, color: "var(--pink)", icon: Sparkles },
            { label: "DEADLINE", value: "NOV 2, 2026", color: "var(--emerald)", icon: Clock },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "1px", marginBottom: "0.2rem" }}>
                  <Icon size={12} style={{ color: item.color }} />
                  <span>{item.label}</span>
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 700, color: item.color }}>
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}