const day_hour = document.querySelector(".day_hour");
const locat = document.querySelector(".location");
const current_condition = document.querySelector(".current_condition");
const current_condition_info = document.querySelector(
  ".current_condition_info"
);
const daily_condition = document.querySelector(".daily_condition");

/* day and time */
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
const currentDayAndHour = new Date().toLocaleTimeString("en-us", options);
const day = currentDayAndHour.indexOf(",");
const hour = currentDayAndHour.lastIndexOf(",");
const currentDay = currentDayAndHour.substring(0, day);
const currentHour = currentDayAndHour.substring(hour + 2, hour + 7);

let isDayTime = Boolean; //Check if it is dayTime or nighTtime
let srcIcons = "./Assets/icons";

let icon = "day.Night.Icon";

const updateCurrentWeather = async () => {
  const cityDetails = await getCity();

  const accuWeatherDetails = await getCurrentAccuWeahter(cityDetails.Key);
  const openWeatherDetails = await getCurrentOpenWeahter();
  console.log("accuWeatherDetails", accuWeatherDetails);

  isDayTime = accuWeatherDetails.IsDayTime;

  console.log("isdaytime", isDayTime);

  if (isDayTime) {
    srcIcons = "./Assets/icons-day";
    icon = "day.Day.Icon";
  }
  // set the sunrise and the sunset
  const sunrise = new Date(openWeatherDetails.sys.sunrise * 1000);
  const sunset = new Date(openWeatherDetails.sys.sunset * 1000);

  // set the Precipitation to None if it as a default value of Null
  let precipitation = "None";
  if (
    accuWeatherDetails.PrecipitationType !== null ||
    accuWeatherDetails.PrecipitationType !== false
  ) {
    precipitation = accuWeatherDetails.PrecipitationType;
  }
  day_hour.innerHTML = `${currentDay} - ${currentHour}`;
  locat.innerHTML = `${cityDetails.EnglishName} - ${cityDetails.Country.ID} `;
  current_condition.innerHTML = `<div class="condition_txt">${
    accuWeatherDetails.WeatherText
  }</div>
  <div class="current_weather grid">
    <div class="cur_cond_icon">
      <img src="${srcIcons}/${accuWeatherDetails.WeatherIcon}.svg" alt="icon" />
    </div>
    <div class="cur_cond_temp">
    ${
      accuWeatherDetails.Temperature.Metric.Value
    }<span id="deg">&deg;</span><span id="celcius">c</span>
    </div>
  </div>
  <div class="min_max_up_down">
    <div class="min_man_temp">
      <div class="maxtemp">${openWeatherDetails.main.temp_max}&deg;C</div>
      <div id="mintemp">${openWeatherDetails.main.temp_min}&deg;C</div>
    </div>
    <div class="sun">
      <div class="sun_pos">
        <img src="./Assets/sunrise.svg" alt="icon" />
        <div class="sunset_time">${sunrise.getHours()}H</div>
        <div class="sunset_time">${sunrise.getMinutes()}m</div>
      </div>
      <div class="sun_pos">
        <img src="./Assets/sunset.svg" alt="icon" />
        <div class="sunset_time">${sunset.getHours()}H</div>
        <div class="sunset_time">${sunset.getMinutes()}m</div>
      </div>
    </div>
  </div>`;

  current_condition_info.innerHTML = `<div class="info">
  <div class="info_icon">
    <img src="./Assets/precip.svg" alt="icon" />
  </div>
  <div class="info_numb">${precipitation}</div>
</div>
<div class="info">
  <div class="info_icon">
    <img src="./Assets/wind.svg" alt="icon" />
  </div>
  <div class="info_numb">${openWeatherDetails.wind.speed}m/s</div>
</div>
<div class="info">
  <div class="info_icon">
    <img src="./Assets/humidity.svg" alt="icon" />
  </div>
  <div class="info_numb">${openWeatherDetails.main.humidity}%</div>
</div>

<div class="info">
  <div class="info_icon">
    <img src="./Assets/barometer.svg" alt="icon" />
  </div>
  <div class="info_numb">${openWeatherDetails.main.pressure}hPa</div>
</div>`;
};

const updateDailyWeather = async () => {
  const cityDetails = await getCity();

  const fiveDaysWeather = await getWeekWeahter(cityDetails.Key);
  console.log("fiveDaysWeather", fiveDaysWeather);

  fiveDaysWeather.DailyForecasts.forEach(day => {
    const dayName = new Date(day.Date).toDateString().substring(0, 3);

    if (isDayTime) {
      icon = day.Day.Icon;
    } else {
      icon = day.Night.Icon;
    }
    daily_condition.innerHTML += `
  <div class="day_cond">
  <div class="day">${dayName}</div>
  <div class="daily_icon">
    <img src="${srcIcons}/${icon}.svg" alt="icon" />
  </div><div class="min_max_up_down min_max_daily">
            <div class="maxtemp maxtemp_daily">${Math.floor(
              (day.Temperature.Maximum.Value - 32) * (5 / 9)
            )}&deg;C</div>
            <div id="mintemp">${Math.floor(
              (day.Temperature.Minimum.Value - 32) * (5 / 9)
            )}&deg;C</div>
          </div>
</div>
`;
  });
};

// const updateDailyHourlyUI = async () => {
//   const weatherData = await getDailyAndHourlyOpenWeahter();
//   console.log("response", weatherData);
// };

// updateDailyHorulyUI();
updateCurrentWeather()
  .then(() => updateDailyWeather())
  .catch(error => console.log(error));

window.onload = event => {
  function onReady(callback) {
    var intervalId = window.setInterval(function() {
      if (document.getElementsByTagName("body")[0] !== undefined) {
        window.clearInterval(intervalId);
        callback.call(this);
      }
      console.log(event.timeStamp);
    }, event.timeStamp);
  }

  function setVisible(selector, visible) {
    const select = document.querySelector(selector);
    if (visible) {
      select.classList.remove("fade");
    } else {
      select.classList.add("fade");
    }
  }

  onReady(function() {
    setVisible(".app", true);
    setVisible(".loading", false);
  });
};
