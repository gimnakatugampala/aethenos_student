import Cookies from 'js-cookie';
import { getCurrencyExchangeRate, USERTOKEN } from '../../api';
import countries from 'i18n-iso-countries';
import { getAllInfoByISO } from 'iso-country-currency';

// Initialize the countries library with the English locale
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

const CalculateDiscountedPrice = (data) => {
    const COUNTRY = Cookies.get('aethenos_user_origin');
    let EX_RATES = Cookies.get('aethenos_currency');
    const USER_LOGIN_COUNTRY = Cookies.get('aethenos_user_country');

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

    let net_price = "";

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
            const countryCode = countries.getAlpha2Code(countryToFind, 'en');
            const currencyCode = getAllInfoByISO(countryCode).currency.toLowerCase();

            // Fetch the exchange rate only if it hasn't been fetched already
            if (!EX_RATES) {
                getCurrencyExchangeRate(currencyCode).then(rate => {
                    EX_RATES = rate;
                    Cookies.set('aethenos_currency', rate); // Cache in cookies for future use
                });
            }

            if (foundPrice.netPrice == 0) {
                // Convert global net price to local currency if EX_RATES is available
                if (EX_RATES) {
                    try {
                        const rates = JSON.parse(EX_RATES);
                        net_price = (Number.parseFloat(data.course_prices.globalNetPrice) * Number.parseFloat(rates)).toFixed(2);
                    } catch (error) {
                        console.error("Error parsing EX_RATES:", error);
                        net_price = data.course_prices.globalNetPrice; // Fallback to global price if parsing fails
                    }
                } else {
                    net_price = data.course_prices.globalNetPrice;
                }
            } else {
                net_price = foundPrice.netPrice;
            }
        } else {
            // No specific price found, use global net price
            net_price = data.course_prices.globalNetPrice;
        }

        // Handle currency-specific rounding for Japanese Yen
        if (COUNTRY) {
            try {
                const parsedCountry = JSON.parse(COUNTRY);
                if (parsedCountry.currency.toUpperCase() === 'JPY') {
                    return Math.round(Number(net_price)).toString();
                }
            } catch (error) {
                console.error("Error parsing COUNTRY for currency:", error);
            }
        }

        return Number.parseFloat(net_price).toFixed(2);
    } else {
        return "0";
    }
};

export default CalculateDiscountedPrice;
