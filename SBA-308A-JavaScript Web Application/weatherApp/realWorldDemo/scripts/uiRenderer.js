export function displayWeather(weatherData) {
    const temperatureK = weatherData.main?.temp || `N/A`;
    const description = weatherData.weather?.[0]?.description || `N/A`;
    const feelslikeK = weatherData.main?.feels_like || `N/A`;
    const humidity = weatherData.main?.humidity || `N/A`;
    const pressure = weatherData.main?.pressure || `N/A`;
    const windSpeed = weatherData.wind?.speed || `N/A`;
    const windDirection = weatherData.wind?.deg || `N/A`;
    const visibility = weatherData.visibility || `N/A`;
    console.log('Weather Data: ', weatherData)

    const temperatureC = temperatureK !== `N/A` ? (temperatureK - 273.15).toFixed(2) : `N/A`;
    const feelsLikeC = temperatureK !== `N/A` ? (feelslikeK - 273.15).toFixed(2) : `N/A`;

    const timezoneOffsetSeconds = weatherData.timezone || 0;

    const sunriseUTC = weatherData.sys?.sunrise ? new Date(weatherData.sys.sunrise * 1000) : null;
    const sunsetUTC = weatherData.sys?.sunset ? new Date(weatherData.sys.sunset * 1000) : null;

    const sunriseLocal = sunriseUTC ? new Date(sunriseUTC.getTime() + timezoneOffsetSeconds * 1000) : `N/A`;
    const sunsetLocal = sunsetUTC ? new Date(sunsetUTC.getTime() + timezoneOffsetSeconds * 1000) : `N/A`;

    const options = { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' };
    const sunriseLocalString = sunriseLocal !== `N/A` ? sunriseLocal.toLocaleTimeString('en-US', options) + ` GMT${timezoneOffsetSeconds / 3600 >= 0 ? '+' : ''}${timezoneOffsetSeconds / 3600}` : 'N/A';
    const sunsetLocalString = sunsetLocal !== `N/A` ? sunsetLocal.toLocaleTimeString('en-US', options) + ` GMT${timezoneOffsetSeconds / 3600 >= 0 ? '+' : ''}${timezoneOffsetSeconds / 3600}` : 'N/A';

    const weatherContainer = document.getElementById(`weather-container`);

    if (weatherContainer) {
        weatherContainer.innerHTML = `
        <p>Temperatur: ${temperatureC}°C</p>
        <p>Feels Like: ${feelsLikeC}°C</p>
        <p>Description: ${description}</p>
        <p>Humidity: ${humidity}</p>
        <p>Pressure: ${pressure} hPa</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Visibility: ${visibility !== 'N/A' ? (visibility / 1000).toFixed(2) + ' km ' : 'N/A'}</p>
        <p>Sunrise: ${sunriseLocalString}</p>
        <p>Sunset: ${sunsetLocalString}</p>
        <button id="save-favorite">Save to Favorites</button>
        `;
    } else {
        console.error('Weather container element is missing');
    }
}
