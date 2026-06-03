"use client";
import { useEffect, useState, Suspense } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { NANNIES } from "@/lib/data";
import type { Nanny } from "@/lib/data";

type ActionModal = { type: "reject"|"info"; nanny: Nanny } | null;

function AdminNanniesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [tab, setTab] = useState(searchParams.get("tab") || "all");
  const [modal, setModal] = useState<ActionModal>(null);
  const [reason, setReason] = useState("");
  const [nannies, setNannies] = useState(NANNIES);
  const [statuses, setStatuses] = useState<Record<number,string>>({});

  useEffect(() => {
    const stored = localStorage.getItem("nestia_user");
    if (!stored) { router.push("/admin/login"); return; }
    const u = JSON.parse(stored);
    if (u.role !== "admin") { router.push("/admin/login"); return; }
    setUser(u);
  }, [router]);

  const getStatus = (id: number) => statuses[id] || "approved";
  const filtered = tab === "pending" ? nannies.filter(n=>getStatus(n.id)==="pending")
    : tab === "rejected" ? nannies.filter(n=>getStatus(n.id)==="rejected")
    : nannies;

  const handleApprove = (id: number) => {
    setStatuses(s=>({...s,[id]:"approved"}));
    alert("Nanny approved! They are now live on the platform.");
  };

  const handleReject = () => {
    if (!modal || !reason.trim()) return;
    setStatuses(s=>({...s,[modal.nanny.id]:"rejected"}));
    setModal(null); setReason("");
    alert("Nanny application rejected. They have been notified.");
  };

  const handleRequestInfo = () => {
    if (!modal || !reason.trim()) return;
    setStatuses(s=>({...s,[modal.nanny.id]:"pending"}));
    setModal(null); setReason("");
    alert("Request for more information sent to the nanny.");
  };

  if (!user) return <div className="d-flex justify-content-center py-120"><div className="spinner-border text-warning"></div></div>;

  const statusBadge = (id: number) => {
    const s = getStatus(id);
    if (s==="approved") return <span className="badge bg-success">Approved</span>;
    if (s==="rejected") return <span className="badge bg-danger">Rejected</span>;
    return <span className="badge bg-warning text-dark">Pending</span>;
  };

  return (
    <div className="dashboard-section my-60">
      <div className="container-fluid px-4">
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-3">
          <div>
            <nav aria-label="breadcrumb"><ol className="breadcrumb mb-1">
              <li className="breadcrumb-item"><Link href="/admin">Dashboard</Link></li>
              <li className="breadcrumb-item active">Manage Nannies</li>
            </ol></nav>
            <h4 className="mb-0">Manage Nannies</h4>
          </div>
          <button onClick={()=>{localStorage.removeItem("nestia_user");router.push("/admin/login");}}
            className="btn btn-outline--base btn--sm"><i className="fas fa-sign-out-alt me-2"></i>Logout</button>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          {[["all","All Nannies"],["pending","Pending Review"],["approved","Approved"],["rejected","Rejected"]].map(([t,l])=>(
            <li key={t} className="nav-item">
              <button className={`nav-link${tab===t?" active":""}`} onClick={()=>setTab(t)}>{l}</button>
            </li>
          ))}
        </ul>

        <div className="card custom--card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table--light style--two mb-0">
                <thead>
                  <tr><th>Nanny</th><th>City</th><th>Service</th><th>Languages</th><th>Rate/hr</th><th>Rating</th><th>Status</th><th style={{minWidth:"200px"}}>Actions</th></tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={8} className="text-center py-4 text-muted">No nannies in this category</td></tr>
                  ) : filtered.map(n=>(
                    <tr key={n.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img src={n.image} alt={n.firstName} style={{width:"42px",height:"42px",borderRadius:"50%",objectFit:"cover"}} />
                          <div>
                            <strong>{n.firstName} {n.lastName}</strong>
                            <br/><small className="text-muted">{n.experience} yrs exp</small>
                          </div>
                        </div>
                      </td>
                      <td>{n.city}, AB</td>
                      <td><small>{n.services[0]}</small></td>
                      <td>{n.languages.map(l=><span key={l} className="skill-badge me-1">{l}</span>)}</td>
                      <td>${n.hourlyRate}/hr</td>
                      <td>⭐ {n.avgRating}</td>
                      <td>{statusBadge(n.id)}</td>
                      <td>
                        <div className="d-flex gap-1 flex-wrap">
                          <Link href={`/caregivers/${n.slug}`} target="_blank" className="btn btn--sm btn-outline--base" title="View Profile">
                            <i className="fas fa-eye"></i>
                          </Link>
                          {getStatus(n.id) !== "approved" && (
                            <button className="btn btn--sm" style={{background:"#198754",color:"#fff"}} onClick={()=>handleApprove(n.id)} title="Approve">
                              <i className="fas fa-check me-1"></i>Approve
                            </button>
                          )}
                          <button className="btn btn--sm btn--danger" onClick={()=>{setModal({type:"reject",nanny:n});setReason("");}} title="Reject">
                            <i className="fas fa-times me-1"></i>Reject
                          </button>
                          <button className="btn btn--sm" style={{background:"#f59e0b",color:"#1F1F1F"}} onClick={()=>{setModal({type:"info",nanny:n});setReason("");}} title="Request More Info">
                            <i className="fas fa-question me-1"></i>Info
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {modal?.type === "reject" && (
        <div className="modal fade show" style={{display:"block",background:"rgba(0,0,0,0.5)"}}>
          <div className="modal-dialog"><div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-danger"><i className="fas fa-times-circle me-2"></i>Reject Application — {modal.nanny.firstName}</h5>
              <button className="btn-close" onClick={()=>setModal(null)}></button>
            </div>
            <div className="modal-body">
              <p className="text-muted">This reason will be sent to the nanny by email.</p>
              <textarea className="form-control" rows={4} placeholder="e.g. Your Criminal Record Check was not legible. Please resubmit."
                value={reason} onChange={e=>setReason(e.target.value)}></textarea>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline--base btn--sm" onClick={()=>setModal(null)}>Cancel</button>
              <button className="btn btn--sm btn--danger" onClick={handleReject} disabled={!reason.trim()}>Reject &amp; Notify Nanny</button>
            </div>
          </div></div>
        </div>
      )}

      {/* Request More Info Modal */}
      {modal?.type === "info" && (
        <div className="modal fade show" style={{display:"block",background:"rgba(0,0,0,0.5)"}}>
          <div className="modal-dialog"><div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" style={{color:"#D8B532"}}><i className="fas fa-question-circle me-2"></i>Request More Info — {modal.nanny.firstName}</h5>
              <button className="btn-close" onClick={()=>setModal(null)}></button>
            </div>
            <div className="modal-body">
              <p className="text-muted">Tell the nanny what additional documents or info you need.</p>
              <textarea className="form-control" rows={4} placeholder="e.g. Please resubmit your Criminal Record Check — the uploaded file was unreadable."
                value={reason} onChange={e=>setReason(e.target.value)}></textarea>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline--base btn--sm" onClick={()=>setModal(null)}>Cancel</button>
              <button className="btn btn--sm" style={{background:"#f59e0b",color:"#1F1F1F"}} onClick={handleRequestInfo} disabled={!reason.trim()}>Send Request</button>
            </div>
          </div></div>
        </div>
      )}
    </div>
  );
}

export default function AdminNannies() {
  return (
    <DashboardLayout role="admin">
      <Suspense fallback={<div style={{padding:"40px",textAlign:"center",color:"#aaa"}}>Loading...</div>}>
        <AdminNanniesContent />
      </Suspense>
    </DashboardLayout>
  );
}
