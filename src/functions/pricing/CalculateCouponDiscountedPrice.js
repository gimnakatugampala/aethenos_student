import React from 'react';
import Cookies from 'js-cookie';

const COUNTRY = Cookies.get('aethenos_user_origin');
const EX_RATES = Cookies.get('aethenos_currency');

const CalculateCouponDiscountedPrice = async (data) => {
    // Extract user's country from the cookie
    let countryToFind = "";
    if (COUNTRY) {
        try {
            const parsedCountry = JSON.parse(COUNTRY);
            countryToFind = parsedCountry.country_name;
        } catch (error) {
            console.error("Error parsing COUNTRY cookie:", error);
        }
    }
    
    // Initialize the net price variable
    let net_price = 2.0;
    
    // Check if course_prices and prices exist
    // if (data.course_prices) {
    //     // Check if the user's country exists in the prices array
    //     const foundPrice = data.course_prices.find(single_price => single_price.countryName == countryToFind);
        
    //     if (foundPrice) {
    //         // If the price for the user's country is found, return the discounted price
    //         if (foundPrice.discountPrice > 0) {
    //             return foundPrice.discountPrice;
    //         } else {
    //             // Convert the global discount price to the local currency if needed
    //             if (EX_RATES) {
                    return (parseFloat(data.course_prices.global_discount_price) * parseFloat(JSON.parse(EX_RATES))).toFixed(2);
    //             } else {
    //                 return data.course_prices.global_discount_price;
    //             }
    //         }
    //     } else {
    //         // If the user's country is not found, return the global discount price
    //         return data.course_prices.global_discount_price;
    //     }
    // }
    
    // Return the default global discount price if course_prices is not available
    // return 2;
};

export default CalculateCouponDiscountedPrice;
