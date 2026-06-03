"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const NANNY_ACCOUNTS = [
  { email: "nanny@nestianannies.com", username: "marie_lefebvre", password: "Demo@1234", firstName: "Marie", status: "approved" },
  { email: "nanny2@nestianannies.com", username: "emily_chen", password: "Demo@1234", firstName: "Emily", status: "approved" },
  { email: "nanny3@nestianannies.com", username: "sophie_tremblay", password: "Demo@1234", firstName: "Sophie", status: "approved" },
];

export default function NannyLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const acct = NANNY_ACCOUNTS.find(
      a => (a.email === form.username || a.username === form.username) && a.password === form.password
    );
    setTimeout(() => {
      if (acct) {
        localStorage.setItem("nestia_user", JSON.stringify({ id: "n1", email: acct.email, role: "nanny", firstName: acct.firstName, status: acct.status }));
        router.push("/nanny/dashboard");
      } else {
        setError("Invalid credentials. Demo: marie_lefebvre / Demo@1234");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <section className="account">
      {/* Fix account-form-wrapper padding */}
      <style>{`
        .account-inner { min-height: 100vh; height: auto; }
        .account-inner__left { position: sticky; top: 0; height: 100vh; }
        .account-form-wrapper { padding: 48px 64px !important; max-width: 680px !important; width: 100%; margin: 0 auto; }
        .account-login-wrapper { justify-content: center; gap: 10px; margin-bottom: 32px !important; padding-bottom: 32px !important; border-bottom: 1px solid rgba(0,0,0,0.07); }
        .account-form__title { margin-top: 0 !important; margin-bottom: 6px !important; }
        .account-form__heading { margin-bottom: 28px !important; }
        @media (max-width: 991px) { .account-inner__left { display: none; } .account-form-wrapper { padding: 48px 40px !important; max-width: 560px !important; } }
        @media (max-width: 576px) { .account-form-wrapper { padding: 32px 24px !important; } }
      `}</style>
      <div className="account-inner">
        <div className="account-inner__left">
          <div className="account-thumb">
            <img src="/assets/images/frontend/login/nanny_login.jpg" alt="Nanny Login" style={{width:"100%",height:"100%",objectFit:"cover"}} />
          </div>
        </div>
        <div className="account-inner__right">
          <div className="account-form-wrapper">
            <div style={{textAlign:"center",marginBottom:"8px"}}>
              <Link href="/" className="account-form__logo" style={{display:"inline-block"}}>
                <img src="/images/logo-dark.png" alt="Nestia Nannies" style={{maxWidth:"200px",height:"auto"}} />
              </Link>
            </div>
            <div className="account-login-wrapper">
              <Link href="/login" className="account-login-wrapper-btn">Login as Parent</Link>
              <Link href="/nanny/login" className="account-login-wrapper-btn active">Login as Nannie</Link>
            </div>
            <h4 className="account-form__title">Welcome back</h4>
            <h3 className="account-form__heading">Nanny Sign In</h3>
            {error && <div className="alert alert--danger py-2 mb-3 rounded"><small>{error}</small></div>}
            <form className="account-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form--label">Username or Email <span className="text-danger">*</span></label>
                <input type="text" className="form-control form--control" placeholder="Enter Username"
                  value={form.username} onChange={e=>setForm({...form,username:e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="form--label">Password <span className="text-danger">*</span></label>
                <input type="password" className="form-control form--control" placeholder="Enter Password"
                  value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
              </div>
              <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
                <div className="form-check form--check">
                  <input type="checkbox" className="form-check-input" id="rem2" />
                  <label className="form-check-label" htmlFor="rem2" style={{whiteSpace:"nowrap"}}>Remember Me</label>
                </div>
                <Link href="/forgot-password" className="text--base">Forgot Password?</Link>
              </div>
              <button type="submit" className="btn btn--base w-100" disabled={loading}>
                {loading ? <><i className="fas fa-spinner fa-spin me-2"></i>Signing in...</> : "Sign In Account"}
              </button>
            </form>
            <div className="mt-3 p-3 rounded" style={{background:"#f8f9fa",fontSize:"12px",border:"1px solid #e2e8f0"}}>
              <strong>Demo:</strong> marie_lefebvre / Demo@1234
            </div>
            <p className="text-center mt-3">Don&apos;t have an account? <Link href="/nanny/register" className="text--base">Apply as Nanny</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
}
