"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function AdminParentsPage() {
  return (
    <DashboardLayout role="admin">
      <div className="dashboard-section">
        <h4 style={{ margin: 0, color: "#1a1a2e" }}>Manage Parents</h4>
        <p style={{ margin: "6px 0 20px", color: "#6c757d", fontSize: "14px" }}>Parent accounts will appear here as families register.</p>
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "42px 20px", textAlign: "center", color: "#8a8f98" }}>No parent accounts to review yet.</div>
      </div>
    </DashboardLayout>
  );
}
