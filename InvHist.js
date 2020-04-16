const fs = require('fs');
const csv = require('csv-parser');
let Airtable = require('airtable');
let base = new Airtable({ apiKey: 'key8rWl8yeyClgnB9' }).base('appQLsZCb4sEYy821');
let table = base.table('Teddytime Items')

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

            })
            .on('end', () => {
                // console.log('CSV file successfully processed');
                resolve(rows);
                console.log(rows);
            }).on('error', (err) => {
                reject(err);
            })
    })
    let returnedValue = await Promise.resolve(pPromise);
    //console.log(returnedValue);
    return returnedValue;
    //console.log(pPromise);
}
read_csv().then((rows) => {
    let itemNumber = {};
    //console.log(itemNumber)
    base('Teddytime Items').select({
        // Selecting the first 3 records in Grid view:
        view: "Full Item View"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
            itemNumber[record.get('Our Code')] = record.id;

        });
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
        //   console.log(itemNumber);

    }, function done(err) {
        //console.log(itemNumber);
        // The Airtable API allows you to batch 10 records together at a time
        // so we can take chunks of ten rows, format each one, package and send
        let i, j, chunk;
        let size = 10;
        for (i = 0, j = rows.length; i < j; i += size) {
            chunk = rows.slice(i, i + size);
            // format each record in our chunk to match 
            // I'm taking two fields from our CSV
            // and creating new records using those
            // change the field names here to map to your CSV and Airtable Base
            //console.log(chunk[0])
            //console.log(itemNumber)
            let result = chunk.filter(obj => itemNumber[obj['Item No.']]);
            //if(result.length=0){return 'Nothing to update'}
            console.log('Result', result[1]);
            if (result.length > 0) {
                let payload = result.map((r) => {
                    //console.log(chunk)
                    return {
                        'id': itemNumber[r['Item No.']],
                        'fields': {
                            'API_(Recent_Month)': Number(r['Units Sold']),
                        }
                    }
                });
                try {
                    //console.log(payload)
                    // await table.update(records.forEach(record => console.log(record.get('Item #'))))
                    console.log("TRY BLOCK")
                    table.update(payload);
                } catch (err) {
                    throw err;
                }
            }
            else {
                console.log("Nothing to update")
            }

            //console.log(payload[0].fields,payload[1])
            // make the request

        }
        // log all complete
        console.log("All records Updated Successfully");
    })
})

const fs = require('fs');
const csv = require('csv-parser');
let Airtable = require('airtable');
let base = new Airtable({ apiKey: 'key8rWl8yeyClgnB9' }).base('appQLsZCb4sEYy821');
let table = base.table('Teddytime Items')

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

            })
            .on('end', () => {
                // console.log('CSV file successfully processed');
                resolve(rows);
                console.log(rows);
            }).on('error', (err) => {
                reject(err);
            })
    })
    let returnedValue = await Promise.resolve(pPromise);
    //console.log(returnedValue);
    return returnedValue;
    //console.log(pPromise);
}

read_csv().then((rows) => {
    let itemNumber = {};
    //console.log(itemNumber)
    base('Teddytime Items').select({
        // Selecting the first 3 records in Grid view:
        view: "Full Item View"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
            itemNumber[record.get('Our Code')] = record.id;

        });
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
        //   console.log(itemNumber);

    }, function done(err) {
        //console.log(itemNumber);
        // The Airtable API allows you to batch 10 records together at a time
        // so we can take chunks of ten rows, format each one, package and send
        let i, j, chunk;
        let size = 10;
        for (i = 0, j = rows.length; i < j; i += size) {
            chunk = rows.slice(i, i + size);
            // format each record in our chunk to match 
            // I'm taking two fields from our CSV
            // and creating new records using those
            // change the field names here to map to your CSV and Airtable Base
            //console.log(chunk[0])
            //console.log(itemNumber)
            let result = chunk.filter(obj => itemNumber[obj['Item No.']]);
            //if(result.length=0){return 'Nothing to update'}
            console.log('Result', result[1]);
            if (result.length > 0) {
                let payload = result.map((r) => {
                    //console.log(chunk)
                    return {
                        'id': itemNumber[r['Item No.']],
                        'fields': {
                            'IN-M01': Number(r['Units Sold']),
                            'IN-M02': Number(r['Units Sold']),
                            'IN-M03': Number(r['Units Sold']),
                            'IN-M04': Number(r['Units Sold']),
                            'IN-M05': Number(r['Units Sold']), 
                            'IN-M06': Number(r['Units Sold']),
                            'IN-M07': Number(r['Units Sold']),
                            'IN-M08': Number(r['Units Sold']),
                            'IN-M09': Number(r['Units Sold']),
                            'IN-M10': Number(r['Units Sold']),
                            'IN-M11': Number(r['Units Sold']),
                            'IN-M12': Number(r['Units Sold']),

                    }
                });
                try {
                    //console.log(payload)
                    // await table.update(records.forEach(record => console.log(record.get('Item #'))))
                    console.log("TRY BLOCK")
                    table.update(payload);
                } catch (err) {
                    throw err;
                }
            }
            else {
                console.log("Nothing to update")
            }

            //console.log(payload[0].fields,payload[1])
            // make the request

        }
        // log all complete
        console.log("All records Updated Successfully");
    })
})




