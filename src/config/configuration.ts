export const configuration = () => ({
    env: process.env.NODE_ENV,
    db: {
        url: process.env.DATABASE_URL,
    },
    app: {
        port: process.env.APP_PORT,
        emailAPI: process.env.SENDGRID_API_KEY
    },
    jwt: {
        at: process.env.AT_SECRET,
        rt: process.env.RT_SECRET
    }
});