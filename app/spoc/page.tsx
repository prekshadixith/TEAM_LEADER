"use client";

import React, { useState } from "react";
import {
  UserCheck,
  Mail,
  Phone,
  Building,
  Shield,
  Copy,
  Check,
  Send,
  Lock,
  MessageSquare,
  Radio,
  Sparkles,
} from "lucide-react";

export default function SpocPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [pingSent, setPingSent] = useState(false);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<string[]>([
    "[10:14:02 UTC] SPOC Dr. Elena Rostova assigned to your squad.",
    "[10:15:30 UTC] MENTOR: Initial briefing materials uploaded to secure cache.",
    "[11:00:12 UTC] MENTOR: Available for architecture reviews between 1400-1800 hrs.",
  ]);

  const SPOC_DETAILS = {
    name: "Dr. Elena Rostova",
    designation: "Chief Technical Mentor & Systems Architect",
    department: "Department of Computer Science & Engineering // IVC Club",
    email: "elena.rostova@vvce.ac.in",
    phone: "+91 98765 01928",
    officeLocation: "Lab Node 04 // VVCE Campus",
    status: "ONLINE // AVAILABLE",
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SPOC_DETAILS.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(SPOC_DETAILS.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSendPing = () => {
    setPingSent(true);
    setChatLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] LEAD: Priority beacon dispatched to Dr. Elena Rostova.`,
      `[${new Date().toLocaleTimeString()}] SYSTEM: Telemetry packet acknowledged by mentor terminal.`,
    ]);
    setTimeout(() => setPingSent(false), 3000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setChatLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] LEAD: ${message.trim()}`,
    ]);
    setMessage("");
  };

  return (
    <main style={{ paddingBottom: "3rem", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* Title Header */}
        <div className="animate-slide-up" style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--cyan)", letterSpacing: "2.5px", marginBottom: "0.4rem" }}>
            <UserCheck size={14} /> // SECTION 07: SINGLE POINT OF CONTACT (SPOC)
          </div>
          
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <div>
              <h1 className="text-glow-cyan" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 800, lineHeight: 1.15 }}>
                ASSIGNED SPOC & MENTOR DETAILS
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--text-dim)", marginTop: "0.2rem" }}>
                Official Single Point of Contact details assigned to your team by Event Administration.
              </p>
            </div>

            <span className="vv-badge" style={{ background: "rgba(0, 240, 255, 0.12)", color: "var(--cyan)", border: "1px solid rgba(0, 240, 255, 0.3)" }}>
              READ-ONLY &middot; ASSIGNED BY ADMIN
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.75rem" }}>
          
          {/* SPOC Detail Card */}
          <div className="vv-card vv-corners animate-slide-up" style={{ padding: "1.75rem", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "2px", marginBottom: "1.25rem", fontWeight: 700 }}>
              // ASSIGNED FACULTY MENTOR
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg, var(--cyan) 0%, var(--pink) 100%)", padding: "2px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(0,240,255,0.3)" }}>
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "#04060b", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cyan)", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.25rem" }}>
                  ER
                </div>
              </div>

              <div>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 800, color: "#fff" }}>
                  {SPOC_DETAILS.name}
                </h2>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--cyan)" }}>
                  {SPOC_DETAILS.designation}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--emerald)", marginTop: "0.2rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--emerald)", boxShadow: "0 0 6px var(--emerald)" }} />
                  {SPOC_DETAILS.status}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1, marginBottom: "1.5rem" }}>
              <div style={{ padding: "0.85rem", background: "rgba(6,10,22,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>DEPARTMENT</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--text-main)" }}>{SPOC_DETAILS.department}</div>
              </div>

              <div style={{ padding: "0.85rem", background: "rgba(6,10,22,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>EMAIL ADDRESS</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--cyan)" }}>{SPOC_DETAILS.email}</div>
                </div>
                <button onClick={handleCopyEmail} style={{ background: "none", border: "none", color: "var(--cyan)", cursor: "pointer" }} title="Copy Email">
                  {copiedEmail ? <Check size={16} style={{ color: "var(--emerald)" }} /> : <Copy size={16} />}
                </button>
              </div>

              <div style={{ padding: "0.85rem", background: "rgba(6,10,22,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>CONTACT PHONE</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--primary)" }}>{SPOC_DETAILS.phone}</div>
                </div>
                <button onClick={handleCopyPhone} style={{ background: "none", border: "none", color: "var(--primary)", cursor: "pointer" }} title="Copy Phone">
                  {copiedPhone ? <Check size={16} style={{ color: "var(--emerald)" }} /> : <Copy size={16} />}
                </button>
              </div>

              <div style={{ padding: "0.85rem", background: "rgba(6,10,22,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", marginBottom: "0.2rem" }}>OFFICE LOCATION</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "var(--text-main)" }}>{SPOC_DETAILS.officeLocation}</div>
              </div>
            </div>

            <button onClick={handleSendPing} className="vv-button" disabled={pingSent}>
              {pingSent ? "✓ BEACON TRANSMITTED" : "SEND PRIORITY BEACON TO SPOC ▶"}
            </button>
          </div>

          {/* Right Column: Communication Terminal */}
          <div className="vv-card vv-corners animate-slide-up" style={{ padding: "1.75rem", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--pink)", letterSpacing: "2px", marginBottom: "1.25rem", fontWeight: 700 }}>
              // SECURE MENTOR COMMS TERMINAL
            </div>

            <div style={{ flex: 1, minHeight: "260px", background: "rgba(4,7,15,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "1rem", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-dim)", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.25rem" }}>
              {chatLog.map((log, idx) => (
                <div key={idx} style={{ color: log.includes("MENTOR:") ? "var(--cyan)" : log.includes("LEAD:") ? "var(--primary)" : "var(--text-muted)", lineHeight: 1.5 }}>
                  {log}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "0.75rem" }}>
              <input
                type="text"
                className="vv-input"
                placeholder="Type dispatch message to mentor..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="vv-button" style={{ width: "auto", padding: "0 1.25rem" }}>
                <Send size={16} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
