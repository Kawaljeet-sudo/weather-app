import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import Home from './pages/Home';
import axios from 'axios';

function App() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  

  const fetchWeather = (cityname) => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityname}&aqi=yes`)
      .then(function (response) {
        setWeather(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  const fetchForecast = (cityname) => {
    axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityname}&aqi=yes&days=5`)
      .then(function (response) {
        setForecast(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home
          weather={weather}
          forecast={forecast}
          fetchWeather={fetchWeather}
          fetchForecast={fetchForecast} />} 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
