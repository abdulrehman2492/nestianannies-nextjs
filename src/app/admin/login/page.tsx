"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    setTimeout(() => {
      if (form.email === "admin@nestianannies.com" && form.password === "Admin@1234") {
        localStorage.setItem("nestia_user", JSON.stringify({ id: "admin1", email: form.email, role: "admin", firstName: "Marthe" }));
        router.push("/admin");
      } else {
        setError("Invalid credentials. Use: admin@nestianannies.com / Admin@1234");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh",background:"#f7f5f0"}}>
      <div className="card custom--card p-5" style={{maxWidth:"420px",width:"100%"}}>
        <div className="text-center mb-4">
          <img src="/images/logo-dark.png" alt="Nestia Nannies" style={{maxWidth:"180px"}} />
          <h4 className="mt-3 mb-1">Admin Login</h4>
          <p className="text-muted small">Marthe&apos;s Management Dashboard</p>
        </div>
        {error && <div className="alert alert--danger py-2 mb-3 rounded"><small>{error}</small></div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form--label">Email Address</label>
            <input type="email" className="form-control form--control" placeholder="admin@nestianannies.com"
              value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
          </div>
          <div className="form-group">
            <label className="form--label">Password</label>
            <input type="password" className="form-control form--control" placeholder="Password"
              value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
          </div>
          <button type="submit" className="btn btn--base w-100 mt-2" disabled={loading}>
            {loading ? <><i className="fas fa-spinner fa-spin me-2"></i>Signing in...</> : <><i className="fas fa-sign-in-alt me-2"></i>Sign In</>}
          </button>
        </form>
        <div className="mt-3 p-3 rounded text-center" style={{background:"#f8f9fa",fontSize:"12px"}}>
          <strong>Demo:</strong> admin@nestianannies.com / Admin@1234
        </div>
        <p className="text-center mt-3 small"><Link href="/" className="text--base">← Back to Website</Link></p>
      </div>
    </div>
  );
}
