import Head from "next/head";
import { useEffect } from "react";

const SEO = ({ pageTitle, description, imageUrl, font ,keywords }) =>  {

    useEffect(() => {
        // Google Analytics Script - Only runs on the client side
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-3XSZ8E8FZY");
    }, []);



    return (
        <Head>
            {/* Dynamic Page Title */}
            <title>
                {pageTitle ? `${pageTitle} || Aethenos` : "Aethenos"}
            </title>
    
            {/* Browser Compatibility */}
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            
            {/* Dynamic Meta Description */}
            <meta name="description" content={description || "Welcome to Aethenos - Your platform for exceptional learning experiences."} />
    
    
            <meta
                name="keywords"
                content={keywords || "Aethenos, Aethenos.com, aethenos, aethenos.com, learning, courses, education, online platform, online courses, instructors, tutors, excel, UK, USA, data analysis, financial modeling, excel courses"}
            />
            
            {/* Robots Meta Tag */}
            <meta name="robots" content="index, follow" />
            
            {/* Viewport Meta Tag for Responsive Design */}
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            
            {/* Open Graph Meta Tags for Social Media */}
            <meta property="og:title" content={pageTitle ? `${pageTitle} | Aethenos` : "Aethenos"} />
            <meta property="og:description" content={description || "Explore amazing learning content at Aethenos."} />
            <meta property="og:image" content={imageUrl || "/favicon.ico"} />
            <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
            <meta property="og:type" content="website" />
            
            {/* Twitter Card Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle ? `${pageTitle} | Aethenos` : "Aethenos"} />
            <meta name="twitter:description" content={description || "Explore exceptional courses on Aethenos."} />
            <meta name="twitter:image" content={imageUrl || "/favicon.ico"} />
            
            {/* Font and External Stylesheets */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous" />
            {font && <link href={font} rel="stylesheet" />}
    
            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" />
            
            {/* Structured Data (JSON-LD) */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "Aethenos",
                        "url": "https://aethenos.com",
                        "description": description || "Explore the best courses and content on Aethenos.",
                        "publisher": {
                            "@type": "Organization",
                            "name": "Aethenos",
                        },
                        "image": imageUrl || "/favicon.ico"
                    }),
                }}
            />
    
            {/* Google Analytics Script */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-3XSZ8E8FZY"></script>
        </Head>
    );

}
    
    
    

export default SEO;