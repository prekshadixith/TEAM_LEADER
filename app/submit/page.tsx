"use client";
import { useEffect, useState, useCallback } from "react";
import { usePortal } from "@/context/PortalContext";
import {
  getTeamRegistration, validateTeamForSubmission, submitTeamRegistration,
  type TeamRegistration,
} from "@/lib/services/submissionService";
import { Upload, CheckCircle2, ShieldCheck, AlertCircle, ArrowRight, UserCheck, Target } from "lucide-react";
import Link from "next/link";

type PagePhase = "LOADING" | "NOT_READY" | "REVIEW" | "CONFIRMING" | "SUCCESS" | "ALREADY_SUBMITTED";

function RegistrationStrip({ reg }: { reg: TeamRegistration }) {
  const items = [
    { label: "SQUAD MEMBERS", ok: reg.teamComplete, value: reg.teamComplete ? "3 / 3 OPERATIVES" : "INCOMPLETE" },
    { label: "DOMAIN SELECTION", ok: reg.domainSelected, value: reg.domainSelected ? "SELECTED" : "NOT SELECTED" },
    { label: "SUBMISSION STATUS", ok: true, value: "READY FOR DISPATCH" },
  ];
  return (
    <div className="vv-card vv-corners animate-slide-up" style={{ padding: "1.5rem 1.75rem", marginBottom: "2rem", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2.5rem", background: "rgba(10, 15, 30, 0.7)" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "2px", fontWeight: 700 }}>
        // SQUAD STATUS
      </span>

      {items.map((it) => (
        <div key={it.label}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "1px", marginBottom: "0.2rem" }}>{it.label}</div>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 700, color: it.ok ? "var(--emerald)" : "var(--pink)" }}>{it.value}</div>
        </div>
      ))}

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span className="vv-badge" style={{ background: "rgba(0,255,157,0.15)", color: "var(--emerald)", border: "1px solid rgba(0,255,157,0.4)" }}>
          <ShieldCheck size={14} /> READY FOR SUBMISSION
        </span>
      </div>
    </div>
  );
}

