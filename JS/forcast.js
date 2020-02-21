const accuWeatherKey = "POH4h9z16ytixaykpK39wufBIDt90v8J";
const openWeatherKey = "eca8d91809f3ed63a7b5e27cda1fb072";
const weatherURI = "http://dataservice.accuweather.com/currentconditions/v1/";

const getIpInfo = async () => {
  let response = await fetch("https://ipapi.co/json/");
  let data = await response.json();

  return data;
};

const getCity = async () => {
  const loc = await getIpInfo();
  const cityURI =
    "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${accuWeatherKey}&q=${loc.city}`;

  const response = await fetch(cityURI + query);
  const data = await response.json();
  return data[0];
};

const getCurrentAccuWeahter = async id => {
  const query = `${id}?apikey=${accuWeatherKey}`;
  const response = await fetch(weatherURI + query);
  const data = await response.json();
  return data[0];
};

const getCurrentOpenWeahter = async () => {
  const loc = await getIpInfo();
  const query = `http://api.openweathermap.org/data/2.5/weather?lat=${loc.latitude}&lon=${loc.longitude}&units=metric&appid=${openWeatherKey}`;
  const response = await fetch(query);
  const data = await response.json();
  return data;
};

const getWeekWeahter = async id => {
  weekWeatherURI =
    "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
  const query = `${id}?apikey=${accuWeatherKey}`;
  const response = await fetch(weekWeatherURI + query);
  const data = await response.json();
  return data;
};

const getDailyAndHourlyOpenWeahter = async () => {
  const loc = await getIpInfo();
  const query = `http://api.openweathermap.org/data/2.5/forecast?lat=${loc.latitude}&lon=${loc.longitude}&units=metric&appid=${openWeatherKey}`;
  const response = await fetch(query);
  const data = await response.json();

  return data;
};
