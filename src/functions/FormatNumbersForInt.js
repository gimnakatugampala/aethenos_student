import React from 'react';

const FormatNumbersForInt = (num) => {
    // Attempt to convert input to an integer
    const number = parseInt(num, 10);

    // If the input is invalid, return an empty string
    if (isNaN(number)) return '';

    // Format the integer with thousands separator using regex
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default FormatNumbersForInt;
