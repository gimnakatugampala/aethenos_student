import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { LoginWithTokenForItemCode } from '../../api';
import { CircularProgress, Container, Typography, Box } from '@mui/material';


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
            // router.replace(redirectUrl);
          } else {
            // Handle failed authentication (e.g., show an error or redirect to login page)
            router.replace('/login');  // Redirect to a login page or show an error
          }
        }
      };
  
      authenticateAndRedirect();
    }, [loginToken, id, sectionID, curriclumID, SyllabusType]);

  return (
    <Container
    component="main"
    maxWidth="xs"
    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <CircularProgress />
    </Box>
    <Typography variant="h5" component="h2" gutterBottom>
      Authenticating Excel Users
    </Typography>
    <Typography variant="body1">
      Please wait while we authenticate your credentials and redirect you to your course.
    </Typography>
  </Container>
  )
}

export default Index