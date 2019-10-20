
const request = require("request")
const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/eaa53a91ac20e6eedc632ce3f2b79195/'+latitude+','+longitude

request({url,json: true}, (error,{body}) =>{
 if(error){
     callback('Unable to connect' , undefined)
 }
 else if(body.error){
     callback('unable to get weather information',undefined)
 }
 else {
     callback(undefined,body.daily.data[0].summary + "it is currently " +body.currently.temperature + " and there is " + body.currently.precipProbability +"% chance")
     
 }
})
}
module.exports = forecast