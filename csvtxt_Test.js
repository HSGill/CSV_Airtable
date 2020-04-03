const fs = require('fs');
const csv = require('csv-parser');


//function to read CSV File
 async function read_csv() {
  let pPromise = new Promise((resolve, reject) => {
    let rows = [];
    fs.createReadStream('./MarSales2TXT.txt')
      .pipe(csv())
      .on('data', (data) => {
        rows.push(data);
        //console.log(rows);
      })
      .on('end', () => {
        // console.log('CSV file successfully processed');
        resolve(rows);

      }).on('error', (err) => {
        reject(err);
      })
  })

  let returnedValue = await Promise.resolve(pPromise);

  return returnedValue;
  //console.log(pPromise);
}

read_csv().then(resp =>console.log(resp))