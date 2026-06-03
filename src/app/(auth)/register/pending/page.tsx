"use client";
import Link from "next/link";
export default function RegistrationPending() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4f6f9" }}>
      <div style={{ background: "#fff", borderRadius: "16px", padding: "48px 40px", maxWidth: "520px", width: "100%", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#FFF9E6", border: "3px solid #D8B532",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <i className="las la-envelope-open" style={{ fontSize: "32px", color: "#D8B532" }}></i>
        </div>
        <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a2e", marginBottom: "12px" }}>Check Your Email</h3>
        <p style={{ color: "#6c757d", fontSize: "15px", lineHeight: 1.6, marginBottom: "24px" }}>
          We've sent a verification link to your email address. Please verify your email before logging in.
        </p>
        <div style={{ background: "#f8f9fa", borderRadius: "10px", padding: "16px", marginBottom: "24px", textAlign: "left" }}>
          <div style={{ fontSize: "13px", color: "#6c757d", marginBottom: "8px" }}><strong>Next steps:</strong></div>
          {["Check your email for a verification link", "Click the link to verify your account", "Log in to start finding nannies"].map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px 0", fontSize: "13px", color: "#495057" }}>
              <span style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#D8B532", color: "#1F1F1F",
                display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>{i+1}</span>
              {step}
            </div>
          ))}
        </div>
        <Link href="/login" style={{ display: "block", padding: "12px", background: "#D8B532", color: "#1F1F1F",
          borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "15px", marginBottom: "12px" }}>
          Go to Login
        </Link>
        <Link href="/" style={{ fontSize: "13px", color: "#6c757d", textDecoration: "none" }}>← Back to Home</Link>
      </div>
    </div>
  );
}
