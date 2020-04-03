
let Airtable = require('airtable');
let base = new Airtable({ apiKey: 'key8rWl8yeyClgnB9' }).base('appQLsZCb4sEYy821');
let table = base.table('Sales_Import')

var express = require('express');
var app=express();

var loadGeneralItems = async function loadGeneralItems(table) {
    var recList = []
        await base(table).select().all()
        .then(
           (records) => {
            for (let i=0; i< records.length; i++)
    
           recList.push(records[i]._rawJson.fields)})
    
        .catch(function () {
          console.log("Promise Rejected");
    });
          return recList
    }

    

    app.get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    
      data = loadGeneralItems("Works")
    
      var dataPromise = Promise.resolve(data);
      dataPromise.then(function(jsonData) {
      res.write(JSON.stringify(jsonData));
    
      })