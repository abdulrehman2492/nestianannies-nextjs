"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function NannyEarningsPage() {
  return (
    <DashboardLayout role="nanny">
      <div className="dashboard-section">
        <h4 style={{ margin: 0, color: "#1a1a2e" }}>Earnings</h4>
        <p style={{ margin: "6px 0 20px", color: "#6c757d", fontSize: "14px" }}>Monitor completed services, payouts, and platform fees.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
          {[
            ["Available Balance", "$0.00"],
            ["Pending Payout", "$0.00"],
            ["Total Earnings", "$0.00"],
          ].map(([label, value]) => (
            <div key={label} style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ color: "#6c757d", fontSize: "13px", marginBottom: "8px" }}>{label}</div>
              <div style={{ color: "#1a1a2e", fontSize: "26px", fontWeight: 800 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
