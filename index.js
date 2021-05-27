const puppeteer = require('puppeteer');
const secrets = require('./secrets');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://instagram.com');

    await page.waitForSelector('input');

    const inputs = await page.$$('input');

    await inputs[0].type(secrets.USERNAME);
    await inputs[1].type(secrets.PASSWORD);

    const loginButton = (await page.$$('button'))[1];
    await loginButton.click();

    await page.waitForNavigation();

    const userNames = ['akhilgoyal_', 'garimachawla1997', 'familytimes_'];

    for (let username of userNames) {
        await page.goto(`https://instagram.com/${username}`);
    }

    await browser.close();

})();