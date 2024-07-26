import React from 'react'
import Cookies from 'js-cookie';
import { getCurrencyExchangeRate } from '../../api';


const COUNTRY = Cookies.get('aethenos_user_origin')
const EX_RATES = Cookies.get('aethenos_currency')

const CalculateCouponDiscountedPrice = (data) => {
   
    let countryToFind = "";
     // -----------------------------
    

    if (COUNTRY) {
        try {
            const parsedCountry = JSON.parse(COUNTRY);
            countryToFind = parsedCountry.country_name;
        } catch (error) {
            console.error("Error parsing COUNTRY:", error);
        }
    }
    
    let net_price = ""

    if (data.course_prices != null && data.course_prices.prices != null) {
        let foundPrice = null; 
    
        data.course_prices.prices.some(single_price => {
            if (countryToFind === single_price.country) {
                foundPrice = single_price;
                return true; 
            }
    
            return false;
        });
    
        if (foundPrice) {


            getCurrencyExchangeRate(JSON.parse(COUNTRY).currency.toLowerCase())
            if (foundPrice.netPrice == 0) {
                // Convert the $ to The Native Currency
                if(EX_RATES != null){
                    return  net_price = (Number.parseFloat(data.course_prices.global_discount_price) * Number.parseFloat(JSON.parse(EX_RATES))).toFixed(2);
                }
                

            } else {
                return net_price = foundPrice.global_discount_price;
            }
           

        } else {

            net_price = data.course_prices.globalNetPrice
            
        }

        return net_price
    }else{
        return net_price = "0"
    }
}

export default CalculateCouponDiscountedPrice