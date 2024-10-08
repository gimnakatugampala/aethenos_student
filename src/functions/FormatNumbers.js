import React from 'react';

const FormatNumbers = (num) => {
    if (isNaN(num)) return '';
    
    // Round the number to 2 decimal places and format with thousands separator
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");


};

export default FormatNumbers;
