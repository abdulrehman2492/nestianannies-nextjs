"use client";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { NANNIES } from "@/lib/data";

function ParentDashboardContent() {
  return (
    <div>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        {[
          { icon: "la-wallet", label: "Available Balance", value: "$500.00 CAD", color: "#D8B532", bg: "#FFF9E6" },
          { icon: "la-calendar-check", label: "Active Bookings", value: "0", color: "#3b82f6", bg: "#EFF6FF" },
          { icon: "la-check-circle", label: "Completed Bookings", value: "0", color: "#10b981", bg: "#ECFDF5" },
          { icon: "la-star", label: "Reviews Given", value: "0", color: "#f59e0b", bg: "#FFFBEB" },
        ].map(w => (
          <div key={w.label} style={{ background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: w.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className={`las ${w.icon}`} style={{ fontSize: "20px", color: w.color }}></i>
              </div>
            </div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", marginBottom: "4px" }}>{w.value}</div>
            <div style={{ fontSize: "13px", color: "#6c757d" }}>{w.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px", marginBottom: "20px" }}>
        {/* Quick actions */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0" }}>
          <h6 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Quick Actions</h6>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { href: "/caregivers", icon: "la-search", label: "Find a Nanny", bg: "#D8B532", color: "#1F1F1F" },
              { href: "/parent/bookings", icon: "la-calendar-alt", label: "Booking History", bg: "#f8f9fa", color: "#1a1a2e" },
              { href: "/parent/profile", icon: "la-user-circle", label: "Profile Settings", bg: "#f8f9fa", color: "#1a1a2e" },
            ].map(a => (
              <Link key={a.label} href={a.href} style={{ display: "flex", alignItems: "center", gap: "10px",
                padding: "11px 14px", borderRadius: "8px", background: a.bg, color: a.color,
                textDecoration: "none", fontSize: "14px", fontWeight: 500, border: "1px solid rgba(0,0,0,0.06)" }}>
                <i className={`las ${a.icon}`} style={{ fontSize: "16px" }}></i>{a.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Nannies near you */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <h6 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>Nannies Near You</h6>
            <Link href="/caregivers" style={{ fontSize: "13px", color: "#D8B532", textDecoration: "none", fontWeight: 600 }}>View All →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {NANNIES.slice(0, 3).map(n => (
              <div key={n.id} style={{ textAlign: "center", padding: "12px", borderRadius: "10px", border: "1px solid #f0f0f0" }}>
                <img src={n.image} alt={n.firstName} style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover", marginBottom: "8px" }} />
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a2e", marginBottom: "2px" }}>{n.firstName}</div>
                <div style={{ fontSize: "11px", color: "#6c757d", marginBottom: "6px" }}>{n.services[0]}</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#D8B532", marginBottom: "8px" }}>${n.hourlyRate}/hr</div>
                <Link href={`/caregivers/${n.slug}`} style={{ fontSize: "11px", padding: "5px 12px", background: "#D8B532", color: "#1F1F1F",
                  borderRadius: "6px", textDecoration: "none", fontWeight: 600 }}>View</Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h6 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: 0, textTransform: "uppercase", letterSpacing: "0.5px" }}>Recent Bookings</h6>
          <Link href="/parent/bookings" style={{ fontSize: "13px", color: "#D8B532", textDecoration: "none", fontWeight: 600 }}>View All →</Link>
        </div>
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "#f8f9fa" }}>
                {["Booking #", "Nanny", "Date", "Subtotal", "Fee (15%)", "Total", "Status"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: 700,
                    color: "#6c757d", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan={7} style={{ padding: "32px", textAlign: "center", color: "#aaa", fontSize: "14px" }}>
                No bookings yet. <Link href="/caregivers" style={{ color: "#D8B532", textDecoration: "none", fontWeight: 600 }}>Find a Nanny →</Link>
              </td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function ParentDashboard() {
  return (
    <DashboardLayout role="parent">
      <ParentDashboardContent />
    </DashboardLayout>
  );
}
