import React from 'react';

const stripHtmlTags = (html) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.innerText || tempElement.textContent;
  };

const FormatHTMLRemove = (htmlContent) => {

  // Call the function and store the result
  const cleanedContent = stripHtmlTags(htmlContent);

  return cleanedContent.slice(0, 1000)
};

export default FormatHTMLRemove;
