"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function AdminSettingsPage() {
  return (
    <DashboardLayout role="admin">
      <div className="dashboard-section">
        <h4 style={{ margin: 0, color: "#1a1a2e" }}>Settings</h4>
        <p style={{ margin: "6px 0 20px", color: "#6c757d", fontSize: "14px" }}>Configure platform defaults and admin profile details.</p>
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "22px" }}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form--label">Platform Fee</label>
              <input className="form--control" defaultValue="15%" />
            </div>
            <div className="col-md-6">
              <label className="form--label">Support Email</label>
              <input className="form--control" defaultValue="hello@nestianannies.com" />
            </div>
          </div>
          <button className="btn btn--base btn--md mt-4" type="button">Save Settings</button>
        </div>
      </div>
    </DashboardLayout>
  );
}
