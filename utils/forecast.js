const request = require("request");
const forecast = function (long, lat, callback) {
  const url1 = `http://api.weatherstack.com/current?access_key=1bb44d1ae1084ec908514ca4519ee644&query=${lat},${long}&units=s`;
  const errorurl =
    "http://api.weatherstack.com/current?access_key=1bb44d1ae1084ec908514ca4519ee644&query=&units=s";
  request({ url: url1, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect", undefined);
    } else if (response.body.error) {
      callback("unable to find location,try different location", undefined);
    } else {
      callback(undefined, response.body);
    }
  });
};
module.exports = forecast;
