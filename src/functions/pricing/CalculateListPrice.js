import React from 'react'
import Cookies from 'js-cookie';


const COUNTRY = Cookies.get('aethenos_user_origin')

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

    if (data.course_prices != null) {
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
            if(foundPrice.listPrice == 0){
                list_price = data.course_prices.globalListPrice
            }else{
                list_price = foundPrice.listPrice
            }
        } else {
            // console.log("Country Not Found");
            // console.log("Default Price");
            // console.log(data.course_prices)
            list_price = data.course_prices.globalListPrice
            
        }

        return list_price
    }
   
}

export default CalculateListPrice