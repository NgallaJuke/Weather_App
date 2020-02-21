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
  // localStorage.setItem("LastCitySearch", city);
});
