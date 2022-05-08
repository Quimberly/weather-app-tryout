function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayRegister = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayRegister];
  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function retrievePosition(position) {
  let apiKey = "6d14bf3fa5db85996e16c81f2734587e";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

function showWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let span = document.querySelector("span");
  let temperature = Math.round(response.data.main.temp);
  span.innerHTML = `${temperature}`;
  let li = document.querySelector("li");
  li.innerHTML = formatDate(new Date(response.data.dt * 1000));
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windy").innerHTML = response.data.main.windy;
}

function search(event) {
  event.preventDefault();
  let apiKey = "6d14bf3fa5db85996e16c81f2734587e";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function convertFahrenheit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value, "imperial");
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let celsius = document.queryselector("#celsius");
celsius.addEventListener("click", search);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertFahrenheit);
