"use client";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

function NannyDashboardContent() {
  return (
    <div>
      {/* Status banner */}
      <div style={{ background: "linear-gradient(135deg,#ECFDF5,#D1FAE5)", border: "1px solid #A7F3D0",
        borderRadius: "12px", padding: "16px 20px", marginBottom: "24px",
        display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#10b981",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <i className="las la-check" style={{ fontSize: "20px", color: "#fff" }}></i>
        </div>
        <div>
          <div style={{ fontWeight: 700, color: "#065f46", fontSize: "15px" }}>Your Profile is Live!</div>
          <div style={{ fontSize: "13px", color: "#047857" }}>You are approved by Nestia Nannies. Parents in your area can find and book you.</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        {[
          { icon: "la-wallet", label: "Available Balance", value: "$0.00", color: "#D8B532", bg: "#FFF9E6" },
          { icon: "la-money-bill-wave", label: "Total Earnings", value: "$0.00", color: "#10b981", bg: "#ECFDF5" },
          { icon: "la-calendar-check", label: "Upcoming Services", value: "0", color: "#3b82f6", bg: "#EFF6FF" },
          { icon: "la-star", label: "Reviews", value: "0", color: "#f59e0b", bg: "#FFFBEB" },
        ].map(w => (
          <div key={w.label} style={{ background: "#fff", borderRadius: "12px", padding: "20px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: w.bg,
              display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
              <i className={`las ${w.icon}`} style={{ fontSize: "20px", color: w.color }}></i>
            </div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", marginBottom: "4px" }}>{w.value}</div>
            <div style={{ fontSize: "13px", color: "#6c757d" }}>{w.label}</div>
          </div>
        ))}
      </div>

      {/* Recent bookings */}
      <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h6 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: 0, textTransform: "uppercase", letterSpacing: "0.5px" }}>Recent Services</h6>
          <Link href="/nanny/bookings" style={{ fontSize: "13px", color: "#10b981", textDecoration: "none", fontWeight: 600 }}>View All →</Link>
        </div>
        <div style={{ overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "#f8f9fa" }}>
                {["Booking #", "Parent", "Date", "Hours", "Amount", "Your Earnings", "Status"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: 700,
                    color: "#6c757d", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr><td colSpan={7} style={{ padding: "32px", textAlign: "center", color: "#aaa" }}>No bookings yet</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function NannyDashboard() {
  return (
    <DashboardLayout role="nanny">
      <NannyDashboardContent />
    </DashboardLayout>
  );
}
