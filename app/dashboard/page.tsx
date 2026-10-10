"use client";
import HeroSection from "@/components/dashboard/HeroSection";
import SquadCard from "@/components/dashboard/SquadCard";
import StatusCard from "@/components/dashboard/StatusCard";
import MissionCard from "@/components/dashboard/MissionCard";
import SubmissionCard from "@/components/dashboard/SubmissionCard";
import AnnouncementsCard from "@/components/dashboard/AnnouncementsCard";
import Link from "next/link";
import { Users, Target, Upload, CreditCard, User, FolderOpen, Trophy } from "lucide-react";

const NAV_SHORTCUTS = [
  { href: "/team", label: "SQUAD CONFIG", icon: Users, color: "var(--cyan)" },
  { href: "/domain", label: "DOMAIN SELECT", icon: Target, color: "var(--pink)" },
  { href: "/submit", label: "TEAM SUBMIT", icon: Upload, color: "var(--emerald)" },
  { href: "/payment", label: "PAYMENT", icon: CreditCard, color: "var(--primary)" },
  { href: "/spoc", label: "SPOC INTEL", icon: User, color: "var(--pink)" },
  { href: "/project", label: "PROJECT DATA", icon: FolderOpen, color: "var(--emerald)" },
  { href: "/results", label: "RESULTS", icon: Trophy, color: "var(--primary)" },
];

export default function DashboardPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "0" }}>
      <div style={{ maxWidth: "1350px", margin: "0 auto" }}>
        
        {/* Hero Section */}
        <div className="animate-slide-up" style={{ marginBottom: "1.75rem" }}>
          <HeroSection />
        </div>

        {/* Quick Nav Shortcuts Bar */}
        <div
          className="animate-slide-up"
          style={{
            display: "flex",
            gap: "0.85rem",
            flexWrap: "wrap",
            marginBottom: "1.75rem",
          }}
        >
          {NAV_SHORTCUTS.map((n) => {
            const Icon = n.icon;
            return (
              <Link
                key={n.href}
                href={n.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  padding: "0.65rem 1.25rem",
                  background: "rgba(10, 15, 30, 0.7)",
                  border: `1px solid ${n.color}35`,
                  borderRadius: "8px",
                  color: n.color,
                  fontFamily: "var(--font-heading)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textDecoration: "none",
                  backdropFilter: "blur(12px)",
                  transition: "var(--transition)",
                  boxShadow: `0 4px 15px ${n.color}15`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `${n.color}20`;
                  el.style.borderColor = n.color;
                  el.style.transform = "translateY(-3px)";
                  el.style.boxShadow = `0 8px 25px ${n.color}35`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(10, 15, 30, 0.7)";
                  el.style.borderColor = `${n.color}35`;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = `0 4px 15px ${n.color}15`;
                }}
              >
                <Icon size={15} />
                <span>{n.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Row 1: Squad Roster | Status | Submission */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
            marginBottom: "1.75rem",
            alignItems: "stretch",
          }}
        >
          <div className="animate-slide-up" style={{ animationDelay: "0.05s" }}>
            <SquadCard />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <StatusCard />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <SubmissionCard />
          </div>
        </div>

        {/* Row 2: Mission Briefing | Live Intel Feed */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "1.5rem",
            alignItems: "stretch",
          }}
        >
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <MissionCard />
          </div>
          <div className="animate-slide-up" style={{ animationDelay: "0.25s" }}>
            <AnnouncementsCard />
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            textAlign: "center",
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "2px" }}>
            VICEVERSE IDEATHON &middot; ADVANCED TEAM LEADER PORTAL &middot; IVC CLUB VVCE
          </span>
        </div>

      </div>
    </main>
  );
}