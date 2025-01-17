import Cookies from 'js-cookie';
import { getCurrencyExchangeRate, USERTOKEN } from '../../api';
import countries from 'i18n-iso-countries';
import { getAllInfoByISO } from 'iso-country-currency';
import FormatNumbers from '../FormatNumbers';

// Initialize the countries library with the English locale
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

const CalculateListPrice = (data) => {
    const COUNTRY = Cookies.get('aethenos_user_origin');
    let EX_RATES = Cookies.get('aethenos_currency'); // Store exchange rate in cookies if fetched already
    // const USER_LOGIN_COUNTRY = Cookies.get('aethenos_user_country');
    const USER_LOGIN_COUNTRY = Cookies.get('aethenos_loggedIn_user');

    let countryToFind = "";

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

    let list_prices = "";

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
            const currencyCode = getAllInfoByISO(countryCode).currency.toLowerCase();

            // Fetch the exchange rate only if it hasn't been fetched already
            // if (!EX_RATES) {
            //     getCurrencyExchangeRate(currencyCode).then(rate => {
            //         EX_RATES = rate;
            //         Cookies.set('aethenos_currency', rate); // Cache rate in cookies for future use
            //     });
            // }

            if (foundPrice.listPrice === 0) {
                if (EX_RATES) {
                    try {
                        const rates = JSON.parse(EX_RATES);
                        list_prices = (Number.parseFloat(data.course_prices.globalListPrice) * Number.parseFloat(rates)).toFixed(2);
                    } catch (error) {
                        console.error("Error parsing EX_RATES:", error);
                        list_prices = data.course_prices.globalListPrice; // Fallback to global price if parsing fails
                    }
                } else {
                    list_prices = data.course_prices.globalListPrice;
                }
            } else {
                list_prices = foundPrice.listPrice;
            }
        } else {
            list_prices = data.course_prices.globalListPrice;
        }

        // Handle currency-specific rounding for Japanese Yen
        if (COUNTRY) {
            try {
                const parsedCountry = JSON.parse(COUNTRY);
                if (parsedCountry.currency.toUpperCase() === 'JPY') {
                    return Math.round(Number(list_prices)).toString();
                }
            } catch (error) {
                console.error("Error parsing COUNTRY for currency:", error);
            }
        }

        return list_prices;
    } else {
        return "0.00";
    }
};

export default CalculateListPrice;
