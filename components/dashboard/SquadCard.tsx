"use client";
import { MOCK_TEAM } from "@/lib/mockData";
import { Users, Shield, Award } from "lucide-react";

export default function SquadCard() {
  const { members, teamName, college, memberCount, maxMembers } = MOCK_TEAM;
  return (
    <div className="vv-card vv-corners" style={{ padding: "1.75rem", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Users size={18} style={{ color: "var(--cyan)" }} />
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, color: "#fff", letterSpacing: "1px" }}>
            SQUAD ROSTER
          </h2>
        </div>
        <span className="vv-badge" style={{ background: "rgba(0, 240, 255, 0.12)", color: "var(--cyan)", border: "1px solid rgba(0, 240, 255, 0.3)" }}>
          {memberCount}/{maxMembers} OPERATIVES
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.25rem", flex: 1 }}>
        {members.map((m) => (
          <div
            key={m.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              padding: "0.85rem",
              background: m.isLeader ? "rgba(253, 191, 21, 0.05)" : "rgba(10, 15, 30, 0.6)",
              border: `1px solid ${m.isLeader ? "rgba(253, 191, 21, 0.3)" : "rgba(255, 255, 255, 0.08)"}`,
              borderRadius: "8px",
              transition: "var(--transition)",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                flexShrink: 0,
                background: "rgba(4, 6, 12, 0.9)",
                border: `2px solid ${m.accentColor || "var(--cyan)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "0.85rem",
                color: m.accentColor || "var(--cyan)",
                boxShadow: `0 0 10px ${m.accentColor || "var(--cyan)"}44`,
              }}
            >
              {m.initials}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.9rem", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {m.name}
                </span>
                {m.isLeader && (
                  <span className="vv-badge" style={{ background: "var(--primary)", color: "#000", fontSize: "0.55rem", padding: "0.15rem 0.4rem", fontWeight: 800 }}>
                    LEAD
                  </span>
                )}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-dim)", marginTop: "0.1rem" }}>
                {m.role} &middot; {m.branch}
              </div>
            </div>

            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--emerald)", boxShadow: "0 0 8px var(--emerald)", flexShrink: 0 }} />
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "1px" }}>TEAM DESIGNATION</div>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", fontWeight: 700, color: "var(--primary)" }}>{teamName}</div>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "1px" }}>INSTITUTION</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-dim)" }}>{college}</div>
        </div>
      </div>
    </div>
  );
}