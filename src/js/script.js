const apiKey = "6f95b48a89fdb9574fa86e0717300780";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=bangalore&lang=pt_br";

async function checkWeather() {
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);

    document.querySelector(".cidade").innerHTML = data.name;
    document.querySelector(".temperatura").innerHTML = data.main.temp + "°c";
    document.querySelector(".umidade").innerHTML = data.main.humidity;
    document.querySelector(".vento").innerHTML = data.wind.speed;
}

checkWeather();
