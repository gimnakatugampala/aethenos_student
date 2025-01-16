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
import { getCurrency, getCurrencyExchangeRate, getUserCountry, USERTOKEN } from '../api';
import Cookies from 'js-cookie';

import Head from 'next/head';
import { ENV_STATUS } from '../functions/env';

import countries from 'i18n-iso-countries';

// Initialize the countries library with the English locale
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));


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
            // Remove existing cookies
            Cookies.remove('aethenos_currency');
      
            let countryData; // Declare countryData to prevent reference errors
      
            // Determine the country based on login status
            if (USERTOKEN == null) {
              if (ENV_STATUS === "dev") {
                Cookies.remove('aethenos_user_country');
              } else {
                Cookies.remove('aethenos_user_country', { domain: '.aethenos.com' });
              }
      
              // Get the user's country
              countryData = await getUserCountry();
              if (countryData) {
                Cookies.set('aethenos_user_country', JSON.stringify(countryData));
  
              // console.log(countryData)
              }

                     // Determine the currency code if countryData is available
            const countryCode = countryData?.country_code;
            
            if (countryCode) {
              const currencyCode = countryData.currency; // Assumes the API returns the currency code
              if (currencyCode) {
                console.log(countryCode)
                // Get the exchange rate for the currency
                const exchangeRate = await getCurrencyExchangeRate(currencyCode.toLowerCase());
                if (exchangeRate) {
                  console.log(exchangeRate)
  
                  Cookies.set('aethenos_currency', exchangeRate);
                }
              }
            }
            }else{

              // Get the country name from the cookie
    let countryName = Cookies.get('aethenos_user_country');
    console.log("Logged in, Country Name:", countryName);

    if (countryName) {
     
      const currencyEx = await getCurrency(countryName);
      // console.log(currencyEx)

      if(currencyEx){
          const exchangeRate = await getCurrencyExchangeRate(currencyEx.toLowerCase());
          Cookies.set('aethenos_currency', exchangeRate);

        console.log(exchangeRate)
      }

      // if (countryCode) {
      //   console.log("Derived Country Code:", countryCode);

      //   // Fetch the exchange rate using the country code
      //   const exchangeRate = await getCurrencyExchangeRate(countryCode.toLowerCase());
      //   if (exchangeRate) {
      //     console.log("Exchange Rate:", exchangeRate);

      //     // Save the exchange rate to a cookie
      //     // Cookies.set('aethenos_currency', exchangeRate);

      //     // Optionally update the country data in cookies with the country code
      //     const updatedCountryData = { country_name: countryName, country_code: countryCode };
      //     // Cookies.set('aethenos_user_country', JSON.stringify(updatedCountryData));
      //   } else {
      //     console.error("Exchange rate could not be retrieved.");
      //   }
      // } else {
      //   console.error("Country code could not be derived from country name.");
      // }
    } else {
      console.warn("Country name is missing in the cookie.");
    }
            }
  
            console.log(countryData)
      
     
          } catch (error) {
            console.error('Error fetching country or exchange rate:', error);
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
