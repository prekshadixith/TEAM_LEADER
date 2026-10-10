"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { usePortal } from "@/context/PortalContext";
import { Eye, EyeOff, KeyRound, Mail, Shield, Zap } from "lucide-react";
import { getWorkflowState } from "@/lib/services/workflowService";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = usePortal();

  const [email, setEmail] = useState("");
  const [teamUniqueId, setTeamUniqueId] = useState("");
  const [showId, setShowId] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  const wasDenied = searchParams.get("denied") === "1";
  useEffect(() => { setMounted(true); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim();
    const cleanId = teamUniqueId.trim();

    if (!cleanEmail || !cleanId) {
      setError("Invalid Email ID or Team Unique ID.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setError("Invalid Email ID or Team Unique ID.");
      return;
    }

    if (cleanId.length < 4) {
      setError("Invalid Email ID or Team Unique ID.");
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 150));

    const wf = getWorkflowState();
    const mockTeamName = wf.teamName || "SHADOW NINE";

    login({
      id: cleanId.toUpperCase(),
      email: cleanEmail,
      role: "TEAM_LEADER",
      teamName: mockTeamName,
    });

    setSuccess(true);
    await new Promise((r) => setTimeout(r, 150));
    router.replace("/dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#060811", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }} className="vv-bg-grid">
      {/* Background Mesh Lighting */}
      <div style={{ position: "absolute", top: "-10%", left: "10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(0,240,255,0.15) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(255,0,122,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      {/* Top Header */}
      <header style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.2rem 2.5rem", borderBottom: "1px solid rgba(0,240,255,0.15)", background: "rgba(6,8,17,0.8)", backdropFilter: "blur(16px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Image src="/ivc_logo.png" alt="IVC Club" width={38} height={38} style={{ objectFit: "contain" }} />
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.78rem", fontWeight: 800, color: "var(--cyan)", letterSpacing: "2px" }}>IVC CLUB</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--text-dim)", letterSpacing: "1px" }}>VVCE MYSURU</div>
          </div>
        </div>

        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }} className="hidden sm:block">
          <Image src="/viceverse_logo.png" alt="ViceVerse Ideathon" width={85} height={85} style={{ objectFit: "contain" }} priority />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span className="vv-badge" style={{ background: "rgba(0,255,157,0.15)", color: "var(--emerald)", border: "1px solid rgba(0,255,157,0.3)" }}>
            PORTAL ONLINE
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ flex: 1, position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", padding: "2rem 1.5rem", gap: "3rem" }}>
        
        {/* Left Title Panel */}
        <div className={mounted ? "animate-fade-in" : ""} style={{ flex: "1 1 340px", maxWidth: "580px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--cyan)", letterSpacing: "3px", marginBottom: "1rem" }}>
            <Zap size={14} /> // AUTHORIZED COMMANDER PORTAL
          </div>

          <h1 className="text-glow-cyan" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", fontWeight: 900, lineHeight: 1.05, color: "#FFFFFF", marginBottom: "1rem" }}>
            VICEVERSE<br />
            <span style={{ color: "var(--primary)" }}>TEAM LEADER</span><br />
            PORTAL
          </h1>

          <div style={{ width: "80px", height: "4px", background: "linear-gradient(90deg, var(--pink), var(--cyan))", margin: "1.5rem 0", borderRadius: "2px" }} />

          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "var(--text-dim)", lineHeight: 1.7, maxWidth: "460px", marginBottom: "2rem" }}>
            Pre-registered Team Leader authentication portal. Access your squad roster, select event domains, submit project deliverables, and unlock your official event QR pass.
          </p>

          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[{ label: "AUTHENTICATION", value: "SECURE 2-FACTOR ID", color: "var(--cyan)" }, { label: "EVENT SECTOR", value: "VVCE IDEATHON 2026", color: "var(--primary)" }].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "2px", marginBottom: "0.25rem" }}>{s.label}</div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 700, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Login Card */}
        <div style={{ width: "100%", maxWidth: "440px", flex: "1 1 320px" }}>
          {wasDenied && (
            <div className={mounted ? "animate-slide-up" : ""} style={{ padding: "0.75rem 1rem", background: "rgba(255,0,122,0.12)", border: "1px solid var(--pink)", borderRadius: "8px", marginBottom: "1rem" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--pink)", letterSpacing: "1px" }}>
                ⚠ TEAM LEADER SESSION REQUIRED FOR THIS ROUTE
              </span>
            </div>
          )}

          <div className={`vv-card vv-corners ${mounted ? "animate-slide-up" : ""}`} style={{ padding: "2.25rem 2rem", background: "var(--bg-card)", backdropFilter: "blur(20px)" }}>
            <div style={{ marginBottom: "1.75rem" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "var(--cyan)", letterSpacing: "2.5px", marginBottom: "0.4rem", fontWeight: 700 }}>
                // COMMANDER LOGIN
              </div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: "0.35rem" }}>
                SIGN IN TO PORTAL
              </h2>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-dim)" }}>
                Enter registered email and Team Unique ID
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {error && (
                <div style={{ padding: "0.75rem 1rem", background: "rgba(255,0,122,0.12)", border: "1px solid var(--pink)", borderRadius: "6px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--pink)" }}>⚠ {error}</span>
                </div>
              )}
              {success && (
                <div style={{ padding: "0.75rem 1rem", background: "rgba(0,255,157,0.12)", border: "1px solid var(--emerald)", borderRadius: "6px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--emerald)" }}>✓ AUTHENTICATED — REDIRECTING...</span>
                </div>
              )}

              <div>
                <label htmlFor="login-email" style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "1.5px", marginBottom: "0.4rem" }}>
                  REGISTERED EMAIL ID
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="login-email"
                    type="email"
                    className="vv-input"
                    placeholder="leader@teamname.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(null); }}
                    autoComplete="email"
                    disabled={isLoading || success}
                    style={{ paddingLeft: "2.5rem" }}
                  />
                  <Mail size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                </div>
              </div>

              <div>
                <label htmlFor="login-team-id" style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "1.5px", marginBottom: "0.4rem" }}>
                  TEAM UNIQUE ID
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="login-team-id"
                    type={showId ? "text" : "password"}
                    className="vv-input"
                    placeholder="e.g. TL-VV-2026-001"
                    value={teamUniqueId}
                    onChange={(e) => { setTeamUniqueId(e.target.value); setError(null); }}
                    autoComplete="current-password"
                    disabled={isLoading || success}
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.75rem" }}
                  />
                  <KeyRound size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <button
                    type="button"
                    onClick={() => setShowId((p) => !p)}
                    style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}
                  >
                    {showId ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ accentColor: "var(--cyan)", width: "16px", height: "16px", cursor: "pointer" }}
                />
                <label htmlFor="remember-me" style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-dim)", cursor: "pointer" }}>
                  REMEMBER SESSION ON THIS DEVICE
                </label>
              </div>

              <button id="login-submit" type="submit" className="vv-button" disabled={isLoading || success} style={{ marginTop: "0.5rem" }}>
                {isLoading ? "AUTHENTICATING..." : success ? "✓ ACCESS GRANTED" : "ENTER PORTAL ▶"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", background: "#060811", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="vv-spinner" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}