// let url = "https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139";
//url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`
let loc = document.getElementById("location"); //data.name
let state = document.getElementById("state"); //state.innerText = `${temp}°C`
let button = document.getElementById('button');
let img = document.querySelector('img');
let url;
let data;
let temp;
let tempFahrenheit;
let lat;
let long;
let convertToFahrenheit = () => {tempFahrenheit = temp * (9/5) + 32 };

let request = function () {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
            data = JSON.parse(xhr.responseText);
            temp = data.main.temp;
            loc.innerText = `${data.name}, ${data.sys.country}`;
            state.innerText = `${temp}°C`; 
        }
    };
    xhr.open('GET', url , false);
    xhr.send();
}

let getLocation = function () {
    navigator.geolocation.getCurrentPosition(position => {
        if (!navigator.geolocation) {
            alert('error');
        } else {
            lat = position.coords.latitude.toFixed(2);
            long = position.coords.longitude.toFixed(2);
            url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;
            request();
            convertToFahrenheit();
            switch (data.weather[0].description) {
                case "broken clouds":
                img.src = "file:///C:/Users/leblo/OneDrive/FCC/Projets%20FCC/showTheLocalWeatherApp/amcharts_weather_icons_1.0.0/animated/scattered-cloud-broken-clouds.svg";
                    break;
                case "scattered-cloud":
                img.src = "file:///C:/Users/leblo/OneDrive/FCC/Projets%20FCC/showTheLocalWeatherApp/amcharts_weather_icons_1.0.0/animated/scattered-cloud-broken-clouds.svg";                
                    break;
                case "clouds":
                img.src = "file:///C:/Users/leblo/OneDrive/FCC/Projets%20FCC/showTheLocalWeatherApp/amcharts_weather_icons_1.0.0/animated/cloudy.svg";
                    break;
                default:
                    break;
            }
        }
    });
}
getLocation();

button.addEventListener('click', () => {
    if (button.innerText === 'FAHRENHEIT') {
        state.innerText = `${tempFahrenheit}°F`;
        button.innerText = 'CELSIUS';
    } else if (button.innerText === 'CELSIUS') {
        button.innerText = 'FAHRENHEIT';
        state.innerText = `${temp}°C`;
    }
});