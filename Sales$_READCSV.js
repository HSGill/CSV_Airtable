const fs = require('fs');
const csv = require('csv-parser');
let Airtable = require('airtable');
let base = new Airtable({ apiKey: 'key8rWl8yeyClgnB9' }).base('appQLsZCb4sEYy821');
let table = base.table('Sales$')

//function to read CSV File
async function read_csv() {
    let pPromise = new Promise((resolve, reject) => {
        let rows = [];
        fs.createReadStream('./Analyse Sales [Spreadsheet].txt')
            //.pipe(csv())
            .pipe(csv({ delimiter: ',', skipLines: 10 }))
            .on('data', (data) => {
                console.log(data)
        
            })
            .on('end', () => {
                // console.log('CSV file successfully processed');
                resolve(rows);

            }).on('error', (err) => {
                reject(err);
            })
    })
    let returnedValue = await Promise.resolve(pPromise);
    //console.log(returnedValue);
    return returnedValue;
    //console.log(pPromise);
};

read_csv();
