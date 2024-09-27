import { CheckAndSaveRefCode, LoginWithToken } from '../api';
import HomeMain from '../components/homes/home';
import SEO from '../components/seo';
import { Wrapper } from '../layout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';



export default function Home() {

    const router = useRouter();
    // const [refCode, setRefCode] = useState('');

    useEffect(() => {
        if (router.isReady) {
          const { ref , token } = router.query;

          // Check Referrel code
          if (ref) {
            CheckAndSaveRefCode(ref, router);
          }

          // Check the Login Token
          if(token){
            console.log(token)
            LoginWithToken(token)
          }


        }
      }, [router.isReady, router.query]);

    return (
        <Wrapper>
            <SEO pageTitle={'Home'} />
            <HomeMain />
        </Wrapper>
    )
}