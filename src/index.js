//Update to current date and time
function setTime() {
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
  if (minutes < 10) {
    return `${hours}:0${minutes}`   
  }
  else {
  return(`${hours}:${minutes}`);
  } 
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


//Search for new city
function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateWeather);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-for-city").value; 
  search(city)
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
  let temperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#current-temp").innerHTML = `${temperature} <sup> ℃ </sup>`; 

  let humidity = Math.round(response.data.main.humidity);
  let humidityValue = document.querySelector("#humidity").innerHTML = `${humidity}`; 

  let windspeed = Math.round(response.data.wind.speed);
  let windspeedValue = document.querySelector("#wind").innerHTML = `${windspeed}`; 

  let description = (response.data.weather[0].main);
  let weatherdescription = document.querySelector("#description").innerHTML = `${description}`; 

  let currentCity = response.data.name;                   
  let country = response.data.sys.country;
  let cityName = document.querySelector("#current-city").innerHTML = `${currentCity}, ${country}`; 
}


let date = document.querySelector("#current-date").innerHTML = setDate();
let time = document.querySelector("#current-time").innerHTML = setTime();
let apiKey = "f896fd4c5067a8dda6aeb8f9d2ddd111";
let units = "metric";

let submitNewCity = document.querySelector(".search-bar");
submitNewCity.addEventListener("click", showCity);

let searchCurrentLocation = document.querySelector("#current-location-button");
searchCurrentLocation.addEventListener("click", findLocation);




//Temp ℃ --> ℉            Doesn't really work.... 
let fahrenheit = document.querySelector("#unit-F").addEventListener("click", switchFahrenheit);
let celsius = document.querySelector("#unit-C").addEventListener("click", showCity); //this only works for searches, not API current locations. 

function switchFahrenheit() {
  let temperature = document.querySelector("#current-temp").innerHTML;
  fTemperature = Math.round(temperature*9/5) + 32;
  let degrees = document.querySelector("#current-temp").innerHTML = `${fTemperature} <sup> ℉ </sup>`; 
}

search("London");