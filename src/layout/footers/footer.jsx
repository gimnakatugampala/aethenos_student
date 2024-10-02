import Link from "next/link";
import FooterSocial from "./component/footer-social";

const mainfs = {
  fontSize: "calc(0.8rem + 0.6vw)",
};

const footer_contents = {
  exonLogo: "/images/footer/exon_icon1.png",
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
    
      footer_links: [
        { link: "about-us", title: "About us" },
        { link: "contact-us", title: "Contact us" },
        // { link: "support", title: "Help and Support" },
      ],
    },
    {
      col: "3",
      class: "quick-link-widget",
    
      footer_links: [
        { link: "terms", title: "Terms" },
        { link: "terms/privacy-policy", title: "Privacy Policy" },
      ],
    },
  ],
};

const { logoDark, logoLight, desc, add, call, email, widgets, exonLogo } =
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
      <div className={`footer-top pt-5 pb-5${style_2 ? "footer-top-2" : ""}`}>
        <div className="inner float-left">
          <div className="row g-5">
            {widgets.map((w, i) => (
              <div key={i} className={`col-lg-${w.col} col-sm-6 mx-5`}>
                <div className={`edu-footer-widget`}>
                  <h3 className="widget-title">{w.widget_title}</h3>
                  <div className="inner">
                    <ul className="footer-link link-hover">
                      {w.footer_links.map((l, i) => (
                        <li key={i}>
                          <Link href={`/${l.link}`} legacyBehavior>
                            <a style={{fontSize: "clamp(1rem, 0.5rem + 0.8vw, 1.2rem)"}}>{l.title}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-10 mx-5">
              <div >
                <img   width={200}
                        height={100} src={logoLight} alt="Corporate Logo" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-area">
        <div className="">
          <div className="row">
            <div className="col-10">
              <div className="inner mx-5 float-left">
                <p className="fs-20 fs-md-5 fs-lg-4">
                  © {new Date().getFullYear()} Aethenos Limited              
                </p>
              </div>
            </div>
            <div className="col-2">
              <div className="inner float-end" style={{ marginRight: "2.5rem" }}>
                <img
                  style={{ height: "30px", display: "flex", alignItems: "center" }}
                  src={exonLogo}
                  alt="Corporate Logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
