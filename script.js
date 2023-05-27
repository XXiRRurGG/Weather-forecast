document.addEventListener("DOMContentLoaded", function() {
const apiKey = '5b9fcca3b18aca7b740c1e15c3afcbba';
const cityInput = document.getElementById('city-input');
const weatherImg = document.getElementById('weatherImg');
const weatherText = document.getElementById('weatherText');
const tempVal = document.getElementById('tempVal');
const tempFeelsLike = document.getElementById('tempFeelsLike');
const sunriseTime = document.getElementById('sunriseTime');
const sunsetTime = document.getElementById('sunsetTime');
const durationTime = document.getElementById('durationTime');
const currentDate = document.getElementById('currentDate');

const timeZoneOffset = new Date().getTimezoneOffset() * 60;;
var currentCity = 'Vilnius';
cityInput.value = currentCity;

let previousValue = cityInput.value;

cityInput.addEventListener('focus', () => {
  if (cityInput.value.trim() !== '') {
    previousValue = cityInput.value;
    cityInput.value = '';
  }
});

cityInput.addEventListener('blur', () => {
  if (cityInput.value.trim() === '') {
    cityInput.value = previousValue;
  }
});

function getWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
      currentDate.innerText = (new Date()).toLocaleDateString();
      weatherImg.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      weatherText.innerText = data.weather[0].main;
      tempVal.innerText = `${Math.round(data.main.temp)}°C`;
      tempFeelsLike.innerText = `Feels like ${Math.round(data.main.feels_like)}°C`;
      sunriseTime.innerText = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
      sunsetTime.innerText = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
      durationTime.innerText = `Duration: ${new Date((data.sys.sunset - data.sys.sunrise) * 1000).toISOString().substr(11, 8)}`;
    })
    .catch(error => console.log(error));

    fetch(`https://api.openweathermap.org/data/2.5/find?lat=54.687157&lon=25.279652&cnt=5&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data2 => {
              var list = data2.list;
              var childrenList = document.getElementById('container4').children;
              for(let i=1;i<5;i++)
              {
                //console.log(list[i].name);
                var elements = childrenList[i-1].children;
                elements[0].innerHTML = list[i].name;
                elements2 = elements[1].children;
                elements2[0].src = `http://openweathermap.org/img/w/${list[i].weather[0].icon}.png`;
                elements2[1].innerHTML = list[i].main.temp + '°C';
              }
            })
          .catch(error => console.error(error));
            
}


cityInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    getWeather(cityInput.value);
  }
});
getWeather("Vilnius");
for (let i = 1; i <= 3; i++) {
  let div = document.createElement("div");
  div.innerHTML = `
    <p id="weatherTime${i}">Some time</p>
    <img src="image.jpg" alt="Alternative text for image" id="weatherImg${i}">
    <p id="currentForecast${i}">Forecast</p>
    <p id="currentTemp${i}">Current temp</p>
    <p id="currentFeelsLike${i}">Feels like</p>
    <p id="currentWindSpeed${i}">Wind speed</p>
  `;
  var weatherByHours = document.getElementById('container3');
  weatherByHours.appendChild(div);
}

for (let i = 1; i <= 5; i++) {
  let div = document.createElement("div");
  div.innerHTML = `
    <p id="weatherTime2${i}">Some time</p>
    <img src="image.jpg" alt="Alternative text for image" id="weatherImg2${i}">
    <p id="currentForecast2${i}">Forecast</p>
    <p id="currentTemp2${i}">Current temp</p>
    <p id="currentFeelsLike2${i}">Feels like</p>
    <p id="currentWindSpeed2${i}">Wind speed</p>
  `;
  var weatherByHours = document.getElementById('container6');
  weatherByHours.appendChild(div);
}

