const puppeteer = require("puppeteer");
const secrets = require("./secrets");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://instagram.com");

  await page.waitForSelector("input");

  const inputs = await page.$$("input");

  await inputs[0].type(secrets.USERNAME);
  await inputs[1].type(secrets.PASSWORD);

  const loginButton = (await page.$$("button"))[1];
  await loginButton.click();

  await page.waitForNavigation();

  const userNames = ["akhilgoyal_", "garimachawla1997", "familytimes_"];

  for (let username of userNames) {
    await page.goto(`https://instagram.com/${username}`);
    await page.waitForSelector("img");

    const imgSrc = await page.$eval("img", (el) => el.getAttribute("src"));
    const headerData = await page.$eval("header li", (els) =>
      els.map((el) => el.textContent)
    );
    const name = await page.$eval("header h1", (el) => el.textContent);
    const desc = await page.$$eval("span", (els) => els[4].textContent);
    const profile = { imgSrc, headerData, name, desc };

    console.log({ profile });
  }

  await browser.close();
})();
