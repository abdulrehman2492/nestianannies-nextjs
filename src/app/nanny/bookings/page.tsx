"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function NannyBookingsPage() {
  return (
    <DashboardLayout role="nanny">
      <div className="dashboard-section">
        <h4 style={{ margin: 0, color: "#1a1a2e" }}>Bookings</h4>
        <p style={{ margin: "6px 0 20px", color: "#6c757d", fontSize: "14px" }}>Review service requests and upcoming family bookings.</p>
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "42px 20px", textAlign: "center", color: "#8a8f98" }}>
          <i className="las la-calendar-check" style={{ fontSize: "40px", color: "#059669", display: "block", marginBottom: "8px" }}></i>
          No bookings assigned yet.
        </div>
      </div>
    </DashboardLayout>
  );
}
