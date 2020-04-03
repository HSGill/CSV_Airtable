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
    let monthN = month[d.getMonth()-2]; 
 let itemNumber= {
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
     '114082':'recs303Rr9JLlpnic',
     '114092':'recKzrIh9qVslMBSE'
} 

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


  //console.log(records);

  

//console.log(itemRecord());

/* //get Record IDs

let records = []
let itemNumber = {};

// called for every page of records
const processPage = (partialRecords, fetchNextPage) => {
  records = [...records, ...partialRecords]
 
  fetchNextPage()
}

// called when all the records have been retrieved
const processRecords = (err) => {
  if (err) {
    console.error(err)
    return
  }
 //console.log(records)

 records.forEach(record => {

  itemNumber[record._rawJson.id] = record._rawJson.fields['Item #']
})
//console.log(itemNumber)
  //process the `records` array and do something with it */
// called for every page of records
/* let records = []
let itemNumber = {};
const processPage = (partialRecords, fetchNextPage) => {
  records = [...records, ...partialRecords]
 
  fetchNextPage()
}

// called when all the records have been retrieved
const processRecords = (err) => {
  if (err) {
    console.error(err)
    return
  }
//console.log(records)
records.forEach(record => {

  itemNumber[record._rawJson.fields['Item #']] =record._rawJson.id;
})
console.log(itemNumber)
  //process the `records` array and do something with it
}

table.select({
    view: 'Grid view'
}).eachPage(processPage, processRecords)
 */
  read_csv().then(async (rows) => {

   // The Airtable API allows you to batch 10 records together at a time
  // so we can take chunks of ten rows, format each one, package and send
  let i, j, chunk;
  let size = 10;
  for (i = 0, j = rows.length; i < j; i += size) {
    chunk = rows.slice(i, i + size);
console.log(chunk);
    // format each record in our chunk to match 
    // I'm taking two fields from our CSV
    // and creating new records using those
    // change the field names here to map to your CSV and Airtable Base
    //console.log((rows[2]))
//console.log(chunk);
//console.log(itemNumber['Bas305'])
    let payload =chunk.map((r) => {
      // console.log(recordID.map(i => i['0']))
      //console.log(itemRecord['HELLO', r['Item No.']]);
      
      let p = monthN;
      console.log(p);

      //console.log(itemNumber[r['Item No.']])

      return {
        'id':itemNumber[r['Item No.']],
        'fields': {
          'Item #': r['Item No.'],
           'April':  Number(r['January']),
           'Test' :p
         
        }
      }
    });

   // console.log(payload[0].fields)
    // make the request
    try {
      
      //console.log(payload[0])
     // await table.update(records.forEach(record => console.log(record.get('Item #'))))
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



 