const apiKey2 = 'c27af619bb96f636bbbee54d28747a56';
function getWeatherHourly(city) {
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
  .then(response => response.json())
  .then(data => {
    
    const hourlyWeather = data.list;
    
    for (let i = 1; i <= 3; i++) {
      
      const weatherTime = document.getElementById(`weatherTime${i}`);
      const weatherImg = document.getElementById(`weatherImg${i}`);
      const currentForecast = document.getElementById(`currentForecast${i}`);
      const currentTemp = document.getElementById(`currentTemp${i}`);
      const currentFeelsLike = document.getElementById(`currentFeelsLike${i}`);
      const currentWindSpeed = document.getElementById(`currentWindSpeed${i}`);

      const time = new Date((hourlyWeather[i].dt + timeZoneOffset) * 1000);
      
      weatherTime.textContent = new Date((hourlyWeather[i].dt + timeZoneOffset) * 1000).toLocaleTimeString();
      weatherImg.src = `http://openweathermap.org/img/w/${hourlyWeather[i].weather[0].icon}.png`;
      currentForecast.textContent = hourlyWeather[i].weather[0].description;
      currentTemp.textContent = `${hourlyWeather[i].main.temp}°C`;
      currentFeelsLike.textContent = `Feels like ${hourlyWeather[i].main.feels_like}°C`;
      currentWindSpeed.textContent = `Wind ${hourlyWeather[i].wind.speed} km/h`;
}

for (let i = 1; i <= 5; i++) {
      
  const weatherTime = document.getElementById(`weatherTime2${i}`);
  const weatherImg = document.getElementById(`weatherImg2${i}`);
  const currentForecast = document.getElementById(`currentForecast2${i}`);
  const currentTemp = document.getElementById(`currentTemp2${i}`);
  const currentFeelsLike = document.getElementById(`currentFeelsLike2${i}`);
  const currentWindSpeed = document.getElementById(`currentWindSpeed2${i}`);

  const time = new Date((hourlyWeather[i].dt + timeZoneOffset) * 1000);
  
  weatherTime.textContent = new Date((hourlyWeather[i].dt + timeZoneOffset) * 1000).toLocaleTimeString();
  weatherImg.src = `http://openweathermap.org/img/w/${hourlyWeather[i].weather[0].icon}.png`;
  currentForecast.textContent = hourlyWeather[i].weather[0].description;
  currentTemp.textContent = `${hourlyWeather[i].main.temp}°C`;
  currentFeelsLike.textContent = `Feels like ${hourlyWeather[i].main.feels_like}°C`;
  currentWindSpeed.textContent = `Wind ${hourlyWeather[i].wind.speed} km/h`;
}


var list = document.getElementById('container5').children;
var currentDataIndex = 0;
  for(let i=0;i<5;i++)
  {
    var elements = list[i].children;
    var tempDate;
    const forecastItem = hourlyWeather.find(item => {
      const forecastDateTime = new Date(item.dt * 1000); tempDate = forecastDateTime;
      return forecastDateTime.getHours() === 12 && forecastDateTime.getDate() === (new Date().getDate() + i);
    });

    if (forecastItem) {
      const weekday = new Date(forecastItem.dt*1000).toLocaleDateString('en-US', { weekday: 'long' });
      if(i!=0)
        elements[0].textContent = weekday;
      elements[1].textContent = new Date(forecastItem.dt * 1000).toDateString();
      elements[2].src = `http://openweathermap.org/img/w/${forecastItem.weather[0].icon}.png`;
      elements[3].textContent = `${forecastItem.main.temp}°C`;
      elements[4].textContent = forecastItem.weather[0].description;
    }
  }

  })
  .catch(error => giveError());
}
getWeatherHourly("Vilnius");


function getCurrentCity() {
  
  if (navigator.geolocation) {
    
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
          currentCity = data.name;
          cityInput.value = currentCity;
          getWeather(currentCity);
          getWeatherHourly(currentCity);
          getWeatherHourlyByDay(1);
          //console.log(`Ваш город: ${currentCity}`);

          fetch(`https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=5&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data2 => {
              var list = data2.list;
              var childrenList = document.getElementById('container4').children;
              for(let i=1;i<5;i++)
              {
                //console.log(list[i].name);
                var elements = childrenList[i-1].children;
                elements[0].innerHTML = list[i].name;
                elements2 = elements[1].children;
                elements2[0].src = `http://openweathermap.org/img/w/${list[i].weather[0].icon}.png`;
                elements2[1].innerHTML = list[i].main.temp + '°C';
              }
            })
          .catch(error => giveError());
            })
      .catch(error => giveError());
    });
  } else {
    console.log('Geolocation не поддерживается вашим браузером');
  }
}
getCurrentCity();

