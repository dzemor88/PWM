const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMessage = document.querySelector('p.error');
const city = document.querySelector('.city');
const img = document.querySelector('img.weather_image');
const temp = document.querySelector('.temp');
const description = document.querySelector('.description');
const feelLike = document.querySelector('.feel_like');
const humidity = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure');
const windSpeed = document.querySelector('.wind_speed');
const clouds = document.querySelector('.clouds');
const visibilty = document.querySelector('.visibilty');
const aqiDisplay = document.querySelector('.aqi');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=65e525b678aadd227ebca31192f8550e';
const apiUnits = '&units=metric';
const apiLang = '&lang=pl';


function getWeather() {
    const apiCity = input.value;
    const URL = apiLink + apiCity + apiKey + apiUnits + apiLang;
    console.log(URL);

    axios.get(URL)
        .then(response => {
            console.log(response);
            updateWeatherInfo(response.data);
            return getAirQuality(response.data.coord.lat, response.data.coord.lon);
        })
        .then(aqiData => {
            updateAQIDisplay(aqiData);
        })
        .catch(error => {
            errorMessage.textContent = `${error.response.data.message}`;
            [feelLike, humidity, pressure, windSpeed, clouds, visibilty, city, temp, description].forEach(element => {
                element.textContent = '';
            });
            img.src = '';
        })
        .finally(() => {
            input.value = '';
        })
}

function updateWeatherInfo(data) {
    console.log(data);
    img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    city.textContent = `Miasto: ${data.name} Kraj: ${data.sys.country}`;
    temp.textContent = `${data.main.temp} stopni Celsjusza`;
    description.textContent = `Opis: ${data.weather[0].description}`;
    feelLike.textContent = `${data.main.feels_like} stopni Celsjusza`;
    humidity.textContent = `${data.main.humidity} %`;
    pressure.textContent = `${data.main.pressure} hPa`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    clouds.textContent = `${data.clouds.all} %`;
    visibility.textContent = `${data.visibility / 1000} km`;
}

function getAirQuality(lat, lon) {
    const airApiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}${apiKey}`;
    return axios.get(airApiUrl).then(res => res.data);
}

function updateAQIDisplay(aqiData) {
    const aqi = aqiData.list[0].main.aqi;
    aqiDisplay.textContent = `Jakość powietrza (AQI): ${['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'][aqi - 1]}`;
}

const getWeatherByEnter = (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
}

button.addEventListener('click', getWeather)

input.addEventListener('keypress', getWeatherByEnter)

