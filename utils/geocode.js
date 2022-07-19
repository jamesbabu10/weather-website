const request = require("request");
const geocode = (address, callback) => {
  const url2 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiamFtZXNkYXNkYXNkIiwiYSI6ImNsM3F6d3F1aDFjNzMzaW9ldWswa2ZvY2sifQ.XVGhZ4GiXkJbyUO9EjAXSQ&limit=1`;
  request({ url: url2, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect", undefined);
    } else if (response.body.features.length == 0) {
      callback("unable to find location,try different location", undefined);
    } else {
      callback(undefined, {
        lat: response.body.features[0].center[1],
        long: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
