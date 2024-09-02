import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { getCurrencyExchangeRate, USERTOKEN } from '../../api';

const CalculateDiscountedPrice = (data) => {
    const [exchangeRate, setExchangeRate] = useState(Cookies.get('aethenos_currency'));

    useEffect(() => {
        const handleCurrencyChange = () => {
            setExchangeRate(Cookies.get('aethenos_currency'));
        };

        // Listen for changes to the 'aethenos_currency' cookie
        window.addEventListener('currencyChanged', handleCurrencyChange);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('currencyChanged', handleCurrencyChange);
        };
    }, []);

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

    let net_price = "";

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
            if (foundPrice.netPrice === 0) {
                // Convert global net price to local currency if exchangeRate is available
                if (exchangeRate != null) {
                    net_price = (Number.parseFloat(data.course_prices.globalNetPrice) * Number.parseFloat(exchangeRate)).toFixed(2);
                } else {
                    net_price = data.course_prices.globalNetPrice;
                }
            } else {
                net_price = foundPrice.netPrice;
            }
        } else {
            // No specific price found, use global net price
            net_price = data.course_prices.globalNetPrice;
        }

        // Handle currency-specific rounding for Japanese Yen
        if (JSON.parse(COUNTRY).currency.toUpperCase() === 'JPY') {
            return Math.round(net_price).toString();
        } else {
            return net_price;
        }
    } else {
        return "0";
    }
};

export default CalculateDiscountedPrice;
