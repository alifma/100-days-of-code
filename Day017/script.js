async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'your_api_key_here';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.weather) {
            const display = document.getElementById('weatherDisplay');
            display.innerHTML = `
                <h2>Weather in ${data.name}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].main}</p>
                <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
            `;
        } else {
            alert('Weather data not found. Try another city.');
        }
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        alert('Failed to fetch weather data.');
    }
}
