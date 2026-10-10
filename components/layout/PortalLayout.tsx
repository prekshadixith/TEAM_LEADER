"use client";
import React, { useState, useEffect, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { usePortal } from "@/context/PortalContext";
import {
  LayoutDashboard, Users, CreditCard, User, FolderOpen,
  Trophy, Menu, X, LogOut, ChevronRight, Target, Upload, CheckCircle,
  Shield, Activity, Zap
} from "lucide-react";
import AdminControlPanel from "./AdminControlPanel";

const navItems = [
  { path: "/dashboard", name: "COMMAND DECK", icon: LayoutDashboard, code: "01", badge: "ACTIVE", badgeColor: "var(--cyan)" },
  { path: "/team", name: "SQUAD ROSTER", icon: Users, code: "02", badge: "MANAGE", badgeColor: "var(--primary)" },
  { path: "/domain", name: "DOMAIN SELECT", icon: Target, code: "03", badge: "MISSION", badgeColor: "var(--pink)" },
  { path: "/submit", name: "TEAM SUBMIT", icon: Upload, code: "04", badge: "SUBMIT", badgeColor: "var(--emerald)" },
  { path: "/payment", name: "PAYMENT PROOF", icon: CreditCard, code: "05", badge: "PENDING", badgeColor: "var(--pink)" },
  { path: "/confirmed", name: "EVENT & TEAM QR", icon: CheckCircle, code: "06", badge: "READY", badgeColor: "var(--emerald)" },
  { path: "/spoc", name: "SPOC DETAILS", icon: User, code: "07", badge: "INFO", badgeColor: "var(--cyan)" },
  { path: "/project", name: "PROJECT DATA", icon: FolderOpen, code: "08", badge: "FINAL", badgeColor: "var(--pink)" },
  { path: "/results", name: "RESULTS & SCORE", icon: Trophy, code: "09", badge: "VIEW", badgeColor: "var(--primary)" },
];

const ClockWidget = memo(function ClockWidget() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning style={{ fontFamily: "var(--font-mono)", color: "var(--cyan)", fontWeight: 600 }}>{time || "00:00:00"}</span>;
});

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { authUser, logout } = usePortal();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const NavContent = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "rgba(10, 14, 26, 0.95)" }}>
      {/* Brand Header */}
      <div style={{ padding: "1.25rem 1.1rem", borderBottom: "1px solid rgba(0,240,255,0.12)", background: "radial-gradient(ellipse at top, rgba(0,240,255,0.06) 0%, transparent 80%)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div style={{ position: "relative", padding: "4px", background: "rgba(0,240,255,0.1)", borderRadius: "8px", border: "1px solid rgba(0,240,255,0.3)" }}>
            <Image src="/ivc_logo.png" alt="IVC Logo" width={32} height={32} style={{ objectFit: "contain" }} priority />
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.8rem", fontWeight: 800, color: "var(--cyan)", letterSpacing: "1.5px" }}>
              TEAM LEADER
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--text-muted)", letterSpacing: "1px" }}>
              PORTAL v2.0 // VICEVERSE
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", margin: "0.5rem 0 0.85rem" }}>
          <div style={{ filter: "drop-shadow(0 0 12px rgba(253,191,21,0.25))" }}>
            <Image src="/viceverse_logo.png" alt="ViceVerse" width={80} height={80} style={{ objectFit: "contain" }} priority />
          </div>
        </div>

        {authUser && (
          <div style={{ padding: "0.65rem 0.8rem", background: "rgba(0, 240, 255, 0.05)", border: "1px solid rgba(0,240,255,0.2)", borderRadius: "8px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "30px", height: "30px", background: "radial-gradient(circle at top right, rgba(0,240,255,0.3), transparent)" }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--cyan)", letterSpacing: "1px" }}>
                // SQUAD COMMANDER
              </div>
              <span className="vv-badge" style={{ background: "rgba(0,255,157,0.15)", color: "var(--emerald)", border: "1px solid rgba(0,255,157,0.3)", fontSize: "0.55rem" }}>
                ONLINE
              </span>
            </div>
            <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", color: "#fff", marginTop: "0.2rem", fontWeight: 700 }}>
              {authUser.teamName}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-dim)", marginTop: "0.1rem" }}>
              ID: {authUser.id}
            </div>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: "0.85rem 0.4rem", overflowY: "auto" }}>
        <div style={{ padding: "0 0.85rem 0.6rem", fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--text-muted)", letterSpacing: "2px" }}>
          // TACTICAL MISSION DECK
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path || (item.path === "/dashboard" && pathname === "/");
          return (
            <Link key={item.path} href={item.path} className={`vv-nav-item ${isActive ? "active" : ""}`} onClick={() => setMobileOpen(false)}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: isActive ? "var(--cyan)" : "var(--text-muted)", minWidth: "20px" }}>
                {item.code}
              </span>
              <Icon size={15} style={{ color: isActive ? "var(--cyan)" : "var(--text-dim)", flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{item.name}</span>
              {isActive ? (
                <ChevronRight size={13} style={{ color: "var(--cyan)" }} />
              ) : (
                <span style={{ fontSize: "0.55rem", fontFamily: "var(--font-mono)", color: item.badgeColor, opacity: 0.7 }}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div style={{ padding: "0.85rem 1.1rem", borderTop: "1px solid rgba(0,240,255,0.12)", background: "rgba(5, 8, 17, 0.8)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-dim)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--emerald)", boxShadow: "0 0 8px var(--emerald)" }} />
            <span>GRID ACTIVE</span>
          </div>
          <ClockWidget />
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-deep)" }} className="vv-bg-grid">
      {/* Desktop Sidebar */}
      <aside style={{ width: "250px", flexShrink: 0, borderRight: "1px solid rgba(0, 240, 255, 0.12)", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", zIndex: 30 }} className="hidden lg:flex">
        <NavContent />
      </aside>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(4, 6, 12, 0.85)", backdropFilter: "blur(8px)" }} />
      )}

      {/* Mobile Drawer */}
      <aside style={{ position: "fixed", left: 0, top: 0, bottom: 0, zIndex: 50, width: "260px", borderRight: "1px solid rgba(0, 240, 255, 0.2)", display: "flex", flexDirection: "column", transform: mobileOpen ? "translateX(0)" : "translateX(-100%)", transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }} className="lg:hidden">
        <NavContent />
      </aside>

      {/* Main Container */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top Header */}
        <header style={{ height: "62px", flexShrink: 0, background: "rgba(6, 8, 17, 0.85)", borderBottom: "1px solid rgba(0, 240, 255, 0.12)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", position: "sticky", top: 0, zIndex: 25 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button onClick={() => setMobileOpen((o) => !o)} style={{ background: "rgba(0,240,255,0.08)", border: "1px solid rgba(0,240,255,0.25)", color: "var(--cyan)", cursor: "pointer", padding: "0.4rem 0.6rem", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }} className="lg:hidden" aria-label="Toggle Menu">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="lg:hidden" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <Image src="/viceverse_logo.png" alt="ViceVerse" width={32} height={32} style={{ objectFit: "contain" }} priority />
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.8rem", fontWeight: 700, color: "var(--cyan)", letterSpacing: "1.5px" }}>TEAM PORTAL</span>
            </div>
            <div className="hidden lg:flex" style={{ alignItems: "center", gap: "0.8rem", fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-dim)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.2rem 0.6rem", background: "rgba(0,240,255,0.08)", border: "1px solid rgba(0,240,255,0.2)", borderRadius: "4px", color: "var(--cyan)" }}>
                <Activity size={12} className="animate-pulse" /> NETWORK ONLINE
              </span>
              <span>SYSTEM TIME: <ClockWidget /></span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {authUser && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.85rem", border: "1px solid rgba(253, 191, 21, 0.3)", background: "rgba(253, 191, 21, 0.08)", borderRadius: "6px" }}>
                <Shield size={14} style={{ color: "var(--primary)" }} />
                <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", letterSpacing: "1px" }}>{authUser.teamName}</span>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              id="top-header-logout-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 0.95rem",
                background: "rgba(255, 0, 122, 0.12)",
                border: "1px solid var(--border-pink)",
                borderRadius: "6px",
                color: "var(--pink)",
                fontFamily: "var(--font-heading)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "1px",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--pink)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 0, 122, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 0, 122, 0.12)";
                e.currentTarget.style.color = "var(--pink)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <LogOut size={14} />
              <span>LOGOUT</span>
            </button>
          </div>
        </header>

        <main style={{ flex: 1, padding: "2rem 1.5rem", maxWidth: "1350px", width: "100%", margin: "0 auto" }}>
          {children}
        </main>
      </div>

      {/* Floating Admin Controls */}
      <AdminControlPanel />
    </div>
  );
}