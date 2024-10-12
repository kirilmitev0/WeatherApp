const apiKey = 'ca04a023338d70dbbe8e9c4d659bdbbe'; 

document.getElementById('search-btn').addEventListener('click', function () {
  const city = document.getElementById('city-input').value;
  if (city) {
    getWeatherData(city);
  } else {
    showErrorMessage('Please enter a city name.');
  }
});

function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      displayWeatherData(data);
    })
    .catch(error => {
      showErrorMessage(error.message);
    });
}

function displayWeatherData(data) {
  const cityName = data.name;
  const temperature = Math.round(data.main.temp) + '°C';
  const description = data.weather[0].description;

  document.getElementById('city-name').textContent = cityName;
  document.getElementById('temperature').textContent = temperature;
  document.getElementById('description').textContent = description;
  document.getElementById('error-message').textContent = '';
}

function showErrorMessage(message) {
  document.getElementById('error-message').textContent = message;
  document.getElementById('city-name').textContent = '';
  document.getElementById('temperature').textContent = '';
  document.getElementById('description').textContent = '';
}
