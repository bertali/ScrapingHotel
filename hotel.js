const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    const bookData = {}
    

const data = async (url) => {
    
    await page.goto ("https://www.secure-hotel-booking.com/smart/Star-Champs-Elysees/2YXB/en/");

    await page.waitForSelector("input.check-in-datepicker");
    await page.click("input.check-in-datepicker");
    await page.focus("input.check-in-datepicker");
    await page.type("input.check-in-datepicker", "05 Jan 2022", { delay: 200 });
    await page.keyboard.press("Enter");

    await page.waitForSelector("input.check-out-datepicker");
    await page.click("input.check-out-datepicker", { delay: 200 });
    await page.focus("input.check-out-datepicker");
    await page.click("input.check-out-datepicker", { clickCount: 3 });
    await page.keyboard.press("Backspace", { delay: 300 });
    await page.type("input.check-out-datepicker", "08 Jan 2022", { delay: 200 });
    await page.keyboard.press("Enter");

    await page.type("select#adults", "2", { delay: 400 });
    await page.type("select#children", "1", { delay: 500 });
    

    await page.click("a.this-button._skin-3._size-big._icon-right")

    await infoHotel()

    };




    const infoHotel = async() => {
    await page.waitForSelector("input.check-out-datepicker")
    await page.waitForTimeout(2000)
        
        const [checkinDate] = await page.$x('/html/body/div[3]/div/div[2]/div[1]/header/div[1]/p/span[2]');
        const checkinDateProp = await checkinDate.getProperty('textContent');
        const checkinDateTxt = await checkinDateProp.jsonValue();
        dataBooking.checkIn = this.replaceDateFormat(checkinDateTxt);
        

        console.log({checkinDateTxt}); 


        const [checkoutDate] = await page.$x('//*[@id="applicationHost"]/div/div[2]/div[1]/header/div[1]/p/span[3]');
        const checkoutDateProp = await checkoutDate.getProperty('textContent');
        const checkoutDateTxt = await checkoutDateProp.jsonValue();
        const checkOut = JSON.stringify(checkoutDateTxt);

        console.log({checkOut});


        const [numAdults] = await page.$x('/html/body/div[3]/div/div[2]/div[1]/header/div[1]/p/span[4]/span[1]');
        const numAdultsProp = await numAdults.getProperty('textContent');
        const numAdultsTxt = await numAdultsProp.jsonValue();
        dataHotel.adults = JSON.stringify(numAdultsTxt)

        console.log({numAdultsTxt});

        const [numChildren] = await page.$x('/html/body/div[3]/div/div[2]/div[1]/header/div[1]/p/span[4]/span[4]/span[1]');
        const numChildrenProp = await numChildren.getProperty('textContent');
        const numChildrenTxt = await numChildrenProp.jsonValue();
        dataHotel.children = JSON.stringify(numChildrenTxt)

        console.log({numChildrenTxt});

        const siteLanguage = await page.evaluate(()=>{
        const language = document.querySelector('html').lang
        return language

        });

        console.log(siteLanguage);

        await page.waitForSelector("guests.selectedAdultCount())", "guests.selectedChildCount())")
        function guestsSum() {
            const totalGuests = [];
            guestsSum.forEach(guest => {
                return totalGuests.push(guest.innerText);
            });
            return guestsSum();
        }

        console.log (guestsSum)
        

       
        await page.waitForSelector('.room-rates-item-price-moy');
        const rates = await page.evaluate(() => {
        const rates = document.querySelectorAll('.room-rates-item-price-moy');
        let arrRates = [];
        rates.forEach(rate => {
            arrRates.push(rate.innerText.replace('€', ' EUR'));
        });
        return arrRates;
    });

    console.log(rates);

    await page.waitForSelector(".filters-date")

    replaceDateFormat(date) ;{
        let time = new Date (".filters-date");
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate().slice(-2);

        let fullDate = [year, month, day]
        
        return fullDate.join('-')
    };

    


    function lowestRateOffered() {
        const lowestRate = [];
        rates.forEach(rate => {
            return lowestRate.push(rate.replace(/EUR/g, ''));
        });
        let stringToInt = lowestRate.map(Number);
        const minRate = stringToInt.sort(function(a, b) { return a - b; });
        return minRate[0];
    };

    const lowestPrice = lowestRateOffered();

    console.log(lowestPrice);


    const currencyCode = await page.evaluate(() =>{

        let currencySymbols = {
        '€':'EUR',
        '$':'USD', 
        '£':'GBP', 
        'CHF': 'Swiss franc',
        '¥':'JPY',
        'AUD': 'Australian dolar',
        'CAD': 'Canadian Dolar'
        };

        const allPrices = document.querySelectorAll('.room-rates-item-price-moy')

        let arrPrices = []
        allPrices.forEach(item =>{
          arrPrices.push(item.innerText)
        })

        let currencySymbol = arrPrices[0].replace(/[\d\., ]/g, '')

        let symbols = Object.keys(currencySymbols)
        
        let symbol = symbols.filter(item =>{
          return item == currencySymbol
        })

        return currencySymbols[symbol]
    
      });

      console.log(currencyCode)


};
