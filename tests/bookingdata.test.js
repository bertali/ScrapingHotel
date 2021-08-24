const utils = require('../scripts/utils');

it('should sum', async () => {
    
    const resSum =  utils.sum ([2,1]);

    expect(resSum).toBe(3);
});


it('should convert date', async () => {
    
    const resConvertDate =  utils.convertDate ('08 Jan 2022', 'YYYY-MM-DD');

    expect(resConvertDate).toBe('2022-1-8');
});