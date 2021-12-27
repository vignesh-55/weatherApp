const form = document.querySelector('form');
const cityInput = document.querySelector('#place');

const cityName = document.querySelector('.cityName')
const cloudiness = document.querySelector('.cloud')
const windSpeed = document.querySelector('.speed')
const feelsLike = document.querySelector('.feel')
const humidity = document.querySelector('.humid')
const temp = document.querySelector('.temp')
const description = document.querySelector('.desc');

const error = document.querySelector('.errorContent')
const weatherContent = document.querySelector('.dataContent')
const loader = document.querySelector('.loader')

function renderData(data){
    error.textContent = ''
    weatherContent.style.display = 'grid'
    cityName.textContent = data.name;
    cloudiness.textContent = data.clouds.all;
    windSpeed.textContent = data.wind.speed;
    feelsLike.textContent = data.main.feels_like + " / " + celTofar(data.main.feels_like);
    humidity.textContent = data.main.humidity;
    temp.textContent = data.main.temp + " / " + celTofar(data.main.temp);
    let desc = data.weather[0].description
    description.textContent = desc.charAt(0).toUpperCase()+desc.substring(1);
    loader.style.display = 'none';
    console.log("rendered");
    console.log(data.wind);
}

function celTofar(num){
    let numF = ((num * 9/5)+32).toFixed(2);
    return numF;
}

function renderError(){
    error.textContent = 'Please provide a valid or a other city name';
    loader.style.display = 'none';
    weatherContent.style.display = 'none'
}

async function getWeather(city){
    try{
        console.log('fetch calling');
        const fetchWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2c16f3b7e738bcd39ffda45e69f5f2f8&units=metric`,{mode:"cors"});
        const getData = await fetchWeather.json();
        renderData(getData);
    }catch(e){
        renderError();
    }
}

getWeather('Erode');

form.addEventListener('submit', (e) => {
    let city = cityInput.value.trim() || 'Salem';
    getWeather(city);
    loader.style.display = 'block';
    cityInput.value = '';
    e.preventDefault();
})