const containerTop = document.querySelector(".container-top");
const region_country = document.querySelector("#rg-cn");
const current_day_hour = document.querySelector("#curt-day-hour");
const weather_condition = document.querySelector("#weather-condition");
const weather_icon = document.querySelector(".weather img");
const weather_temp = document.querySelector(".weather");
const precip = document.querySelector(".precip ");
const daily_weather = document.querySelector(".items-weeks");
const hourly_weather = document.querySelector(".items-hours");
const container = document.querySelector(".container");
const input = document.querySelector(".change-location input");
const label = document.querySelector(".change-location label");
const body = document.querySelector("body");
// const precipIcon = document.querySelector(".precip img");

//set tthe options to get the current day in a better format
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
};

getIpInfo = async () => {
  let response = await fetch("https://ipapi.co/json/");
  let data = await response.json();

  return data;
};

const currentDayAndHour = new Date().toLocaleTimeString("en-us", options);

const day = currentDayAndHour.indexOf(",");

const hour = currentDayAndHour.lastIndexOf(",");

const currentDay = currentDayAndHour.substring(0, day);
const currentHour = currentDayAndHour.substring(hour + 2, hour + 7);
let iconDir = "./Assets/icons-day";
let precipIcon = "./Assets/precip.svg";
let DateTime = Boolean;
let precipType = "None";

const updateCurrentWeather = async () => {
  const location = await getIpInfo();

  const cityDetails = await getCity(location.city);
  console.log("cityDetails", cityDetails);

  const weatherDetails = await getCurrentWeahter(cityDetails.Key);
  console.log("weatherDetails", weatherDetails);

  // //set the precipitation if there is any
  // if (weatherDetails.HasPrecipitation === false) {
  //   precipType = "None";
  // } else {
  //   precipType = weatherDetails.PrecipitationType;
  // }

  // DateTime = weatherDetails.IsDayTime;

  // if (DateTime) {
  //   iconDir = "./Assets/icons-day";
  //   precipIcon = "./Assets/precipBlack.svg";
  //   body.style.backgroundImage = "url('../Assets/DayWind.jpg')";
  //   container.style.color = "#000";
  //   input.style.border = "1.5px solid #000";
  //   label.style.color = "#000";
  //   input.style.color = "#000";
  // } else {
  //   iconDir = "./Assets/icons";
  //   body.style.backgroundImage = "url('../Assets/Skyblue-Night.jpeg')";
  // }

  containerTop.innerHTML = `<div class="location">
  <div class="reg-time">
    <span id="rg-cn">${cityDetails.AdministrativeArea.EnglishName}, ${cityDetails.Country.EnglishName}</span>
    <span id="curt-day-hour">${currentDay} , ${currentHour}</span>
  </div>
  <span id="weather-condition">${weatherDetails.WeatherText}</span>
</div>
<div class="weather">
  <img src="${iconDir}/${weatherDetails.WeatherIcon}.svg" alt="W-icon" />
  ${weatherDetails.Temperature.Metric.Value}
  <span id="deg">&deg;</span>
  <span id="celcius">C</span>
</div>

<div class="precip">
  <img src="${precipIcon}" alt="precip-icon" />
  <span>${precipType}</span>
</div>`;
  containerTop.addEventListener("load", function() {
    const loader = document.querySelector(".loaderTop");
    loader.classList.add("hidden"); // class "loader hidden"
  });
};

const updateWeeklyWeather = async city => {
  const weatherDetails = await getCity(city);
  const key = weatherDetails.Key;
  const weekWeatherDetails = await getWeekWeahter(key);
  console.log("weekWeatherDetails", weekWeatherDetails);
  console.log("wwwww", weatherDetails);

  console.log("dayTime", DateTime);

  daily_weather.innerHTML = "";
  weekWeatherDetails.forEach(dailyweather => {
    let precipDay = "None";
    let precipNight = "None";
    //Turn the Precipitaion to 0 if there is none
    if (dailyweather.Day.HasPrecipitation === true)
      precipDay = dailyweather.Day.PrecipitationType;

    if (dailyweather.Night.HasPrecipitation === true)
      precipNight = dailyweather.Day.PrecipitationType;

    //setting the day on the week for the list of weekly weather
    const dayOfTheWeek = new Date(dailyweather.Date)
      .toDateString()
      .substring(0, 3);

    daily_weather.innerHTML += `<div class="item-week">
   <div class="day-temps">
     <span id="day-of-week">${dayOfTheWeek}</span>
    
     <span id="temp-Max">
     ${((dailyweather.Temperature.Maximum.Value - 32) * (5 / 9)).toFixed(
       1
     )}&deg;C
     </span>
     <span id="temp-Min">
       ${((dailyweather.Temperature.Minimum.Value - 32) * (5 / 9)).toFixed(
         1
       )}&deg;C
     </span>
   </div>
   <div class="rowsWheather">
     <div class="icons-Day-Night">
       <div class="day-In-Week">
         Day
       </div>
       <div>
         <img src="${iconDir}/${
      dailyweather.Day.Icon
    }.svg" alt="icon-Day" id="icon-Day" />
       </div>
       <div class="day-In-Week-Cond">${dailyweather.Day.IconPhrase}</div>
       <div class="wind-precip">
         <img
           class="precipMin"
           src="${precipIcon}"
           alt="precip"
         />${precipDay}%
       </div>
     </div>
     <div class="icons-Day-Night">
       <div class="day-In-Week">
         Night
       </div>
       <div>
         <img src="${iconDir}/${
      dailyweather.Night.Icon
    }.svg" alt="icon-Day" id="icon-night" />
       </div>
       <div class="day-In-Week-Cond">${dailyweather.Night.IconPhrase}</div>
       <div class="wind-precip">
         <img
           class="precipMin"
           src="${precipIcon}"
           alt="precip"
         />${precipNight}
       </div>
     </div>
   </div>
 </div>`;
  });
  daily_weather.addEventListener("load", function() {
    const loader = document.querySelector(".loaderWeek");
    loader.classList.add("hidden"); // class "loader hidden"
  });
};

const updateHourlyWeather = async city => {
  const weatherDetails = await getCity(city);
  const key = weatherDetails.Key;
  const hourWeatherDetails = await getHourWeahter(key);
  console.log("hourWeatherDetails", hourWeatherDetails);
  hourly_weather.innerHTML = "";
  hourWeatherDetails.forEach(hourInDay => {
    let precipHour = "None";
    if (hourInDay.HasPrecipitation === true)
      precipHour = hourInDay.PrecipitationType;

    //setting the hour on the day
    const hourOfTheWeek = new Date(hourInDay.DateTime)
      .toUTCString()
      .substring(17, 22);

    hourly_weather.innerHTML += `<div class="item-hour">
      <div class="hour-container">
        <div class="time">${hourOfTheWeek}</div>
        <div class="time-weather">${(
          (hourInDay.Temperature.Value - 32) *
          (5 / 9)
        ).toFixed(1)}&deg;C</div>
        <div>
          <img id="icon-Hour" src="${iconDir}/${
      hourInDay.WeatherIcon
    }.svg" alt="weather-icon" />
        </div>
        <div class="day-In-Week-Cond">${hourInDay.IconPhrase}</div>
        <div class="wind-precip">
          <img
            class="precipMin"
            src="${precipIcon}"
            alt="precip"
          />${precipHour}
        </div>
      </div>
    </div>`;
  });

  hourly_weather.addEventListener("load", function() {
    const loader = document.querySelector(".loaderHour");
    loader.classList.add("hidden"); // class "loader hidden"
  });
};

updateCurrentWeather();
