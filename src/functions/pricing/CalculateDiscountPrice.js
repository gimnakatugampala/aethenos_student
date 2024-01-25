import React from 'react'
import Cookies from 'js-cookie';


const COUNTRY = Cookies.get('aethenos_user_origin')

const CalculateDiscountPrice = (data) => {
    let countryToFind = "";

    if (COUNTRY) {
        try {
            const parsedCountry = JSON.parse(COUNTRY);
            countryToFind = parsedCountry.country_name;
        } catch (error) {
            console.error("Error parsing COUNTRY:", error);
        }
    }
    
let discount = ""

if (data.course_prices != null  && data.course_prices.prices != null) {
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
        if(foundPrice.discountTypeId == 1){
            discount = ""
        }else if(foundPrice.discountTypeId == 2){
            discount = foundPrice.discount
        }else if(foundPrice.discountTypeId == 3){
            discount = foundPrice.discountAmount
        }

    } else {
        // console.log("Country Not Found");
        // console.log("Default Price");
        // console.log(data.course_prices)

        if(data.course_prices.discountTypeId == 1){
            discount = ""
        }else if(data.course_prices.discountTypeId == 2){
            discount = `${data.course_prices.discount}%`
        }else if(data.course_prices.discountTypeId == 3){
            discount = `${data.course_prices.discountAmount}`
        }
        
    }

    return discount
}else{
    return discount = ""
}


}

export default CalculateDiscountPrice