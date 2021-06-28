const Config = () => {
    if (process.env.REACT_APP_NODE_ENV === 'staging') {
        // staging
        return {
            restful: {
                apiURL: process.env.REACT_APP_STG_API_URL,
                wsURL: process.env.REACT_APP_STG_WS_URL,
                stripePublicKey: process.env.REACT_APP_STG_STRIPE_PUBLIC_KEY,
                hCaptchaSiteKey: process.env.REACT_APP_STG_HCAPTCHA_SITE_KEY
            }
        }
    } else if (process.env.REACT_APP_NODE_ENV === 'prod') {
        // production
        return {
            restful: {
                apiURL: process.env.REACT_APP_PROD_API_URL,
                wsURL: process.env.REACT_APP_PROD_WS_URL,
                stripePublicKey: process.env.REACT_APP_PROD_STRIPE_PUBLIC_KEY,
                hCaptchaSiteKey: process.env.REACT_APP_PROD_HCAPTCHA_SITE_KEY
            }
        }
    } else {
        // development
        return {
            restful: {
                apiURL: process.env.REACT_APP_DEV_API_URL,
                wsURL: process.env.REACT_APP_DEV_WS_URL,
                stripePublicKey: process.env.REACT_APP_DEV_STRIPE_PUBLIC_KEY,
                hCaptchaSiteKey: process.env.REACT_APP_DEV_HCAPTCHA_SITE_KEY
            }
        }
    }
}

export const restfulApiConfig = Config().restful
