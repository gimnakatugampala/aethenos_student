import React from 'react';
import Cookies from 'js-cookie';
import { getCurrencyExchangeRate, USERTOKEN } from '../../api';
import countries from 'i18n-iso-countries';
import currencyCodes from 'currency-codes';
import { getAllInfoByISO } from 'iso-country-currency';

// Initialize the countries library with the English locale
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

const GetCurrencyByCountry = (data) => {
    const COUNTRY = Cookies.get('aethenos_user_origin');
    // const USER_LOGIN_COUNTRY = Cookies.get('aethenos_user_country');
    const USER_LOGIN_COUNTRY = Cookies.get('aethenos_loggedIn_user');

    let countryToFind = "";

    // Determine the country based on login status
    if (USERTOKEN) {
        // User is logged in, use USER_LOGIN_COUNTRY
        if (USER_LOGIN_COUNTRY) {
            try {
                countryToFind = USER_LOGIN_COUNTRY;
            } catch (error) {
                console.error("Error parsing USER_LOGIN_COUNTRY:", error);
            }
        }
    } else {
        // User is not logged in, use COUNTRY from IP location
        if (COUNTRY) {
            try {
                const parsedCountry = JSON.parse(COUNTRY);
                countryToFind = parsedCountry.country_name;
            } catch (error) {
                console.error("Error parsing COUNTRY:", error);
            }
        }
    }

    let currency_code = "USD";  // Default currency

    if (data.course_prices != null && data.course_prices.prices != null) {
        let foundPrice = null;

        

        // Find the price for the specific country
        data.course_prices.prices.some(single_price => {
            if (countryToFind === single_price.country) {
                foundPrice = single_price;
                // console.log(foundPrice)
                return true;
            }
            // console.log(foundPrice)
            return false;
        });

        // console.log(foundPrice)

        if (foundPrice) {
           
                // Get ISO country code
                const countryCode =  countries.getAlpha2Code(countryToFind, 'en');
                // console.log(countryCode)

                currency_code = countryToFind == "Bulgaria"  || countryToFind == "Czechia" || countryToFind == "Hungary" || countryToFind == "Poland" || countryToFind == "Sweden"  ? "EUR" : getAllInfoByISO(countryCode).currency
    
                // Get the Currency Code
                // console.log(getAllInfoByISO(countryCode).currency)
    
                

                
                // Get currency code from ISO country code
                // if (countryCode) {
                //     const currency = currencyCodes.code(countryCode);
                //     currency_code = currency ? currency.code : 'USD';
                // }
        
            // else {
            //     // For logged out users, default to 'BRL' as specified
            //     console.log(foundPrice)
            //     currency_code = JSON.parse(COUNTRY).currency;
            // }

        // console.log(currency_code)


            // Handle currency-specific rounding for Japanese Yen
            if (currency_code.toUpperCase() === 'JPY') {
                return 'JPY';
            } else {
                return currency_code;
            }
        } else {
            // No specific price found, default to USD
        // console.log(currency_code)

            return currency_code;
        }
        
    } else {
        // console.log(currency_code)
        return currency_code;  // Return USD if no prices are found
    }

};

export default GetCurrencyByCountry;
