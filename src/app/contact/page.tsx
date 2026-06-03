"use client";
import Link from "next/link";
export default function Contact() {
  return (
    <>
      <section className="page-hero page-hero--contact">
        <div className="page-hero__bg"></div>

        <div className="container page-hero__inner">
          <div className="page-hero__copy">
            <span className="page-hero__eyebrow">Get In Touch</span>

            <h1 className="page-hero__title">Contact Us</h1>

            <p className="page-hero__text">
              Have questions about childcare support? Contact our team and we’ll help guide you through the next step.
            </p>

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb page-hero__breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Contact Us</li>
              </ol>
            </nav>
          </div>

          <div className="page-hero__visual" aria-hidden="true">
            <div className="hero-screen hero-screen--contact">
              <div className="hero-screen__bar">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="hero-contact-card">
                <div className="hero-contact-icon">
                  <i className="las la-envelope"></i>
                </div>
                <div>
                  <strong>Send us a message</strong>
                  <span>We’re here to help your family.</span>
                </div>
              </div>

              <div className="hero-contact-list">
                <div>
                  <i className="las la-phone"></i>
                  <span>Quick support</span>
                </div>
                <div>
                  <i className="las la-map-marker"></i>
                  <span>Local care guidance</span>
                </div>
              </div>

              <div className="hero-contact-note">
                <i className="las la-comments"></i>
                Our team will help you find the right childcare solution.
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="contact-section my-120">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-4">
              <div className="contact-info">
                {[
                  { icon: "la-map-marker-alt", title: "Address", value: "Edmonton, AB, Canada" },
                  { icon: "la-envelope", title: "Email", value: "hello@nestianannies.com" },
                  { icon: "la-phone", title: "Phone", value: "+1 (780) 555-0100" },
                  { icon: "la-clock", title: "Working Hours", value: "Mon - Fri: 9:00 am - 6:00 pm" },
                ].map(c => (
                  <div key={c.title} className="contact-info-item d-flex gap-3 mb-4">
                    <div style={{ minWidth: "48px", height: "48px", background: "#D8B532", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <i className={`las ${c.icon} fs-5 text-dark`}></i>
                    </div>
                    <div>
                      <h6 className="mb-1">{c.title}</h6>
                      <p className="mb-0 text-muted">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card custom--card p-4">
                <h4 className="mb-4">Send us a Message</h4>
                <form>
                  <div className="row g-3">
                    <div className="col-sm-6 form-group">
                      <label className="form--label">Your Name</label>
                      <input type="text" className="form-control form--control" placeholder="Full Name" />
                    </div>
                    <div className="col-sm-6 form-group">
                      <label className="form--label">Email Address</label>
                      <input type="email" className="form-control form--control" placeholder="your@email.com" />
                    </div>
                    <div className="col-12 form-group">
                      <label className="form--label">Subject</label>
                      <input type="text" className="form-control form--control" placeholder="How can we help?" />
                    </div>
                    <div className="col-12 form-group">
                      <label className="form--label">Message</label>
                      <textarea className="form-control form--control" rows={5} placeholder="Your message..."></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn--base">Send Message <i className="fas fa-paper-plane ms-2"></i></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
