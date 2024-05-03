import Link from "next/link";
import FooterSocial from "./component/footer-social";

const footer_contents = {
  logoLight: "/assets/images/logo/logo.png",
  logoDark: "/assets/images/logo/logo.png",
  desc: "Lorem ipsum dolor amet consecto adi pisicing elit sed eiusm tempor incidid unt labore dolore.",
  add: "70-80 Upper St Norwich NR2",
  call: "+01 123 5641 231",
  email: "info@Aethenos.com",
  widgets: [
    {
      col: "3",
      class: "explore-widget",
      widget_title: "About Aethenos",
      footer_links: [
        { link: "about-1", title: "About Us" },
        { link: "course-style-1", title: "Contact Us" },
        { link: "team-1", title: "Help And Support" }
      ],
    },
    {
      col: "3",
      class: "quick-link-widget",
      widget_title: "Terms & Conditions",
      footer_links: [
        { link: "contact-us", title: "Terms" },
        { link: "gallery-grid", title: "Privacy Policy" }
      ],
    },
  ],
};

const { logoDark, logoLight, desc, add, call, email, widgets } =
  footer_contents;

const Footer = ({ style_2, dark_bg, home_4 }) => {
  return (
    <footer
      className={`edu-footer ${
        style_2
          ? style_2
          : dark_bg
          ? "footer-dark bg-image footer-style-3"
          : "footer-lighten bg-image footer-style-1"
      }`}
    >
      <div className={`footer-top ${style_2 ? "footer-top-2" : ""}`}>
        <div className="container">
          <div className="row g-5">

            <div className="col-lg-3 col-md-6">
              <div className="edu-footer-widget">
                {/* <p className="description">{desc}</p> */}
                <div className="widget-information">
                  <ul className="information-list">
                    <li>
                      <span>ADDRESS</span><br />
                      Aethenos Limited, 
                      4th Floor, Silverstream House, 
                      45 Fitzroy Street, 
                      London W1T 6EB,
                      UNITED KINGDOM
                    </li><br />
                    <li>
                      <span>CALL</span>
                      <a href="tel:+447943231543">+44 7943 231543</a>
                    </li>
                    <li>
                      <span>EMAIL</span>
                      <a
                        href="mailto:info@aethenos.com"
                        rel="noreferrer"
                        target="_blank"
                      >
                        info@aethenos.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {widgets.map((w, i) => (
              <div key={i} className={`col-lg-${w.col} col-sm-6`}>
                <div className={`edu-footer-widget ${w.class}`}>
                  <h4 className="widget-title">{w.widget_title}</h4>
                  <div className="inner">
                    <ul className="footer-link link-hover">
                      {w.footer_links.map((l, i) => (
                        <li key={i}>
                          <Link href={`/${l.link}`} legacyBehavior>
                            <a>{l.title}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            <div className="col-lg-3 col-md-6 m-0">
              <div className="edu-footer-widget">
                {/* <h4 className="widget-title">Terms & Conditions</h4> */}
                <div className="inner">
                <img
                        className="logo-light"
                        src={logoLight}
                        alt="Corporate Logo"
                      />
                  <p className="description">
                    Aethenos is an Online Learning Course Marketplace that Allows Students to Learn On Any Subject Anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-area">
        <div className="container">
          {/* <div className="logo">
            <Link href={"/"} legacyBehavior>
              <a>
                {!dark_bg && (
                  <>
                    {!style_2 && (
                      <img
                        className="logo-light"
                        src={logoLight}
                        alt="Corporate Logo"
                      />
                    )}
                  </>
                )}
              </a>
            </Link>
          </div> */}
          <div className="row">
            <div className="col-lg-12">
              <div className="inner text-center">
                <p>
                  Copyright {new Date().getFullYear()}{" "}
                  <a
                    href="https://aethenos.com"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Aethenos
                  </a>{" "}
                  Designed By{" "}
                
                  . All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
