it('should load', async () => {
    page.goto("https://www.secure-hotel-booking.com/smart/Star-Champs-Elysees/2YXB/en/")

    const title = await page.title();

    expect(title).toBe("Hotel");
});


it('should load', async () => {
    page.goto("https://www.secure-hotel-booking.com/smart/Star-Champs-Elysees/2YXB/en/")

    const totalAdults = await page.$$eval("#applicationHost > div > div.page-background > div.page-main.page-host > header > div.filters-wrapper.mtn.mbs > p > span.filters-occupancy > span:nth-child(1)");
    
    expect(totalAdults).toBe("2");
});