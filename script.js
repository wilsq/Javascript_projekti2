// Lisätään addeventlistener lomakkeeseen
document
  .getElementById("weather-form")
  .addEventListener("submit", function (e) {
    // Lisätään addEventListener submit napille
    e.preventDefault();
    const city = document.getElementById("city-input").value; // Haetaan käyttäjän syöttämä kaupunki
    getWeather(city); // Kutsutaan sääfunktio käyttäjän antamalla kaupungilla
  });

// Funktio, joka hakee tämän hetkisen sään API:sta
function getWeather(city) {
  const APIKEY = "543e8c1845e66ecdb9331e5c1ddae637"; // API-avain openweathermapille
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=metric&lang=en`; // API url

  fetch(url) // Lähetetään pyyntö API:sta
    .then((response) => response.json()) // muutetaan vastaus JSON-muotoon
    .then((data) => {
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      const weatherData = `<h2 class="city-name">${data.name}</h2>
<p class="weather-temp">${data.weather[0].description}</p>
<img class="weather-icon" src="${iconUrl}" />
<p class="weather-temp">Temperature: ${data.main.temp.toFixed(1)} °C
<p class="weather-temp">feels like: ${data.main.feels_like.toFixed(1)} °C`; // rakennetaan HTML, joka näyttää säätiedot ja antaa sään yhden desimaalin tarkkuudella. + tallentaa datan weatherData nimiseen muuttujaan

      console.log(data); // tulostetaan data konsoliin
      document.getElementById("weather-info").innerHTML = weatherData; // Lisää datan haluttuun kohtaan web sivulla.
    })
    .catch((error) => {
      console.log(error); // tulostetaan mahdolliset virheet konsoliin
      document.getElementById(
        "weather-info"
      ).innerHTML = `<p>Error searching weather</p>`;
    });
}
