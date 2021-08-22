const puppeteer = require('puppeteer');
const websites = require('./websites.json');

(async() => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.setViewport({ width: 1200, height: 720 });

        for (const website of websites) {
            const scriptPath = path.join(__dirname, 'scripts', website.scriptName);
            await require(scriptPath)(page, website);
        }

        await browser.close();
    } catch (err) {
        console.log(err);
    }
})();