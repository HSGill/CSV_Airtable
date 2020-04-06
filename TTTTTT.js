const neatCsv = require('neat-csv');


const fs = require('fs')

fs.readFile('./Analyse Sales_harry.txt', async (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(await neatCsv(data))
})