const searchCity = document.querySelector(".searchCity");
const setCity = document.querySelector(".setCity");
const cities = document.querySelectorAll(".list_City ul li");

// Left option set a City on the City-List
cities.forEach(city => {
  city.addEventListener("click", e => {
    e.stopPropagation();
    updateCurrentWeatherUI_City(e.target.innerHTML)
      .then(() =>
        updateDailyWeatherUI_City(e.target.innerHTML).then(() => {
          updateHourlyWeatherUI_City(e.target.innerHTML);
        })
      )
      .catch(error => console.log(error));
    btn_search.classList.remove("fade");
    sidebar.classList.remove("active");
    btn_option.classList.remove("open");
    menuOpen = false;
  });
});

// Left option
setCity.addEventListener("submit", e => {
  e.preventDefault();
  const city = setCity.set_city.value.trim();

  setCity.reset();
  let citySet = [];
  citySet = JSON.parse(localStorage.getItem("citySet")) || [];
  citySet.push(city);
  localStorage.setItem("citySet", JSON.stringify(citySet));
  document.querySelector(".list_City ul").innerHTML += `<li>${citySet[
    citySet.length - 1
  ].toUpperCase()}</li>`;
  updateCurrentWeatherUI_City(citySet[citySet.length - 1])
    .then(() =>
      updateDailyWeatherUI_City(citySet[citySet.length - 1]).then(() => {
        updateHourlyWeatherUI_City(citySet[citySet.length - 1]);
      })
    )
    .catch(error => console.log(error));
  btn_search.classList.remove("fade");
  sidebar.classList.remove("active");
  btn_option.classList.remove("open");
  menuOpen = false;
});

// Right option
searchCity.addEventListener("submit", e => {
  e.preventDefault();

  const city = searchCity.search_city.value.trim();
  searchCity.reset();
  console.log("city", city);

  updateCurrentWeatherUI_City(city)
    .then(() =>
      updateDailyWeatherUI_City(city).then(() => {
        updateHourlyWeatherUI_City(city);
      })
    )
    .catch(error => console.log(error));
  sidebar_right.classList.remove("active");
  sidebar_right.style.display = "none";
  btn_option.classList.remove("fade");

  menuSearch = false;
});
