"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const STEPS = [
  { num: 1, title: "Create Account", desc: "Email & password" },
  { num: 2, title: "Basic Info", desc: "Name, phone, address" },
  { num: 3, title: "ID & Verification", desc: "Documents upload" },
  { num: 4, title: "Profile Details", desc: "Photo, bio, languages" },
  { num: 5, title: "Rates & Services", desc: "Hourly rate, schedule" },
  { num: 6, title: "Submit for Review", desc: "Send to Marthe" },
];

const SERVICES_LIST = ["Newborn Care","Toddler Care","After-School & Homework Support","Meal Preparation","Language Immersion — French","Overnight & Weekend Care"];
const COURSES = ["First Aid","CPR","Level 1 Alberta","Early Childhood Education","Newborn Specialist"];
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

function NannyOnboardingContent() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName:"", lastName:"", phone:"", street:"", city:"Edmonton", province:"Alberta", postal:"", country:"Canada",
    govIdFront:"", govIdBack:"", sinNumber:"", criminalCheck:"",
    bio:"", languages:[] as string[], experience:1, age:"", gender:"",
    hourlyRate:25, services:[] as string[], courses:[] as string[], availability:"full-time", monthly:false,
    schedule:{} as Record<string,{start:string;end:string}>,
  });
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("nestia_user");
    if (!stored) { router.push("/nanny/login"); return; }
    const u = JSON.parse(stored);
    if (u.role !== "nanny") { router.push("/nanny/login"); return; }
    setUser(u);
  }, [router]);

  const progress = Math.round((step / 6) * 100);

  const validateStep = (): boolean => {
    const errs: string[] = [];
    if (step === 2) {
      if (!form.firstName) errs.push("First name required");
      if (!form.lastName) errs.push("Last name required");
      if (!form.phone) errs.push("Phone required");
      if (!form.street) errs.push("Street address required");
    }
    if (step === 3) {
      if (!form.sinNumber) errs.push("SIN number required");
    }
    if (step === 4) {
      if (!form.bio) errs.push("Bio required");
      if (form.languages.length === 0) errs.push("Select at least one language");
    }
    if (step === 5) {
      if (form.hourlyRate < 15) errs.push("Hourly rate must be at least $15");
      if (form.services.length === 0) errs.push("Select at least one service");
    }
    setErrors(errs);
    return errs.length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      // Auto-save progress
      localStorage.setItem("nestia_nanny_profile", JSON.stringify({...form, _step: step + 1}));
      setStep(s => Math.min(6, s + 1));
    }
  };
  const prevStep = () => { setErrors([]); setStep(s => Math.max(1, s - 1)); };

  const handleSubmit = () => {
    if (!validateStep()) return;
    setSubmitted(true);
  };

  const toggleArr = (arr: string[], val: string, key: "languages"|"services"|"courses") => {
    const next = arr.includes(val) ? arr.filter(x=>x!==val) : [...arr,val];
    setForm(f=>({...f,[key]:next}));
  };

  if (!user) return <div className="d-flex justify-content-center py-120"><div className="spinner-border text-warning"></div></div>;

  if (submitted) return (
    <div className="dashboard-section my-60">
      <div className="container">
        <div className="card custom--card text-center p-5" style={{maxWidth:"600px",margin:"0 auto"}}>
          <div style={{width:"80px",height:"80px",borderRadius:"50%",background:"#D8B532",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px"}}>
            <i className="fas fa-paper-plane" style={{fontSize:"36px",color:"#1F1F1F"}}></i>
          </div>
          <h3 className="mb-2">Application Submitted!</h3>
          <p className="text-muted mb-4">Marthe will review your application within <strong>2 business days</strong>. You&apos;ll receive an email once approved.</p>
          <div className="p-4 rounded mb-4" style={{background:"#f8f9fa"}}>
            <div className="d-flex gap-2 align-items-center mb-2"><span className="badge bg-warning text-dark">Pending Review</span><span>Application submitted</span></div>
            <small className="text-muted">Draft → <strong>Pending Review</strong> → Approved → Live on platform</small>
          </div>
          <Link href="/nanny/dashboard" className="btn btn--base w-100">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-section my-60">
      <div className="container">
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
          <div>
            <nav aria-label="breadcrumb"><ol className="breadcrumb mb-1">
              <li className="breadcrumb-item"><Link href="/nanny/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item active">Complete Profile</li>
            </ol></nav>
            <h4 className="mb-0">Complete Your Profile</h4>
          </div>
          <Link href="/nanny/dashboard" className="btn btn-outline--base btn--sm"><i className="fas fa-arrow-left me-2"></i>Back to Dashboard</Link>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Step indicators */}
            <div className="card custom--card mb-4 p-4">
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <h5 className="mb-0">Step {step} of 6 — <strong>{STEPS[step-1].title}</strong></h5>
                <span className="badge px-3 py-2" style={{background:"#D8B532",color:"#1F1F1F",fontSize:"13px"}}>{progress}% Complete</span>
              </div>
              <div className="progress mb-2" style={{height:"8px",borderRadius:"4px"}}>
                <div className="progress-bar" style={{width:`${progress}%`,background:"#D8B532",transition:"width 0.3s"}}></div>
              </div>
              {/* Step dots */}
              <div className="d-flex justify-content-between mt-2">
                {STEPS.map(s=>(
                  <div key={s.num} className="text-center d-none d-sm-block" style={{flex:1}}>
                    <div style={{width:"28px",height:"28px",borderRadius:"50%",background:step>=s.num?"#D8B532":"#e2e8f0",color:step>=s.num?"#1F1F1F":"#aaa",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:700}}>
                      {step>s.num ? <i className="fas fa-check" style={{fontSize:"10px"}}></i> : s.num}
                    </div>
                    <div style={{fontSize:"10px",marginTop:"4px",color:step===s.num?"#D8B532":"#aaa",fontWeight:step===s.num?700:400}}>{s.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Errors */}
            {errors.length > 0 && (
              <div className="alert alert--danger mb-4 rounded">
                <ul className="mb-0 ps-3">{errors.map(e=><li key={e}>{e}</li>)}</ul>
              </div>
            )}

            {/* Step content */}
            <div className="card custom--card p-4">
              {/* Step 1 */}
              {step === 1 && (
                <div>
                  <h5 className="mb-1">Create Your Account</h5>
                  <p className="text-muted mb-4">You&apos;re already registered! Your account has been created and email verified.</p>
                  <div className="p-4 rounded" style={{background:"#f0fdf4",border:"1px solid #bbf7d0"}}>
                    <div className="d-flex gap-3 align-items-center">
                      <div style={{width:"48px",height:"48px",borderRadius:"50%",background:"#16a34a",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <i className="fas fa-check" style={{color:"#fff",fontSize:"20px"}}></i>
                      </div>
                      <div>
                        <div className="fw-bold">Account Created</div>
                        <div className="text-muted small">{user.email} — Email verified</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div>
                  <h5 className="mb-1">Basic Information</h5>
                  <p className="text-muted mb-4">Name, phone, and address details.</p>
                  <div className="row g-3">
                    <div className="col-sm-6 form-group">
                      <label className="form--label">First Name <span className="text-danger">*</span></label>
                      <input className="form-control form--control" value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} placeholder="First Name" />
                    </div>
                    <div className="col-sm-6 form-group">
                      <label className="form--label">Last Name <span className="text-danger">*</span></label>
                      <input className="form-control form--control" value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} placeholder="Last Name" />
                    </div>
                    <div className="col-sm-6 form-group">
                      <label className="form--label">Mobile Number <span className="text-danger">*</span></label>
                      <div className="input-group input--group">
                        <span className="input-group-text">+1</span>
                        <input className="form-control form--control" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="(780) 555-0100" />
                      </div>
                    </div>
                    <div className="col-sm-6 form-group">
                      <label className="form--label">Street Address <span className="text-danger">*</span></label>
                      <input className="form-control form--control" value={form.street} onChange={e=>setForm({...form,street:e.target.value})} placeholder="123 Main St" />
                    </div>
                    <div className="col-sm-4 form-group">
                      <label className="form--label">City</label>
                      <input className="form-control form--control" value={form.city} onChange={e=>setForm({...form,city:e.target.value})} />
                    </div>
                    <div className="col-sm-4 form-group">
                      <label className="form--label">Province</label>
                      <input className="form-control form--control" value={form.province} readOnly />
                    </div>
                    <div className="col-sm-4 form-group">
                      <label className="form--label">Postal Code</label>
                      <input className="form-control form--control" value={form.postal} onChange={e=>setForm({...form,postal:e.target.value})} placeholder="T5J 0N3" />
                    </div>
                    <div className="col-12 form-group">
                      <label className="form--label">Country</label>
                      <input className="form-control form--control" value="Canada" readOnly />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div>
                  <h5 className="mb-1">ID & Background Verification</h5>
                  <p className="text-muted mb-4">Required for working with children in Alberta. Documents reviewed manually by Marthe.</p>
                  <div className="row g-4">
                    <div className="col-sm-6 form-group">
                      <label className="form--label">Government-Issued Photo ID — Front <span className="text-danger">*</span></label>
                      <input type="file" className="form-control form--control" accept=".jpg,.jpeg,.png" onChange={e=>setForm({...form,govIdFront:e.target.files?.[0]?.name||""})} />
                      {form.govIdFront && <div className="mt-1 text-success small"><i className="fas fa-check me-1"></i>{form.govIdFront}</div>}
                      <small className="text-muted">Driver&apos;s license, Canadian ID, or passport</small>
                    </div>
                    <div className="col-sm-6 form-group">
                      <label className="form--label">Government-Issued Photo ID — Back <span className="text-danger">*</span></label>
                      <input type="file" className="form-control form--control" accept=".jpg,.jpeg,.png" onChange={e=>setForm({...form,govIdBack:e.target.files?.[0]?.name||""})} />
                      {form.govIdBack && <div className="mt-1 text-success small"><i className="fas fa-check me-1"></i>{form.govIdBack}</div>}
                    </div>
                    <div className="col-sm-6 form-group">
                      <label className="form--label">Social Insurance Number (SIN) <span className="text-danger">*</span></label>
                      <input className="form-control form--control" value={form.sinNumber} onChange={e=>setForm({...form,sinNumber:e.target.value})} placeholder="e.g. 123-456-789" maxLength={11} />
                      <small className="text-muted">Stored securely, only visible to admin.</small>
                    </div>
                    <div className="col-sm-6 form-group">
                      <label className="form--label">Criminal Record Check (PDF) <span className="text-danger">*</span></label>
                      <input type="file" className="form-control form--control" accept=".pdf" onChange={e=>setForm({...form,criminalCheck:e.target.files?.[0]?.name||""})} />
                      {form.criminalCheck && <div className="mt-1 text-success small"><i className="fas fa-check me-1"></i>{form.criminalCheck}</div>}
                      <small className="text-muted">Required for working with children in Alberta.</small>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div>
                  <h5 className="mb-1">Profile Details</h5>
                  <p className="text-muted mb-4">Photo, bio, and personal details.</p>
                  <div className="row g-3">
                    <div className="col-12 form-group">
                      <label className="form--label">Profile Photo</label>
                      <input type="file" className="form-control form--control" accept=".jpg,.jpeg,.png" />
                      <small className="text-muted">Recommended: 565×450px, clear face photo</small>
                    </div>
                    <div className="col-12 form-group">
                      <label className="form--label">About Yourself <span className="text-danger">*</span></label>
                      <textarea className="form-control form--control" rows={4} value={form.bio}
                        onChange={e=>setForm({...form,bio:e.target.value})}
                        placeholder="Tell families about your experience, approach to childcare, and what makes you a great nanny..."></textarea>
                    </div>
                    <div className="col-12 form-group">
                      <label className="form--label">Languages Spoken <span className="text-danger">*</span></label>
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {["English","French","Spanish","Mandarin","Punjabi","Arabic","Hindi","Other"].map(l=>(
                          <button key={l} type="button"
                            className={`btn btn--sm ${form.languages.includes(l)?"btn--base":"btn-outline--base"}`}
                            onClick={()=>toggleArr(form.languages,l,"languages")}>{l}</button>
                        ))}
                      </div>
                    </div>
                    <div className="col-sm-4 form-group">
                      <label className="form--label">Years of Experience</label>
                      <input type="number" className="form-control form--control" value={form.experience} min={0}
                        onChange={e=>setForm({...form,experience:Number(e.target.value)})} />
                    </div>
                    <div className="col-sm-4 form-group">
                      <label className="form--label">Age (optional)</label>
                      <input type="number" className="form-control form--control" value={form.age}
                        onChange={e=>setForm({...form,age:e.target.value})} placeholder="e.g. 28" />
                    </div>
                    <div className="col-sm-4 form-group">
                      <label className="form--label">Gender (optional)</label>
                      <select className="form-select form--control" value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})}>
                        <option value="">Select</option>
                        <option>Female</option><option>Male</option><option>Non-binary</option><option>Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5 */}
              {step === 5 && (
                <div>
                  <h5 className="mb-1">Rates, Services & Availability</h5>
                  <p className="text-muted mb-4">Set your hourly rate and what services you offer.</p>
                  <div className="row g-3">
                    <div className="col-sm-6 form-group">
                      <label className="form--label">Hourly Rate (CAD) <span className="text-danger">*</span></label>
                      <div className="input-group input--group">
                        <span className="input-group-text">$</span>
                        <input type="number" className="form-control form--control" value={form.hourlyRate} min={15}
                          onChange={e=>setForm({...form,hourlyRate:Number(e.target.value)})} />
                        <span className="input-group-text">/hr</span>
                      </div>
                      <small className="text-muted">Platform fee: 15% added to parent total. You keep 85%.</small>
                    </div>
                    <div className="col-sm-6 form-group">
                      <label className="form--label">Availability</label>
                      <select className="form-select form--control" value={form.availability} onChange={e=>setForm({...form,availability:e.target.value})}>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="flexible">Flexible</option>
                        <option value="weekends">Weekends only</option>
                      </select>
                    </div>
                    <div className="col-12 form-group">
                      <label className="form--label">Services Offered <span className="text-danger">*</span></label>
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {SERVICES_LIST.map(s=>(
                          <button key={s} type="button"
                            className={`btn btn--sm ${form.services.includes(s)?"btn--base":"btn-outline--base"}`}
                            onClick={()=>toggleArr(form.services,s,"services")}>{s}</button>
                        ))}
                      </div>
                    </div>
                    <div className="col-12 form-group">
                      <label className="form--label">Certified Courses</label>
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {COURSES.map(c=>(
                          <button key={c} type="button"
                            className={`btn btn--sm ${form.courses.includes(c)?"btn--base":"btn-outline--base"}`}
                            onClick={()=>toggleArr(form.courses,c,"courses")}>{c}</button>
                        ))}
                      </div>
                    </div>
                    <div className="col-12">
                      <label className="form--label">Weekly Schedule</label>
                      <div className="row g-2 mt-1">
                        {DAYS.map(day=>(
                          <div key={day} className="col-sm-6 col-lg-4">
                            <div className="p-3 rounded" style={{background:"#f8f9fa",border:"1px solid #e2e8f0"}}>
                              <div className="fw-semibold mb-2">{day}</div>
                              <div className="d-flex gap-2">
                                <input type="time" className="form-control form--control" style={{fontSize:"13px"}}
                                  value={form.schedule[day]?.start||""}
                                  onChange={e=>setForm({...form,schedule:{...form.schedule,[day]:{...form.schedule[day],start:e.target.value}}})} />
                                <input type="time" className="form-control form--control" style={{fontSize:"13px"}}
                                  value={form.schedule[day]?.end||""}
                                  onChange={e=>setForm({...form,schedule:{...form.schedule,[day]:{...form.schedule[day],end:e.target.value}}})} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6 */}
              {step === 6 && (
                <div>
                  <h5 className="mb-1">Submit for Admin Review</h5>
                  <p className="text-muted mb-4">Review your profile and submit for Marthe&apos;s approval.</p>
                  <div className="row g-3">
                    {[
                      {label:"Name",value:`${form.firstName} ${form.lastName}`},
                      {label:"City",value:form.city},
                      {label:"Phone",value:`+1 ${form.phone}`},
                      {label:"Languages",value:form.languages.join(", ")||"Not set"},
                      {label:"Experience",value:`${form.experience} years`},
                      {label:"Hourly Rate",value:`$${form.hourlyRate}/hr CAD`},
                      {label:"Services",value:form.services.join(", ")||"Not set"},
                      {label:"Gov ID Front",value:form.govIdFront||"Not uploaded"},
                      {label:"SIN Number",value:form.sinNumber?"••••••••••":"Not provided"},
                      {label:"Criminal Check",value:form.criminalCheck||"Not uploaded"},
                    ].map(item=>(
                      <div key={item.label} className="col-sm-6">
                        <div className="d-flex justify-content-between p-2 rounded" style={{background:"#f8f9fa"}}>
                          <span className="text-muted small">{item.label}</span>
                          <strong className="small text-truncate ms-2">{item.value}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="alert alert--info mt-4">
                    <strong>After submission:</strong> Marthe will review your application within 2 business days. You&apos;ll receive an email once approved. Your profile will be hidden from parents until then.
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="d-flex justify-content-between mt-4 pt-3" style={{borderTop:"1px solid #e2e8f0"}}>
                <button className="btn btn-outline--base" onClick={prevStep} disabled={step===1}>
                  <i className="fas fa-arrow-left me-2"></i>Previous
                </button>
                {step < 6 ? (
                  <button className="btn btn--base" onClick={nextStep}>
                    Next <i className="fas fa-arrow-right ms-2"></i>
                  </button>
                ) : (
                  <button className="btn btn--base" onClick={handleSubmit}>
                    <i className="las la-paper-plane me-2"></i>Submit Application
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NannyOnboarding() {
  return (
    <DashboardLayout role="nanny">
      <NannyOnboardingContent />
    </DashboardLayout>
  );
}
