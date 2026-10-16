require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

if (!API_KEY) {
  console.error(
    "OPENWEATHER_API_KEY não encontrada. Confira se o .env está na raiz do projeto.",
  );
  process.exit(1);
}

// Serve só o front-end. NÃO use express.static(__dirname),
// senão o .env ficaria acessível pelo navegador.
app.use("/src", express.static(path.join(__dirname, "src")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// GET /api/weather?city=Sao Paulo,BR
app.get("/api/weather", async (req, res) => {
  const city = String(req.query.city || "").trim();

  if (!city || city.length > 100) {
    return res
      .status(400)
      .json({ error: "Informe a cidade no parâmetro 'city'." });
  }

  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.set("q", city);
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", "pt_br");
  url.searchParams.set("appid", API_KEY);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: "Cidade não encontrada." });
      }
      if (response.status === 429) {
        return res
          .status(429)
          .json({ error: "Limite de consultas atingido. Tente mais tarde." });
      }
      if (response.status === 401) {
        // Problema do servidor (chave inválida ou ainda não ativada), não do usuário
        console.error(
          "OpenWeather recusou a chave (401). Ela pode levar até 2h para ativar.",
        );
        return res
          .status(502)
          .json({ error: "Serviço de clima indisponível no momento." });
      }
      return res
        .status(502)
        .json({ error: "Erro ao consultar o serviço de clima." });
    }

    // Devolve só o que o front precisa
    res.json({

      cidade: data.name,
      pais: data.sys.country,
      temperatura: data.main.temp,
      sensacao: data.main.feels_like,
      umidade: data.main.humidity,
      vento: data.wind.speed,
      descricao: data.weather[0].description,
      icone: data.weather[0].icon,
      descricao: data.weather[0].description,
      icone: data.weather[0].icon,
      clima: data.weather[0].main,
    });
  } catch (err) {
    console.error("Falha ao chamar a OpenWeather:", err.message);
    res
      .status(502)
      .json({ error: "Não foi possível contatar o serviço de clima." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
