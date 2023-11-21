import React from 'react'

    function validateEmail(email) {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
        // Test the email against the regex
        return emailRegex.test(email);
      }


export default validateEmail