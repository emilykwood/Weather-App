import './App.css';
import React, { useState } from 'react';

export function App() {
  let date = new Date()
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let fullDate = `${day}/${month}/${year}`;

  const api = {
    key: "20f93b488acd2004e29fe36ff7e992b3",
    url: "https://api.openweathermap.org/data/2.5/weather?q="
  }

  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState({ "weather": [{ "description": "" }], "main": { "temp": "" }, "sys": { "country": "" }, "name": "", "cod": 200 });

  const handleChange = (event) => {
    setLocation(event.target.value);
  }

  const handleSubmit = () => {
    fetch(`${api.url}${location}&appid=${api.key}&units=metric`)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          alert('Error: Please enter a valid city')
          throw Error(response.statusText);
        }
      })
      .then(result => {
        setWeather(result);
        setLocation('');
        console.log(result);

        // }).catch((error) => {
        // // console.log(error);

      })
  }


  const handleEnter = (evt) => {
    if (evt.key === 'Enter') {
      handleSubmit()
    }
  };

  let backgroundImage;
  let desc = weather.weather[0].description;
  if (desc.includes("clear sky")) {
    backgroundImage = "sun";
  } else if (desc.includes("snow")) {
    backgroundImage = "snow";
  } else if (desc.includes("cloud")) {
    backgroundImage = "cloud";
  } else {
    backgroundImage = "rain";
  };


  return (
    <div className="App">
      <h1>
        Weather Forecast
      </h1>
      <input type="text" className="search-bar" placeholder="Enter your city" value={location} onChange={handleChange} onKeyPress={handleEnter} ></input>
      <button type='submit' onClick={handleSubmit}> Search </button>
      <div className={backgroundImage === 'sun' ? 'app-sun' : (backgroundImage === 'cloud' ? 'app-cloud' : (backgroundImage === 'snow' ? 'app-snow' : 'app-rain'))}>
        <div className="location">{weather.name === '' ? '' : weather.name + ', ' + weather.sys.country}</div>
        <div className="temperature">{weather.main.temp === '' ? '' : weather.main.temp + '°C'}</div>
        <div className="weatherCondition">{weather.weather[0].description === '' ? '' : weather.weather[0].description} </div>
        <h2 className="todaysDate">{fullDate}</h2>
      </div>
    </div>
  );
}


export default App;


