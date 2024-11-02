const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "aa1e1f272bacb61a6fdd057742c80d60";
const weathericon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        let response = await axios.get(`${apiUrl}${city}&appid=${apiKey}`);
        let data = response.data;

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update the weather icon based on the weather condition
        switch (data.weather[0].main) {
            case "Clouds":
                weathericon.src = "clouds.png";
                break;
            case "Clear":
                weathericon.src = "clear.png";
                break;
            case "Drizzle":
                weathericon.src = "drizzle.png";
                break;
            case "Rain":
                weathericon.src = "rain.png";
                break;
            case "Mist":
                weathericon.src = "mist.png";
                break;
            case "Snow":
                weathericon.src = "snow.png";
                break;
            default:
                weathericon.src = "default.png"; // Default icon if no match
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        // If an error occurs (e.g., 404 for city not found)
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// Event listener for the search button
let search = document.querySelector("input");
let btn = document.querySelector("button");

btn.addEventListener("click", () => {
    let city = search.value;
    checkWeather(city);
});
