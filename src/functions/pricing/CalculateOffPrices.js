import React from 'react';
import Cookies from 'js-cookie';
import { getCurrencyExchangeRate, USERTOKEN } from '../../api';

import countries from 'i18n-iso-countries';
import { getAllInfoByISO } from 'iso-country-currency';
import FormatNumbers from '../FormatNumbers';

// Initialize the countries library with the English locale
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

const COUNTRY = Cookies.get('aethenos_user_origin');

const CalculateOffPrices = (data) => {
  const COUNTRY = Cookies.get('aethenos_user_origin');
  const USER_LOGIN_COUNTRY = Cookies.get('aethenos_user_country');

  let countryToFind = "";
  let exchangeRate = Cookies.get('aethenos_currency'); // Store the fetched exchange rate here

  // Determine the country based on login status
  if (USERTOKEN) {
    if (USER_LOGIN_COUNTRY) {
      try {
        countryToFind = USER_LOGIN_COUNTRY;
      } catch (error) {
        console.error("Error parsing USER_LOGIN_COUNTRY:", error);
      }
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

  // console.log(countryToFind)

  let discount = "";

  if (data.course_prices != null && data.course_prices.prices != null) {
    let foundPrice = null;

    // Find the price for the specific country
    data.course_prices.prices.some(single_price => {
      if (countryToFind === single_price.country) {
        foundPrice = single_price;
        return true;
      }
      return false;
    });

    if (foundPrice) {
      // console.log(foundPrice)
      const countryCode = countries.getAlpha2Code(countryToFind, 'en');
      const currencyCode =  getAllInfoByISO(countryCode).currency.toLowerCase();
      // console.log(countryCode)
      // console.log(countryToFind)
      // console.log(currencyCode)

      // Fetch the exchange rate only once
      if (!exchangeRate) {
        exchangeRate = getCurrencyExchangeRate(currencyCode);
        Cookies.set('aethenos_currency', exchangeRate); // Cache the result in cookies
      }

      if(foundPrice.netPrice == 0){

        if (data.course_prices.discountTypeId === 2) {
          discount = data.course_prices.discount;
        } else if (data.course_prices.discountTypeId === 3) {
          discount = Math.round((data.course_prices.discountAmount / data.course_prices.globalListPrice) * 100);
        } else {
          discount = 0;
        }

        
      }else{
        if (foundPrice.discountTypeId == 2) {
          discount = Math.round(foundPrice.discount);
        } else if (foundPrice.discountTypeId == 3) {
          discount = Math.round((foundPrice.discountAmount / foundPrice.listPrice) * 100);
        } else {
          discount = 0;
        }
      }



    } else {
      // Global Price
      if (data.course_prices.discountTypeId === 2) {
        discount = data.course_prices.discount;
      } else if (data.course_prices.discountTypeId === 3) {
        discount = Math.round((data.course_prices.discountAmount / data.course_prices.globalListPrice) * 100);
      } else {
        discount = 0;
      }
    }

    // Handle currency-specific rounding for Japanese Yen
    if (COUNTRY) {
      try {
        const parsedCountry = JSON.parse(COUNTRY);
        if (parsedCountry.currency.toUpperCase() === 'JPY') {
          return Math.round(Number(discount)).toString();
        }
      } catch (error) {
        console.error("Error parsing COUNTRY for currency:", error);
      }
    }

    // console.log(discount)
    // console.log(discount)

    return discount == 0 ? "" : `${discount}% OFF`;
  } else {
    return "0";
  }
}

export default CalculateOffPrices;
