import React from 'react'
import Cookies from 'js-cookie';
import { getCurrencyExchangeRate } from '../../api';


const COUNTRY = Cookies.get('aethenos_user_origin')
const EX_RATES = Cookies.get('aethenos_currency')

const CalculateListPrice = (data) => {

    let countryToFind = "";

        if (COUNTRY) {
            try {
                const parsedCountry = JSON.parse(COUNTRY);
                countryToFind = parsedCountry.country_name;
            } catch (error) {
                console.error("Error parsing COUNTRY:", error);
            }
        }
        
    let list_price = ""

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
            // console.log(foundPrice.listPrice); 
            // getCurrencyExchangeRate(JSON.parse(COUNTRY).currency.toLowerCase())
            if(foundPrice.listPrice == 0){
                list_price = (Number.parseFloat(data.course_prices.globalListPrice) * Number.parseFloat(JSON.parse(EX_RATES))).toFixed(2);
                
            }else{
                list_price = foundPrice.listPrice
            }
        } else {
            // console.log("Country Not Found");
            // console.log("Default Price");
            // console.log(data.course_prices)
            list_price = data.course_prices.globalListPrice
            
        }

        return Number.parseFloat(list_price).toFixed(2)
    }else{
        return list_price = "0.00"
    }
   
}

export default CalculateListPrice