import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer-area">
      <div className="pt-60">
        <div className="container">
          <div className="top-footer">
            <div className="top-footer__left">
              <h2 className="top-footer__title h3">Subscribe to our newsletter</h2>
              <p className="top-footer__desc">Stay updated with our latest news and offers.</p>
            </div>
            <div className="top-footer__right">
              <form className="top-footer__mail subscribe-form">
                <input
                  type="email"
                  className="form--control"
                  name="email"
                  placeholder="Enter your email address"
                />
                <button type="submit" className="btn--white btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="row justify-content-center gy-5">
            <div className="col-xl-5 col-sm-6 col-xsm-6 pe-xl-5">
              <div className="footer-item">
                <div className="footer-item__logo">
                  <Link href="/">
                    <img src="/assets/images/logo_icon/logo.png" alt="Nanny Logo" />
                  </Link>
                </div>
                <h3 className="title h6">About Nestia Nannies</h3>
                <p className="footer-item__desc">
                  Nestia Nannies provides premium bilingual childcare for families in Edmonton and surrounding areas.
                </p>
                <div className="social-list-wrapper">
                  <h4 className="social-list-wrapper__title h6">Stay Connected With</h4>
                  <ul className="social-list">
                    <li className="social-list__item" title="Facebook">
                      <a href="#" className="social-list__link flex-center">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="social-list__item" title="Twitter">
                      <a href="#" className="social-list__link flex-center">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li className="social-list__item" title="Instagram">
                      <a href="#" className="social-list__link flex-center">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xl-2 col-sm-6 col-xsm-6">
              <div className="footer-item">
                <h5 className="footer-item__title h6">Quick Links</h5>
                <ul className="footer-menu">
                  <li className="footer-menu__item">
                    <Link href="/about" className="footer-menu__link">About Us</Link>
                  </li>
                  <li className="footer-menu__item">
                    <Link href="/contact" className="footer-menu__link">Contact Us</Link>
                  </li>
                  <li className="footer-menu__item">
                    <Link href="/caregivers" className="footer-menu__link">Find a Nanny</Link>
                  </li>
                  <li className="footer-menu__item">
                    <Link href="/become-a-nanny" className="footer-menu__link">Become a Nanny</Link>
                  </li>
                  <li className="footer-menu__item">
                    <Link href="/faq" className="footer-menu__link">FAQs</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-2 col-sm-6 col-xsm-6">
              <div className="footer-item">
                <h5 className="footer-item__title h6">Our Policies</h5>
                <ul className="footer-menu">
                  <li className="footer-menu__item">
                    <Link href="/privacy-policy" className="footer-menu__link">Privacy Policy</Link>
                  </li>
                  <li className="footer-menu__item">
                    <Link href="/terms-of-service" className="footer-menu__link">Terms of Service</Link>
                  </li>
                  <li className="footer-menu__item">
                    <Link href="/cookie-policy" className="footer-menu__link">Cookie Policy</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 col-xsm-6">
              <div className="footer-item">
                <h5 className="footer-item__title h6">Support</h5>
                <ul className="footer-contact-menu">
                  <li className="footer-contact-menu__item">
                    <p className="text">Address:</p>
                    <div className="footer-contact-menu__item-content">
                      <p>Edmonton, AB, Canada</p>
                    </div>
                  </li>
                  <li className="footer-contact-menu__item">
                    <p className="text">Email:</p>
                    <div className="footer-contact-menu__item-content">
                      <a className="text-white" href="mailto:hello@nestianannies.com">
                        hello@nestianannies.com
                      </a>
                    </div>
                  </li>
                  <li className="footer-contact-menu__item">
                    <p className="text">Phone:</p>
                    <div className="footer-contact-menu__item-content">
                      <a className="text-white" href="tel:+17805550100">
                        +1 780 555-0100
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bottom-footer">
            <div className="container px-0">
              <div className="flex-between gap-2">
                <p className="bottom-footer-text text-white">
                  &copy; Copyright &copy; {new Date().getFullYear()}. All rights reserved
                </p>
                <p className="bottom-footer__desc">Nestia Nannies Platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
