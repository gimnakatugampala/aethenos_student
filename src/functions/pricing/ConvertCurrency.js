import React from 'react'

const ConvertCurrency = (amountUSD, exchangeRate) => {
    return Number.parseFloat(amountUSD) * Number.parseFloat(exchangeRate);
}

export default ConvertCurrency