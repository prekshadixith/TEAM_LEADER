"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CreditCard,
  Upload,
  CheckCircle2,
  Clock,
  AlertTriangle,
  QrCode,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  getWorkflowState,
  submitPaymentProof,
  type WorkflowState,
} from "@/lib/services/workflowService";

export default function PaymentPage() {
  const [state, setState] = useState<WorkflowState | null>(null);
  const [utrRef, setUtrRef] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadState = () => {
    const s = getWorkflowState();
    setState(s);
    if (s.paymentProof?.utrRef) {
      setUtrRef(s.paymentProof.utrRef);
    }
  };

  useEffect(() => {
    loadState();
    window.addEventListener("vv_workflow_updated", loadState);
    return () => window.removeEventListener("vv_workflow_updated", loadState);
  }, []);

  if (!state) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrRef.trim() || utrRef.trim().length < 6) {
      setError("Please enter a valid Transaction UTR / Reference number (minimum 6 characters)");
      return;
    }
    setError("");
    setSubmitting(true);

    setTimeout(() => {
      submitPaymentProof(utrRef.trim(), fileName || "payment_receipt.png");
      setSubmitting(false);
      loadState();
    }, 600);
  };

  const isPending = state.paymentStatus === "PENDING";
  const isApproved = state.paymentStatus === "APPROVED";
  const isRejected = state.paymentStatus === "REJECTED";

  return (
    <main style={{ minHeight: "100vh", paddingBottom: "3rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* Page Header */}
        <div className="animate-slide-up" style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--cyan)", letterSpacing: "2.5px", marginBottom: "0.4rem" }}>
            <CreditCard size={14} /> // SECTION 05: REGISTRATION PAYMENT PROOF
          </div>
          
          <h1 className="text-glow-cyan" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: "0.5rem" }}>
            REGISTRATION FEE & VERIFICATION
          </h1>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--text-dim)", margin: 0 }}>
            Complete squad registration payment via UPI QR code and submit UTR transaction proof for Admin Verification.
          </p>
        </div>

        {/* Status Banners */}
        {isApproved && (
          <div
            className="vv-card vv-corners animate-slide-up"
            style={{
              padding: "2rem",
              marginBottom: "2rem",
              background: "linear-gradient(180deg, rgba(0,255,157,0.08) 0%, rgba(13,18,34,0.9) 100%)",
              border: "1px solid var(--emerald)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(0,255,157,0.15)", border: "1px solid var(--emerald)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--emerald)", boxShadow: "0 0 20px rgba(0,255,157,0.3)" }}>
                <ShieldCheck size={32} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 800, color: "var(--emerald)", letterSpacing: "1px" }}>
                  PAYMENT VERIFIED & APPROVED ✓
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>
                  Your team payment proof has been confirmed by Admin. Event access code is generated.
                </div>
                {state.paymentProof?.utrRef && (
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--cyan)", marginTop: "0.4rem" }}>
                    UTR REF: {state.paymentProof.utrRef} &middot; STATUS: APPROVED
                  </div>
                )}
              </div>

              <Link
                href="/confirmed"
                className="vv-button"
                style={{
                  background: "linear-gradient(135deg, var(--emerald) 0%, #00b36b 100%)",
                  color: "#000",
                  textDecoration: "none",
                }}
              >
                <span>VIEW TEAM QR PASS</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}

        {/* Main Grid: UPI QR Code + Upload Form */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.75rem" }}>
          
          {/* Left Column: UPI Payment Instructions */}
          <div className="vv-card vv-corners animate-slide-up" style={{ padding: "1.75rem", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "2px", marginBottom: "1.25rem", fontWeight: 700 }}>
              // UPI PAYMENT GATEWAY
            </div>

            <div style={{ textAlign: "center", padding: "1.5rem 1rem", background: "rgba(6, 10, 22, 0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", marginBottom: "1.25rem" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>REGISTRATION FEE AMOUNT</div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", fontWeight: 900, color: "var(--primary)" }} className="text-glow-yellow">
                ₹300.00
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--cyan)", marginTop: "0.2rem" }}>
                PER SQUAD (3 OPERATIVES)
              </div>
            </div>

            {/* UPI QR Display */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1.5rem", background: "#ffffff", borderRadius: "12px", border: "1px solid rgba(0,240,255,0.3)", marginBottom: "1.25rem", boxShadow: "0 0 25px rgba(0,240,255,0.15)" }}>
              <div style={{ width: "160px", height: "160px", position: "relative" }}>
                <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                  <path fill="#000" d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v10 h-10 z M50,40 h20 v20 h-20 z M80,80 h20 v20 h-20 z M30,50 h10 v30 h-10 z" />
                </svg>
              </div>
              <div style={{ marginTop: "0.85rem", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", fontWeight: 700, color: "#000" }}>
                  UPI ID: ivcclub@upi
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#666", marginTop: "0.1rem" }}>
                  SCAN WITH ANY UPI APP (GPAY, PHONEPE, PAYTM)
                </div>
              </div>
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-dim)", lineHeight: 1.6 }}>
              1. Scan UPI QR above & pay ₹300.<br />
              2. Copy the 12-digit UTR / Reference number from your bank app.<br />
              3. Submit UTR ref number on the form right.
            </div>
          </div>

          {/* Right Column: Upload UTR & Receipt Form */}
          <div className="vv-card vv-corners animate-slide-up" style={{ padding: "1.75rem", height: "100%" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "2px", marginBottom: "1.25rem", fontWeight: 700 }}>
              // SUBMIT PAYMENT PROOF
            </div>

            <form onSubmit={handleSubmitProof} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {error && (
                <div style={{ padding: "0.75rem 1rem", background: "rgba(255,0,122,0.12)", border: "1px solid var(--pink)", borderRadius: "6px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--pink)" }}>⚠ {error}</span>
                </div>
              )}

              <div>
                <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "1.5px", marginBottom: "0.4rem" }}>
                  UPI TRANSACTION UTR / REF NUMBER *
                </label>
                <input
                  type="text"
                  className="vv-input"
                  placeholder="e.g. 428910398129"
                  value={utrRef}
                  onChange={(e) => setUtrRef(e.target.value)}
                  disabled={isApproved || submitting}
                  required
                />
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--text-muted)", marginTop: "0.3rem" }}>
                  Found in your UPI payment app receipt details
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "1.5px", marginBottom: "0.4rem" }}>
                  PAYMENT SCREENSHOT ATTACHMENT (OPTIONAL)
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  disabled={isApproved || submitting}
                  style={{ display: "none" }}
                  id="payment-file-input"
                />
                <label
                  htmlFor="payment-file-input"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    padding: "1rem",
                    background: "rgba(6, 10, 22, 0.7)",
                    border: "1px dashed rgba(0, 240, 255, 0.3)",
                    borderRadius: "8px",
                    cursor: isApproved ? "not-allowed" : "pointer",
                    color: "var(--text-dim)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    transition: "var(--transition)",
                  }}
                >
                  <Upload size={16} style={{ color: "var(--cyan)" }} />
                  <span>{fileName ? `Selected: ${fileName}` : "Click to select screenshot (PNG/JPG)"}</span>
                </label>
              </div>

              {!isApproved && (
                <button type="submit" className="vv-button" disabled={submitting} style={{ marginTop: "0.5rem" }}>
                  {submitting ? "TRANSMITTING PROOF..." : "SUBMIT PAYMENT PROOF ▶"}
                </button>
              )}
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}