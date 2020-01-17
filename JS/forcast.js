const key = "POH4h9z16ytixaykpK39wufBIDt90v8J";
const weatherURI = "http://dataservice.accuweather.com/currentconditions/v1/";

const getCity = async city => {
  const cityURI =
    "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(cityURI + query);
  const data = await response.json();
  return data[0];
};

const setGeolocation = () => {
  // enable the geolocalisation by the navigator
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  }
};

const getCurrentWeahter = async id => {
  const query = `${id}?apikey=${key}`;
  const response = await fetch(weatherURI + query);
  const data = await response.json();
  return data[0];
};

const getWeekWeahter = async id => {
  weekWeatherURI =
    "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
  const query = `${id}?apikey=${key}`;
  const response = await fetch(weekWeatherURI + query);
  const data = await response.json();
  return data.DailyForecasts;
};

const getHourWeahter = async id => {
  hourWeatherURI =
    "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/";
  const query = `${id}?apikey=${key}`;
  const response = await fetch(hourWeatherURI + query);
  const data = await response.json();
  return data;
};

const setPosition = async position => {
  const geoURi =
    "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search";
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const query = `?apikey=${key}&q=${latitude},${longitude}`;
  const response = await fetch(geoURi + query);
  const data = await response.json();
  const city = data.AdministrativeArea.EnglishName;
  console.log("data", data);
  updateCurrentWeather(city);
  updateWeeklyWeather(city);
  updateHourlyWeather(city);
};

const showError = err => {
  console.log(err);
};
