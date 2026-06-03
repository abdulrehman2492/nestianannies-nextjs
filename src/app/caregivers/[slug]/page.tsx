"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { NANNIES, getNannyBySlug } from "@/lib/data";

const COMMISSION = 15;

export default function NannyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const nanny = getNannyBySlug(slug);
  const [user, setUser] = useState<any>(null);
  const [selectedHours, setSelectedHours] = useState(2);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingStep, setBookingStep] = useState<"idle"|"review"|"success">("idle");

  useEffect(() => {
    const stored = localStorage.getItem("nestia_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  if (!nanny) return (
    <div className="text-center py-120">
      <h4>Nanny not found</h4>
      <Link href="/caregivers" className="btn btn--base mt-3">Back to Find a Nanny</Link>
    </div>
  );

  const subtotal = nanny.hourlyRate * selectedHours;
  const commission = Math.round(subtotal * COMMISSION / 100 * 100) / 100;
  const total = subtotal + commission;

  const handleBook = () => {
    if (!user) { router.push("/login"); return; }
    if (user.role !== "parent") { alert("Only parents can book nannies."); return; }
    setBookingStep("review");
  };

  const confirmBooking = () => {
    setBookingStep("success");
  };

  return (
    <div className="caregiver-details-section my-120">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-4"><ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/">Home</Link></li>
          <li className="breadcrumb-item"><Link href="/caregivers">Find a Nanny</Link></li>
          <li className="breadcrumb-item active">{nanny.firstName}</li>
        </ol></nav>

        {bookingStep === "success" ? (
          <div className="card custom--card text-center p-5" style={{maxWidth:"600px",margin:"0 auto"}}>
            <div style={{width:"80px",height:"80px",borderRadius:"50%",background:"#D8B532",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}>
              <i className="fas fa-check" style={{fontSize:"36px",color:"#1F1F1F"}}></i>
            </div>
            <h3 className="mb-2">Booking Submitted!</h3>
            <p className="text-muted mb-4">Your booking request has been sent to {nanny.firstName}. Please complete payment to confirm.</p>
            <div className="p-4 rounded mb-4" style={{background:"#f8f9fa",textAlign:"left"}}>
              <div className="d-flex justify-content-between mb-2"><span>Subtotal ({selectedHours} hrs × ${nanny.hourlyRate}/hr)</span><strong>${subtotal.toFixed(2)} CAD</strong></div>
              <div className="d-flex justify-content-between mb-2"><span>Nestia Service Fee ({COMMISSION}%)</span><strong>${commission.toFixed(2)} CAD</strong></div>
              <hr/>
              <div className="d-flex justify-content-between"><strong>Total Charged</strong><strong style={{color:"#D8B532",fontSize:"18px"}}>${total.toFixed(2)} CAD</strong></div>
              <div className="d-flex justify-content-between mt-1"><small className="text-muted">Nanny earns</small><small className="text-muted">${subtotal.toFixed(2)} CAD</small></div>
            </div>
            <Link href="/parent/dashboard" className="btn btn--base w-100 mb-2">View in Dashboard</Link>
            <Link href="/caregivers" className="btn btn-outline--base w-100">Find More Nannies</Link>
          </div>
        ) : (
          <div className="caregiver-details-inner">
            <div className="row gy-4">
              {/* Photo + basic info */}
              <div className="col-lg-5">
                <div className="caregiver__basic">
                  <div className="caregiver__thumb" style={{position:"relative",borderRadius:"12px",overflow:"hidden"}}>
                    <img src={nanny.image} alt={nanny.firstName} style={{width:"100%",display:"block"}} />
                    {nanny.verified && (
                      <div style={{position:"absolute",bottom:"12px",left:"12px",background:"#16a34a",color:"#fff",borderRadius:"20px",padding:"4px 12px",fontSize:"12px",fontWeight:600}}>
                        <i className="fas fa-shield-alt me-1"></i>Nestia Verified
                      </div>
                    )}
                    <div style={{position:"absolute",top:"12px",right:"12px",background:"rgba(0,0,0,0.6)",color:"#fff",borderRadius:"20px",padding:"4px 12px",fontSize:"12px"}}>
                      <i className="fas fa-map-marker-alt me-1" style={{color:"#D8B532"}}></i>{nanny.city}, AB
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="caregiver__info">
                  <div className="d-flex align-items-start justify-content-between flex-wrap gap-3 mb-3">
                    <div>
                      <h2 className="mb-1">{nanny.firstName}
                        {nanny.verified && <span className="badge bg-success ms-2" style={{fontSize:"12px",verticalAlign:"middle"}}><i className="fas fa-check-circle me-1"></i>Verified</span>}
                      </h2>
                      <div className="d-flex align-items-center gap-2">
                        {[1,2,3,4,5].map(i=><i key={i} className="las la-star" style={{color:i<=Math.round(nanny.avgRating)?"#D8B532":"#ccc",fontSize:"16px"}}></i>)}
                        <span className="text-muted">({nanny.avgRating}) · {nanny.reviewCount} reviews</span>
                      </div>
                    </div>
                    <div className="text-end">
                      <div style={{fontSize:"28px",fontWeight:700,color:"#D8B532"}}>${nanny.hourlyRate} CAD</div>
                      <div className="text-muted small">per hour</div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="caregiver__informartion mb-4">
                    <div className="caregiver__item"><span className="caregiver__label">Service:</span><span className="caregiver__value">{nanny.services[0]}</span></div>
                    <div className="caregiver__item"><span className="caregiver__label">Experience:</span><span className="caregiver__value">{nanny.experience}+ years</span></div>
                    <div className="caregiver__item"><span className="caregiver__label">Location:</span><span className="caregiver__value">{nanny.city}, {nanny.state}</span></div>
                    <div className="caregiver__item"><span className="caregiver__label">Availability:</span><span className="caregiver__value">{nanny.availability}</span></div>
                    <div className="caregiver__item">
                      <span className="caregiver__label">Languages:</span>
                      <span className="caregiver__value">{nanny.languages.map(l=><span key={l} className="skill-badge me-1">{l}</span>)}</span>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mb-4">
                    <h6 className="mb-2">Services Offered</h6>
                    <div>{nanny.services.map(s=><span key={s} className="skill-badge me-2 mb-2">{s}</span>)}</div>
                  </div>

                  {/* Certifications */}
                  <div className="mb-4">
                    <h6 className="mb-2">Certifications</h6>
                    <div>{nanny.badges.map(b=><span key={b} className="skill-badge me-2 mb-2"><i className="fas fa-certificate me-1" style={{color:"#D8B532"}}></i>{b}</span>)}</div>
                  </div>

                  {/* Booking form */}
                  {bookingStep === "idle" ? (
                    <div className="p-4 rounded" style={{background:"#f8f9fa",border:"1px solid #e2e8f0"}}>
                      <h5 className="mb-3">Book {nanny.firstName}</h5>
                      <div className="row g-3 mb-3">
                        <div className="col-sm-6">
                          <label className="form--label">Date</label>
                          <input type="date" className="form-control form--control" value={bookingDate}
                            onChange={e=>setBookingDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
                        </div>
                        <div className="col-sm-6">
                          <label className="form--label">Hours</label>
                          <select className="form-select form--control" value={selectedHours} onChange={e=>setSelectedHours(Number(e.target.value))}>
                            {[1,2,3,4,5,6,7,8].map(h=><option key={h} value={h}>{h} hour{h>1?"s":""}</option>)}
                          </select>
                        </div>
                      </div>
                      {/* Commission preview */}
                      <div className="p-3 rounded mb-3" style={{background:"#fff",border:"1px solid #D8B532"}}>
                        <div className="d-flex justify-content-between mb-1 small"><span>Subtotal ({selectedHours} hrs × ${nanny.hourlyRate})</span><strong>${subtotal.toFixed(2)} CAD</strong></div>
                        <div className="d-flex justify-content-between mb-1 small"><span>Nestia Service Fee ({COMMISSION}%)</span><strong>${commission.toFixed(2)} CAD</strong></div>
                        <hr className="my-2"/>
                        <div className="d-flex justify-content-between"><strong>Total</strong><strong style={{color:"#D8B532"}}>${total.toFixed(2)} CAD</strong></div>
                      </div>
                      {user?.role === "parent" ? (
                        <button className="btn btn--base w-100" onClick={handleBook} disabled={!bookingDate}>
                          <i className="fas fa-calendar-check me-2"></i>Confirm Booking — ${total.toFixed(2)} CAD
                        </button>
                      ) : (
                        <Link href="/login" className="btn btn--base w-100">
                          <i className="fas fa-lock me-2"></i>Login to Book this Nanny
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 rounded" style={{background:"#f8f9fa",border:"1px solid #e2e8f0"}}>
                      <h5 className="mb-3">Review Your Booking</h5>
                      <div className="d-flex justify-content-between mb-2"><span>Nanny</span><strong>{nanny.firstName}</strong></div>
                      <div className="d-flex justify-content-between mb-2"><span>Date</span><strong>{bookingDate}</strong></div>
                      <div className="d-flex justify-content-between mb-2"><span>Duration</span><strong>{selectedHours} hours</strong></div>
                      <hr/>
                      <div className="d-flex justify-content-between mb-1"><span>Subtotal</span><strong>${subtotal.toFixed(2)} CAD</strong></div>
                      <div className="d-flex justify-content-between mb-1"><span>Service Fee (15%)</span><strong>${commission.toFixed(2)} CAD</strong></div>
                      <div className="d-flex justify-content-between mb-3"><strong>Total Charged</strong><strong style={{color:"#D8B532",fontSize:"18px"}}>${total.toFixed(2)} CAD</strong></div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-outline--base flex-fill" onClick={()=>setBookingStep("idle")}>← Back</button>
                        <button className="btn btn--base flex-fill" onClick={confirmBooking}>
                          <i className="fas fa-check me-2"></i>Pay ${total.toFixed(2)} CAD
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="row mt-4">
              <div className="col-12">
                <div className="card custom--card p-4">
                  <h5 className="mb-3">About {nanny.firstName}</h5>
                  <p className="mb-0">{nanny.about}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
