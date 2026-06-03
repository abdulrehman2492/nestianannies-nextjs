import Link from "next/link";
export default function About() {
  return (
    <>
      {/* Breadcrumb */}
      <section className="page-hero page-hero--about">
        <div className="page-hero__bg"></div>

        <div className="container page-hero__inner">
          <div className="page-hero__copy">
            <span className="page-hero__eyebrow">Trusted Childcare Support</span>

            <h1 className="page-hero__title">About Us</h1>

            <p className="page-hero__text">
              Learn more about our mission, values, and commitment to helping families find reliable, caring, and professional childcare support.
            </p>

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb page-hero__breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">About Us</li>
              </ol>
            </nav>
          </div>

          <div className="page-hero__visual" aria-hidden="true">
            <div className="hero-screen hero-screen--about">
              <div className="hero-screen__bar">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="hero-about-card">
                <div className="hero-about-icon">
                  <i className="las la-heart"></i>
                </div>
                <div>
                  <strong>Family-first care</strong>
                  <span>Reliable support for every home</span>
                </div>
              </div>

              <div className="hero-about-stats">
                <div>
                  <strong>Verified</strong>
                  <span>Caregivers</span>
                </div>
                <div>
                  <strong>Bilingual</strong>
                  <span>Support</span>
                </div>
              </div>

              <div className="hero-about-note">
                <i className="las la-check-circle"></i>
                Helping families connect with trusted childcare professionals.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <div className="about-section my-120">
        <div className="container">
          <div className="row gy-4">
            <div className="col-xxl-6 col-xl-7 pe-xl-5">
              <div className="about-content-wrapper">
                <div className="section-heading style-left">
                  <span className="section-heading__subtitle">WHO WE ARE</span>
                  <h2 className="section-heading__title s-highlight" data-s-break="-2" data-s-length="1">Premium In-Home Childcare, Curated by Marthe</h2>
                  <p className="section-heading__desc">
                    Nestia Nannies connects Edmonton families with highly qualified, bilingual nannies. Every nanny on our platform is personally reviewed and approved by Marthe — verified documents, Criminal Record Check, and a thorough interview process. We specialize in newborn care, toddler care, after-school support, and French language immersion.
                  </p>
                </div>
                <ul className="content-list mt-4">
                  {["Government ID & Background Verified", "Criminal Record Check Required", "Bilingual Nannies Available", "Manual Admin Approval — No Shortcuts"].map(item => (
                    <li key={item} className="content-list__item">
                      <span className="content-list__icon"><i className="fas fa-check"></i></span>{item}
                    </li>
                  ))}
                </ul>
                <div className="about-bottom mt-4">
                  <Link href="/caregivers" className="btn btn--base">Find a Nanny</Link>
                  <a href="tel:+17805550100" className="contact-link-list">
                    <div className="contact-link-list__icon"><i className="fas fa-phone"></i></div>
                    <div className="contact-link-list__content">
                      <span className="contact-link-list__title">Call Us</span>
                      <p className="contact-link-list__desc">+1 (780) 555-0100</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-5 d-xl-block d-none">
              <div className="about-thumb-wrapper">
                <div className="about-thumb">
                  <img src="/assets/images/frontend/about/699adc494cfd91771756617.png" alt="About Nestia" />
                </div>
                <div className="about-thumb-two">
                  <img src="/assets/images/frontend/about/699adc4a9d31e1771756618.jpg" alt="Nestia Care" />
                </div>
                <img src="/assets/templates/basic/shapes/about-1.png" alt="" className="about-shape-one" />
                <img src="/assets/templates/basic/shapes/about-2.png" alt="" className="about-shape-two" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
