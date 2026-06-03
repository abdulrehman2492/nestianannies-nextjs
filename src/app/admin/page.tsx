"use client";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { NANNIES } from "@/lib/data";

const COMMISSION = 15;

function AdminDashboardContent() {
  const pendingCount = NANNIES.filter(n => !n.verified).length;
  const approvedCount = NANNIES.filter(n => n.verified).length;

  return (
    <div>
      {/* Pending banner */}
      {pendingCount > 0 && (
        <div style={{ background: "linear-gradient(135deg,#FFF9E6,#FEF3C7)", border: "1px solid #FCD34D",
          borderRadius: "12px", padding: "16px 20px", marginBottom: "24px",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#D8B532",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <i className="las la-user-clock" style={{ fontSize: "22px", color: "#1F1F1F" }}></i>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "#92400e", fontSize: "15px" }}>{pendingCount} Nann{pendingCount === 1 ? "y" : "ies"} Waiting for Approval</div>
              <div style={{ fontSize: "13px", color: "#b45309" }}>Review applications and approve or reject before they go live.</div>
            </div>
          </div>
          <Link href="/admin/nannies?tab=pending" style={{ padding: "9px 18px", background: "#1a1a2e", color: "#fff",
            borderRadius: "8px", textDecoration: "none", fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap" }}>
            Review Now →
          </Link>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        {[
          { icon: "la-users", label: "Total Parents", value: "8", color: "#3b82f6", bg: "#EFF6FF" },
          { icon: "la-user-nurse", label: "Approved Nannies", value: String(approvedCount), color: "#10b981", bg: "#ECFDF5" },
          { icon: "la-calendar-check", label: "Total Bookings", value: "0", color: "#8b5cf6", bg: "#F5F3FF" },
          { icon: "la-hourglass-half", label: "Pending Approvals", value: String(pendingCount), color: "#f59e0b", bg: "#FFFBEB" },
          { icon: "la-dollar-sign", label: "Total Revenue", value: "$0.00", color: "#10b981", bg: "#ECFDF5" },
          { icon: "la-percentage", label: "Commission Rate", value: `${COMMISSION}%`, color: "#D8B532", bg: "#FFF9E6" },
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

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        {/* Bookings table */}
        <div style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h6 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", margin: 0, textTransform: "uppercase", letterSpacing: "0.5px" }}>Recent Bookings</h6>
            <Link href="/admin/bookings" style={{ fontSize: "13px", color: "#D8B532", textDecoration: "none", fontWeight: 600 }}>View All →</Link>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead><tr style={{ background: "#f8f9fa" }}>
              {["Booking #", "Parent", "Nanny", "Subtotal", "Fee (15%)", "Total", "Status"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#6c757d", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr></thead>
            <tbody><tr><td colSpan={7} style={{ padding: "32px", textAlign: "center", color: "#aaa", fontSize: "14px" }}>No bookings yet</td></tr></tbody>
          </table>
        </div>

        {/* Commission card */}
        <div style={{ background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #f0f0f0" }}>
          <h6 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a2e", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            <i className="las la-percentage me-2" style={{ color: "#D8B532" }}></i>Commission
          </h6>
          {[
            { label: "Platform Rate", value: "15%", desc: "Per booking" },
            { label: "Parent Pays", value: "Rate + 15%", desc: "Full upfront" },
            { label: "Nanny Earns", value: "85%", desc: "After service" },
            { label: "Nestia Earns", value: "15%", desc: "Service fee" },
          ].map(item => (
            <div key={item.label} style={{ padding: "10px 12px", borderRadius: "8px", background: "#f8f9fa", marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "#6c757d" }}>{item.label}</div>
                  <div style={{ fontSize: "11px", color: "#aaa" }}>{item.desc}</div>
                </div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "#D8B532" }}>{item.value}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: "12px", padding: "12px", borderRadius: "8px", background: "#FFF9E6", border: "1px solid #FCD34D", fontSize: "12px", color: "#92400e" }}>
            <strong>Example:</strong> $35/hr × 4h = $140 → Parent: $161 → Nanny: $140 → Nestia: $21
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <AdminDashboardContent />
    </DashboardLayout>
  );
}
