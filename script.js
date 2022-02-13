function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];

    return `${day} ${hours}:${minutes} `;
}

function displayTemperature(response) {
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;

    celsiusTemperature = response.data.main.temp;

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
    let apikey = "0e0bdc81b41729dbd97352adacb8d445";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityinputElement = document.querySelector("#city-input");
    search(cityinputElement.value);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    Celsiuslink.classList.remove("active");
    Fahrenheitlink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    Celsiuslink.classList.add("active");
    Fahrenheitlink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let Fahrenheitlink = document.querySelector("#fahrenheit-link");
Fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

let Celsiuslink = document.querySelector("#celsius-link");
Celsiuslink.addEventListener("click", displayCelsiusTemperature);

search("Tehran");