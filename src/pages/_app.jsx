import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import sal from 'sal.js';
import { ThemeProvider } from 'next-themes';
if (typeof window !== 'undefined') {
  require( 'bootstrap/dist/js/bootstrap' );
}
import '../styles/index.scss';
import { store } from '../redux/store';
import Theme from '../components/common/theme';
import { MouseMoveProvider } from '../contexts/mouse-move-context';
import SEO from '../components/seo';
import { getCurrencyExchangeRate, getUserCountry, USERTOKEN } from '../api';
import Cookies from 'js-cookie';

import Head from 'next/head';
import { ENV_STATUS } from '../functions/env';


function MyApp( { Component, pageProps } ) {
    const router = useRouter();
    const [isDataReady, setIsDataReady] = useState(false);

    useEffect( () => {
        sal( { threshold: 0.1, once: true } );
    }, [router.asPath] );

    useEffect( () => {
        sal();
    }, [] );

     // Get User Country and Exchange Rate
  useEffect(() => {
    async function fetchCountryAndRates() {
      try {

         

        //  // Remove existing cookies
         Cookies.remove('aethenos_currency');
        // Cookies.remove('aethenos_user_country');
        
        // Determine the country based on login status
        if (USERTOKEN == null ) {

            if(ENV_STATUS == "dev"){
                Cookies.remove('aethenos_user_country')
                // Cookies.remove('aethenos_currency')
            }else{
                Cookies.remove('aethenos_user_country', { domain: '.aethenos.com' });
                // Cookies.remove('aethenos_currency', { domain: '.aethenos.com' });
            
            }
    
                // Get the user's country
                const countryData = await getUserCountry();
                if (countryData) {
                  Cookies.set('aethenos_user_country', JSON.stringify(countryData)); // Store in cookies
                }
            }

        


        // Determine the currency code
        const countryCode = countryData?.country_code;
        if (countryCode) {
          const currencyCode = countryData.currency; // Assumes the API returns the currency code
          if (currencyCode) {
            // Get the exchange rate for the currency
            const exchangeRate = await getCurrencyExchangeRate(currencyCode.toLowerCase());
            if (exchangeRate) {
              Cookies.set('aethenos_currency', exchangeRate); // Store the exchange rate in cookies
            }
          }
        }
      } catch (error) {
        console.error('Error fetching country or exchange rate:', error);
      }finally {
        setIsDataReady(true); // Mark data fetching as complete
      }
    }

    fetchCountryAndRates();
  }, []);

//   if (!isDataReady) {
//     // Show a loading screen while waiting for data
//     return (
//       <div style={{ textAlign: 'center', marginTop: '20%' }}>
//         <h3>Loading...</h3>
//       </div>
//     );
//   }

    return (
        <React.Fragment>
             <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <SEO font="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Spartan:wght@400;500;600;700;800&display=swap" />

            <Provider store={ store }>
                <ThemeProvider defaultTheme="light">
                    <MouseMoveProvider>
                        <Component { ...pageProps } />
                    </MouseMoveProvider>
                    <Theme />
                </ThemeProvider>
            </Provider>
          
        </React.Fragment>
    )
}

export default MyApp;
