module.exports = {
  env: {
    MONGO_URI: process.env.MONGO_URI,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SENDGRID_EMAIL_ADDRESS: process.env.SENDGRID_EMAIL_ADDRESS,
    SENDGRID_TEMPLATE_ID: process.env.SENDGRID_TEMPLATE_ID,
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
};
