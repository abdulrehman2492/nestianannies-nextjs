"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // password reset logic goes here
  };

  return (
    <>
      <section className="breadcrumb py-60 bg-img" style={{ backgroundImage: "url(/assets/images/frontend/breadcrumb/69b8de80298f21773723264.png)" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="breadcrumb__wrapper">
                <h2 className="breadcrumb__title">Reset Password</h2>
                <ul className="breadcrumb__list">
                  <li className="breadcrumb__item"><Link href="/" className="breadcrumb__link">Home</Link></li>
                  <li className="breadcrumb__item"><i className="fas fa-angle-right"></i></li>
                  <li className="breadcrumb__item"><span className="breadcrumb__item-text">Reset Password</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row justify-content-center my-120">
          <div className="col-md-8 col-lg-7 col-xl-5">
            <div className="card custom--card">
              <div className="card-body">
                <div className="mb-4">
                  <p>To recover your account please provide your email or username to find your account.</p>
                </div>
                {submitted ? (
                  <div className="text-center py-4">
                    <i className="fas fa-check-circle text-success mb-3" style={{ fontSize: "48px" }}></i>
                    <h5>Check Your Email</h5>
                    <p>We have sent a password reset link to your email address.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="verify-gcaptcha">
                    <div className="form-group">
                      <label className="form--label">Email or Username</label>
                      <input 
                        type="text" 
                        className="form--control form-two" 
                        name="value" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        autoFocus 
                      />
                    </div>
                    <div className="form-group mt-4">
                      <button type="submit" className="btn btn--base w-100">Submit</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
