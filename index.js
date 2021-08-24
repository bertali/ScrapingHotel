const puppeteer = require('puppeteer');
const path = require('path');
const websites = require('./websites.json');

(async () => {
    try {
        
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        for (const website of websites) {
            const scriptPath = path.join(__dirname, 'scripts', website.scriptName);
            await require(scriptPath)(page, website); 
        }

        await browser.close();

    } catch (err) {
        console.log(err);
    }
 
})();