const api = {
    key: "9f30501eae9cd57012e5e18d57ffc41d",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then (weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    if (weather.cod == 404){
        alert(weather.message);
    }
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    console.log(weather_el.innerText);
    switch(weather_el.innerText){
        case "Clouds":
            document.getElementById("bg").style.backgroundImage = "url('clouds.gif')";
            break;
        case "Rain":
            document.getElementById("bg").style.backgroundImage = "url('rainy2.gif')";
            break;
        case "Thunderstorm":
            document.getElementById("bg").style.backgroundImage = "url('thunder.gif')";
            break;
        case "Clear":
            document.getElementById("bg").style.backgroundImage = "url('clear.gif')";
            break;
        default:
            document.getElementById("bg").style.backgroundColor = "blue";
    }
    if(weather_el.innerText == "Rain"){
        document.getElementById("bg").style.backgroundImage = "url('rainy2.gif')";
    }
    if(weather_el.innerText == "Clear"){
        document.getElementById("bg").style.backgroundImage = "url('clear.gif')";
    }

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}


function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;    
}
