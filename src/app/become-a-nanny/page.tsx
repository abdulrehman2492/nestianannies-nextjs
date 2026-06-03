import Link from "next/link";
export default function BecomeANanny() {
  return (
    <>
      <section className="page-hero page-hero--nanny">
        <div className="page-hero__bg"></div>
        <div className="container page-hero__inner">
          <div className="page-hero__copy">
            <span className="page-hero__eyebrow">Join Nestia Nannies</span>
            <h1 className="page-hero__title">Become a Nanny</h1>
            <p className="page-hero__text">
              Build a flexible childcare career with approved families, clear onboarding, and profile support.
            </p>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb page-hero__breadcrumb">
                <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                <li className="breadcrumb-item active">Become a Nanny</li>
              </ol>
            </nav>
          </div>
          <div className="page-hero__visual" aria-hidden="true">
            <div className="hero-screen hero-screen--nanny">
              <div className="hero-screen__bar">
                <span></span><span></span><span></span>
              </div>
              <div className="hero-application-card">
                <img src="/assets/images/frontend/login/nanny_register.jpg" alt="" />
                <div>
                  <strong>Nanny Application</strong>
                  <span>Profile 80% complete</span>
                </div>
              </div>
              <div className="hero-progress">
                <span style={{ width: "80%" }}></span>
              </div>
              <div className="hero-check-list">
                <span><i className="las la-check"></i> Identity documents</span>
                <span><i className="las la-check"></i> Services and rates</span>
                <span><i className="las la-clock"></i> Final review</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="my-120">
        <div className="container">
          <div className="text-center mb-5">
            <span className="section-heading__subtitle">JOIN NESTIA NANNIES</span>
            <h2 className="section-heading__title mt-2">Start Your Journey as a Nestia Nanny</h2>
            <p className="section-desc mt-3">Join Edmonton&apos;s most trusted nanny network. Get matched with families, set your own rates, and build a rewarding childcare career.</p>
          </div>
          <div className="row gy-4 mb-5">
            {[
              {num:"01",title:"Create Your Account",desc:"Sign up with your email and basic info. Email verification required."},
              {num:"02",title:"Complete Your Profile",desc:"Add your address, languages, experience, and bio."},
              {num:"03",title:"Upload ID Documents",desc:"Government ID, SIN number, and Criminal Record Check (Alberta requirement)."},
              {num:"04",title:"Set Your Rates",desc:"Choose your hourly rate, services offered, and weekly availability."},
              {num:"05",title:"Submit for Review",desc:"Marthe personally reviews every application within 2 business days."},
              {num:"06",title:"Go Live & Get Booked",desc:"Once approved, your profile is visible to Edmonton families."},
            ].map(step=>(
              <div key={step.num} className="col-md-6 col-lg-4">
                <div className="card custom--card p-4 h-100">
                  <span style={{display:"inline-block",background:"#D8B532",color:"#1F1F1F",borderRadius:"50%",width:"44px",height:"44px",lineHeight:"44px",textAlign:"center",fontWeight:700,fontSize:"16px",marginBottom:"16px"}}>{step.num}</span>
                  <h5 className="mb-2">{step.title}</h5>
                  <p className="text-muted mb-0">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/nanny/register" className="btn btn--base btn--md me-3">Start Application →</Link>
            <Link href="/nanny/login" className="btn btn-outline--base btn--md">Already Applied? Sign In</Link>
          </div>
        </div>
      </div>
    </>
  );
}
