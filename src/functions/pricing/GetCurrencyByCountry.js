import React from 'react';
import Cookies from 'js-cookie';
import { USERTOKEN } from '../../api';

const GetCurrencyByCountry = (data) => {
    const COUNTRY = Cookies.get('aethenos_user_origin');
    const USER_LOGIN_COUNTRY = Cookies.get('aethenos_user_country');

    console.log(USERTOKEN);

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
                return true;
            }
            return false;
        });

        if (foundPrice) {
            // If netPrice is zero, return the default USD currency
            if (foundPrice.netPrice === 0) {
                currency_code = JSON.parse(COUNTRY)?.currency || 'USD';
            } else {
                currency_code = JSON.parse(COUNTRY)?.currency || 'USD';
            }

            // Handle currency-specific rounding for Japanese Yen
            if (JSON.parse(COUNTRY)?.currency.toUpperCase() === 'JPY') {
                return 'JPY';
            } else {
                return currency_code;
            }
        } else {
            // No specific price found, default to USD
            return currency_code;
        }
    } else {
        return currency_code;  // Return USD if no prices are found
    }
};

export default GetCurrencyByCountry;
