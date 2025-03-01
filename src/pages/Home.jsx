import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import WeatherCard from "../components/WeatherCard";
import Cards from "../components/Cards";
import { useSearchParams } from "react-router-dom";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Home = ({ weather, forecast, fetchWeather, fetchForecast }) => {
    const [searchParams] = useSearchParams();
    const city = searchParams.get("q") || "London"

    useEffect(() => {
        fetchWeather(city)
        fetchForecast(city)
    }, [city])

    const [forecasts, setForecasts] = useState([])

    useEffect(() => {
        if (forecast && forecast.forecast && forecast.forecast.forecastday) {
            setForecasts(forecast.forecast.forecastday);
        }
    }, [forecast])

    const getAQIColor = (aqi) => {
        if (aqi <= 50) return "#00E400"; // Good (Green)
        if (aqi <= 100) return "#FFFF00"; // Moderate (Yellow)
        if (aqi <= 150) return "#FF7E00"; // Unhealthy for Sensitive Groups (Orange)
        if (aqi <= 200) return "#FF0000"; // Unhealthy (Red)
        if (aqi <= 300) return "#8F3F97"; // Very Unhealthy (Purple)
        return "#7E0023"; // Hazardous (Maroon)
    };

    const getAQILevel = (aqi) => {
        if (aqi <= 50) return "Good 😊";
        if (aqi <= 100) return "Moderate 😐";
        if (aqi <= 150) return "Unhealthy for Sensitive Groups 🤧";
        if (aqi <= 200) return "Unhealthy 😷";
        if (aqi <= 300) return "Very Unhealthy 😨";
        return "Hazardous ☠️";
    };

    const getWeatherBackground = (condition) => {
        if (!condition) return "/images/clear.jpg"; // Default image
    
        const lowerCondition = condition.toLowerCase();
    
        if (lowerCondition.includes("rain")) return "/images/rain3.jpg";
        if (lowerCondition.includes("cloud") || lowerCondition.includes("overcast")) return "/images/cloudy.jpg";
        if (lowerCondition.includes("snow") || lowerCondition.includes("sleet")) return "/images/snow4.jpg";
        if (lowerCondition.includes("thunder")) return "/images/thunder.jpg";
        if (lowerCondition.includes("fog")) return "/images/mist.jpg";
        if (lowerCondition.includes("mist")) return "/images/mist.jpg";
        if (lowerCondition.includes("clear") || lowerCondition.includes("sunny")) return "/images/sunny.jpg";
        
        return ""; // Default fallback
    };

    return (
        <>
            <div className="weather-background"
            style={{
                backgroundImage: `url(${getWeatherBackground(weather?.current?.condition?.text)})`
            }}>   
            </div>
            <Topbar fetchWeather={fetchWeather} fetchForecast={fetchForecast} />
            <WeatherCard weather={weather} />

            {/* New Section for AQI & Wind Details */}
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-6 col-12 mb-3">
                        <div className="custom-card">
                            <h3 className="card-title" style={{ textAlign: 'center', fontWeight: '200' }}>AQI</h3>
                            <div className="d-flex align-items-center justify-content-between gap-3" style={{ width: "100%" }}>
                                {/* Progress Bar (Left Aligned) */}
                                <div style={{ width: 150, height: 150 }}>
                                    <CircularProgressbar
                                        value={Math.round(weather?.current?.air_quality?.pm2_5 || 0)}
                                        minValue={0}
                                        maxValue={500}
                                        text={`${Math.round(weather?.current?.air_quality?.pm2_5 || 0)}`}
                                        styles={buildStyles({
                                            pathColor: getAQIColor(Math.round(weather?.current?.air_quality?.pm2_5 || 0)),
                                            textColor: getAQIColor(Math.round(weather?.current?.air_quality?.pm2_5 || 0)),
                                            trailColor: "#d6d6d6",
                                        })}
                                    />
                                </div>

                                {/* AQI Text (Right Aligned) */}
                                <div className="text-end">
                                    <h4 style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                        {getAQILevel(Math.round(weather?.current?.air_quality?.pm2_5 || 0))}
                                    </h4>
                                    <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                                        PM2.5: {Math.round(weather?.current?.air_quality?.pm2_5 || 0)} µg/m³
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-lg-6 col-12 mb-3">
                        <div className="custom-card">
                            <h3 className="card-title" style={{ textAlign: 'center', fontWeight: '200' }}>Wind Details</h3>
                            <div className="d-flex align-items-center justify-content-between gap-3" style={{ width: "100%" }}>
                                {/* Progress Bar (Left Aligned) */}
                                <div style={{ width: 150, height: 150 }}>
                                    <img src="/images/wind.png" alt="Wind" style={{ width: 150, height: 150 }} />
                                </div>

                                {/* AQI Text (Right Aligned) */}
                                <div className="text-end">
                                    <h5 className="card-text">Speed: {weather?.current?.wind_kph} km/h</h5>
                                    <h5 className="card-text">Direction: {weather?.current?.wind_dir}</h5>
                                    <h5 className="card-text">Wind Degree: {weather?.current?.wind_degree}</h5>
                                    <h5 className="card-text">Humidity: {weather?.current?.humidity} %</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <br />
            <h2 style={{ textAlign: 'center', fontWeight: '200' }}>Upcoming Days Forecast</h2>
            <br />
            <div className="d-flex flex-wrap justify-content-center gap-3 mt-3 cards-container">
                {forecasts.map((obj, index) => (
                    <Cards count={index} forecast={obj} />
                ))}
            </div>
            <br/>
        </>
    )
}

export default Home


