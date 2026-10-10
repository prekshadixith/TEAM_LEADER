"use client";
import React, { useState, useEffect } from "react";
import { getWorkflowState, type WorkflowState } from "@/lib/services/workflowService";
import { CheckCircle2, AlertCircle, Shield, Users, Target, UserCheck, ShieldCheck } from "lucide-react";

export default function TeamPage() {
  const [state, setState] = useState<WorkflowState | null>(null);

  const loadState = () => {
    setState(getWorkflowState());
  };

  useEffect(() => {
    loadState();
    window.addEventListener("vv_workflow_updated", loadState);
    return () => window.removeEventListener("vv_workflow_updated", loadState);
  }, []);

  if (!state) return null;

  const members = state.members;
  const count = members.length;
  const isComplete = count === 3;

  const statusText = isComplete ? "3/3 OPERATIVES CONFIRMED" : `${count}/3 OPERATIVES`;

  return (
    <main style={{ paddingBottom: "3rem", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Header */}
        <div className="animate-slide-up" style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--cyan)", letterSpacing: "2.5px", marginBottom: "0.4rem" }}>
            <Users size={14} /> // SECTION 02: SQUAD ROSTER & METADATA
          </div>
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <h1 className="text-glow-cyan" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 800, lineHeight: 1.15 }}>
              SQUAD ROSTER & DOMAIN
            </h1>

            {/* Team Status Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.65rem",
                padding: "0.65rem 1.25rem",
                background: isComplete ? "rgba(0,255,157,0.12)" : "rgba(255,0,122,0.12)",
                border: `1px solid ${isComplete ? "var(--emerald)" : "var(--pink)"}`,
                borderRadius: "8px",
              }}
            >
              {isComplete ? (
                <CheckCircle2 size={18} style={{ color: "var(--emerald)" }} />
              ) : (
                <AlertCircle size={18} style={{ color: "var(--pink)" }} />
              )}
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", fontWeight: 700, color: isComplete ? "var(--emerald)" : "var(--pink)", letterSpacing: "1px" }}>
                {statusText}
              </span>
            </div>
          </div>
        </div>

        {/* Team Metadata Card */}
        <div className="vv-card vv-corners animate-slide-up" style={{ padding: "1.75rem", marginBottom: "2rem" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "2px", marginBottom: "1.25rem", fontWeight: 700 }}>
            // TEAM IDENTIFICATION METADATA
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
            <div style={{ padding: "1rem", background: "rgba(6,10,22,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>TEAM NAME</div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, color: "var(--primary)" }}>{state.teamName}</div>
            </div>

            <div style={{ padding: "1rem", background: "rgba(6,10,22,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>TEAM UNIQUE ID</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", fontWeight: 700, color: "var(--cyan)" }}>{state.teamId}</div>
            </div>

            <div style={{ padding: "1rem", background: "rgba(6,10,22,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>STRENGTH</div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: isComplete ? "var(--emerald)" : "var(--pink)" }}>{statusText}</div>
            </div>

            <div style={{ padding: "1rem", background: "rgba(255,0,122,0.08)", border: "1px solid rgba(255,0,122,0.25)", borderRadius: "8px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--pink)", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Target size={13} /> SELECTED DOMAIN
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, color: "var(--pink)" }}>
                {state.selectedDomainName || "Cybersecurity & Defense"}
              </div>
            </div>
          </div>
        </div>

        {/* Squad Members List */}
        <div className="vv-card vv-corners animate-slide-up" style={{ padding: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "2px", fontWeight: 700 }}>
              // REGISTERED SQUAD OPERATIVES
            </div>
            <UserCheck size={18} style={{ color: "var(--cyan)" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {members.map((m) => (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1.2rem",
                  background: m.isLeader ? "rgba(253, 191, 21, 0.06)" : "rgba(10, 15, 30, 0.6)",
                  border: `1px solid ${m.isLeader ? "rgba(253, 191, 21, 0.35)" : "rgba(255, 255, 255, 0.08)"}`,
                  borderRadius: "10px",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: `2px solid ${m.accentColor || "var(--cyan)"}`,
                    background: "rgba(4,7,15,0.9)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: m.accentColor || "var(--cyan)",
                    boxShadow: `0 0 15px ${m.accentColor || "var(--cyan)"}44`,
                    flexShrink: 0,
                  }}
                >
                  {m.initials}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1rem", color: "#fff" }}>
                      {m.name}
                    </span>
                    {m.isLeader && (
                      <span className="vv-badge" style={{ background: "var(--primary)", color: "#000", fontWeight: 800, fontSize: "0.55rem" }}>
                        LEADER
                      </span>
                    )}
                  </div>

                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>
                    {m.role} &middot; {m.branch}
                  </div>

                  {m.email && (
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-muted)", marginTop: "0.15rem" }}>
                      {m.email}
                    </div>
                  )}
                </div>

                <ShieldCheck size={20} style={{ color: "var(--emerald)", flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}