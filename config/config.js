export const config = {

    baseUrl: 'https://www.saucedemo.com',

    browser: 'chromium',

    headless: process.env.CI === 'true',

    timeout: 30000

};