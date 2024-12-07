document.getElementById("get-weather").addEventListener("click", () => {
    const city = document.getElementById("city-input").value.trim();
    const apiKey = "1e3b76494801a7fc69ca4b31d267389e";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const spinner = document.getElementById("spinner");
    spinner.style.display = "block";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherDataDiv = document.getElementById("weather-data");
                weatherDataDiv.innerHTML = `
                    <h2>${data.name}</h2>
                    <p>Temperature: ${data.main.temp}°F</p>
                    <p>Weather: ${data.weather[0].description}</p>
                `;

                const weatherImage = document.getElementById("weather-image");
                const weatherCondition = data.weather[0].main.toLowerCase();
                if (weatherCondition.includes("clear")) {
                    weatherImage.src = "images/clear.jpg";
                } else if (weatherCondition.includes("rain")) {
                    weatherImage.src = "images/rain.jpg";
                } else if (weatherCondition.includes("cloud")) {
                    weatherImage.src = "images/clouds.jpg";
                } else {
                    weatherImage.src = "images/default.jpg";
                }
            } else {
                alert("City not found. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Something went wrong. Please try again later.");
        })
        .finally(() => {
            spinner.style.display = "none";
        });
});
