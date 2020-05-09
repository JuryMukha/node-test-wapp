const request = require("postman-request");

const forecast = (lat, lng, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=d347521fa6ecb4100d484e7ba0b93624&query=' + lat  + ',' + lng;

  request(
    url,
    {
      json: true,
    },
    (error, response, { current: currentWeather }) => {
      if (error) {
        callback('Could not connect to weather services.', undefined);
      } else if (!currentWeather) {
        callback('Coordinates are not valid. Try another serach.', undefined);
      } else {
        callback(null, currentWeather.weather_descriptions[0] + '. It is currently ' + currentWeather.temperature + ' degress out. It feels like ' + currentWeather.feelslike + ' degress out.');
      }
    }
  );
};

module.exports = forecast;
