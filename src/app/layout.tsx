import type { Metadata } from "next";
import Script from "next/script";
import { AuthProvider } from "@/context/AuthContext";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nestia Nannies — Trusted In-Home Childcare in Edmonton",
  description: "Find verified bilingual nannies in Edmonton. Luxury in-home childcare — newborn care, toddler care, French immersion, and more. Every nanny personally approved by Nestia.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link href="/assets/global/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/global/css/all.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/global/css/line-awesome.min.css" />
        <link rel="stylesheet" href="/assets/templates/basic/css/main.css" />
        <link rel="stylesheet" href="/assets/templates/basic/css/slick.css" />
        <link rel="stylesheet" href="/assets/templates/basic/css/flatpickr.css" />
        <link rel="stylesheet" href="/assets/templates/basic/css/custom.css" />
      </head>
      <body>
        <AuthProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </AuthProvider>
        <Script src="/assets/global/js/jquery-3.7.1.min.js" strategy="afterInteractive" />
        <Script src="/assets/global/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/templates/basic/js/slick.min.js" strategy="afterInteractive" />
        <Script src="/assets/templates/basic/js/flatpickr.js" strategy="afterInteractive" />
        <Script src="/assets/templates/basic/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
