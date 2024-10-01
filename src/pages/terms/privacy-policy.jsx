import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Header, Wrapper } from '../../layout';
import SEO from '../../components/seo';

const PrivacyPolicyPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Function to listen for messages from the iframe
    const handleIframeMessage = (event) => {
      console.log('Received message:', event.data);

      // Check if the message is from WordPress and contains the correct data
      if (event.data && event.data.type === 'navigate-to') {
        const pathMapping = {
          '/wordpress-terms': '/terms',
          '/?author=1': '/privacy-policy',
        };

        // Map the WordPress path to the corresponding Next.js path
        const nextjsPath = pathMapping[event.data.path] || event.data.path;
        
        console.log('Navigating to:', nextjsPath); // Log the path for debugging
        // Update Next.js route without reloading the page
        router.push(nextjsPath);
      }
    };

    // Listen for postMessage from iframe
    window.addEventListener('message', handleIframeMessage);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('message', handleIframeMessage);
    };
  }, [router]);

  return (
    <Wrapper>
      <SEO pageTitle={'Privacy Policy'} />
      <div className='sticky-header'>
        <div id="main-wrapper" className="main-wrapper">
          <Header />
        </div>
      </div>

      <div style={{ height:'300vh'}}>
        <iframe
          src="https://terms.aethenos.com/privacy-policy/" // Replace with your WordPress page URL
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          title="Refund Policy"
        ></iframe>
      </div>
    </Wrapper>
  );
};

export default PrivacyPolicyPage;
