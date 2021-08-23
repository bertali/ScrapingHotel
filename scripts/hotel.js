const path = require('path');
const fs = require('fs');

module.exports = async(page, website) => {
    const { selectors } = website;

    await page.goto(website.url);
    await page.waitForSelector(selectors.checkIn);
    await page.click(selectors.checkIn);
    await page.focus(selectors.checkIn);
    await page.type(selectors.checkIn, "05 Jan 2022", { delay: 200 });
    await page.keyboard.press("Enter");

    await page.waitForSelector(selectors.checkOut);
    await page.click(selectors.checkOut, { delay: 200 });
    await page.focus(selectors.checkOut);
    await page.click(selectors.checkOut, { clickCount: 3 });
    await page.keyboard.press("Backspace", { delay: 300 });
    await page.type(selectors.checkOut, "08 Jan 2022", { delay: 200 });
    await page.keyboard.press("Enter");

    await page.type(selectors.adults, "2", { delay: 400 });
    await page.type(selectors.children, "1", { delay: 500 });
    

    await page.click("a.this-button._skin-3._size-big._icon-right")



    await page.waitForSelector("input.check-out-datepicker")
    await page.waitForTimeout(2000)
        
        const [checkinDate] = await page.$x('/html/body/div[3]/div/div[2]/div[1]/header/div[1]/p/span[2]');
        const checkinDateProp = await checkinDate.getProperty('textContent');
        const checkinDateTxt = await checkinDateProp.jsonValue();
        const checkIn = JSON.stringify(checkinDateTxt).replace(/\"/g, '');

        console.log({checkIn}); 


        const [checkoutDate] = await page.$x('//*[@id="applicationHost"]/div/div[2]/div[1]/header/div[1]/p/span[3]');
        const checkoutDateProp = await checkoutDate.getProperty('textContent');
        const checkoutDateTxt = await checkoutDateProp.jsonValue();
        const checkOut = JSON.stringify(checkoutDateTxt).replace(/\"/g, '');

        console.log({checkOut});

        await page.waitForSelector('.filters-date');
        let date = checkoutDateTxt.format('DD-MM-YYYY')
        /* let year = date.getFullyYear(); */
        /* function newOrderDate(){
            let year = date.getFullyYear();
            let month = ("0" + (date.getFullyMonth() + 1)).slice(-2);
            let day = ("0" + date.getDate()).slice(-2);

            let fullDate = [year, month, day]
            
            return fullDate.join('-')
            }  */ 

        console.log(date); 

        /* let year = d.getFullYear();
        let monthConverter = d.getMonth(); 
        let month = monthConverter + 1;
        let day = d.getDate();  */


        await page.waitForXPath(selectors.totalAdults);
        const [numAdults] = await page.$x(selectors.totalAdults);
        const numAdultsProp = await numAdults.getProperty('textContent');
        const numAdultsTxt = await numAdultsProp.jsonValue();
        const adults = JSON.stringify(numAdultsTxt)

        console.log({numAdultsTxt});

        await page.waitForXPath(selectors.totalChildren);
        const [numChildren] = await page.$x(selectors.totalChildren);
        const numChildrenProp = await numChildren.getProperty('textContent');
        const numChildrenTxt = await numChildrenProp.jsonValue();
        const children = JSON.stringify(numChildrenTxt)

        console.log({numChildrenTxt});

       function sum () {
           return parseInt(numAdultsTxt) + parseInt(numChildrenTxt); 
       }
            console.log(sum());
         

        

        const siteLanguage = await page.evaluate(()=>{
        const language = document.querySelector('html').lang;
        return language

        });

        console.log(siteLanguage);

       
        await page.waitForSelector(selectors.roomsPrices);
        const roomsPrices = await page.evaluate(() => {
            let arrRoomsPrices = [];
            const roomsPrices = document.querySelectorAll('.room-rates-item-price-moy');
            roomsPrices.forEach(roomsPrices => {
                arrRoomsPrices.push(roomsPrices.innerText.replace('€', ' EUR'));
        });
            return arrRoomsPrices;
    });

    console.log(roomsPrices);


    function lowestRateOffered() {
        const lowestRate = [];
        roomsPrices.forEach(roomsPrices => {
            return lowestRate.push(roomsPrices.replace(/EUR/g, ''));
        });
        let stringToInt = lowestRate.map(Number);
        const minRate = stringToInt.sort(function(a, b) { return a - b; });
        return minRate[0];
    };
    const lowestPrice = lowestRateOffered();

    console.log(lowestPrice);

    await page.waitForSelector(selectors.roomsPrices);
    const currencyISO = await page.evaluate(() => {
        const currencyISO = document.querySelector('.room-rates-item-price-moy');
        const changeCode = currencyISO.innerText.replace(/\s*\u20ac\s*/ig, 'EUR');
        return currencyISOCode = changeCode.replace(/[0-9]/g, '');
    });

    console.log(currencyISO)


      await page.exposeFunction('listInfoHotel', () => {
          const bookingInfo = ({checkIn, checkOut, adults, children, siteLanguage, lowestPrice});
          return bookingInfo;
      });

      const bookingInfo = await page.evaluate(() => {
          return listInfoHotel();
      });

      fs.writeFileSync(
          path.join(__dirname,`${website.scriptName}.json`), JSON.stringify(bookingInfo),'utf8'
      );
};