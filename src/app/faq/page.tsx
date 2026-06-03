"use client";
import Link from "next/link";
import { FAQS } from "@/lib/data";
import { useState } from "react";
export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <section className="page-hero page-hero--faq">
        <div className="page-hero__bg"></div>

        <div className="container page-hero__inner">
          <div className="page-hero__copy">
            <span className="page-hero__eyebrow">Help & Support</span>

            <h1 className="page-hero__title">FAQ</h1>

            <p className="page-hero__text">
              Find quick answers about caregivers, bookings, family support, payments, and how our childcare process works.
            </p>

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb page-hero__breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">FAQ</li>
              </ol>
            </nav>
          </div>

          <div className="page-hero__visual" aria-hidden="true">
            <div className="hero-screen hero-screen--faq">
              <div className="hero-screen__bar">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="hero-faq-search">
                <i className="las la-search"></i>
                <span>Search your question...</span>
              </div>

              <div className="hero-faq-list">
                <div>
                  <strong>How do I find a nanny?</strong>
                  <i className="las la-angle-down"></i>
                </div>
                <div>
                  <strong>Are caregivers verified?</strong>
                  <i className="las la-angle-down"></i>
                </div>
                <div>
                  <strong>Can I contact support?</strong>
                  <i className="las la-angle-down"></i>
                </div>
              </div>

              <div className="hero-faq-note">
                <i className="las la-question-circle"></i>
                Need help? Our support team is here to guide your family.
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="faq-section my-120">
        <div className="container">
          <div className="row gy-5 flex-wrap-reverse">
            <div className="col-lg-6">
              <div className="faq-left">
                <div className="faq-thumb">
                  <img src="/assets/images/frontend/feature/699be847302c81771825223.jpg" alt="FAQ" />
                </div>
                <ul className="content-list mt-4">
                  {["Flexible hourly, daily, and live-in care options", "Fully background-checked and verified nannies", "Specialized support for bilingual families", "24/7 customer support"].map(f => (
                    <li key={f} className="content-list__item"><span className="content-list__icon"><i className="fas fa-check"></i></span>{f}</li>
                  ))}
                </ul>
                <div className="faq-content__bottom mt-4">
                  <Link href="/contact" className="btn btn--base">Contact With Us <i className="fas fa-arrow-right ms-1"></i></Link>
                  <a className="faq-btn-link ms-3" href="tel:+17805550100"><i className="fa-solid fa-phone-volume me-2"></i>+1 (780) 555-0100</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ps-lg-4">
              <div className="section-heading style-left mb-4">
                <span className="section-heading__subtitle">FAQ</span>
                <h2 className="section-heading__title">Quick Answers to Common Questions</h2>
              </div>
              <div className="accordion custom--accordion" id="faqAccordion">
                {FAQS.slice(0, 6).map((faq, i) => (
                  <div key={i} className="accordion-item">
                    <h2 className="accordion-header">
                      <button className={`accordion-button${open === i ? "" : " collapsed"}`} type="button" onClick={() => setOpen(open === i ? -1 : i)}>
                        {faq.q}
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse${open === i ? " show" : ""}`}>
                      <div className="accordion-body">{faq.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
