"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  NANNIES,
  SERVICES_WITH_IMAGES,
  PARENT_DEMO_ACCOUNTS,
  haversineKm,
} from "@/lib/data";
import type { Nanny } from "@/lib/data";

const CITIES = [
  "Edmonton",
  "St. Albert",
  "Sherwood Park",
  "Spruce Grove",
  "Beaumont",
  "Fort Saskatchewan",
  "Leduc",
];

const RADIUS_KM = 5;

type StoredUser = {
  id: string;
  email: string;
  username?: string;
  role: "parent" | "nanny" | "admin";
  firstName?: string;
};

type NannyWithDistance = Nanny & {
  distanceKm?: number;
  canBook?: boolean;
};

export default function CaregiversPage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("");
  const [service, setService] = useState("");
  const [experience, setExperience] = useState<number>(0);

  const showAllNannies = city === "all";

  const [user] = useState<StoredUser | null>(() => {
    if (typeof window === "undefined") return null;

    const stored = localStorage.getItem("nestia_user");
    if (!stored) return null;

    try {
      return JSON.parse(stored) as StoredUser;
    } catch {
      return null;
    }
  });

  const [parentCoords] = useState<{ lat: number; lng: number } | null>(() => {
    if (typeof window === "undefined") return null;

    const stored = localStorage.getItem("nestia_user");
    if (!stored) return null;

    try {
      const storedUser = JSON.parse(stored) as StoredUser;

      if (storedUser.role !== "parent") return null;

      const acct = PARENT_DEMO_ACCOUNTS.find(
        (a) =>
          a.email === storedUser.email || a.username === storedUser.username
      );

      return acct ? { lat: acct.latitude, lng: acct.longitude } : null;
    } catch {
      return null;
    }
  });

  const [nameSuggestions, setNameSuggestions] = useState<string[]>([]);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showNameSug, setShowNameSug] = useState(false);
  const [showCitySug, setShowCitySug] = useState(false);

  const nameRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (nameRef.current && !nameRef.current.contains(e.target as Node)) {
        setShowNameSug(false);
      }

      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setShowCitySug(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNameInput = (val: string) => {
    setSearch(val);

    if (val.length < 1) {
      setShowNameSug(false);
      return;
    }

    const matches = NANNIES.filter(
      (n) =>
        n.firstName.toLowerCase().startsWith(val.toLowerCase()) ||
        n.fullName.toLowerCase().includes(val.toLowerCase())
    )
      .map((n) => `${n.firstName} ${n.lastName}`)
      .slice(0, 6);

    setNameSuggestions(matches);
    setShowNameSug(matches.length > 0);
  };

  const handleCityInput = (val: string) => {
    setCity(val);

    if (val.length < 1) {
      setShowCitySug(false);
      return;
    }

    const matches = CITIES.filter((c) =>
      c.toLowerCase().startsWith(val.toLowerCase())
    );

    const cityMatches = [
      ...new Set([
        ...matches,
        ...NANNIES.filter((n) =>
          n.city.toLowerCase().includes(val.toLowerCase())
        ).map((n) => n.city),
      ]),
    ].slice(0, 6);

    setCitySuggestions(cityMatches);
    setShowCitySug(cityMatches.length > 0);
  };

  const filtered: NannyWithDistance[] = NANNIES.filter((n) => {
    if (
      search &&
      !n.fullName.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }

    if (
      city &&
      city !== "all" &&
      !n.city.toLowerCase().includes(city.toLowerCase())
    ) {
      return false;
    }

    if (language && !n.languages.includes(language)) {
      return false;
    }

    if (
      service &&
      !n.services.some((s) =>
        s.toLowerCase().includes(service.toLowerCase())
      )
    ) {
      return false;
    }

    if (experience > 0 && n.experience < experience) {
      return false;
    }

    // Default parent logic:
    // If parent is logged in and did not click "Show All Nannies",
    // only show nannies within 5km radius.
    if (parentCoords && !city && !showAllNannies) {
      const dist = haversineKm(
        parentCoords.lat,
        parentCoords.lng,
        n.latitude,
        n.longitude
      );

      return dist <= RADIUS_KM;
    }

    return true;
  })
    .map((n) => {
      if (parentCoords) {
        const distanceKm =
          Math.round(
            haversineKm(
              parentCoords.lat,
              parentCoords.lng,
              n.latitude,
              n.longitude
            ) * 10
          ) / 10;

        return {
          ...n,
          distanceKm,
          canBook: distanceKm <= RADIUS_KM,
        };
      }

      return {
        ...n,
        distanceKm: undefined,
        canBook: true,
      };
    })
    .sort((a, b) => {
      if (a.distanceKm !== undefined && b.distanceKm !== undefined) {
        return a.distanceKm - b.distanceKm;
      }

      return b.avgRating - a.avgRating;
    });

  const clearFilters = () => {
    setSearch("");
    setCity("");
    setLanguage("");
    setService("");
    setExperience(0);
  };

  return (
    <>
      <section className="page-hero page-hero--caregivers">
        <div className="page-hero__bg"></div>

        <div className="container page-hero__inner">
          <div className="page-hero__copy">
            <span className="page-hero__eyebrow">
              Verified Edmonton Caregivers
            </span>

            <h1 className="page-hero__title">Find a Nanny</h1>

            <p className="page-hero__text">
              Browse trusted bilingual nannies, compare experience, and find
              care close to your family.
            </p>

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb page-hero__breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item active">Find a Nanny</li>
              </ol>
            </nav>
          </div>

          <div className="page-hero__visual" aria-hidden="true">
            <div className="hero-screen hero-screen--caregivers">
              <div className="hero-screen__bar">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="hero-search-row">
                <div>
                  <i className="las la-search"></i> Edmonton
                </div>
                <div>
                  <i className="las la-language"></i> French
                </div>
              </div>

              <div className="hero-profile-row">
                {NANNIES.slice(0, 3).map((n) => (
                  <div className="hero-profile-mini" key={n.id}>
                    <img src={n.image} alt="" />
                    <div>
                      <strong>{n.firstName}</strong>
                      <span>
                        {n.experience}+ yrs · ${n.hourlyRate}/hr
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="caregiver-list my-120">
        <div className="container">
          {user?.role === "parent" && parentCoords && !city && (
            <div
              className="alert mb-4 d-flex align-items-center justify-content-between flex-wrap gap-3"
              style={{
                background:
                  "linear-gradient(135deg,hsl(43deg 65% 52%/10%) 0%,hsl(43deg 65% 52%/5%) 100%)",
                border: "1px solid hsl(43deg 65% 52%/25%)",
                borderRadius: "12px",
                padding: "14px 20px",
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <span
                  style={{
                    background: "#D8B532",
                    color: "#1F1F1F",
                    borderRadius: "50%",
                    width: "38px",
                    height: "38px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i className="fas fa-map-marker-alt"></i>
                </span>

                <div>
                  <strong>
                    Showing nannies within {RADIUS_KM} km of your location
                  </strong>
                  <p className="mb-0 small text-muted">
                    Sorted by distance — closest nannies first
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCity("all")}
                className="btn btn--sm btn-outline--base"
              >
                <i className="fas fa-globe me-1"></i>
                Show All Nannies
              </button>
            </div>
          )}

          {user?.role === "parent" && parentCoords && showAllNannies && (
            <div
              className="alert mb-4 d-flex align-items-center justify-content-between flex-wrap gap-3"
              style={{
                background: "#fff7f1",
                border: "1px solid rgba(216,181,50,0.3)",
                borderRadius: "12px",
                padding: "14px 20px",
              }}
            >
              <div>
                <strong>Showing all nannies</strong>
                <p className="mb-0 small text-muted">
                  Nannies outside {RADIUS_KM} km are visible but cannot be
                  booked.
                </p>
              </div>

              <button
                onClick={clearFilters}
                className="btn btn--sm btn-outline--base"
              >
                Back to nearby nannies
              </button>
            </div>
          )}

          <div className="row">
            <div className="col-xl-3">
              <div
                className="left-sidebar"
                id="caregiverFilterForm"
                style={{ position: "sticky", top: "80px" }}
              >
                <div
                  className="sidebar-item"
                  ref={nameRef}
                  style={{ position: "relative" }}
                >
                  <input
                    type="search"
                    className="form--control"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => handleNameInput(e.target.value)}
                    onFocus={() =>
                      search && setShowNameSug(nameSuggestions.length > 0)
                    }
                  />

                  {showNameSug && (
                    <ul
                      style={{
                        position: "absolute",
                        top: "calc(100% + 4px)",
                        left: 0,
                        right: 0,
                        background: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                        listStyle: "none",
                        margin: 0,
                        padding: "4px 0",
                        zIndex: 999,
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      {nameSuggestions.map((s) => (
                        <li
                          key={s}
                          style={{
                            padding: "10px 14px",
                            cursor: "pointer",
                            fontSize: "14px",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#f5f5f5")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "")
                          }
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setSearch(s.split(" ")[0]);
                            setShowNameSug(false);
                          }}
                        >
                          <i
                            className="fas fa-user me-2"
                            style={{ color: "#D8B532", fontSize: "11px" }}
                          ></i>
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div
                  className="sidebar-item"
                  ref={cityRef}
                  style={{ position: "relative" }}
                >
                  <input
                    type="text"
                    className="form--control"
                    placeholder="City (e.g. Edmonton)"
                    value={city === "all" ? "" : city}
                    onChange={(e) => handleCityInput(e.target.value)}
                    onFocus={() =>
                      city &&
                      city !== "all" &&
                      setShowCitySug(citySuggestions.length > 0)
                    }
                  />

                  {showCitySug && (
                    <ul
                      style={{
                        position: "absolute",
                        top: "calc(100% + 4px)",
                        left: 0,
                        right: 0,
                        background: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                        listStyle: "none",
                        margin: 0,
                        padding: "4px 0",
                        zIndex: 999,
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      {citySuggestions.map((c) => {
                        const cnt = NANNIES.filter(
                          (n) => n.city === c
                        ).length;

                        return (
                          <li
                            key={c}
                            style={{
                              padding: "10px 14px",
                              cursor: "pointer",
                              fontSize: "14px",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = "#f5f5f5")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "")
                            }
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setCity(c);
                              setShowCitySug(false);
                            }}
                          >
                            <span>
                              <i
                                className="fas fa-map-marker-alt me-2"
                                style={{
                                  color: "#D8B532",
                                  fontSize: "11px",
                                }}
                              ></i>
                              {c}
                            </span>
                            <span style={{ fontSize: "11px", color: "#999" }}>
                              {cnt} nann{cnt === 1 ? "y" : "ies"}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                <div className="sidebar-item">
                  <h6 className="sidebar-item__title">Language</h6>
                  <select
                    className="form--control"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="">Any Language</option>
                    <option value="English">English</option>
                    <option value="French">French / Français</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Mandarin">Mandarin</option>
                  </select>
                </div>

                <div className="sidebar-item">
                  <h6 className="sidebar-item__title">Service Type</h6>
                  <select
                    className="form--control"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  >
                    <option value="">All Services</option>
                    {SERVICES_WITH_IMAGES.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sidebar-item">
                  <h4 className="sidebar-item__title h5">Experience</h4>
                  {[0, 1, 3, 5, 8, 10, 12].map((exp) => (
                    <div key={exp} className="form-check form--check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="experience"
                        checked={experience === exp}
                        onChange={() => setExperience(exp)}
                        id={`exp${exp}`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`exp${exp}`}
                      >
                        {exp === 0 ? "Any experience" : `${exp}+ Years`}
                      </label>
                    </div>
                  ))}
                </div>

                {(search ||
                  city ||
                  language ||
                  service ||
                  experience > 0) && (
                    <div className="sidebar-item">
                      <button
                        className="btn btn-outline--base btn--sm w-100"
                        onClick={clearFilters}
                      >
                        <i className="fas fa-times me-1"></i>
                        Clear Filters
                      </button>
                    </div>
                  )}
              </div>
            </div>

            <div className="col-xl-9">
              <div className="caregiver-results-wrap">
                <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                  <p className="mb-0 text-muted">
                    <strong>{filtered.length}</strong> nann
                    {filtered.length === 1 ? "y" : "ies"} found
                    {parentCoords && !city
                      ? ` within ${RADIUS_KM} km`
                      : city && city !== "all"
                        ? ` in ${city}`
                        : ""}
                  </p>

                  {!user && (
                    <small className="text-muted">
                      <i className="fas fa-lock me-1"></i>
                      <Link href="/login" className="text--base">
                        Sign in
                      </Link>{" "}
                      to book or view full profiles
                    </small>
                  )}
                </div>

                <div id="caregiverResults">
                  <div className="row g-4">
                    {filtered.length === 0 ? (
                      <div className="col-12">
                        <div className="text-center py-5">
                          <i
                            className="fas fa-search"
                            style={{
                              fontSize: "48px",
                              color: "#D8B532",
                              opacity: 0.5,
                            }}
                          ></i>

                          <h5 className="mt-3 mb-2">No nannies found</h5>

                          <p className="text-muted">
                            {parentCoords && !city
                              ? `No nannies available within ${RADIUS_KM} km of your location.`
                              : "Try adjusting your filters."}
                          </p>

                          {parentCoords && !city && (
                            <button
                              className="btn btn--base mt-2"
                              onClick={() => setCity("all")}
                            >
                              Show All Nannies
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      filtered.map((n) => (
                        <div key={n.id} className="col-xxl-4 col-md-6">
                          <div className="profile-card" style={{ height: "100%" }}>
                            <div
                              className="profile-card__thumb"
                              style={{ position: "relative", overflow: "hidden" }}
                            >
                              <img
                                src={n.image}
                                alt={n.firstName}
                                loading="lazy"
                                style={{
                                  width: "100%",
                                  aspectRatio: "565/450",
                                  objectFit: "cover",
                                  display: "block",
                                }}
                              />

                              <span
                                style={{
                                  position: "absolute",
                                  top: "10px",
                                  left: "10px",
                                  background: "rgba(0,0,0,0.6)",
                                  color: "#fff",
                                  borderRadius: "20px",
                                  padding: "3px 10px",
                                  fontSize: "11px",
                                  backdropFilter: "blur(4px)",
                                }}
                              >
                                <i
                                  className="fas fa-map-marker-alt me-1"
                                  style={{ color: "#D8B532" }}
                                ></i>
                                {n.distanceKm !== undefined
                                  ? `${n.distanceKm} km away`
                                  : n.city}
                              </span>

                              {parentCoords && !n.canBook && (
                                <span
                                  style={{
                                    position: "absolute",
                                    bottom: "10px",
                                    left: "10px",
                                    background: "#991b1b",
                                    color: "#fff",
                                    borderRadius: "20px",
                                    padding: "4px 10px",
                                    fontSize: "11px",
                                  }}
                                >
                                  Outside Service Area
                                </span>
                              )}

                              {n.verified && (
                                <span
                                  style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "10px",
                                    background: "#16a34a",
                                    color: "#fff",
                                    borderRadius: "20px",
                                    padding: "3px 10px",
                                    fontSize: "11px",
                                  }}
                                >
                                  <i className="fas fa-shield-alt me-1"></i>
                                  Verified
                                </span>
                              )}
                            </div>

                            <div className="profile-card__middle">
                              <div className="profile-card__header">
                                <div
                                  className="profile-card__info"
                                  style={{ flex: 1, minWidth: 0 }}
                                >
                                  <h3
                                    className="profile-card__name h4"
                                    style={{
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {n.firstName}

                                    {n.verified && (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        style={{
                                          width: "15px",
                                          height: "15px",
                                          display: "inline",
                                          marginLeft: "5px",
                                          verticalAlign: "middle",
                                          flexShrink: 0,
                                        }}
                                      >
                                        <path
                                          fill="#16a34a"
                                          d="m21.56 10.739-1.36-1.58c-.26-.3-.47-.86-.47-1.26v-1.7c0-1.06-.87-1.93-1.93-1.93h-1.7c-.39 0-.96-.21-1.26-.47l-1.58-1.36c-.69-.59-1.82-.59-2.52 0l-1.57 1.37c-.3.25-.87.46-1.26.46H6.18c-1.06 0-1.93.87-1.93 1.93v1.71c0 .39-.21.95-.46 1.25l-1.35 1.59c-.58.69-.58 1.81 0 2.5l1.35 1.59c.25.3.46.86.46 1.25v1.71c0 1.06.87 1.93 1.93 1.93h1.73c.39 0 .96.21 1.26.47l1.58 1.36c.69.59 1.82.59 2.52 0l1.58-1.36c.3-.26.86-.47 1.26-.47h1.7c1.06 0 1.93-.87 1.93-1.93v-1.7c0-.39.21-.96.47-1.26l1.36-1.58c.58-.69.58-1.83-.01-2.52zm-5.4-.63-4.83 4.83a.75.75 0 0 1-1.06 0l-2.42-2.42c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l1.89 1.89 4.3-4.3c.29-.29.77-.29 1.06 0s.29.77 0 1.06z"
                                        />
                                      </svg>
                                    )}
                                  </h3>

                                  <div
                                    className="profile-card__ratting"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "4px",
                                    }}
                                  >
                                    {[1, 2, 3, 4, 5].map((i) => (
                                      <i
                                        key={i}
                                        className="las la-star"
                                        style={{
                                          color:
                                            i <= Math.round(n.avgRating)
                                              ? "#D8B532"
                                              : "#e2e8f0",
                                          fontSize: "14px",
                                        }}
                                      ></i>
                                    ))}

                                    <span
                                      className="score"
                                      style={{
                                        fontSize: "13px",
                                        marginLeft: "2px",
                                      }}
                                    >
                                      ({n.avgRating})
                                    </span>
                                  </div>
                                </div>

                                <span
                                  className="profile-card__bookmark"
                                  style={{
                                    fontSize: "11px",
                                    maxWidth: "120px",
                                    textAlign: "right",
                                    lineHeight: "1.3",
                                  }}
                                >
                                  {n.services[0]}
                                </span>
                              </div>

                              <div className="profile-card__body mt-2">
                                <div
                                  className="profile-card__skills"
                                  style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "5px",
                                  }}
                                >
                                  <span className="skill-badge">
                                    {n.experience}+ Yrs
                                  </span>

                                  {n.languages.slice(0, 2).map((l) => (
                                    <span key={l} className="skill-badge">
                                      {l}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="profile-card__price">
                                <h3 className="profile-card__price-title">
                                  <span className="rate me-1">
                                    ${n.hourlyRate.toFixed(2)} CAD
                                  </span>
                                  <span className="text">/ hr</span>
                                </h3>
                              </div>
                            </div>

                            <div className="profile-card__footer">
                              <div className="profile-card__btn">
                                {user?.role === "parent" ? (
                                  n.canBook ? (
                                    <Link
                                      href={`/caregivers/${n.slug}`}
                                      className="btn btn-outline--base btn--md w-100"
                                    >
                                      View Details
                                    </Link>
                                  ) : (
                                    <button
                                      className="btn btn-outline--base btn--md w-100"
                                      disabled
                                      title={`This nanny is outside your ${RADIUS_KM} km service area`}
                                      style={{
                                        opacity: 0.55,
                                        cursor: "not-allowed",
                                      }}
                                    >
                                      Outside Service Area
                                    </button>
                                  )
                                ) : (
                                  <Link
                                    href="/login"
                                    className="btn btn-outline--base btn--md w-100"
                                  >
                                    <i className="fas fa-lock me-1"></i>
                                    Login to View Details
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
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