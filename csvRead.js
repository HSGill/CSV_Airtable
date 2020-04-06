const fs = require('fs');
const csv = require('csv-parser');
let Airtable = require('airtable');
let base = new Airtable({ apiKey: 'key8rWl8yeyClgnB9' }).base('appQLsZCb4sEYy821');
let table = base.table('Sales_Import')

let month = ["January",
  "February",
  'March',
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"]
let d = new Date();
let monthN = month[d.getMonth() - 1];
/* let itemNumber= {
'Bas305':'recRkuTkM9tFqHYwv'   ,
'Bas202':'recLKHISKUyAM3MMl'  ,
'1002A' :'recz8VjoGtHzxJmwE' ,
'114004':'recVarUrEYohAvswv'   ,
'114005':'recM4KvrXDEucPsIf'  ,
'114009':'recO1EtBvX5aCp6J6'  ,
'114027':'recvB4On9uk61Gsfu'  ,
'114034':'recvrd0qUlKWcC0z7'  ,
'114054':'rec3IUSqSJh3t3mug'  ,
'114057':'recI4Q7hcaAwApnPh',
    '114060':'recCsERod3EdEwW1U',
    '114063':'recitmdqZ3F5fEl97',
    '114068':'rec7jXFnLqHdT7MRM',
    '114073':'recLn5w6haFsICZYf',
    '114074':'recCHcZEHc7qxwTGS',
    
    '114092':'recKzrIh9qVslMBSE'
}  */

//function to read CSV File
async function read_csv() {
  let pPromise = new Promise((resolve, reject) => {
    let rows = [];
    fs.createReadStream('./file.txt')
      //.pipe(csv())
      .pipe(csv({ delimiter: ',', skipLines: 9 }))
      .on('data', (data) => {
        //console.log(data)

        if (Object.keys(data).length != 0) {
          rows.push(data);
        }
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
  //console.log(returnedValue);
  return returnedValue;
  //console.log(pPromise);
}
//console.log(records);

//console.log(itemRecord());

read_csv().then((rows) => {

  let itemNumber = {};
  base('Sales_Import').select({
    // Selecting the first 3 records in Grid view:

    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function (record) {
      itemNumber[record.get('Item #')] = record.id;
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();
    //   console.log(itemNumber);

  }, function done(err) {
    //console.log(err);
    //console.log(Object.keys(itemNumber).length);

    // The Airtable API allows you to batch 10 records together at a time
    // so we can take chunks of ten rows, format each one, package and send
    let i, j, chunk;
    let size = 10;
    for (i = 0, j = rows.length; i < j; i += size) {
      chunk = rows.slice(i, i + size);

      for(j=0;j<chunk.length;j++){
        console.log(chunk[j]['Item No.']);
        if(chunk[j]['Item No.']!=itemNumber['Item #']){
          //console.log(chunk[j]['Item No.'])
        }
      }
      // format each record in our chunk to match 
      // I'm taking two fields from our CSV
      // and creating new records using those
      // change the field names here to map to your CSV and Airtable Base


      let payload = chunk.map((r) => {
        //let p = monthN;
        //console.log(r['Item No.'])
        // console.log(itemNumber[r['Item No.']])
        //if(Object.keys(itemNumber).length!=0){

          if(!itemNumber[r['Item No.']]) {
            itemNumber[r['Item No.']] ='recNaCAdRKuLmuCh5'
          }
        return {
          'id': itemNumber[r['Item No.']],
          'fields': {
            "Item #": r['Item No.'],
            'API_(Recent_Month)': Number(r['Units Sold']),
          }
        }
      });

      //console.log(payload[0].fields,payload[1])
      // make the request
      try {
        //console.log(payload)
        // await table.update(records.forEach(record => console.log(record.get('Item #'))))
        table.update(payyload);
      } catch (err) {
        throw err;
      }
    }

    // log all complete
    console.log("All records Updated");
  })

});












