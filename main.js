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



function getWeather() {
    const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
    const apiKey = '&appid=65e525b678aadd227ebca31192f8550e';
    const apiUnits = '&units=metric';
    const apiLang = '&lang=pl';
    const apiCity = input.value;

    const URL = apiLink + apiCity + apiKey + apiUnits + apiLang;
    console.log(URL);

    axios.get(URL)
        .then(response => {
            aqi = getAirQuality(apiCity);
            console.log(response);
            img.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
            city.textContent = `Miasto: ${response.data.name} Kraj: ${response.data.sys.country}`;
            temp.textContent = `${response.data.main.temp} stopni Celsjusza`;
            description.textContent = `Opis: ${response.data.weather[0].description}`;
            feelLike.textContent = `${response.data.main.feels_like} stopni Celsjusza`;
            humidity.textContent = `${response.data.main.humidity} %`;
            pressure.textContent = `${response.data.main.pressure} hPa`;
            windSpeed.textContent = `${response.data.wind.speed} m/s`;
            clouds.textContent = `${response.data.clouds.all} %`;
            visibilty.textContent = `${response.data.visibility / 1000} km`;
            aqi.textContent = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'][aqi - 1]
            errorMessage.textContent = '';
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

const getWeatherByEnter = (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
}

function getAirQuality(apiCity) {
    const airApiLink = 'http://api.openweathermap.org/data/2.5/air_pollution?lat=';
    const airApiKey = '&appid=65e525b678aadd227ebca31192f8550e';
    const airURL = `${airApiLink}${apiCity}${airApiKey}`;

    return axios.get(airURL).then(response => response.datalist[0].main.aqi);
}



button.addEventListener('click', getWeather)

input.addEventListener('keypress', getWeatherByEnter)

