"use client";
import Link from "next/link";
export default function NannyRegister() {
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
            <img src="/assets/images/frontend/login/nanny_register.jpg" alt="Become a Nanny" style={{width:"100%",height:"100%",objectFit:"cover"}} />
          </div>
        </div>
        <div className="account-inner__right">
          <div className="account-form-wrapper">
            <Link href="/" className="account-form__logo"><img src="/images/logo-dark.png" alt="Nestia Nannies" /></Link>
            <div className="account-login-wrapper">
              <Link href="/login" className="account-login-wrapper-btn">Login as Parent</Link>
              <Link href="/nanny/login" className="account-login-wrapper-btn active">Login as Nannie</Link>
            </div>
            <h3 className="account-form__heading">Apply as a Nanny</h3>
            <form className="account-form">
              <div className="row g-3">
                <div className="col-sm-6 form-group">
                  <label className="form--label">First Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control form--control" placeholder="First Name" required />
                </div>
                <div className="col-sm-6 form-group">
                  <label className="form--label">Last Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control form--control" placeholder="Last Name" required />
                </div>
                <div className="col-12 form-group">
                  <label className="form--label">Email Address <span className="text-danger">*</span></label>
                  <input type="email" className="form-control form--control" placeholder="Email Address" required />
                </div>
                <div className="col-sm-6 form-group">
                  <label className="form--label">Username <span className="text-danger">*</span></label>
                  <input type="text" className="form-control form--control" placeholder="Username" required />
                </div>
                <div className="col-sm-6 form-group">
                  <label className="form--label">Mobile Number <span className="text-danger">*</span></label>
                  <input type="tel" className="form-control form--control" placeholder="+1 (780) ..." required />
                </div>
                <div className="col-sm-6 form-group">
                  <label className="form--label">Password <span className="text-danger">*</span></label>
                  <input type="password" className="form-control form--control" placeholder="Password" required />
                </div>
                <div className="col-sm-6 form-group">
                  <label className="form--label">Confirm Password <span className="text-danger">*</span></label>
                  <input type="password" className="form-control form--control" placeholder="Confirm Password" required />
                </div>
                <div className="col-12">
                  <div className="form-check form--check">
                    <input type="checkbox" className="form-check-input" id="agreeNanny" required />
                    <label className="form-check-label" htmlFor="agreeNanny">I agree to the <Link href="/terms" className="text--base">Terms of Service</Link></label>
                  </div>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn--base w-100">Create Account</button>
                </div>
              </div>
            </form>
            <p className="text-center mt-3">Already a nanny? <Link href="/nanny/login" className="text--base">Sign In</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
}
