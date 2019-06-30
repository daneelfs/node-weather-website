const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/a4ea57a4f8397dfd8b311dee07f05fa0/" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "?units=si";
    request({url, json: true}, (error, {body}) => {
    // const data = JSON.parse(response.body); before using json: true
    // console.log(response.body.currently);
        if(error)
            callback("Unable to connect weather", undefined);
        else if(body.error){
            callback("Unable to find location", undefined);
        }    
        else{
            callback(undefined, {
                degrees: body.currently.temperature,
                precipProb : body.currently.precipProbability,
                forecast: body.currently.summary
            });
        }    
    });
};

module.exports = {forecast};