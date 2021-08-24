const path = require('path');
const fs = require('fs');
const utils = require('./utils');



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
        
        const [checkinDateSelector] = await page.$x('/html/body/div[3]/div/div[2]/div[1]/header/div[1]/p/span[2]');
        const checkinDateProp = await checkinDateSelector.getProperty('textContent');
        const checkinDateTxt = await checkinDateProp.jsonValue();

        const checkInDate = utils.convertDate (checkinDateTxt, 'YYYY-MM-DD');

        console.log({checkInDate}); 


        const [checkoutDateSelector] = await page.$x('//*[@id="applicationHost"]/div/div[2]/div[1]/header/div[1]/p/span[3]');
        const checkoutDateProp = await checkoutDateSelector.getProperty('textContent');
        const checkoutDateTxt = await checkoutDateProp.jsonValue();

        const checkOutDate = utils.convertDate (checkoutDateTxt, 'YYYY-MM-DD');

        console.log({checkOutDate});

    
        await page.waitForXPath(selectors.totalAdults);
        const [totalAdults] = await page.$x(selectors.totalAdults);
        const numAdultsProp = await totalAdults.getProperty('textContent');
        const numAdultsTxt = await numAdultsProp.jsonValue();
        const numAdults = Number(numAdultsTxt);


        await page.waitForXPath(selectors.totalChildren);
        const [totalChildren] = await page.$x(selectors.totalChildren);
        const numChildrenProp = await totalChildren.getProperty('textContent');
        const numChildrenTxt = await numChildrenProp.jsonValue();
        const numChildren = Number(numChildrenTxt);

       
        const totalGuests = utils.sum ([numAdults,numChildren]);
        

        const siteLanguage = await page.evaluate(()=>{
        const language = document.querySelector('html').lang;
        return language

        });
        

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


        function findBy(arr, key, comparatorFn) {
            return arr.reduce(function(prev, curr, index, arr) { 
              return comparatorFn.call(arr, prev[key], curr[key]) ? prev : curr; 
            });
          }
          
        function minComp(prev, curr) {
            return prev < curr;
          }


        function getMinPrice() {
            const price = [];
            roomsPrices.forEach(roomPrice => {
                let obj = {source: roomPrice, target: Number(roomPrice.replace(/EUR/g, ''))};
                return price.push(obj);
            });

            return findBy(price, 'target', minComp).source.trim();
        };
        
        const minPrice = getMinPrice();

        console.log(minPrice);

        function getSymbol (currency) {
            return currency.replace(/\d+./g, '').trim();
        };

        const symbol = getSymbol (minPrice);

        console.log(symbol);



      await page.exposeFunction('listInfoHotel', () => {
          console.log("holi");
          const bookingInfo = ({checkInDate, checkOutDate, minPrice, symbol, numAdults, numChildren, totalGuests, siteLanguage });
          return bookingInfo;
      });


      const bookingInfo = await page.evaluate(() => {
          return listInfoHotel();
      });

      fs.writeFileSync(
          path.join(__dirname,`${website.scriptName}.json`), JSON.stringify(bookingInfo),'utf8'
      );

      
};