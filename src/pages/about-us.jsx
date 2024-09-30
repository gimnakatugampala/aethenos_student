// pages/about-us.js

import SEO from "../components/seo";
import { Footer, Header, Wrapper } from "../layout";


export default function AboutUs() {
  return (
    <Wrapper>
    <SEO pageTitle={'About Us'} />
    <div className='sticky-header'>
      <div id="main-wrapper" className="main-wrapper">
        <Header />
      </div>
    </div>


      {/* Embed WordPress page using iframe */}
      <div style={{ height: '515vh', width: '100%', overflow: 'hidden' }}>
      <iframe
        src="https://support.aethenos.com/about-us/"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          overflow: 'hidden'
        }}
        title="About Us Page"
      ></iframe>
</div>

<Footer />

    </Wrapper>
  );
}
