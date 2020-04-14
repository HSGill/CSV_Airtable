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

read_csv().then((rows) => {
    let itemNumber = {};
    base('Sales$').select({
        // Selecting the first 3 records in Grid view:
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
            itemNumber[record.get('Name')] = record.id;
        });
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
        //   console.log(itemNumber);

    }, function done(err) {
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
            //console.log(result[0]);
            console.log(result[0]['April'])
            //if(result.length=0){return 'Nothing to update'}
            if (result.length > 0) {
                let payload = result.map((r) => {
                    //console.log(chunk)
                    //let p = monthN;
                    //console.log(r['Item No.'])
                    //console.log(itemNumber[r['Item No.']])
                    //if(Object.keys(itemNumber).length!=0){
                    //console.log(itemNumber)
                    //console.log(itemNumber[r['Item No.']]!=undefined)
                    console.log(r['April'])
                   let field1 = r['April'].replace(/\$/g, '');
                  console.log(field1);
                    //console.log(field1);
                    return {
                        'id': itemNumber[r['Item No.']],
                        'fields': {
                            '$M01': Number(field1)
                           /*'$M02': Number(r['May']),
                            '$M03': Number(r['June']),
                            '$M04': Number(r['July']),
                            '$M05': Number(r['August']),
                            '$M06': Number(r['September']),
                            '$M07': Number(r['October']),
                            '$M08': Number(r['November']),
                            '$M09': Number(r['December']),
                            '$M010': Number(r['January']),
                            '$M011': Number(r['February']),
                            '$M012': Number(r['March']) */
                        }
                    }
                });
                try {
                    //console.log(payload)
                    // await table.update(records.forEach(record => console.log(record.get('Item #'))))
                    //console.log("Working")
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




