import React from 'react'
import Cookies from 'js-cookie';
import { getCurrencyExchangeRate, USERTOKEN } from '../../api';

import countries from 'i18n-iso-countries';
import currencyCodes from 'currency-codes';
import { getAllInfoByISO } from 'iso-country-currency';
import FormatNumbers from '../FormatNumbers';


// Initialize the countries library with the English locale
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

const COUNTRY = Cookies.get('aethenos_user_origin')

const CalculateOffPrices = (data) => {
  const COUNTRY = Cookies.get('aethenos_user_origin');
  const EX_RATES = Cookies.get('aethenos_currency');
  const USER_LOGIN_COUNTRY = Cookies.get('aethenos_user_country');

  // console.log(USER_LOGIN_COUNTRY);
  // console.log(EX_RATES);
  // console.log(COUNTRY);
  // console.log(data);

  let countryToFind = "";

  // Determine the country based on login status
  if (USERTOKEN) {
      // User is logged in, use USER_LOGIN_COUNTRY
      if (USER_LOGIN_COUNTRY) {
          try {
              countryToFind = USER_LOGIN_COUNTRY;
          } catch (error) {
              console.error("Error parsing USER_LOGIN_COUNTRY:", error);
          }
      }

  } else {
      // User is not logged in, use COUNTRY from IP location
      if (COUNTRY) {
          try {
              const parsedCountry = JSON.parse(COUNTRY);
              countryToFind = parsedCountry.country_name;
          } catch (error) {
              console.error("Error parsing COUNTRY:", error);
          }
      }
  }

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

          // Get the Currency Code
          // console.log(foundPrice)
          // console.log(countryToFind)
          const countryCode = countries.getAlpha2Code(countryToFind, 'en');
          // console.log(countryCode)

          // Get the Currency Code
          // console.log(getAllInfoByISO(countryCode).currency)

          // Get the New Ex Rate
          getCurrencyExchangeRate(getAllInfoByISO(countryCode).currency.toLowerCase())

          const EX_RATES = Cookies.get('aethenos_currency');


          if (foundPrice.discountType == "By Percentage") {
        
              // Convert global net price to local currency if EX_RATES is available
                  discount = data.course_prices.discount;
              
          } else if(foundPrice.discountType == "By Value") {

                 // Convert global net price to local currency if EX_RATES is available
                  discount = data.course_prices.discountAmount;
            
          }else {
              discount = foundPrice.discount;
          }
      } else {
          // No specific price found, use global net price
          discount = data.course_prices.discount;
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

      // console.log(foundPrice)
      // console.log(discount)
      // console.log(countryToFind)
      // console.log(USERTOKEN)

      return `${FormatNumbers(discount)}% OFF`;
  } else {
      return "0";
  }

}

export default CalculateOffPrices