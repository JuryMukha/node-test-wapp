const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoianVyeTEyMzQ1IiwiYSI6ImNrOXd4ZzVpbzBkY3czZXFzemd6YW0zaWwifQ.ExOLw4tI4thAWYfHiFNNEQ";

  request(
    url,
    {
      json: true,
    },
    (error, response, { features } = []) => {
      console.log(features);
      if (error) {
        callback('Could not connect to geocoding services.');
      } else if (features.length === 0) {
        callback('Address is not valid. Try another serach.');
      } else {
        callback(null, {
          latitude: features[0].center[1],
          longtitude: features[0].center[0],
          location: features[0].place_name
        });
      }
    }
  );
};

module.exports = geocode;
