// pages/about-us.js
export async function getServerSideProps() {
    return {
      redirect: {
        destination: 'https://support.aethenos.com/',
        permanent: true,
      },
    };
  }
  
  export default function Support() {
    return null; // This component will not render as the redirect happens
  }
  