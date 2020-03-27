var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key8rWl8yeyClgnB9'}).base('appQLsZCb4sEYy821');
let recordTOUpdate = [25,65,];

let payload = []
base('Sales_Import').update([
  {
    "id": "recRkuTkM9tFqHYwv",
    "fields": {
      "Item #": "Bas305",
      "Mar 20": 100,
      "Feb 20": 29,
      "Jan 20": 49,
      "Dec 19": 250
    }
  },
  {
    "id": "recLKHISKUyAM3MMl",
    "fields": {
      "Item #": "Bas202",
      "Mar 20": 200,
      "Feb 20": 120,
      "Jan 20": 130,
      "Dec 19": 150
    }
  }
], function(err, records) {
  if (err) {
    console.error(err);
    return;
  }
  records.forEach(function(record) {
    console.log(record.get('Item #'));
  });
});








async function read_csv(){

let pPromise = new Promise((resolve,reject)=>{
    let rows = [];

  fs.createReadStream('./file.csv')
  .pipe(csv())
  .on('data', (data) => {
    rows.push(data);
    //console.log(rows);
  })
  .on('end', () => {
   // console.log('CSV file successfully processed');
   resolve(rows);

  }).on('error', (err) =>{
    reject(err);
  })
})
 
let returnedValue = await Promise.resolve(pPromise);

return returnedValue;
  //console.log(pPromise);

}