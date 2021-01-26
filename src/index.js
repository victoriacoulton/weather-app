//Update to current date and time
function setDate() {
let now = new Date();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "Decemeber"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
let month = months[now.getMonth()];
let year = now.getFullYear();
let dateNo = now.getDate();
return(`${day} ${dateNo}<sup>${nth(dateNo)}</sup> ${month} ${year}`);
}

function setTime() {
let now = new Date();
let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`   
  }
let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`}
return `${hours}:${minutes}`; 
}

function nth(date) {
  let dateDigit = (date % 10);
  if (dateDigit === 1) {
    return "st";
  } else if (dateDigit === 2) {
     return "nd";
  } else if (dateDigit === 3) {
     return "rd"
  }  else { 
    return "th"}
  }


//Search for new city
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-for-city").value; 
  search(city)
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateWeather);
}

function findLocation(event) {
event.preventDefault();
navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition (position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`
  axios.get(apiUrl).then(updateWeather);
}

function updateWeather(response) {
  let currentCity = response.data.name;                   
  let country = response.data.sys.country;
  let cityName = document.querySelector("#current-city").innerHTML = `${currentCity}, ${country}`; 

  celsiusTemperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#current-temp").innerHTML = `${celsiusTemperature}`;  //<sup> ℃ </sup>

  let currentIcon = document.querySelector("#current-icon"); 
  currentIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  currentIcon.setAttribute("alt", `${response.data.weather[0].description}`);

  let humidity = Math.round(response.data.main.humidity);
  let humidityValue = document.querySelector("#humidity").innerHTML = `${humidity}`; 

  let windspeed = Math.round(response.data.wind.speed);
  let windspeedValue = document.querySelector("#wind").innerHTML = `${windspeed}`; 

  let description = (response.data.weather[0].description);
  let weatherdescription = document.querySelector("#description").innerHTML = `${description}`; 
}

//Temp ℃ --> ℉            Doesn't really work.... 
//let celsius = document.querySelector("#unit-C").addEventListener("click", handleSubmit); //this only works for searches, not API current locations. 

function switchFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp"); 
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function switchCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp"); 
  temperatureElement.innerHTML = celsiusTemperature;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  
}

let celsiusTemperature = null; 

let fahrenheitLink = document.querySelector("#unit-F");
fahrenheitLink.addEventListener("click", switchFahrenheit);

let celsiusLink = document.querySelector("#unit-C");
celsiusLink.addEventListener("click", switchCelsius);



let date = document.querySelector("#current-date").innerHTML = setDate();
let time = document.querySelector("#current-time").innerHTML = setTime();
let apiKey = "f896fd4c5067a8dda6aeb8f9d2ddd111";
let units = "metric";

let submitNewCity = document.querySelector(".search-bar");
submitNewCity.addEventListener("click", handleSubmit);

let searchCurrentLocation = document.querySelector("#current-location-button");
searchCurrentLocation.addEventListener("click", findLocation);


search("London");


