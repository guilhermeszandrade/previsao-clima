const apiUrl = "/api/weather?city="

const barraDePesquisa = document.querySelector(".pesquisar input");
const barraDePesquisaBtn = document.querySelector(".pesquisar button");

async function checkWeather(cidade) {
    const response = await fetch(apiUrl + encodeURIComponent(cidade));
    const data = await response.json();

    document.querySelector(".cidade").textContent = data.cidade;
    document.querySelector(".temperatura").textContent = Math.round(data.temperatura) + "°C";
    document.querySelector(".umidade").textContent = data.umidade + "%";
    // A API devolve o vento em m/s; multiplicar por 3.6 converte para km/h
    document.querySelector(".vento").textContent = Math.round(data.vento * 3.6) + " km/h";
}
barraDePesquisaBtn.addEventListener("click", () => {
    checkWeather(barraDePesquisa.value);
});
 