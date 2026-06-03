"use client";
import { usePathname } from "next/navigation";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const DASHBOARD_PREFIXES = ["/admin", "/nanny/dashboard", "/nanny/onboarding", "/parent/dashboard", "/parent/bookings", "/parent/profile", "/nanny/bookings", "/nanny/earnings"];
const AUTH_PREFIXES = ["/login", "/register", "/nanny/login", "/nanny/register", "/admin/login"];

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDash = DASHBOARD_PREFIXES.some(p => pathname.startsWith(p));
  const isAuth = AUTH_PREFIXES.some(p => pathname === p || pathname.startsWith(p + "/"));

  if (isDash || isAuth) return <>{children}</>;

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
