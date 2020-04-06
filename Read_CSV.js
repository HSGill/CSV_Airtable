
const fs = require('fs');
const csv = require('csv-parser');


let read_CSV =  async function read_csv() {
    let pPromise = new Promise((resolve, reject) => {
      let rows = [];
      fs.createReadStream('./Analyse Sales_harry.txt')
        .pipe(csv())
        .on('data', (data) => {
          rows.push(data);
          //console.log(rows);
        })
        .on('end', () => {
           console.log('CSV file successfully processed');

          resolve(rows);
  
        }).on('error', (err) => {
          console.log(err,'err')
          reject(err);
        })
    })
  
    let returnedValue = await Promise.resolve(pPromise);
  
    return returnedValue;
    //console.log(pPromise);
  }

  read_CSV().then(console.log);