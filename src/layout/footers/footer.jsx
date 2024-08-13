import Link from "next/link";
import FooterSocial from "./component/footer-social";

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
      widget_title: "About Aethenos",
      footer_links: [
        { link: "about-1", title: "About Us" },
        { link: "course-style-1", title: "Contact Us" },
        { link: "team-1", title: "Help And Support" },
      ],
    },
    {
      col: "3",
      class: "quick-link-widget",
      widget_title: "Terms & Conditions",
      footer_links: [
        { link: "contact-us", title: "Terms" },
        { link: "gallery-grid", title: "Privacy Policy" },
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
      <div className={`footer-top ${style_2 ? "footer-top-2" : ""}`}>
        <div className="container">
          <div className="row g-5">
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

            <div className="col-md-12">
              <div className="col-md-3 mx-5">
                <img className=" w-75" src={logoLight} alt="Corporate Logo" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-area">
        <div className="">
          <div className="row">
            <div className="col-6">
              <div className="inner mx-5 float-left">
                <p>
                  © {new Date().getFullYear()} Aethenos Limited. All Rights
                  Reserved
                </p>
              </div>
            </div>
            <div className="col-6">
              <div className="inner float-end" style={{ marginRight: "4rem" }}>
                <img
                  style={{ height: "40px", position: "absolute" }}
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
