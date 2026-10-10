"use client";
import React, { useState, useEffect } from "react";
import {
  Trophy,
  Lock,
  Award,
  Sparkles,
  Layers,
  FileText,
  CheckCircle,
} from "lucide-react";
import {
  getWorkflowState,
  type WorkflowState,
} from "@/lib/services/workflowService";

export default function ResultsPage() {
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

  const isPublished = state.resultsPublished;
  const result = state.teamResult;

  return (
    <main style={{ paddingBottom: "3rem", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
        
        {/* Page Header */}
        <div className="animate-slide-up" style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--cyan)", letterSpacing: "2.5px", marginBottom: "0.4rem" }}>
            <Trophy size={14} /> // SECTION 09: EVALUATION & RESULTS
          </div>
          
          <h1 className="text-glow-cyan" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: "0.5rem" }}>
            OFFICIAL MISSION RESULTS
          </h1>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--text-dim)", margin: 0 }}>
            Official round scores, standings, and evaluator feedback for squad <span style={{ color: "var(--primary)", fontWeight: 700 }}>{state.teamName}</span>.
          </p>
        </div>

        {!isPublished ? (
          /* LOCKED STATE */
          <div className="vv-card vv-corners animate-slide-up" style={{ padding: "3.5rem 2rem", textAlign: "center", border: "1px solid rgba(0, 240, 255, 0.25)", background: "linear-gradient(180deg, rgba(0,240,255,0.05) 0%, rgba(13,18,34,0.9) 100%)" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "rgba(0, 240, 255, 0.12)", border: "1px solid var(--cyan)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", boxShadow: "0 0 25px rgba(0, 240, 255, 0.3)" }}>
              <Lock size={32} style={{ color: "var(--cyan)" }} />
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--pink)", letterSpacing: "3px", marginBottom: "0.5rem", fontWeight: 700 }}>
              // EVALUATION IN PROGRESS
            </div>

            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", fontWeight: 800, color: "#fff", letterSpacing: "1px", marginBottom: "1rem" }}>
              RESULTS CLASSIFIED & LOCKED
            </h2>

            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--text-dim)", maxWidth: "540px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
              Evaluation scores for squad <strong style={{ color: "var(--cyan)" }}>{state.teamName}</strong> are currently under review by the judging panel. Results will be unlocked automatically once authorized by Event Administration.
            </p>

            <span className="vv-badge" style={{ background: "rgba(255,0,122,0.12)", color: "var(--pink)", border: "1px solid var(--pink)", padding: "0.5rem 1.25rem" }}>
              STATUS: AWAITING ADMIN PUBLICATION
            </span>
          </div>
        ) : (
          /* PUBLISHED RESULTS STATE */
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }} className="animate-slide-up">
            
            {/* Header Banner */}
            <div className="vv-card vv-corners" style={{ padding: "1.5rem 1.75rem", background: "linear-gradient(180deg, rgba(0,255,157,0.08) 0%, rgba(13,18,34,0.9) 100%)", border: "1px solid var(--emerald)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.35rem" }}>
                <CheckCircle size={22} style={{ color: "var(--emerald)" }} />
                <span style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 800, color: "var(--emerald)", letterSpacing: "1px" }}>
                  RESULTS PUBLISHED — SQUAD PERFORMANCE REPORT
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-dim)", margin: 0 }}>
                Showing verified evaluation score for squad <strong style={{ color: "var(--primary)" }}>{state.teamName} ({state.teamId})</strong>.
              </p>
            </div>

            {/* Score & Rank Display */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              
              {/* Score Card */}
              <div className="vv-card vv-corners" style={{ padding: "2rem", textAlign: "center", background: "rgba(253,191,21,0.05)", border: "1px solid rgba(253,191,21,0.3)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--primary)", letterSpacing: "2px", marginBottom: "0.5rem", fontWeight: 700 }}>
                  // TOTAL EVALUATION SCORE
                </div>
                <div className="text-glow-yellow" style={{ fontFamily: "var(--font-heading)", fontSize: "3.75rem", fontWeight: 900, color: "var(--primary)", lineHeight: 1 }}>
                  {result?.score ?? 94.5} <span style={{ fontSize: "1.5rem", color: "var(--text-muted)", fontWeight: 400 }}>/ 100</span>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "0.85rem" }}>
                  OVERALL RATING: OUTSTANDING
                </div>
              </div>

              {/* Rank Card */}
              <div className="vv-card vv-corners" style={{ padding: "2rem", textAlign: "center", background: "rgba(0,240,255,0.05)", border: "1px solid rgba(0,240,255,0.3)" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "2px", marginBottom: "0.5rem", fontWeight: 700 }}>
                  // OFFICIAL LEADERBOARD RANK
                </div>
                <div className="text-glow-cyan" style={{ fontFamily: "var(--font-heading)", fontSize: "3.75rem", fontWeight: 900, color: "var(--cyan)", lineHeight: 1 }}>
                  #{result?.rank ?? 2} <span style={{ fontSize: "1.5rem", color: "var(--text-muted)", fontWeight: 400 }}>OF 45</span>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--emerald)", marginTop: "0.85rem" }}>
                  PODIUM FINISH &middot; QUALIFIED FOR FINALS
                </div>
              </div>

            </div>

            {/* Evaluator Feedback Card */}
            <div className="vv-card vv-corners" style={{ padding: "1.75rem" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--pink)", letterSpacing: "2px", marginBottom: "1.25rem", fontWeight: 700 }}>
                // JUDGES EVALUATION FEEDBACK
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--text-main)", lineHeight: 1.7, background: "rgba(6,10,22,0.6)", padding: "1.25rem", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}>
                {result?.feedback ?? "Exceptional solution architecture. The technical depth, system security model, and interactive dashboard execution demonstrated top-tier engineering discipline."}
              </p>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}