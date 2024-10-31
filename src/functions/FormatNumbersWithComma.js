import React from 'react';

const FormatNumbersWithComma = (num) => {
    // Convert to a number if possible, or return an empty string if invalid
    const number = parseFloat(num);
    if (isNaN(number)) return '';
    
    // Round the number to 2 decimal places and format with thousands separator
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");


};

export default FormatNumbersWithComma;
