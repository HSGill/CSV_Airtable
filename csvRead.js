const fs = require('fs'); 
const csv = require('csv-parser');
const results = [];

fs.createReadStream('./file.csv')
.pipe(csv())
.on('data', function(data){
    try {
        //perform the operation
        
        results.push(data);

    }
    catch(err) {
        //error handler
        console.log(err);
    }
})
.on('end',function(){
    //some final operation
   // console.log('Unable to read CSV file');
   console.log(results[0]);
let  d =    parseInt(results[0].May);

   console.log(typeof( results[0].May));

   console.log(d);
   console.log(typeof(d))
  });  


  