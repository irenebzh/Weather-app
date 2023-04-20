function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}
function cityInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input").value;
  console.log(searchInput);

  let h1 = document.querySelector("h1");
  if (searchInput) {
    h1.innerHTML = `${searchInput}`;
    search(searchInput);
  } else {
    h1.innerHTML = null;
    alert("Please enter a city");
  }
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", cityInput);

function search(city) {
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
search("San Diego");

function showTemperature(response) {
  console.log(response.data);
  console.log(response.data.main.temp);
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src");
}

function showPosition() {
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = `${position.coords.latitude}`;
    let lon = `${position.coords.longitude}`;

    let apiKey = "197ef3a642b76eef90e131866f74a0a0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(showTemperature);
  });
}
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showPosition);

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
