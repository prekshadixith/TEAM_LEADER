"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getWorkflowState,
  type WorkflowState,
} from "@/lib/services/workflowService";
import { ShieldAlert, ArrowRight, CheckCircle2, ShieldCheck, QrCode, Copy, Check, Sparkles, UserCheck } from "lucide-react";

// ─── HIGH-TECH TEAM QR CARD ────────────────────────
function TeamQRCard({ teamId, teamName, isApproved }: { teamId: string; teamName: string; isApproved: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(teamId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isApproved) {
    return (
      <div className="vv-card vv-corners" style={{ padding: "2.25rem 1.75rem", height: "100%", border: "1px solid var(--border-pink)", background: "linear-gradient(180deg, rgba(255,0,122,0.06) 0%, rgba(13,18,34,0.85) 100%)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--pink)", letterSpacing: "2px", marginBottom: "1.25rem", textTransform: "uppercase" }}>
          // ACCESS CLEARANCE — LOCKED
        </div>
        <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(255,0,122,0.12)", border: "1px solid var(--pink)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", boxShadow: "0 0 25px rgba(255,0,122,0.3)" }}>
          <ShieldAlert size={34} style={{ color: "var(--pink)" }} />
        </div>
        <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", color: "#fff", fontWeight: 700, marginBottom: "0.5rem" }}>
          PAYMENT VERIFICATION REQUIRED
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text-dim)", lineHeight: 1.6, marginBottom: "1.75rem", maxWidth: "340px" }}>
          Your official ViceVerse Event Team Pass and QR Check-in Code will be issued automatically once payment is verified by Admin.
        </p>
        <Link
          href="/payment"
          className="vv-button"
          style={{
            background: "linear-gradient(135deg, var(--pink) 0%, #d00060 100%)",
            boxShadow: "0 4px 20px rgba(255,0,122,0.4)",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          UPLOAD / CHECK PAYMENT PROOF <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="vv-card animate-slide-up" style={{ padding: "2rem", height: "100%", border: "1px solid var(--emerald)", background: "linear-gradient(180deg, rgba(0,255,157,0.06) 0%, rgba(13,18,34,0.9) 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "16px", height: "16px", borderTop: "3px solid var(--emerald)", borderLeft: "3px solid var(--emerald)" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: "16px", height: "16px", borderBottom: "3px solid var(--cyan)", borderRight: "3px solid var(--cyan)" }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--emerald)", letterSpacing: "2px", fontWeight: 700 }}>
          // OFFICIAL EVENT ENTRY PASS
        </div>
        <span className="vv-badge" style={{ background: "rgba(0,255,157,0.15)", color: "var(--emerald)", border: "1px solid rgba(0,255,157,0.4)" }}>
          CLEARANCE LEVEL 1
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.75rem 1.25rem", background: "rgba(4,7,15,0.9)", border: "1px solid rgba(0,255,157,0.3)", borderRadius: "12px", position: "relative" }}>
        {/* Hologram QR Container */}
        <div style={{ position: "relative", width: "180px", height: "180px", background: "#ffffff", padding: "12px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem", boxShadow: "0 0 30px rgba(0,255,157,0.25)" }}>
          <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
            <path fill="#000" d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v10 h-10 z M50,40 h20 v20 h-20 z M80,80 h20 v20 h-20 z M30,50 h10 v30 h-10 z M40,70 h20 v10 h-20 z M60,10 h10 v20 h-10 z" />
          </svg>
        </div>

        <div style={{ textAlign: "center", width: "100%" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 800, color: "var(--emerald)", letterSpacing: "1.5px", marginBottom: "0.25rem" }}>
            {teamName}
          </div>
          
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.3rem 0.75rem", background: "rgba(0,240,255,0.08)", border: "1px solid rgba(0,240,255,0.2)", borderRadius: "6px", margin: "0.4rem 0 0.85rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--cyan)", letterSpacing: "1px" }}>
              TEAM ID: {teamId}
            </span>
            <button onClick={handleCopy} style={{ background: "none", border: "none", color: "var(--cyan)", cursor: "pointer", display: "flex", alignItems: "center" }} title="Copy Team ID">
              {copied ? <Check size={13} style={{ color: "var(--emerald)" }} /> : <Copy size={13} />}
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--emerald)", letterSpacing: "1px" }}>
            <ShieldCheck size={15} />
            <span>AUTHENTICATED FOR IDEATHON CHECK-IN</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmedPage() {
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

  const isApproved = state.paymentStatus === "APPROVED";

  return (
    <main style={{ minHeight: "100vh", paddingBottom: "3rem" }}>
      <div style={{ maxWidth: "1250px", margin: "0 auto" }}>
        
        {/* Page Header */}
        <div className="animate-slide-up" style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--cyan)", letterSpacing: "2.5px", marginBottom: "0.4rem" }}>
            <Sparkles size={14} />
            <span>// EVENT DAY & ATTENDANCE CLEARANCE</span>
          </div>
          
          <h1 className="text-glow-cyan" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: "1rem" }}>
            EVENT CLEARANCE & TEAM QR
          </h1>

          {/* Status Banner */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              background: isApproved ? "rgba(0,255,157,0.08)" : "rgba(255,0,122,0.08)",
              border: `1px solid ${isApproved ? "rgba(0,255,157,0.4)" : "rgba(255,0,122,0.4)"}`,
              borderRadius: "10px",
              padding: "1rem 1.5rem",
              backdropFilter: "blur(12px)",
            }}
          >
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: isApproved ? "var(--emerald)" : "var(--pink)", boxShadow: `0 0 15px ${isApproved ? "var(--emerald)" : "var(--pink)"}` }} className="animate-pulse" />
            <div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, color: isApproved ? "var(--emerald)" : "var(--pink)", letterSpacing: "1px" }}>
                {isApproved ? "EVENT ENTRY CONFIRMED ✓" : "PAYMENT VERIFICATION PENDING"}
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>
                {isApproved ? "Your squad is fully verified and registered for the ViceVerse Ideathon." : "Please submit your UPI transaction proof to generate official team QR badge."}
              </div>
            </div>
          </div>
        </div>

        {/* Squad Overview Grid */}
        <div className="vv-card vv-corners animate-slide-up" style={{ padding: "1.75rem", marginBottom: "2rem" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "2px", marginBottom: "1.25rem", fontWeight: 700 }}>
            // SQUAD OPERATIONAL OVERVIEW
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            <div style={{ padding: "1rem", background: "rgba(6,10,22,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>TEAM NAME</div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--primary)" }}>{state.teamName}</div>
            </div>
            
            <div style={{ padding: "1rem", background: "rgba(6,10,22,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>TEAM ID</div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--cyan)" }}>{state.teamId}</div>
            </div>

            <div style={{ padding: "1rem", background: "rgba(6,10,22,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>SQUAD SIZE</div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--text-main)" }}>{state.members.length} / 3 OPERATIVES</div>
            </div>

            <div style={{ padding: "1rem", background: "rgba(6,10,22,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>SELECTED DOMAIN</div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: "var(--pink)" }}>{state.selectedDomainName || "Cybersecurity"}</div>
            </div>

            <div style={{ padding: "1rem", background: "rgba(6,10,22,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>VERIFICATION STATUS</div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, color: isApproved ? "var(--emerald)" : "var(--pink)" }}>{state.paymentStatus}</div>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Confirmed Roster + Team QR Card */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.75rem" }}>
          
          {/* Confirmed Squad Roster */}
          <div className="vv-card vv-corners animate-slide-up" style={{ padding: "1.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "2px", fontWeight: 700 }}>
                // CONFIRMED SQUAD ROSTER
              </div>
              <UserCheck size={16} style={{ color: "var(--cyan)" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {state.members.map((m) => (
                <div
                  key={m.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
                    background: m.isLeader ? "rgba(253,191,21,0.06)" : "rgba(255,255,255,0.025)",
                    border: `1px solid ${m.isLeader ? "rgba(253,191,21,0.3)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      border: `2px solid ${m.accentColor || "var(--cyan)"}`,
                      background: "rgba(4,7,15,0.8)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: m.accentColor || "var(--cyan)",
                      boxShadow: `0 0 12px ${m.accentColor || "var(--cyan)"}44`,
                    }}
                  >
                    {m.initials}
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem", color: "var(--text-main)" }}>
                      {m.name}
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-dim)", marginTop: "0.1rem" }}>
                      {m.branch} &middot; {m.role}
                    </div>
                  </div>

                  {m.isLeader && (
                    <span className="vv-badge" style={{ background: "var(--primary)", color: "#000", fontWeight: 800 }}>
                      LEADER
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Team QR Pass Card */}
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <TeamQRCard teamId={state.teamId} teamName={state.teamName} isApproved={isApproved} />
          </div>

        </div>
      </div>
    </main>
  );
}
