var request = require('postman-request')

var weather = (query,callback)=>{
    var api_key = '56613af82a6f2c650209b358aa2ffe1e'
    var url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${query}`
    request({url,json:true},(error,res,data)=>{
        if(error){
            callback('Connectivity Error',undefined)
        }
        else if(data.error){
            callback('Check the Location',undefined)
        }
        else{
            callback(undefined,data)
        }
    })
}

module.exports = weather