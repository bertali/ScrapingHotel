function sum(input){
             
    if (toString.call(input) !== "[object Array]")
       return false;
         
        var total =  0;
        for(var i=0;i<input.length;i++)
        {
            if(isNaN(input[i])){
                continue;
                }
              total += Number(input[i]);
        }
              return total;
        }
             

   exports.sum = sum;

 

function convertDate(inputDate, outputformat){
    let outputdate;
    if (outputformat == 'YYYY-MM-DD'){

        let date = new Date(inputDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        day = day + '';
        if ( day.length == 1) {
            day = '0'+day;
        }
        
        month = month + '';
        if ( month.length == 1) {
            
            month = '0'+month;
        }

        outputdate = [year, month, day].join('-');
    }

    return outputdate;
}

exports.convertDate = convertDate;







