import React from 'react';
import Cookies from 'js-cookie';
import { getCurrencyExchangeRate } from '../../api';

const COUNTRY = Cookies.get('aethenos_user_origin');
const EX_RATES = Cookies.get('aethenos_currency');

const CalculateDiscountedPrice = (data) => {  
    let countryToFind = "";
    let net_price = "";

    // Ensure COUNTRY is defined and parseable
    if (COUNTRY) {
        try {
            const parsedCountry = JSON.parse(COUNTRY);
            countryToFind = parsedCountry.country_name;

            // Get exchange rate based on the parsed country's currency
            getCurrencyExchangeRate(parsedCountry.currency.toLowerCase());

        } catch (error) {
            console.error("Error parsing COUNTRY:", error);
            return "0"; // Return "0" or a default value in case of parsing error
        }
    }

    if (data.course_prices != null && data.course_prices.prices != null) {
        let foundPrice = null; 

        data.course_prices.prices.some(single_price => {
            if (countryToFind == single_price.country) {
                foundPrice = single_price;
                return true; 
            }
            return false;
        });

        if (foundPrice) {
            if (foundPrice.netPrice == 0 && EX_RATES != null) {
                // Convert the $ to the native currency using the exchange rate
                net_price = (Number.parseFloat(data.course_prices.globalNetPrice) * Number.parseFloat(EX_RATES)).toFixed(2);
            } else {
                net_price = foundPrice.netPrice;
            }
        } else {
            net_price = data.course_prices.globalNetPrice;
        }

        // Handle specific currency formatting for JPY
        if (COUNTRY && JSON.parse(COUNTRY).currency.toUpperCase() == 'JPY') {
            return Math.round(net_price).toString(); 
        } else {
            return net_price; 
        }
    } else {
        return "0"; // Return "0" if course prices are not available
    }
};

export default CalculateDiscountedPrice;
