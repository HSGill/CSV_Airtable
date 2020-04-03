
let Airtable = require('airtable');
let base = new Airtable({ apiKey: 'key8rWl8yeyClgnB9' }).base('appQLsZCb4sEYy821');
let table = base.table('Sales_Import')


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
console.log(records)
  //process the `records` array and do something with it
}

table.select({
    view: 'Grid view'
}).eachPage(processPage, processRecords)


