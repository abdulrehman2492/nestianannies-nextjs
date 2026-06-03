"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function ParentProfilePage() {
  return (
    <DashboardLayout role="parent">
      <div className="dashboard-section">
        <div style={{ marginBottom: "20px" }}>
          <h4 style={{ margin: 0, color: "#1a1a2e" }}>Profile Settings</h4>
          <p style={{ margin: "6px 0 0", color: "#6c757d", fontSize: "14px" }}>Keep your family account and contact details up to date.</p>
        </div>

        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: "22px" }}>
          <form onSubmit={event => event.preventDefault()}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form--label">First Name</label>
                <input className="form--control" placeholder="Sarah" />
              </div>
              <div className="col-md-6">
                <label className="form--label">Last Name</label>
                <input className="form--control" placeholder="Johnson" />
              </div>
              <div className="col-md-6">
                <label className="form--label">Email</label>
                <input className="form--control" type="email" placeholder="parent@nestianannies.com" />
              </div>
              <div className="col-md-6">
                <label className="form--label">Phone</label>
                <input className="form--control" placeholder="+1 780 555 0100" />
              </div>
              <div className="col-12">
                <label className="form--label">Home Address</label>
                <input className="form--control" placeholder="Edmonton, AB" />
              </div>
            </div>
            <button className="btn btn--base btn--md mt-4" type="submit">Save Profile</button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
