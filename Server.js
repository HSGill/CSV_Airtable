
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key8rWl8yeyClgnB9'}).base('appQLsZCb4sEYy821');

base('Sales_Import').destroy(['rec7cv7BMVMK71eTJ'], function(err, fields ) {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Deleted', fields.log, 'records');
  });

/* 
base('Sales_Import').create([
{
    "fields":{
        "id" :"fldXoUdovfwBHYrCV",
        "deleted": true

    }
}

], function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function (record) {
      console.log(record.getId());
    });
}); */