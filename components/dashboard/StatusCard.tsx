"use client";
import { useEffect, useState } from "react";
import { getWorkflowState, type WorkflowState } from "@/lib/services/workflowService";
import { Activity, CheckCircle2, Circle } from "lucide-react";

export default function StatusCard() {
  const [state, setState] = useState<WorkflowState | null>(null);

  const loadState = () => {
    setState(getWorkflowState());
  };

  useEffect(() => {
    loadState();
    window.addEventListener("vv_workflow_updated", loadState);
    return () => window.removeEventListener("vv_workflow_updated", loadState);
  }, []);

  const isApproved = state?.paymentStatus === "APPROVED";
  const isSubmitted = state?.projectStatus === "SUBMITTED";
  const isFinalOpen = state?.submissionWindowOpen;

  const stages = [
    { label: "1. TEAM FORMATION & REGISTRATION", complete: true, active: false },
    { label: "2. DOMAIN SELECTION", complete: true, active: false },
    { label: "3. PAYMENT PROOF VERIFICATION", complete: isApproved, active: !isApproved },
    { label: "4. EVENT CLEARANCE & TEAM QR", complete: isApproved, active: isApproved && !isSubmitted },
    { label: "5. FINAL PROJECT SUBMISSION", complete: isSubmitted, active: isApproved && isFinalOpen && !isSubmitted },
    { label: "6. JUDGING & RESULT EVALUATION", complete: !!state?.resultsPublished, active: state?.resultsPublished },
  ];

  const completedCount = stages.filter((s) => s.complete).length;
  const overallPercent = Math.round((completedCount / stages.length) * 100);

  return (
    <div className="vv-card vv-corners" style={{ padding: "1.75rem", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Activity size={18} style={{ color: "var(--cyan)" }} />
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, color: "#fff", letterSpacing: "1px" }}>
            MISSION PROGRESS
          </h2>
        </div>
        <span className="vv-badge" style={{ background: "rgba(253, 191, 21, 0.12)", color: "var(--primary)", border: "1px solid rgba(253, 191, 21, 0.3)" }}>
          {completedCount}/{stages.length} STAGES
        </span>
      </div>

      {/* Percentage Gauge */}
      <div style={{ textAlign: "center", margin: "0.5rem 0 1.25rem" }}>
        <div className="text-glow-cyan" style={{ fontFamily: "var(--font-heading)", fontSize: "3.5rem", fontWeight: 900, color: "var(--cyan)", lineHeight: 1 }}>
          {overallPercent}%
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-dim)", letterSpacing: "1.5px", marginTop: "0.25rem" }}>
          TACTICAL PROGRESS GAUGE
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ background: "rgba(255,255,255,0.06)", height: "8px", borderRadius: "4px", marginBottom: "1.5rem", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${overallPercent}%`,
            background: "linear-gradient(90deg, var(--cyan) 0%, var(--primary) 100%)",
            boxShadow: "0 0 12px var(--cyan)",
            transition: "width 0.8s ease-in-out",
          }}
        />
      </div>

      {/* Stage Pipeline */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
        {stages.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.4rem 0.6rem",
              borderRadius: "6px",
              background: s.active ? "rgba(0, 240, 255, 0.06)" : "transparent",
              border: s.active ? "1px solid rgba(0, 240, 255, 0.25)" : "1px solid transparent",
              opacity: s.complete || s.active ? 1 : 0.4,
            }}
          >
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                flexShrink: 0,
                border: `2px solid ${s.complete ? "var(--emerald)" : s.active ? "var(--cyan)" : "rgba(255,255,255,0.2)"}`,
                background: s.complete ? "rgba(0,255,157,0.2)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.65rem",
                color: s.complete ? "var(--emerald)" : s.active ? "var(--cyan)" : "var(--text-muted)",
                boxShadow: s.active ? "0 0 10px var(--cyan)" : "none",
              }}
            >
              {s.complete ? "✓" : i + 1}
            </div>
            
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                fontWeight: s.active || s.complete ? 600 : 400,
                color: s.complete ? "var(--emerald)" : s.active ? "var(--cyan)" : "var(--text-dim)",
                letterSpacing: "0.5px",
              }}
            >
              {s.label}
            </div>

            {s.active && (
              <span className="vv-badge" style={{ marginLeft: "auto", background: "var(--cyan)", color: "#000", fontSize: "0.55rem", fontWeight: 800 }}>
                ACTIVE
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}