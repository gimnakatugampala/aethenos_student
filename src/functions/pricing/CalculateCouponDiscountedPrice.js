import React from 'react';
import Cookies from 'js-cookie';
import { getCurrencyExchangeRate, USERTOKEN } from '../../api';
import countries from 'i18n-iso-countries';
import { getAllInfoByISO } from 'iso-country-currency';

// Initialize the countries library with the English locale
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

const CalculateCouponDiscountedPrice =  (data) => {
    const COUNTRY = Cookies.get('aethenos_user_origin');
    const USER_LOGIN_COUNTRY = Cookies.get('aethenos_user_country');
    // Get the updated exchange rates from the cookie
    const EX_RATES = Cookies.get('aethenos_currency');

    let countryToFind = "";

    // Determine the country based on login status
    if (USERTOKEN) {
        if (USER_LOGIN_COUNTRY) {
            countryToFind = USER_LOGIN_COUNTRY;
        }
    } else {
        if (COUNTRY) {
            try {
                const parsedCountry = JSON.parse(COUNTRY);
                countryToFind = parsedCountry.country_name;
            } catch (error) {
                console.error("Error parsing COUNTRY:", error);
            }
        }
    }

    let finalPrice = "";
    let foundPrice = null;

    if (data.course_prices != null) {
        foundPrice = data.course_prices.find(single_price => countryToFind === single_price.countryName);

        // If a price is found for the user's country
        if (foundPrice) {
            let priceToUse = foundPrice.discountPrice;

            // Apply the exchange rate only if the country is in the course_prices list
            let exchangeRate = 1; // Default to 1

            // No Discount price is assigned to the found price
            if(priceToUse == 0){

                if (EX_RATES) {
                    try {
                        exchangeRate = Number.parseFloat(EX_RATES) || 1;
                    } catch (error) {
                        console.error("Error parsing EX_RATES:", error);
                    }
                }

            // Multiply the selected price by the exchange rate
            finalPrice = (Number.parseFloat(data.global_discount_price) * exchangeRate).toFixed(2);

            }else{

                exchangeRate = 1

            // Multiply the selected price by the exchange rate
            finalPrice = (priceToUse * exchangeRate).toFixed(2);

            }


            

         

           

            // Handle currency-specific rounding for Japanese Yen
            if (countryToFind === 'Japan') {
                return Math.round(Number(finalPrice)).toString();
            }

            console.log(foundPrice)

            return Number.parseFloat(finalPrice).toFixed(2);
        } else {
            // If the country is not found, use the global_discount_price without applying the exchange rate
            return Number.parseFloat(data.global_discount_price).toFixed(2);
        }
    } else {
        return "0";
    }
};

export default CalculateCouponDiscountedPrice;