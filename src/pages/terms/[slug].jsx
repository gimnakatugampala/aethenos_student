import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const DynamicPage = () => {
  const router = useRouter();
  const { slug } = router.query; // Get slug from the route
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    // Fetch WordPress data based on slug
    const fetchPageData = async () => {
      if (!slug) return; // Ensure slug is available
      const response = await fetch(`https://yourwordpresssite.com/wp-json/wp/v2/pages?slug=${slug}`);
      const data = await response.json();
      if (data.length) {
        setPageData(data[0]); // Set the first matched page
      }
    };
    
    fetchPageData();
  }, [slug]);

  if (!pageData) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div>
      <h1>{pageData.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}></div>
    </div>
  );
};

export default DynamicPage;
