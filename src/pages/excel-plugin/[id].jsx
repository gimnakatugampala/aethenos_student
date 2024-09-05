import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { LoginWithTokenForItemCode } from '../../api';

const Index = () => {

    const router = useRouter();
    const { id, sectionID, curriclumID, SyllabusType, loginToken } = router.query;
  
    useEffect(() => {
      const authenticateAndRedirect = async () => {
        if (loginToken) {
          const isAuthenticated = await LoginWithTokenForItemCode(loginToken);
  
          if (isAuthenticated) {
            // Build the redirect URL with the required query parameters
            const redirectUrl = `/my-courses/${id}?sectionID=${sectionID}&curriclumID=${curriclumID}&SyllabusType=${SyllabusType}`;

            window.location.href = redirectUrl
  
            // Perform the redirection
            router.replace(redirectUrl);
          } else {
            // Handle failed authentication (e.g., show an error or redirect to login page)
            router.replace('/login');  // Redirect to a login page or show an error
          }
        }
      };
  
      authenticateAndRedirect();
    }, [loginToken, id, sectionID, curriclumID, SyllabusType]);

  return (
    <div>
    {/* Loading spinner or any indication that the authentication is in progress */}
    <p>Authenticating...</p>
  </div>
  )
}

export default Index