const todayButton = document.getElementById('todayBtn');
const weekdayButton = document.getElementById('weekdayBtn');
todayButton.addEventListener('click',function()
{
  var todayDiv = document.getElementById('todayDiv');
  todayDiv.style.display = 'block';
  var weekdayDiv = document.getElementById('weekdayDiv');
  weekdayDiv.style.display = 'none';
});
weekdayButton.addEventListener('click',function()
{
  var todayDiv = document.getElementById('todayDiv');
  todayDiv.style.display = 'none';
  var weekdayDiv = document.getElementById('weekdayDiv');
  weekdayDiv.style.display = 'block';
});
function getWeatherHourlyByDay(day)
{
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${apiKey}&units=metric`)
  .then(response => response.json())
  .then(data => {
    const unfilteredHourlyWeather = data.list;

    var date = new Date();
    date.setDate(date.getDate() + day - 1);
    console.log(date);
    console.log(day);

    //console.log(unfilteredHourlyWeather[0]);
   const hourlyWeather = unfilteredHourlyWeather.filter(item => {
    const itemDate = new Date(item.dt * 1000);
    return (
      itemDate.getFullYear() === date.getFullYear() &&
      itemDate.getMonth() === date.getMonth() &&
      itemDate.getDate() === date.getDate()
    );
  });

  for(let i=1;i<=5;i++)
  {
    const weatherTime = document.getElementById(`weatherTime2${i}`);
    const weatherImg = document.getElementById(`weatherImg2${i}`);
    const currentForecast = document.getElementById(`currentForecast2${i}`);
    const currentTemp = document.getElementById(`currentTemp2${i}`);
    const currentFeelsLike = document.getElementById(`currentFeelsLike2${i}`);
    const currentWindSpeed = document.getElementById(`currentWindSpeed2${i}`);

    //const time = new Date((hourlyWeather[i].dt + timeZoneOffset) * 1000);
    //console.log(hourlyWeather[i]);
    weatherTime.textContent = new Date((hourlyWeather[i].dt + timeZoneOffset) * 1000).toLocaleTimeString();
    weatherImg.src = `http://openweathermap.org/img/w/${hourlyWeather[i].weather[0].icon}.png`;
    currentForecast.textContent = hourlyWeather[i].weather[0].description;
    currentTemp.textContent = `${hourlyWeather[i].main.temp}°C`;
    currentFeelsLike.textContent = `Feels like ${hourlyWeather[i].main.feels_like}°C`;
    currentWindSpeed.textContent = `Wind ${hourlyWeather[i].wind.speed} km/h`;
  }
});
}

for(let i=1;i<=5;i++)
{
var t = document.getElementById(i);
t.addEventListener('click',function(){
  getWeatherHourlyByDay(i);
});
}

function checkForExistion(city)
{
  const cityName = city;

fetch(`https://nominatim.openstreetmap.org/search.php?q=${cityName}&format=json`)
  .then(response => response.json())
  .then(data => {
    if (data.length > 0) {
      currentCity = city;

      getWeather(currentCity);
      getWeatherHourly(currentCity);
      getWeatherHourlyByDay(1);

      var mainDiv = document.getElementById('main');
      mainDiv.style.display = 'block';
      var todayDiv = document.getElementById('todayDiv');
      todayDiv.style.display = 'block';
      var weekdayDiv = document.getElementById('weekdayDiv');
      weekdayDiv.style.display = 'none';
      var errorDiv = document.getElementById('errorDiv');
      errorDiv.style.display = 'none';

      cityInput.value = currentCity;
    } else {
      giveError();
    }
  })

}

cityInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    checkForExistion(cityInput.value);
  }
});
function giveError()
{
      var mainDiv = document.getElementById('main');
      mainDiv.style.display = 'none';
      var errorDiv = document.getElementById('errorDiv');
      errorDiv.style.display = 'flex';
}
});