// pages/about-us.js
export async function getServerSideProps() {
    return {
      redirect: {
        destination: 'https://support.aethenos.com/contact_us/',
        permanent: true,
      },
    };
  }
  
  export default function ContactUs() {
    return null; // This component will not render as the redirect happens
  }
  