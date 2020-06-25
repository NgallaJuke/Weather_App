const accuWeatherKey = "";
const openWeatherKey = "";
const geolocaKey = "82058c447167c6";
const weatherURI = "http://dataservice.accuweather.com/currentconditions/v1/";

const getIpInfo = async () => {
  let response = await fetch("https://ipapi.co/json/");
  let data = await response.json();
  return data;
};

let getCity = async () => {
  const loc = await getIpInfo();
  const cityURI =
    "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${accuWeatherKey}&q=${loc.city}`;
  const response = await fetch(cityURI + query);
  const data = await response.json();
  return data[0];
};

const getCurrentAccuWeahter = async (id) => {
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
const getCurrentOpenWeahter_city = async (city) => {
  const cityCoords = await fetch(
    `https://eu1.locationiq.com/v1/search.php?key=${geolocaKey}&q=${city}&format=json`
  );
  const data1 = await cityCoords.json();
  console.log("cityCoords", data1);

  const query = `http://api.openweathermap.org/data/2.5/weather?lat=${data1[0].lat}&lon=${data1[0].lon}&units=metric&appid=${openWeatherKey}`;
  const response = await fetch(query);
  const data = await response.json();
  return data;
};

const getWeekWeahter = async (id) => {
  weekWeatherURI =
    "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
  const query = `${id}?apikey=${accuWeatherKey}`;
  const response = await fetch(weekWeatherURI + query);
  const data = await response.json();
  return data;
};

const getHourWeahter = async (id) => {
  hourWeatherURI =
    "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/";
  const query = `${id}?apikey=${accuWeatherKey}`;
  const response = await fetch(hourWeatherURI + query);
  const data = await response.json();
  return data;
};

const getDailyAndHourlyOpenWeahter = async (city, date) => {
  const loc = await getIpInfo();
  const query = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${openWeatherKey}`;
  const response = await fetch(query);
  const datas = await response.json();
  let array = [];
  datas.list.forEach((data) => {
    if (date === data.dt_txt.substring(0, 10)) array.push(data);
  });
  console.log("ARRAY", array);

  return array;
};
