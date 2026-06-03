"use client";
import { useState, useEffect, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type Role = "parent" | "nanny" | "admin";
type DashboardUser = {
  id: string;
  email: string;
  role: Role;
  firstName?: string;
};

const NAV: Record<Role, { href: string; icon: string; label: string; badge?: string }[]> = {
  parent: [
    { href: "/parent/dashboard", icon: "la-home", label: "Dashboard" },
    { href: "/caregivers", icon: "la-search", label: "Find a Nanny" },
    { href: "/parent/bookings", icon: "la-calendar-check", label: "My Bookings" },
    { href: "/parent/profile", icon: "la-user-circle", label: "Profile" },
  ],
  nanny: [
    { href: "/nanny/dashboard", icon: "la-home", label: "Dashboard" },
    { href: "/nanny/onboarding", icon: "la-user-edit", label: "My Profile" },
    { href: "/nanny/bookings", icon: "la-calendar-check", label: "Bookings" },
    { href: "/nanny/earnings", icon: "la-money-bill-wave", label: "Earnings" },
  ],
  admin: [
    { href: "/admin", icon: "la-home", label: "Dashboard" },
    { href: "/admin/nannies", icon: "la-user-nurse", label: "Manage Nannies" },
    { href: "/admin/nannies?tab=pending", icon: "la-hourglass-half", label: "Pending Approvals", badge: "!" },
    { href: "/admin/parents", icon: "la-users", label: "Manage Parents" },
    { href: "/admin/bookings", icon: "la-calendar-alt", label: "Bookings" },
    { href: "/admin/settings", icon: "la-cog", label: "Settings" },
  ],
};

const ROLE_COLORS: Record<Role, string> = {
  parent: "#D8B532",
  nanny: "#059669",
  admin: "#D8B532",
};

const ROLE_LABELS: Record<Role, string> = {
  parent: "Parent Portal",
  nanny: "Nanny Portal",
  admin: "Admin Panel",
};

const PROFILE_HREF: Record<Role, string> = {
  parent: "/parent/profile",
  nanny: "/nanny/onboarding",
  admin: "/admin/settings",
};

const subscribeToAuthStorage = () => () => {};

function getStoredUserJson() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("nestia_user") || "";
}

