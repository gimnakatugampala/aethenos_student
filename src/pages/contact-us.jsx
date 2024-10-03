// pages/contact-us.js

import SEO from "../components/seo";
import { Footer, Header, Wrapper } from "../layout";

export default function ContactUs() {
  return (
    <Wrapper>
      <SEO pageTitle={'Contact Us'} />
      <div className='sticky-header'>
        <div id="main-wrapper" className="main-wrapper">
          <Header />
        </div>
      </div>

      {/* Embed WordPress Contact Us page using iframe */}
      <div style={{ height: '200vh', width: '100%', overflow: 'hidden' }}>
        <iframe
          src="https://support.aethenos.com/contact_us/"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          title="Contact Us Page"
        ></iframe>
      </div>

      <Footer />
    </Wrapper>
  );
}
