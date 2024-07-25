import { CheckAndSaveRefCode } from '../api';
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
          const { ref } = router.query;
          if (ref) {
            CheckAndSaveRefCode(ref, router);
          }
        }
      }, [router.isReady, router.query]);

    return (
        <Wrapper>
            <SEO pageTitle={'Home Main'} />
            <HomeMain />
        </Wrapper>
    )
}