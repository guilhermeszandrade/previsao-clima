const apiKey = "6f95b48a89fdb9574fa86e0717300780";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=&lang=pt_br";

const barraDePesquisa = document.querySelector(".pesquisar input");
const barraDePesquisaBtn = document.querySelector(".pesquisar button");
async function checkWeather(cidade) {
    const response = await fetch(apiUrl + cidade + `&appid=${apiKey}`);
    var data = await response.json();
    console.log(data);

    document.querySelector(".cidade").innerHTML = data.name;
    document.querySelector(".temperatura").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".umidade").innerHTML = data.main.humidity + "%";
    document.querySelector(".vento").innerHTML = data.wind.speed + "km/h";
}
barraDePesquisaBtn.addEventListener("click", ()=>{
    checkWeather(barraDePesquisa.value);
})

