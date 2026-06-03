"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SERVICES_WITH_IMAGES as SERVICES, NANNIES, TESTIMONIALS } from "@/lib/data";

const CITIES = ["Edmonton", "St. Albert", "Sherwood Park", "Spruce Grove", "Beaumont", "Fort Saskatchewan", "Leduc"];

export default function Home() {
  const router = useRouter();
  const sliderInit = useRef(false);
  const [heroSearch, setHeroSearch] = useState("");
  const [heroCity, setHeroCity] = useState("");
  const [heroLang, setHeroLang] = useState("");
  const [nameSuggs, setNameSuggs] = useState<string[]>([]);
  const [citySuggs, setCitySuggs] = useState<string[]>([]);
  const [showNameSug, setShowNameSug] = useState(false);
  const [showCitySug, setShowCitySug] = useState(false);
  const nameDropRef = useRef<HTMLDivElement>(null);
  const cityDropRef = useRef<HTMLDivElement>(null);

  const handleHeroSearch = (val: string) => {
    setHeroSearch(val);
    if (!val) { setShowNameSug(false); return; }
    const m = NANNIES.filter(n => n.firstName.toLowerCase().startsWith(val.toLowerCase()) || n.fullName.toLowerCase().includes(val.toLowerCase())).map(n => n.firstName).slice(0, 5);
    setNameSuggs(m); setShowNameSug(m.length > 0);
  };

  const handleHeroCity = (val: string) => {
    setHeroCity(val);
    if (!val) { setShowCitySug(false); return; }
    const m = [...new Set([...CITIES.filter(c => c.toLowerCase().startsWith(val.toLowerCase())), ...NANNIES.filter(n => n.city.toLowerCase().includes(val.toLowerCase())).map(n => n.city)])].slice(0, 5);
    setCitySuggs(m); setShowCitySug(m.length > 0);
  };

  const doHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (heroSearch) params.set("search", heroSearch);
    if (heroCity) params.set("city", heroCity);
    if (heroLang) params.set("language", heroLang);
    router.push("/caregivers?" + params.toString());
  };
  useEffect(() => {
    if (sliderInit.current) return;
    sliderInit.current = true;
    const tryInit = () => {
      const $ = (window as any).$;
      if (!$) { setTimeout(tryInit, 300); return; }
      const $ts = $(".testimonial-slider");
      if ($ts.length && !$ts.hasClass("slick-initialized")) {
        $ts.slick({
          dots: true, arrows: false, infinite: true, speed: 300, autoplay: true, autoplaySpeed: 3000, slidesToShow: 3, slidesToScroll: 1,
          responsive: [{ breakpoint: 1199, settings: { slidesToShow: 2 } }, { breakpoint: 767, settings: { slidesToShow: 1 } }]
        });
      }
      const vid = document.querySelector(".banner-thumb video") as HTMLVideoElement | null;
      if (vid?.dataset.src) { vid.src = vid.dataset.src; vid.load(); vid.play().catch(() => { }); }
    };
    setTimeout(tryInit, 800);
  }, []);

  return (
    <>
      {/* ── Banner ── */}
      <section className="banner-section">
        <div className="container">
          <div className="row gy-4 justify-content-center">
            <div className="col-xxl-8 col-lg-10">
              <div className="banner-content">
                <span className="banner-content__subtitle">Trusted Care, Right at Your Doorstep</span>
                <h1 className="banner-content__title s-highlight" data-s-break="-2" data-s-length="2"
                  style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)", fontSize: "clamp(2rem,5vw,3.5rem)", lineHeight: 1.15, color: "#fff" }}>
                  Trusted In-Home Care for the Children You Love Most
                </h1>
                <p className="banner-content__desc" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.3)", color: "rgba(255,255,255,0.95)" }}>
                  Luxury bilingual childcare for families in Edmonton and nearby areas. Verified nannies, flexible scheduling, and peace of mind — every time.
                </p>
                <form onSubmit={doHeroSearch}
                  style={{ display: "block", width: "100%", maxWidth: "900px", margin: "28px auto 0", background: "rgba(255,255,255,0.14)", backdropFilter: "blur(12px)", borderRadius: "18px", padding: "22px 24px", border: "1.5px solid rgba(255,255,255,0.3)", boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
                  <div className="row g-2 align-items-end">
                    {/* Nanny name autocomplete */}
                    <div className="col-lg-4 col-12" ref={nameDropRef} style={{ position: "relative" }}>
                      <label style={{ display: "block", color: "rgba(255,255,255,0.9)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".8px", marginBottom: "6px" }}>Nanny Name</label>
                      <input type="search" value={heroSearch} onChange={e => handleHeroSearch(e.target.value)} onFocus={() => heroSearch && setShowNameSug(nameSuggs.length > 0)}
                        style={{ width: "100%", background: "#fff", color: "#222", border: "none", borderRadius: "10px", height: "48px", padding: "0 16px", fontSize: "15px", outline: "none" }} placeholder="Search by name..." />
                      {showNameSug && (
                        <ul style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#fff", borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.18)", listStyle: "none", margin: 0, padding: "4px 0", zIndex: 9999 }}>
                          {nameSuggs.map(s => (
                            <li key={s} style={{ padding: "10px 16px", cursor: "pointer", fontSize: "14px", color: "#222", textAlign: "left" }}
                              onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f5")}
                              onMouseLeave={e => (e.currentTarget.style.background = "")}
                              onMouseDown={e => { e.preventDefault(); setHeroSearch(s); setShowNameSug(false); }}>
                              <i className="fas fa-user me-2" style={{ color: "#D8B532", fontSize: "11px" }}></i>{s}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {/* City autocomplete */}
                    <div className="col-lg-3 col-12" ref={cityDropRef} style={{ position: "relative" }}>
                      <label style={{ display: "block", color: "rgba(255,255,255,0.9)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".8px", marginBottom: "6px" }}>City</label>
                      <input type="text" value={heroCity} onChange={e => handleHeroCity(e.target.value)} onFocus={() => heroCity && setShowCitySug(citySuggs.length > 0)}
                        style={{ width: "100%", background: "#fff", color: "#222", border: "none", borderRadius: "10px", height: "48px", padding: "0 16px", fontSize: "15px", outline: "none" }} placeholder="Edmonton" />
                      {showCitySug && (
                        <ul style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "#fff", borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.18)", listStyle: "none", margin: 0, padding: "4px 0", zIndex: 9999 }}>
                          {citySuggs.map(c => (
                            <li key={c} style={{ padding: "10px 16px", cursor: "pointer", fontSize: "14px", color: "#222", display: "flex", justifyContent: "space-between" }}
                              onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f5")}
                              onMouseLeave={e => (e.currentTarget.style.background = "")}
                              onMouseDown={e => { e.preventDefault(); setHeroCity(c); setShowCitySug(false); }}>
                              <span><i className="fas fa-map-marker-alt me-2" style={{ color: "#D8B532", fontSize: "11px" }}></i>{c}</span>
                              <span style={{ fontSize: "11px", color: "#999" }}>{NANNIES.filter(n => n.city === c).length} nannies</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="col-lg-3 col-12">
                      <label style={{ display: "block", color: "rgba(255,255,255,0.9)", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".8px", marginBottom: "6px" }}>Language</label>
                      <select value={heroLang} onChange={e => setHeroLang(e.target.value)}
                        style={{ width: "100%", background: "#fff", color: "#222", border: "none", borderRadius: "10px", height: "48px", padding: "0 16px", fontSize: "15px", outline: "none" }}>
                        <option value="">Any Language</option>
                        <option value="English">English</option>
                        <option value="French">French / Français</option>
                        <option value="Spanish">Spanish</option>
                      </select>
                    </div>
                    <div className="col-lg-2 col-12">
                      <button type="submit" className="btn btn--base w-100" style={{ height: "48px", borderRadius: "10px", fontSize: "15px", fontWeight: 600, whiteSpace: "nowrap" }}>
                        <i className="fas fa-search me-1"></i>Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="banner-thumb">
          <video data-src="/assets/images/banner_video/699a9c31dda5c1771740209.mp4" muted loop playsInline preload="none" />
        </div>
      </section>

      {/* ── Services ── */}
      <div className="service-section my-120">
        <div className="container">
          <div className="section-heading style-left">
            <div className="section-heading__inner">
              <div className="section-heading__content">
                <span className="section-heading__subtitle">OUR SERVICES</span>
                <h2 className="section-heading__title s-highlight" data-s-break="2" data-s-length="2">Find the Perfect Nanny For Your Family</h2>
              </div>
              <Link href="/caregivers" className="btn btn--base btn--md">View All</Link>
            </div>
          </div>
          <div className="service-wrapper">
            <div className="row gy-4">
              {SERVICES.slice(0, 6).map((s) => (
                <div key={s.id} className="col-md-6 col-lg-4">
                  <div className="service-item">
                    <div className="service-item__top">
                      <div className="service-item__thumb">
                        <Link href={`/caregivers?service=${encodeURIComponent(s.name)}`} className="service-item__link">
                          <img src={`/assets/images/service/${s.image}`} alt={s.name} />
                        </Link>
                      </div>
                      <h3 className="service-item__title h4"><Link href={`/caregivers?service=${encodeURIComponent(s.name)}`}>{s.name}</Link></h3>
                    </div>
                    <div className="service-item__content">
                      <p className="service-item__desc">{s.description}</p>
                      <Link href={`/caregivers?service=${encodeURIComponent(s.name)}`} className="service-item__btn">
                        Find a Nanny <span className="icon"><i className="fa-solid fa-arrow-right"></i></span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── About / Counter ── */}
      <div className="about-section my-120">
        <div className="container">
          <div className="row gy-4">
            <div className="col-xxl-6 col-xl-7 pe-xl-5">
              <div className="about-content-wrapper">
                <div className="section-heading style-left">
                  <span className="section-heading__subtitle">WHO WE ARE</span>
                  <h2 className="section-heading__title s-highlight" data-s-break="-2" data-s-length="1">Premium In-Home Childcare, Curated by Marthe</h2>
                  <p className="section-heading__desc">
                    Nestia Nannies connects Edmonton families with highly qualified, bilingual nannies. Every nanny is personally reviewed and approved by Marthe — verified documents, Criminal Record Check, and a thorough interview process.
                  </p>
                </div>
                <div className="about-bottom">
                  <Link href="/about" className="btn btn--base">About Us</Link>
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
                  <img src="/assets/images/frontend/about/699adc494cfd91771756617.png" alt="About Nestia Nannies" />
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

      {/* ── Our Nannies ── */}
      <div className="caregiver-section py-120">
        <div className="container">
          <div className="section-heading text-center mb-5">
            <span className="section-heading__subtitle">OUR NANNIES</span>
            <h2 className="section-heading__title">Meet Our Approved Nannies</h2>
          </div>
          <div className="row gy-4">
            {NANNIES.slice(0, 6).map((n) => (
              <div key={n.id} className="col-xl-4 col-sm-6">
                <div className="profile-card">
                  <div className="profile-card__thumb" style={{ position: "relative" }}>
                    <img src={n.image} alt={n.firstName} loading="lazy" />
                    <span style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(0,0,0,0.55)", color: "#fff", borderRadius: "20px", padding: "3px 10px", fontSize: "11px" }}>
                      <i className="fas fa-map-marker-alt me-1" style={{ color: "#D8B532" }}></i>{n.city}
                    </span>
                  </div>
                  <div className="profile-card__middle">
                    <div className="profile-card__header">
                      <div className="profile-card__info">
                        <h3 className="profile-card__name h4">
                          {n.firstName}
                          {n.verified && (
                            <span className="name-verify">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: "16px", height: "16px", display: "inline", marginLeft: "4px" }}>
                                <path fill="currentColor" d="m21.56 10.739-1.36-1.58c-.26-.3-.47-.86-.47-1.26v-1.7c0-1.06-.87-1.93-1.93-1.93h-1.7c-.39 0-.96-.21-1.26-.47l-1.58-1.36c-.69-.59-1.82-.59-2.52 0l-1.57 1.37c-.3.25-.87.46-1.26.46H6.18c-1.06 0-1.93.87-1.93 1.93v1.71c0 .39-.21.95-.46 1.25l-1.35 1.59c-.58.69-.58 1.81 0 2.5l1.35 1.59c.25.3.46.86.46 1.25v1.71c0 1.06.87 1.93 1.93 1.93h1.73c.39 0 .96.21 1.26.47l1.58 1.36c.69.59 1.82.59 2.52 0l1.58-1.36c.3-.26.86-.47 1.26-.47h1.7c1.06 0 1.93-.87 1.93-1.93v-1.7c0-.39.21-.96.47-1.26l1.36-1.58c.58-.69.58-1.83-.01-2.52zm-5.4-.63-4.83 4.83a.75.75 0 0 1-1.06 0l-2.42-2.42c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l1.89 1.89 4.3-4.3c.29-.29.77-.29 1.06 0s.29.77 0 1.06z" />
                              </svg>
                            </span>
                          )}
                        </h3>
                        <div className="profile-card__ratting">
                          {[1, 2, 3, 4, 5].map(i => <i key={i} className={`las la-star${i <= Math.round(n.avgRating) ? "" : " text-muted"}`} style={{ color: i <= Math.round(n.avgRating) ? "#D8B532" : "#ccc" }}></i>)}
                          <span className="score ms-1">({n.avgRating})</span>
                        </div>
                      </div>
                      <span className="profile-card__bookmark">{n.services[0]}</span>
                    </div>
                    <div className="profile-card__body mt-2">
                      <div className="profile-card__skills">
                        <span className="skill-badge">{n.experience}+ Yrs Experience</span>
                        {n.languages.slice(0, 2).map(l => <span key={l} className="skill-badge">{l}</span>)}
                      </div>
                    </div>
                    <div className="profile-card__price">
                      <h3 className="profile-card__price-title">
                        <span className="rate me-1">${n.hourlyRate.toFixed(2)} CAD</span><span className="text">/ hr</span>
                      </h3>
                    </div>
                  </div>
                  <div className="profile-card__footer">
                    <div className="profile-card__btn">
                      <Link href={`/caregivers/${n.slug}`} className="btn btn-outline--base btn--md w-100">
                        <i className="fas fa-lock me-1"></i>View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link href="/caregivers" className="btn btn--base btn--md">View All Nannies</Link>
          </div>
        </div>
      </div>

      {/* ── How It Works ── */}
      <div className="how-work-section py-120" style={{ background: "#f7f5f0" }}>
        <div className="container">
          <div className="section-heading text-center mb-5">
            <span className="section-heading__subtitle">HOW IT WORKS</span>
            <h2 className="section-heading__title">It&apos;s Easy to Get Quality Care</h2>
          </div>
          <div className="row gy-4 justify-content-center">
            {[
              { num: "01", title: "Create an Account", desc: "Sign up in minutes and complete your personal or family care profile easily.", img: "/assets/images/frontend/how_work/69b7a30908c121773642505.png" },
              { num: "02", title: "Find a Nanny", desc: "Search and choose verified nannies based on your needs and location.", img: "/assets/images/frontend/how_work/69b7a302665f01773642498.png" },
              { num: "03", title: "Book & Schedule", desc: "Select date, time, and service type, then confirm your booking instantly.", img: "/assets/images/frontend/how_work/69b7a2fbc52331773642491.png" },
              { num: "04", title: "Receive Quality Care", desc: "Get professional and reliable care at your home with full peace of mind.", img: "/assets/images/frontend/how_work/69b7a2f06d8ca1773642480.png" },
            ].map((step) => (
              <div key={step.num} className="col-xl-3 col-sm-6">
                <div className="how-work-item text-center p-4" style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                  <div className="mb-3">
                    <img src={step.img} alt={step.title} style={{ width: "80px", height: "80px", objectFit: "contain" }} />
                  </div>
                  <span style={{ display: "inline-block", background: "#D8B532", color: "#1F1F1F", borderRadius: "50%", width: "36px", height: "36px", lineHeight: "36px", fontWeight: 700, fontSize: "14px", marginBottom: "12px" }}>{step.num}</span>
                  <h4 className="h5 mb-2">{step.title}</h4>
                  <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Why Choose Us ── */}
      <div className="choose-us-section py-120">
        <div className="container">
          <div className="row gy-4 justify-content-center align-items-center">
            <div className="col-lg-6 pe-lg-5">
              <div className="choose-content">
                <div className="section-heading style-left">
                  <span className="section-heading__subtitle">WHY CHOOSE US</span>
                  <h2 className="section-heading__title s-highlight" data-s-break="-2" data-s-length="2">Quality Care You Can Trust — Every Time</h2>
                </div>
                <ul className="content-list">
                  {["Experienced & Verified Nannies", "Comfortable Home-Based Care", "Compassion with Professional Support", "24/7 Support You Can Rely On"].map(item => (
                    <li key={item} className="content-list__item">
                      <span className="content-list__icon"><i className="fas fa-check"></i></span>{item}
                    </li>
                  ))}
                </ul>
                <div className="choose-content__btn">
                  <Link href="/about" className="btn btn--base btn--md">Read More</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="choose-thumb-wrapper">
                <div className="thumb-one">
                  <img src="/assets/images/frontend/why_choose/699bdd8f760361771822479.png" alt="Why Choose Nestia" />
                </div>
                <div className="thumb-two">
                  <img src="/assets/images/frontend/why_choose/699bdd8f99eb31771822479.jpg" alt="Nestia Nannies Care" />
                </div>
                <div className="exclusive-agents">
                  <h3 className="exclusive-agents__title h5">100+ Verified Nannies</h3>
                  <img src="/assets/images/frontend/rating/699abfdc22a731771749340.png" alt="Rating" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ Section ── */}
      <div className="faq-section my-120">
        <div className="container">
          <div className="row gy-5 flex-wrap-reverse">
            <div className="col-lg-6">
              <div className="faq-left">
                <div className="faq-thumb">
                  <img src="/assets/images/frontend/feature/699be847302c81771825223.jpg" alt="FAQ" />
                </div>
                <ul className="content-list mt-4">
                  {["Flexible hourly, daily, and live-in care options", "Fully background-checked and verified nannies", "Bilingual nannies for French-English families", "24/7 customer support"].map(f => (
                    <li key={f} className="content-list__item"><span className="content-list__icon"><i className="fas fa-check"></i></span>{f}</li>
                  ))}
                </ul>
                <div className="faq-content__bottom mt-4">
                  <a href="/contact" className="btn btn--base">Contact With Us <i className="fas fa-arrow-right ms-1"></i></a>
                  <a className="faq-btn-link ms-3" href="tel:+17805550100"><i className="fa-solid fa-phone-volume me-2"></i>+1 (780) 555-0100</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ps-lg-4">
              <div className="section-heading style-left mb-4">
                <span className="section-heading__subtitle">FAQ</span>
                <h2 className="section-heading__title s-highlight" data-s-break="-1" data-s-length="1">Quick Answers to Common Questions</h2>
              </div>
              <div className="accordion custom--accordion" id="homeFaqAccordion">
                {[
                  { q: "How are Nestia nannies vetted?", a: "Every nanny undergoes a thorough review by Marthe — Government ID verification, SIN number, Criminal Record Check, and a personal interview. Only approved nannies appear on the platform." },
                  { q: "How do I book a nanny?", a: "Browse our Find a Nanny page, filter by city, language, and availability, then create a parent account to view full profiles and book. Payment is processed upfront through our secure platform." },
                  { q: "What services do nannies provide?", a: "Newborn Care, Toddler Care, After-School & Homework Support, Meal Preparation, French Language Immersion, and Overnight & Weekend Care." },
                  { q: "What is the Nestia service fee?", a: "Nestia charges a transparent 15% service fee on all bookings. You'll see the full breakdown — subtotal, fee, and total — before confirming any booking." },
                  { q: "Can I book a bilingual French nanny?", a: "Absolutely. Use the language filter on the Find a Nanny page to search for French-English bilingual nannies. Many of our nannies are fully bilingual." },
                  { q: "How do I become a Nestia nanny?", a: "Click Become a Nanny and complete the 6-step application. Marthe reviews every application within 2 business days and notifies you by email once approved." },
                ].map((faq, i) => (
                  <div key={i} className="accordion-item">
                    <h2 className="accordion-header">
                      <button className={`accordion-button${i === 0 ? "" : " collapsed"}`} type="button"
                        data-bs-toggle="collapse" data-bs-target={`#homeFaq${i}`}
                        aria-expanded={i === 0 ? "true" : "false"} aria-controls={`homeFaq${i}`}>
                        {faq.q}
                      </button>
                    </h2>
                    <div id={`homeFaq${i}`} className={`accordion-collapse collapse${i === 0 ? " show" : ""}`} data-bs-parent="#homeFaqAccordion">
                      <div className="accordion-body">{faq.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Testimonials ── */}
      <section className="testimonials py-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="section-heading text-center mb-4">
              <span className="section-heading__subtitle">TESTIMONIALS</span>
              <h2 className="section-heading__title s-highlight" data-s-break="-1" data-s-length="1">Our Happy Customers</h2>
            </div>
            <div className="col-lg-12 px-0">
              <div className="testimonails testimonial-slider">
                {TESTIMONIALS.map((t) => (
                  <div key={t.id} className="testimonials-card">
                    <div className="testimonial-item">
                      <span className="testimonial-item__shape">
                        <img src="/assets/templates/basic/shapes/tsp.png" alt="" />
                      </span>
                      <div className="testimonial-item__rating">
                        {[1, 2, 3, 4, 5].map(i => <i key={i} className="las la-star" style={{ color: "#D8B532" }}></i>)}
                      </div>
                      <p className="testimonial-item__desc">{t.quote}</p>
                      <div className="testimonial-item__info">
                        <div className="testimonial-item__thumb">
                          <img src={t.image} alt={t.name} />
                        </div>
                        <div className="testimonial-item__details">
                          <h3 className="testimonial-item__name h5">{t.name}</h3>
                          <p className="mb-0 small text-muted">{t.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-section my-120">
        <div className="container">
          <div className="cta-wrapper">
            <div className="cta-wrapper__bg">
              <img src="/assets/images/frontend/cta/699ac19f3fc651771749791.jpg" alt="" />
            </div>
            <div className="row gy-4 align-items-center">
              <div className="col-lg-7">
                <div className="cta-wrapper__left">
                  <h2 className="cta-wrapper__title">Book a Reliable Nanny Now Easily</h2>
                  <p className="cta-wrapper__desc">Book a trusted nanny in minutes and ensure quality care for your loved one.</p>
                  <div className="cta-wrapper__btn">
                    <Link href="/caregivers" className="btn btn--white">Find a Nanny</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
