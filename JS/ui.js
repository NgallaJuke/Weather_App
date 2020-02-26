const day_hour = document.querySelector(".day_hour");
const locat = document.querySelector(".location");
const current_condition = document.querySelector(".current_condition");
const current_condition_info = document.querySelector(
  ".current_condition_info"
);
const daily_condition = document.querySelector(".daily_condition");
let ctx = document.getElementById("myChart").getContext("2d");
const menuBtn = document.querySelector(".menu-btn");
const btn_search = document.querySelector(".btn_search");
const btn_option = document.querySelector(".btn_option");
const sidebar = document.querySelector(".sidebar");
const sidebar_right = document.querySelector(".sidebar_right");

/* Global variables */
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
}; //  day and time

const currentDayAndHour = new Date().toLocaleTimeString("en-us", options);
const day = currentDayAndHour.indexOf(",");
const hour = currentDayAndHour.lastIndexOf(",");
const currentDay = currentDayAndHour.substring(0, day);
const currentHour = currentDayAndHour.substring(hour + 2, hour + 7);
let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "rgba(255,255,255,0.5)");
gradient.addColorStop(1, "rgba(0,0,0,0)");
let menuOpen = false;
let menuSearch = false;

let isDayTime = Boolean; //Check if it is dayTime or nighTtime
let srcIcons = "./Assets/icons";
let sunrise = "sunrise";
let sunset = "sunset";
let icon = "day.Night.Icon";
let humidity = "humidity";
let precip = "precip";
let wind = "wind";
let pressure = "barometer";
let colors = "rgb(255,255,255)";

const updateColorText = () => {
  if (isDayTime) {
    document.querySelector(".app").style.color = "black";
    document.querySelector(".app").style.color = "black";
    document.querySelector(".condition_txt").style.color = "black";
    document.querySelector("body").style.backgroundImage =
      "url('../Assets/DayWind.jpg')";
    day_hour.style.color = "black";

    /* icons */
    srcIcons = "./Assets/icons-day";
    icon = "day.Day.Icon";
    sunrise = "sunrise_black";
    sunset = "sunset_black";
    humidity = "humidity_black";
    precip = "precip_black";
    wind = "wind_black";
    pressure = "barometer_black";
    colors = "rgb(0,0,0)";
    document.documentElement.style.setProperty(
      "--main-day-backgroud-color",
      "rgba(0, 0, 0, 0.1)"
    );
  } else {
    daily_condition.style.color = "white";
    document.querySelector("body").style.backgroundImage =
      "url('../Assets/SkyBlue-Night.jpeg')";
  }
};

const updateCurrentWeatherUI = async () => {
  const cityDetails = await getCity();
  const accuWeatherDetails = await getCurrentAccuWeahter(cityDetails.Key);
  const openWeatherDetails = await getCurrentOpenWeahter();
  currentWeather(cityDetails, accuWeatherDetails, openWeatherDetails);
};

const updateDailyWeatherUI = async () => {
  const cityDetails = await getCity();
  getDailyWeather(cityDetails);
};

const updateHourlyWeatherUI = async () => {
  const cityDetails = await getCity();
  getHoulyWeather(cityDetails);
};

const updateCurrentWeatherUI_City = async city => {
  const cityDetails = await getCityBySearch(city);
  const accuWeatherDetails = await getCurrentAccuWeahter(cityDetails.Key);
  const openWeatherDetails = await getCurrentOpenWeahter_city(
    cityDetails.EnglishName
  );
  currentWeather(cityDetails, accuWeatherDetails, openWeatherDetails);
};

const updateDailyWeatherUI_City = async city => {
  const cityDetails = await getCityBySearch(city);
  getDailyWeather(cityDetails);
};

const updateHourlyWeatherUI_City = async city => {
  const cityDetails = await getCityBySearch(city);
  getHoulyWeather(cityDetails);
};

const currentWeather = async (
  cityDetails,
  accuWeatherDetails,
  openWeatherDetails
) => {
  console.log("accuWeatherDetails", accuWeatherDetails);
  console.log("openWeatherDetails", openWeatherDetails);

  isDayTime = accuWeatherDetails.IsDayTime;

  updateColorText();

  // set the sunrise and the sunset
  const sunriseTime = new Date(openWeatherDetails.sys.sunrise * 1000);
  const sunsetTime = new Date(openWeatherDetails.sys.sunset * 1000);

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
  current_condition.innerHTML = "";
  current_condition.innerHTML += `<div class="condition_txt">${
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
      <div class="maxtemp">${openWeatherDetails.main.temp_max.toFixed(
        1
      )}&deg;C</div>
      <div id="mintemp">${openWeatherDetails.main.temp_min.toFixed(
        1
      )}&deg;C</div>
    </div>
    <div class="sun">
      <div class="sun_pos">
        <img src="./Assets/${sunrise}.svg" alt="icon" />
        <div class="sunset_time">${sunriseTime.getHours()}H</div>
        <div class="sunset_time">${sunriseTime.getMinutes()}m</div>
      </div>
      <div class="sun_pos">
        <img src="./Assets/${sunset}.svg" alt="icon" />
        <div class="sunset_time">${sunsetTime.getHours()}H</div>
        <div class="sunset_time">${sunsetTime.getMinutes()}m</div>
      </div>
    </div>
  </div>`;

  current_condition_info.innerHTML = "";
  current_condition_info.innerHTML += `<div class="info">
  <div class="info_icon">
    <img src="./Assets/${precip}.svg" alt="icon" />
  </div>
  <div class="info_numb">${precipitation}</div>
</div>
<div class="info">
  <div class="info_icon">
    <img src="./Assets/${wind}.svg" alt="icon" />
  </div>
  <div class="info_numb">${openWeatherDetails.wind.speed}m/s</div>
</div>
<div class="info">
  <div class="info_icon">
    <img src="./Assets/${humidity}.svg" alt="icon" />
  </div>
  <div class="info_numb">${openWeatherDetails.main.humidity}%</div>
</div>

<div class="info">
  <div class="info_icon">
    <img src="./Assets/${pressure}.svg" alt="icon" />
  </div>
  <div class="info_numb">${openWeatherDetails.main.pressure}hPa</div>
</div>`;
};

