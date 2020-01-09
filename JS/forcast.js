const key = "POH4h9z16ytixaykpK39wufBIDt90v8J";
const weatherURI = "http://dataservice.accuweather.com/currentconditions/v1/";

const getCity = async city => {
  const cityURI =
    "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(cityURI + query);
  const data = await response.json();
  console.log("city detail", data[0]);
  return data[0];
};

const geolocationURI = async () => {
  const geoURi =
    "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search";

  // enable the geolocalisation by the navigator
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let query = `?apikey=${key}&q=${latitude},${longitude}`;
        const response = await fetch(geoURi + query);
        const data = await response.json();
        console.log(data);
        return data;
      },
      error => {
        console.log(error.message);
        // The user as refuse to activated the geolocation in his browser
        // So in here we gonna show the shearch bar INPUt
        // so that the user can type his onw location in Senegal
        /* Or we can just leave the search bar in the page and display a message saying to search for
        a location in the search bar */
      }
    );
  } else {
    query = `?apikey=${key}&q=13.950,-16.167`;
    const response = await fetch(geoURi + query);
    const data = await response.json();
    console.log(data);
    return data;
  }
};

const getCurrentWeahter = async id => {
  const query = `${id}?apikey=${key}`;
  const response = await fetch(weatherURI + query);
  const data = await response.json();
  console.log(data[0]);
  return data[0];
};

const getWeekWeahter = async id => {
  weekWeatherURI =
    "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
  const query = `${id}?apikey=${key}`;
  const response = await fetch(weekWeatherURI + query);
  const data = await response.json();
  console.log(data.DailyForecasts);
  return data.DailyForecasts;
};

const getHourWeahter = async id => {
  hourWeatherURI =
    "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/";
  const query = `${id}?apikey=${key}`;
  const response = await fetch(hourWeatherURI + query);
  const data = await response.json();
  console.log(data);
  return data;
};
