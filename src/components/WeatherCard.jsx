import React from 'react'
import "../main.css";


const WeatherCard = ({weather}) => {
    if(!weather){
        return null;
    }

    return (
        <div className="weather-card" >
            <img src={weather.current.condition.icon} alt={weather.current.condition.text}/>
            <h2 style={{fontWeight:'200'}}>{weather.location.name}, {weather.location.country}</h2>
            <h1 style={{fontWeight:'900'}}>{weather.current.temp_c}°C</h1>
            <p><b>Conditions: </b>{weather.current.condition.text}</p>
        </div>
    );
}

export default WeatherCard