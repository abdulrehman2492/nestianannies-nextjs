"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

type Role = "parent" | "nanny" | "admin";

const DASHBOARD_HREF: Record<Role, string> = {
  parent: "/parent/dashboard",
  nanny: "/nanny/dashboard",
  admin: "/admin",
};

const PROFILE_HREF: Record<Role, string> = {
  parent: "/parent/profile",
  nanny: "/nanny/profile",
  admin: "/admin/profile",
};

export default function Header() {
  const { user, loading, signOut } = useAuth();

  const role = user?.role;
  const dashboardHref = role ? DASHBOARD_HREF[role] : "/caregivers";
  const profileHref = role ? PROFILE_HREF[role] : "/login";
  const displayName =
    user?.firstName || user?.email?.split("@")[0] || "Account";

  const authActions = user ? (
    <>
      <Link href={dashboardHref} className="btn btn--base btn--md">
        Dashboard
      </Link>

      <div className="header-account-menu">
        <button
          className="header-account-menu__button"
          type="button"
          aria-label="Open account menu"
        >
          <span className="header-account-menu__avatar">
            <i className="las la-user"></i>
          </span>
          <span className="header-account-menu__name">{displayName}</span>
          <i className="las la-angle-down header-account-menu__chevron"></i>
        </button>

        <div className="header-account-menu__dropdown">
          <Link href={profileHref}>
            <i className="las la-user-edit"></i>
            Edit Profile
          </Link>

          <button type="button" onClick={signOut}>
            <i className="las la-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </div>
    </>
  ) : (
    <>
      <Link href="/login" className="btn btn-outline--base btn--md">
        Sign In
      </Link>

      <Link href="/caregivers" className="btn btn--base btn--md">
        Find a Nanny
      </Link>
    </>
  );

  return (
    <header className="header" id="header">
      <div className="container">
        <nav className="navbar navbar-expand-xl navbar-light">
          <Link className="navbar-brand logo" href="/">
            <img
              src="/images/logo-dark.png"
              alt="Nestia Nannies"
              style={{ maxWidth: "230px" }}
            />
          </Link>

          <button
            className="navbar-toggler header-button"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span id="hiddenNav">
              <i className="las la-bars"></i>
            </span>
          </button>

          <div
            className="offcanvas offcanvas-start"
            tabIndex={-1}
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              <Link className="navbar-brand logo" href="/">
                <img
                  src="/images/logo-dark.png"
                  alt="Nestia Nannies"
                  style={{ maxWidth: "180px" }}
                />
              </Link>

              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav w-100 justify-content-xl-center justify-content-end align-items-xl-center">
                <li className="nav-item">
                  <Link className="nav-link" href="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/about">
                    About Us
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/caregivers">
                    Find Nannies
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/become-a-nanny">
                    Become A Nanny
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/faq">
                    FAQ&apos;s
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/contact">
                    Contact
                  </Link>
                </li>

                <li className="nav-item d-xl-none d-block">
                  <div className="header-mobile-actions">
                    {!loading && authActions}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="header-right d-none d-xl-flex">
            {!loading && authActions}
          </div>
        </nav>
      </div>
    </header>
  );
}