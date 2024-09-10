import React from 'react'
import Cookies from 'js-cookie';
import { getCurrencyExchangeRate, USERTOKEN } from '../../api';

const HandleCountry = () => {
    const COUNTRY = Cookies.get('aethenos_user_origin');
    const USER_LOGIN_COUNTRY = Cookies.get('aethenos_user_country');

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

    return countryToFind;
}

export default HandleCountry