export default function DashboardLayout({ children, role }: { children: React.ReactNode; role: Role }) {
  const pathname = usePathname();
  const router = useRouter();
  const hydrated = useSyncExternalStore(subscribeToAuthStorage, () => true, () => false);
  const userJson = useSyncExternalStore(subscribeToAuthStorage, getStoredUserJson, () => "");
  const user = useMemo<DashboardUser | null>(() => {
    if (!userJson) return null;
    try {
      return JSON.parse(userJson) as DashboardUser;
    } catch {
      return null;
    }
  }, [userJson]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!user) {
      const loginPath = role === "admin" ? "/admin/login" : role === "nanny" ? "/nanny/login" : "/login";
      router.push(loginPath);
      return;
    }
    if (user.role !== role) {
      const loginPath = role === "admin" ? "/admin/login" : role === "nanny" ? "/nanny/login" : "/login";
      router.push(loginPath);
    }
  }, [hydrated, role, router, user]);

  const handleLogout = () => {
    localStorage.removeItem("nestia_user");
    const loginPath = role === "admin" ? "/admin/login" : role === "nanny" ? "/nanny/login" : "/login";
    router.push(loginPath);
  };

  const accent = ROLE_COLORS[role];
  const navItems = NAV[role];

  if (!hydrated || !user) return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4f6f9" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "48px", height: "48px", border: `4px solid ${accent}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }}></div>
        <p style={{ color: "#666", margin: 0 }}>Loading...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#f4f6f9", fontFamily: "Roboto, sans-serif" }}>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 40, display: "none" }}
          className="mobile-overlay" />
      )}

      {/* ── Sidebar ── */}
      <aside style={{
        width: "260px", flexShrink: 0, background: "#1a1a2e",
        display: "flex", flexDirection: "column", height: "100vh",
        position: "fixed", left: 0, top: 0, zIndex: 50,
        transition: "transform 0.3s",
        boxShadow: "4px 0 24px rgba(0,0,0,0.15)",
      }} className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>

        {/* Logo */}
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <img src="/images/logo-dark.png" alt="Nestia Nannies" style={{ height: "36px", width: "auto", filter: "brightness(0) invert(1)" }} />
          </Link>
          <div style={{ marginTop: "12px", display: "inline-flex", alignItems: "center", gap: "6px",
            background: `${accent}22`, border: `1px solid ${accent}44`, borderRadius: "20px",
            padding: "4px 12px", fontSize: "11px", fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            <i className={`las ${role === "admin" ? "la-shield-alt" : role === "nanny" ? "la-baby-carriage" : "la-user"}`}></i>
            {ROLE_LABELS[role]}
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          {navItems.map(item => {
            const isActive = pathname === item.href || (item.href !== "/" + role && pathname.startsWith(item.href.split("?")[0]));
            return (
              <Link key={item.label} href={item.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "11px 14px", borderRadius: "10px", marginBottom: "4px",
                  textDecoration: "none", fontSize: "14px", fontWeight: 500,
                  transition: "all 0.15s",
                  background: isActive ? `${accent}22` : "transparent",
                  color: isActive ? accent : "rgba(255,255,255,0.7)",
                  borderLeft: isActive ? `3px solid ${accent}` : "3px solid transparent",
                }}>
                <i className={`las ${item.icon}`} style={{ fontSize: "18px", flexShrink: 0 }}></i>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{ background: "#ef4444", color: "#fff", borderRadius: "50%", width: "18px", height: "18px",
                    fontSize: "10px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User + logout */}
        <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: accent,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              fontSize: "14px", fontWeight: 700, color: "#1F1F1F" }}>
              {user.firstName?.[0]?.toUpperCase() || "U"}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.firstName}</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
            </div>
          </div>
          <button onClick={handleLogout}
            style={{ width: "100%", padding: "9px", background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "8px", color: "#fca5a5", fontSize: "13px", fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <i className="las la-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div style={{ flex: 1, marginLeft: "260px", display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}
        className="dashboard-main">

        {/* Topbar */}
        <header style={{
          height: "64px", background: "#fff", borderBottom: "1px solid #e9ecef",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px", flexShrink: 0, boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Mobile hamburger */}
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: "none", border: "none", padding: "4px", cursor: "pointer", display: "none" }}
              className="hamburger-btn">
              <i className="las la-bars" style={{ fontSize: "22px", color: "#1a1a2e" }}></i>
            </button>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "#6c757d" }}>
              <Link href="/" style={{ color: "#6c757d", textDecoration: "none" }}>Nestia</Link>
              <i className="las la-angle-right" style={{ fontSize: "12px" }}></i>
              <span style={{ color: "#1a1a2e", fontWeight: 500 }}>
                {navItems.find(n => pathname === n.href || (n.href !== "/" + role && pathname.startsWith(n.href.split("?")[0])))?.label || "Dashboard"}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/caregivers" style={{ fontSize: "13px", color: accent, textDecoration: "none", fontWeight: 500 }}>
              <i className="fas fa-external-link-alt me-1" style={{ fontSize: "11px" }}></i>View Site
            </Link>
            <div className="dashboard-account-menu">
              <button type="button" className="dashboard-account-menu__button" aria-label="Open account menu">
                <span className="dashboard-account-menu__avatar" style={{ background: accent }}>
                  <i className="las la-user"></i>
                </span>
                <span className="dashboard-account-menu__name">{user.firstName || user.email?.split("@")[0] || "Account"}</span>
                <i className="las la-angle-down dashboard-account-menu__chevron"></i>
              </button>
              <div className="dashboard-account-menu__dropdown">
                <Link href={PROFILE_HREF[role]}>
                  <i className="las la-user-edit"></i>
                  Edit Profile
                </Link>
                <button type="button" onClick={handleLogout}>
                  <i className="las la-sign-out-alt"></i>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "28px 28px" }}>
          {children}
        </main>
      </div>

      <style>{`
        .dashboard-sidebar { transform: translateX(0); }
        @media (max-width: 991px) {
          .dashboard-main { margin-left: 0 !important; }
          .dashboard-sidebar { transform: translateX(-100%); }
          .dashboard-sidebar.open { transform: translateX(0); }
          .mobile-overlay { display: block !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </div>
  );
}
