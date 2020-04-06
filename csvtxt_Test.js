var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key8rWl8yeyClgnB9'}).base('appQLsZCb4sEYy821');

let itemNumber ={};
base('Sales_Import').select({
    // Selecting the first 3 records in Grid view:
   
    view: "Grid view"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        itemNumber[record.get('Item #')] = record.id;
        console.log(itemNumber);
    });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});