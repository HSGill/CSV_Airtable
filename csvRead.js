const fs = require('fs');
const csv = require('csv-parser');
let Airtable = require('airtable');
let base = new Airtable({ apiKey: 'key8rWl8yeyClgnB9' }).base('appQLsZCb4sEYy821');
let table = base.table('Sales_Import')

//function to read CSV File
async function read_csv() {
  let pPromise = new Promise((resolve, reject) => {
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

      }).on('error', (err) => {
        reject(err);
      })
  })

  let returnedValue = await Promise.resolve(pPromise);

  return returnedValue;
  //console.log(pPromise);
}
let recordID = [
  'recRkuTkM9tFqHYwv',
  'recLKHISKUyAM3MMl',
  'recz8VjoGtHzxJmwE',
  'recLLRjD4Rs5H4U6D',
  'rec17KU6Z0IF8yybE',
  'recjP7RbHjSanKEXc',
  'recKGc6N87ZQQBk8n',
  'rec3bxWua5R9QIxgH',
  'recz50ZzCOrSkfmbw',
  'recUsKp0ZQ6Liad6J',
  'recHxCaFqcoQr2qk2',
  'recRZxGXG2RuB7Cb2',
  'recPSnGZaJuAfcJSr']

read_csv().then(async (rows) => {
  // The Airtable API allows you to batch 10 records together at a time
  // so we can take chunks of ten rows, format each one, package and send
  let i, j, chunk;
  let size = 10;
  for (i = 0, j = rows.length; i < j; i += size) {
    chunk = rows.slice(i, i + size);

    // format each record in our chunk to match 
    // in this example, we are taking two fields from our CSV
    // and creating new records using those
    // You should change the field names here to map to your CSV and Airtable Base

    let payload = rows.map((r) => {
      // console.log(recordID.map(i => i['0']))
      console.log(r);
      return {
        'id': 'recRkuTkM9tFqHYwv',
        'fields': {
          'Item #': r['Item No.'],
          'Mar 20': Number(r['March'])
        }
      }
    });
    // make the request
    try {
      //console.log(payload[0])
      await table.update(payload);
    } catch (err) {
      throw err;
    }
  }

  // log all complete
  console.log("All records Updated");
})
  .catch((err) => {
    console.log("Error: ", err);
  })