const getDailyWeather = async cityDetails => {
  const fiveDaysWeather = await getWeekWeahter(cityDetails.Key);
  console.log("fiveDaysWeather", fiveDaysWeather);
  daily_condition.innerHTML = "";

  fiveDaysWeather.DailyForecasts.forEach(day => {
    const dayName = new Date(day.Date).toDateString().substring(0, 3);

    if (isDayTime) {
      icon = day.Day.Icon;
    } else {
      icon = day.Night.Icon;
      document.querySelector(".min_max_up_down ").style.color = "white";
      document.querySelector(".maxtemp ").style.borderColor = "white";
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

const getHoulyWeather = async cityDetails => {
  const hourWeather = await getHourWeahter(cityDetails.Key);
  console.log("hourWeatherDetails", hourWeather);
  let hours = [];
  let hoursTemperature = [];
  hourWeather.forEach(hour => {
    const currHour = new Date(hour.DateTime).toUTCString().substring(17, 19);

    hours.push(currHour + "h");
    hoursTemperature.push(((hour.Temperature.Value - 32) * (5 / 9)).toFixed(0));
  });

  /* Start Chart.js */

  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "bar",
    // The data for our dataset
    data: {
      labels: hours,
      datasets: [
        {
          backgroundColor: colors,
          pointBackgroundColor: colors,
          borderColor: colors,
          data: hoursTemperature
        },
        {
          borderWidth: 3,
          pointBackgroundColor: colors,
          borderColor: colors,
          data: hoursTemperature,
          type: "line"
        }
      ]
    },

    // Configuration options go here
    options: {
      legend: {
        display: false
      },
      layout: {
        padding: {
          left: -20,
          right: 0,
          top: 20,
          bottom: -5
        }
      },
      scales: {
        xAxes: [
          {
            barPercentage: 0.04,
            gridLines: {
              offsetGridLines: true,
              color: "rgba(0, 0, 0, 0)"
            },
            ticks: {
              fontColor: colors,
              padding: -5,
              fontSize: 12
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              color: "rgba(0, 0, 0, 0)"
            },
            ticks: {
              display: false,
              fontSize: 12
            },
            stacked: true
          }
        ]
      },
      hover: {
        animationDuration: 0
      },
      animation: {
        duration: 2000,
        onComplete: function() {
          let chartInstance = this.chart,
            ctx = chartInstance.ctx;
          ctx.font = Chart.helpers.fontString(
            Chart.defaults.global.defaultFontStyle,
            Chart.defaults.global.defaultFontFamily
          );
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          this.data.datasets.forEach(function(dataset, i) {
            let meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function(bar, index) {
              let data = dataset.data[index] + "°";
              ctx.fillText(data, bar._model.x, bar._model.y - 8);
            });
          });
        }
      }
    }
  });

  /* End Chart.js */
};

const ListCitySet = () => {
  const list_City = document.querySelector(".list_City ul");
  if (localStorage.getItem("citySet")) {
    const cityStored = JSON.parse(localStorage.getItem("citySet"));
    console.log("cityStored", cityStored);

    cityStored.forEach(city => {
      list_City.innerHTML += `   <li class="list_City">${city.toUpperCase()}</li>`;
    });
  }
};

const toogleSidebars = () => {
  btn_option.addEventListener("click", () => {
    // toggle the button hunberger to cross Sign
    if (!menuOpen) {
      // state is hunberger button
      btn_search.classList.add("fade");

      sidebar.classList.add("active");
      btn_option.classList.add("open");
      menuOpen = true;
    } else {
      // state is Cross button

      btn_search.classList.remove("fade");
      sidebar.classList.remove("active");
      btn_option.classList.remove("open");

      menuOpen = false;
    }
  });

  // right button search

  btn_search.addEventListener("click", () => {
    if (!menuSearch) {
      // state is hunberger button
      sidebar_right.style.display = "block";
      sidebar_right.classList.add("active");
      btn_option.classList.add("fade");

      menuSearch = true;
    } else {
      // state is Cross button
      sidebar_right.classList.remove("active");
      sidebar_right.style.display = "none";
      btn_option.classList.remove("fade");

      menuSearch = false;
    }
  });
  /* End Sidebars toggle  */
};

const getCityBySearch = async city => {
  const cityURI =
    "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${accuWeatherKey}&q=${city}`;

  const response = await fetch(cityURI + query);
  const data = await response.json();
  return data[0];
};

ListCitySet();
updateCurrentWeatherUI()
  .then(() => updateDailyWeatherUI().then(() => updateHourlyWeatherUI()))
  .catch(error => console.log(error));

toogleSidebars();

//Loading img before the âge finish rendering
window.onload = event => {
  function onReady(callback) {
    var intervalId = window.setInterval(function() {
      if (document.getElementsByTagName("body")[0] !== undefined) {
        window.clearInterval(intervalId);
        callback.call(this);
      }
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
