import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getCurrencyExchangeRate } from '../../api';

const COUNTRY = Cookies.get('aethenos_user_origin');
const EX_RATES = Cookies.get('aethenos_currency');

const CalculateDiscountedPrice = (data) => {
    const [netPrice, setNetPrice] = useState("0");

    useEffect(() => {
        const calculatePrice = async () => {
            let countryToFind = "";
            let exchangeRate = 1; // Default to 1 in case no exchange rate is found

            // Parse country from cookie
            if (COUNTRY) {
                try {
                    const parsedCountry = JSON.parse(COUNTRY);
                    countryToFind = parsedCountry.country_name;

                    // Fetch exchange rate if available
                    exchangeRate = await getCurrencyExchangeRate(parsedCountry.currency.toLowerCase());
                } catch (error) {
                    console.error("Error parsing COUNTRY:", error);
                }
            }

            // Validate course prices
            if (data.course_prices && data.course_prices.prices) {
                let foundPrice = data.course_prices.prices.find(single_price => countryToFind == single_price.country);

                if (foundPrice) {
                    // Convert global price if net price is zero
                    if (foundPrice.netPrice == 0 && EX_RATES) {
                        const exRate = Number.parseFloat(JSON.parse(EX_RATES));
                        setNetPrice((Number.parseFloat(data.course_prices.globalNetPrice) * exRate).toFixed(2));
                    } else {
                        setNetPrice(foundPrice.netPrice);
                    }
                } else {
                    setNetPrice(data.course_prices.globalNetPrice);
                }

                // Handle JPY rounding
                if (JSON.parse(COUNTRY).currency.toUpperCase() === 'JPY') {
                    setNetPrice(Math.round(netPrice).toString());
                }
            }
        };

        calculatePrice();
    }, [data]);

    return netPrice;
};

export default CalculateDiscountedPrice;
