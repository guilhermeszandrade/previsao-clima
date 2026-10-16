const apiUrl = "/api/weather?city=";

const barraDePesquisa = document.querySelector(".pesquisar input");
const barraDePesquisaBtn = document.querySelector(".pesquisar button");
const nuvemIcon = document.querySelector(".weather-icon");

const icones = {
    Clouds: "./src/img/clouds.png",
    Rain: "./src/img/rain.png",
    Thunderstorm: "./src/img/rain.png",
    Clear: "./src/img/clear.png",
    Drizzle: "./src/img/drizzle.png",
    Mist: "./src/img/mist.png",
    Haze: "./src/img/mist.png",
    Fog: "./src/img/mist.png",
};

async function checkWeather(cidade) {
    if (!cidade.trim()) return;

    try {
    const response = await fetch(apiUrl + encodeURIComponent(cidade));
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || "Erro ao buscar o clima.");
    }
    document.querySelector(".cidade").textContent = data.cidade;
    document.querySelector(".temperatura").textContent =
        Math.round(data.temperatura) + "°C";
    document.querySelector(".umidade").textContent = data.umidade + "%";
    // A API devolve o vento em m/s; multiplicar por 3.6 converte para km/h
    document.querySelector(".vento").textContent =
      Math.round(data.vento * 3.6) + " km/h";

    if (icones[data.clima]) {
        nuvemIcon.src = icones[data.clima];
        document.querySelector(".clima").style.display = "block";
    }
    } catch (erro) {
    document.querySelector(".cidade").textContent = erro.message;
    document.querySelector(".temperatura").textContent = "";
    document.querySelector(".umidade").textContent = "";
    document.querySelector(".vento").textContent = "";
    }
}
barraDePesquisaBtn.addEventListener("click", () => {
    checkWeather(barraDePesquisa.value);
});
