// pages/about-us.js
export async function getServerSideProps() {
    return {
      redirect: {
        destination: 'https://support.aethenos.com/about-us/',
        permanent: true,
      },
    };
  }
  
  export default function AboutUs() {
    return null; // This component will not render as the redirect happens
  }
  