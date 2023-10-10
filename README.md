This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

EduBlink React conversion from HTML

* images
    1. 
        course -> this folder won't need to repce.
        team -> this folder won't need to repce.
        shop -> this folder is not necessary.

* CSS
    1. app.scss -> have a look
        /*---------------------------------------------
        Template Name: EduBlink Education Vue/Nuxt Template
        Version: 1.0.0

    2. url(..(--prevent-global-search-replace--)/images/); with -> url(..(--prevent-global-search-replace--)/../images/);

    3. scss > template > health_coach, language_academy, modern_schooling
    url(..(--prevent-global-search-replace--)/../images/anything); with -> url(..(--prevent-global-search-replace--)/../../images/anything);

    4. 
        body.dark-(--prevent-global-search-replace--)mode {
            background-color: var(--dark-color-bg-body);
        }
        with 
        [data-theme='dark'] {
            body {
                background-color: var(--dark-color-bg-body);
            }
        }

        .dark-mode with [data-theme='dark']
    
    5. _header.scss
        // 1360 instead of 1350
        .header-category {
            @media only screen and (max-width: 1360px) {
                display: none;
            }
        }
    
    6. scss > header > mobilemenu.scss -> don't replace it.

***** To Build Production Ready
    next.config.js file
        /** @type {import('next').NextConfig} */
            const nextConfig = {
            reactStrictMode: false,
            swcMinify: true,
            appDir: false
        }

        module.exports = nextConfig
    
    package.json
        "scripts": {
            "dev": "next dev",
            "build": "next build && next export",
            "start": "next start",
            "lint": "next lint"
        },

    _app.jsx file
        import SEO from '../components/seo';

        return (
            <React.Fragment>
                <SEO font="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Spartan:wght@400;500;600;700;800&display=swap" />
                <Provider store={ store }>
                    <ThemeProvider defaultTheme="light">
                        <MouseMoveProvider>
                            <Component { ...pageProps } />
                        </MouseMoveProvider>
                    </ThemeProvider>
                </Provider>
            </React.Fragment>
        )

***** ThemeForest Ready
    check and remove the point of -> To Build Production Ready