"use client";
import { MOCK_SUBMISSION } from "@/lib/mockData";
import { Upload, CheckCircle, Clock, AlertCircle, Award } from "lucide-react";
import Link from "next/link";

const CONFIG = {
  NOT_SUBMITTED: { label: "NOT SUBMITTED", color: "var(--pink)", bg: "rgba(255,0,122,0.1)", icon: AlertCircle, cta: "SUBMIT PROJECT NOW" },
  SUBMITTED: { label: "SUBMITTED", color: "var(--emerald)", bg: "rgba(0,255,157,0.1)", icon: CheckCircle, cta: "VIEW SUBMISSION" },
  UNDER_REVIEW: { label: "UNDER REVIEW", color: "var(--cyan)", bg: "rgba(0,240,255,0.1)", icon: Clock, cta: "VIEW SUBMISSION" },
  EVALUATED: { label: "EVALUATED", color: "var(--primary)", bg: "rgba(253,191,21,0.1)", icon: Award, cta: "VIEW RESULTS" },
};

export default function SubmissionCard() {
  const s = MOCK_SUBMISSION;
  const cfg = CONFIG[s.status];
  const Icon = cfg.icon;

  return (
    <div className="vv-card vv-corners" style={{ padding: "1.75rem", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Upload size={18} style={{ color: "var(--cyan)" }} />
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.05rem", fontWeight: 700, color: "#fff", letterSpacing: "1px" }}>
            SUBMISSION DELIVERABLES
          </h2>
        </div>
        <span className="vv-badge" style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}55` }}>
          {cfg.label}
        </span>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "1rem 0" }}>
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            border: `2px solid ${cfg.color}`,
            background: cfg.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: cfg.color,
            boxShadow: `0 0 25px ${cfg.color}44`,
            marginBottom: "1rem",
          }}
        >
          <Icon size={32} />
        </div>

        <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 800, color: cfg.color, letterSpacing: "1px", marginBottom: "0.25rem" }}>
          {cfg.label}
        </div>

        {s.submittedAt && (
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-dim)" }}>
            SUBMITTED: {s.submittedAt}
          </div>
        )}

        {s.fileName && (
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--cyan)", marginTop: "0.35rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            📎 {s.fileName}
          </div>
        )}

        <div style={{ width: "100%", background: "rgba(6, 10, 22, 0.6)", border: "1px solid rgba(255,255,255,0.08)", padding: "0.85rem", borderRadius: "8px", marginTop: "1.25rem", textAlign: "left" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "1px", marginBottom: "0.2rem" }}>OFFICIAL DEADLINE</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700, color: "var(--primary)" }}>{s.deadline}</div>
        </div>
      </div>

      <Link
        href="/project"
        className="vv-button"
        style={{
          marginTop: "1.25rem",
          background: s.status === "NOT_SUBMITTED" ? "linear-gradient(135deg, var(--pink) 0%, #c0005a 100%)" : "rgba(0,240,255,0.1)",
          border: s.status === "NOT_SUBMITTED" ? "none" : `1px solid ${cfg.color}`,
          color: s.status === "NOT_SUBMITTED" ? "#fff" : cfg.color,
          boxShadow: s.status === "NOT_SUBMITTED" ? "0 4px 20px rgba(255,0,122,0.4)" : "none",
          textDecoration: "none",
        }}
      >
        <span>{cfg.cta}</span>
      </Link>
    </div>
  );
}