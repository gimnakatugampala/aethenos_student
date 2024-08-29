import React from 'react'
import Cookies from 'js-cookie';
import { getCurrencyExchangeRate } from '../../api';


const COUNTRY = Cookies.get('aethenos_user_origin')
const EX_RATES = Cookies.get('aethenos_currency')

const CalculateDiscountedPrice = (data) => {  
    
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

            // console.log("Country Found");
            // console.log(foundPrice); 
            // console.log(data.course_prices); 
            getCurrencyExchangeRate(JSON.parse(COUNTRY).currency.toLowerCase())
            if (foundPrice.netPrice == 0) {
                // Convert the $ to The Native Currency
                if(EX_RATES != null){
                    return  net_price = (Number.parseFloat(data.course_prices.globalNetPrice) * Number.parseFloat(JSON.parse(EX_RATES))).toFixed(2);
                }
                

            } else {
                return net_price = foundPrice.netPrice.toFixed(2);
            }
           

        } else {

   
            net_price = data.course_prices.globalNetPrice.toFixed(2);
            
        }

        if (JSON.parse(COUNTRY).currency.toUpperCase() === 'JPY') {
            return Math.round(net_price).toString(); 
        } else {
            return net_price; 
        }

    }else{
        return net_price = "0"
    }

}

export default CalculateDiscountedPrice