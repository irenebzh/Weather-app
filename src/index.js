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

function nameDays(day) {
  let date = new Date(day * 1000);
  let day = date.getDay();
  let day_array = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return day_array[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-daily-weather");
  let forecastHTML = ` <div class="row">`;

  forecast.forEach(function (Forecastday, index) {
    if (index < 6) {
      let max = Math.round(Forecastday.temp.max);
      let min = Math.round(Forecastday.temp.min);
      forecastHTML += ` <div class="col-2">
                <div class="weather-forecast-date">${nameDays(
                  Forecastday.dt
                )}</div>
                  <img
                    src="https://openweathermap.org/img/wn/${
                      day.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="80"
                  />
                  <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max">${max}</span>
                    <span class="weather-forecast-temperature-min">${min}</span>
                  </div>
                </div>
              </div>
              `;
    }
  });
  forecastHTML = forecastHTML = +`</div>`;
  forecastElement.innerHTML = forecastHTML;
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

function getForecast(coord) {
  let apiKey = "97bed167ec49bff56e6c1b63daef9c86";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = `${response.data.name}`;

  let celsiusTemperature = Math.round(response.data.main.temp);

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${celsiusTemperature}`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let iconElement = document.querySelector("#icon");
  console.log({ iconElement });
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", function (event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  });

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", function (event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  });

  getForecast(response.data.coord);
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

search("San Diego");
displayForecast();
