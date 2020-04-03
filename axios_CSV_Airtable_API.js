
let Airtable = require('airtable');
let base = new Airtable({ apiKey: 'key8rWl8yeyClgnB9' }).base('appQLsZCb4sEYy821');
let table = base.table('Sales_Import')
const axios = require('axios');
                        
    // Init variables
    
    var app_id = "appQLsZCb4sEYy821";
    var app_key = "key8rWl8yeyClgnB9";
    this.items = []
axios.get(
        "https://api.airtable.com/v0/appQLsZCb4sEYy821/Sales_Import?'",
        { 
            headers: { Authorization: "Bearer "+app_key } 
        }
    ).then(function(response){
        console.log(response.data.records[0].fields)
      
    }).catch(function(error){
        console.log(error)
    })
axios.post("https://api.airtable.com/v0/appQLsZCb4sEYy821/Sales_Import?'"), {
    

}