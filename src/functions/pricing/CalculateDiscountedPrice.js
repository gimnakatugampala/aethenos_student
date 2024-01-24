import React from 'react'
import Cookies from 'js-cookie';


const COUNTRY = Cookies.get('aethenos_user_origin')

const CalculateDiscountedPrice = (data) => {

    
    const countryToFind = JSON.parse(COUNTRY).country_name;
    let net_price = ""

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
            // console.log(foundPrice); 
            if(foundPrice.netPrice == 0){
                net_price = data.course_prices.globalNetPrice
            }else{
                net_price = foundPrice.netPrice
            }
        } else {
            // console.log("Country Not Found");
            // console.log("Default Price");
            // console.log(data.course_prices)
            net_price = data.course_prices.globalNetPrice
            
        }

        return net_price
    }

}

export default CalculateDiscountedPrice