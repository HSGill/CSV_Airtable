var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key8rWl8yeyClgnB9'}).base('appQLsZCb4sEYy821');
let recordNumber = [];


base('Sales_Import').select({
  // Selecting the first 3 records in Grid view:
  view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
  // This function (`page`) will get called for each page of records.

  records.forEach(function(record) {
      recordNumber.push(record.get('Item #'));
  });

  // To fetch the next page of records, call `fetchNextPage`.
  // If there are more records, `page` will get called again.
  // If there are no more records, `done` will get called.
  fetchNextPage();

}, function done(err) {
  if (err) { console.error(err); return; }
});

console.log(recordNumber)
/* 
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
"fields":{
  "Mar 20":returnedResult
    }
  },

  {
    "id" : "recz8VjoGtHzxJmwE",
    "fields": {"Dec 19": 55}
  }
  

], function(err, records) {
  if (err) {
    console.error(err);
    return;
  }
  records.forEach(function(record) {
    console.log(record.get('Item #'));
  });
}); */