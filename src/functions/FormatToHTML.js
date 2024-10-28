import React from 'react';
import DOMPurify from 'dompurify'; // Make sure to install dompurify

// Function to sanitize the HTML content using DOMPurify
const sanitizeHTML = (html) => {
  return DOMPurify.sanitize(html);
};

// Function that formats and sanitizes HTML content
const FormatToHTML = (htmlContent = '') => {
  return {
    __html: sanitizeHTML(htmlContent),
  };
};

export default FormatToHTML;