function SquadCard({ reg }: { reg: TeamRegistration }) {
  return (
    <div className="vv-card vv-corners animate-slide-up" style={{ padding: "1.75rem", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "2px", fontWeight: 700 }}>
          // SQUAD ROSTER
        </div>
        <UserCheck size={18} style={{ color: "var(--cyan)" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "1.5rem" }}>
        {[
          { k: "TEAM NAME", v: reg.teamName, c: "var(--primary)" },
          { k: "TEAM ID", v: reg.teamId, c: "var(--cyan)" },
          { k: "COLLEGE", v: reg.college, c: "var(--text-dim)" },
          { k: "MEMBERS", v: `${reg.memberCount} / ${reg.requiredMembers}`, c: "var(--emerald)" },
        ].map((r) => (
          <div key={r.k} style={{ padding: "0.75rem", background: "rgba(6,10,22,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>{r.k}</div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.88rem", fontWeight: 700, color: r.c }}>{r.v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {reg.members.map((m) => (
          <div key={m.id} style={{ display: "flex", alignItems: "center", gap: "0.85rem", padding: "0.85rem", background: "rgba(10, 15, 30, 0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}>
            <div style={{ width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0, border: `2px solid ${m.accentColor || "var(--cyan)"}`, background: "rgba(4,7,15,0.9)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontSize: "0.8rem", color: m.accentColor || "var(--cyan)" }}>{m.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>
                {m.name} {m.isLeader && <span style={{ fontSize: "0.6rem", color: "var(--primary)", fontFamily: "var(--font-mono)" }}>LEAD</span>}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-dim)" }}>{m.branch} &middot; {m.role}</div>
            </div>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--emerald)", boxShadow: "0 0 7px var(--emerald)", flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function DomainCard({ reg }: { reg: TeamRegistration }) {
  const d = reg.domain;
  return (
    <div className="vv-card vv-corners animate-slide-up" style={{ padding: "1.75rem", height: "100%", borderColor: d ? "rgba(0,240,255,0.3)" : "var(--border-pink)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "2px", fontWeight: 700 }}>
          // ASSIGNED DOMAIN
        </div>
        <Target size={18} style={{ color: "var(--pink)" }} />
      </div>

      {d ? (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "2.2rem" }}>{d.icon}</span>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)" }}>DOMAIN NAME</div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 800, color: d.accentColor || "var(--pink)" }}>{d.name}</div>
            </div>
          </div>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--text-dim)", lineHeight: 1.65, marginBottom: "1.25rem" }}>
            {d.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {d.tags.map((t) => (
              <span key={t} className="vv-badge" style={{ background: "rgba(0,240,255,0.1)", color: "var(--cyan)", border: "1px solid rgba(0,240,255,0.3)", fontSize: "0.65rem" }}>
                {t}
              </span>
            ))}
          </div>

          <Link href="/domain" style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--cyan)", textDecoration: "none" }}>
            ← CHANGE DOMAIN SELECTION
          </Link>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", color: "var(--pink)", marginBottom: "1rem" }}>NO DOMAIN SELECTED</div>
          <Link href="/domain" className="vv-button">
            SELECT MISSION DOMAIN ▶
          </Link>
        </div>
      )}
    </div>
  );
}

export default function SubmitPage() {
  const { authUser } = usePortal();
  const [reg, setReg] = useState<TeamRegistration | null>(null);
  const [phase, setPhase] = useState<PagePhase>("LOADING");
  const [submitting, setSubmitting] = useState(false);

  const loadData = useCallback(async () => {
    const data = await getTeamRegistration();
    setReg(data);

    if (data.status === "SUBMITTED" || data.status === "PAYMENT_PENDING") {
      setPhase("ALREADY_SUBMITTED");
    } else {
      const v = await validateTeamForSubmission(data);
      if (!v.valid) {
        setPhase("NOT_READY");
      } else {
        setPhase("REVIEW");
      }
    }
  }, []);

  useEffect(() => {
    loadData();
    window.addEventListener("vv_workflow_updated", loadData);
    return () => window.removeEventListener("vv_workflow_updated", loadData);
  }, [loadData]);

  const handleFinalSubmit = async () => {
    if (!reg) return;
    setSubmitting(true);
    await submitTeamRegistration(reg.teamId);
    setSubmitting(false);
    setPhase("SUCCESS");
  };

  if (!reg || phase === "LOADING") {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="vv-spinner" />
      </div>
    );
  }

  return (
    <main style={{ paddingBottom: "3rem", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Page Header */}
        <div className="animate-slide-up" style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--cyan)", letterSpacing: "2.5px", marginBottom: "0.4rem" }}>
            <Upload size={14} /> // SECTION 04: FINAL TEAM SUBMISSION
          </div>
          
          <h1 className="text-glow-cyan" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: "0.5rem" }}>
            FINAL TEAM REGISTRATION & SUBMIT
          </h1>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--text-dim)", margin: 0 }}>
            Review your squad composition, verify selected domain, and submit final team registration.
          </p>
        </div>

        {/* Squad Status Strip */}
        <RegistrationStrip reg={reg} />

        {/* Phase Renderings */}
        {phase === "SUCCESS" && (
          <div className="vv-card vv-corners animate-slide-up" style={{ padding: "3rem 2rem", textAlign: "center", border: "1px solid var(--emerald)", background: "linear-gradient(180deg, rgba(0,255,157,0.08) 0%, rgba(13,18,34,0.9) 100%)", marginBottom: "2rem" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(0,255,157,0.15)", border: "1px solid var(--emerald)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--emerald)", margin: "0 auto 1.25rem", boxShadow: "0 0 25px rgba(0,255,157,0.3)" }}>
              <ShieldCheck size={36} />
            </div>

            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", fontWeight: 800, color: "var(--emerald)", letterSpacing: "1px", marginBottom: "0.5rem" }}>
              TEAM SUBMISSION DISPATCHED ✓
            </h2>

            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--text-dim)", maxWidth: "520px", margin: "0 auto 1.75rem" }}>
              Your squad registration and domain selection have been logged. Proceed to payment verification to generate your official Event Pass & Team QR.
            </p>

            <Link href="/payment" className="vv-button" style={{ background: "linear-gradient(135deg, var(--emerald) 0%, #00b36b 100%)", color: "#000", textDecoration: "none" }}>
              PROCEED TO PAYMENT PROOF <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* Main Grid: Squad Card + Domain Card */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.75rem", marginBottom: "2rem" }}>
          <SquadCard reg={reg} />
          <DomainCard reg={reg} />
        </div>

        {/* Final Action Button */}
        {phase === "REVIEW" && (
          <div className="vv-card vv-corners animate-slide-up" style={{ padding: "1.75rem", textAlign: "center", background: "rgba(10, 15, 30, 0.8)", border: "1px solid rgba(0, 240, 255, 0.3)" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>
              READY FOR FINAL SQUAD SUBMISSION
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--text-dim)", marginBottom: "1.5rem" }}>
              Once submitted, your squad roster and chosen domain will be locked for evaluation.
            </p>
            <button onClick={handleFinalSubmit} className="vv-button" disabled={submitting} style={{ maxWidth: "340px", margin: "0 auto" }}>
              {submitting ? "TRANSMITTING REGISTRATION..." : "CONFIRM & SUBMIT SQUAD ▶"}
            </button>
          </div>
        )}

      </div>
    </main>
  );
}