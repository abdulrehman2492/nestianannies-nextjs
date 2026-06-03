"use client";

import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function ParentBookingsPage() {
  return (
    <DashboardLayout role="parent">
      <div className="dashboard-section">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "20px" }}>
          <div>
            <h4 style={{ margin: 0, color: "#1a1a2e" }}>My Bookings</h4>
            <p style={{ margin: "6px 0 0", color: "#6c757d", fontSize: "14px" }}>Track upcoming, active, and completed nanny bookings.</p>
          </div>
          <Link href="/caregivers" className="btn btn--base btn--sm">
            <i className="las la-search me-1"></i>Find a Nanny
          </Link>
        </div>

        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#f8f9fa" }}>
                  {["Booking #", "Nanny", "Service", "Date", "Total", "Status"].map(item => (
                    <th key={item} style={{ padding: "13px 16px", textAlign: "left", color: "#6c757d", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} style={{ padding: "42px 20px", textAlign: "center", color: "#8a8f98" }}>
                    <i className="las la-calendar-times" style={{ fontSize: "38px", color: "#D8B532", display: "block", marginBottom: "8px" }}></i>
                    No bookings yet. Browse caregivers to start a booking.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
