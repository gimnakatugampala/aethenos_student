export default function HeadSEOFormatHTML(htmlString) {
    if (!htmlString) return "";
    
    // Remove HTML tags using regex
    return htmlString.replace(/<\/?[^>]+(>|$)/g, "").trim();
  }
  