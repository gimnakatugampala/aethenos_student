import React from 'react'
import Cookies from 'js-cookie';


const COUNTRY = Cookies.get('aethenos_user_origin')

const GetCurrencyByCountry = (data) => {

    let countryToFind = "";

        if (COUNTRY) {
            try {
                const parsedCountry = JSON.parse(COUNTRY);
                countryToFind = parsedCountry.country_name;
            } catch (error) {
                console.error("Error parsing COUNTRY:", error);
            }
        }

    let currency_code = ""

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
            if(foundPrice.listPrice == 0 && foundPrice.netPrice){
                currency_code = 'USD'
            }else{
                currency_code = JSON.parse(COUNTRY).currency
            }
        } else {
            // console.log("Country Not Found");
            // console.log("Default Price");
            // console.log(data.course_prices)
            currency_code = 'USD'
            
        }

        return currency_code
    }else{
        return currency_code = 'USD'
    }
}

export default GetCurrencyByCountry