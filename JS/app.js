const item_week = document.querySelector(".item-week");
const cityForm = document.querySelector("form");

cityForm.addEventListener("submit", e => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();
  updateCurrentWeather(city);
  updateWeeklyWeather(city);
  updateHourlyWeather(city);

  if (container.classList.contains("fade")) {
    container.classList.remove("fade");
  }
  // Set localStorage
  localStorage.setItem("LastCitySearch", city);
});

// if localStorage is set then we use it directly
if (localStorage.getItem("LastCitySearch")) {
  const city = localStorage.getItem("LastCitySearch");
  updateCurrentWeather(city);
  updateWeeklyWeather(city);
  updateHourlyWeather(city);

  if (container.classList.contains("fade")) {
    container.classList.remove("fade");
  }
}

// item_week.addEventListener("click", e => {});
