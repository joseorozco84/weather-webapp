import React, { useState, useEffect } from 'react';
import ForecastHourCard from '../ForecastHourCard';
import ActualWeatherCard from '../ActualWeatherCard';
import './WeatherApp.css';


const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState();
    const [error, setError] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [showForecast, setShowForecast] = useState(true); // State to control forecast row visibility
    const defaultCity = 'Neuquen'; // Specify your default city here

    useEffect(() => {
        fetchWeatherData(defaultCity);
    }, [defaultCity]); // Empty dependency array to run once on component mount

    const fetchWeatherData = async (city) => {
        try {
            const API_KEY = process.env.REACT_APP_API_KEY;
            const URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&aqi=no&days=7`;

            const response = await fetch(URL);
            const data = await response.json();
            console.log(data);
            setWeatherData(data);
        } catch (error) {
            setError('An error occurred while fetching data');
        }
    };

    const search = () => {
        const cityInput = document.querySelector('.cityInput');
        const city = cityInput.value.trim();
        if (!city) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }
        fetchWeatherData(city);
        setShowAlert(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    };

    const toggleForecastVisibility = () => {
        setShowForecast(prevShowForecast => !prevShowForecast);
    };

    return (
        <div className='container'>
            <div className='top-bar'>
                <div className='search-container'>
                    <input
                        className='cityInput'
                        type='text'
                        placeholder='Search for a city'
                        onKeyPress={handleKeyPress} // Trigger search on "Enter" key press
                    />
                    <div className='search-icon' onClick={search}>
                        <i className="bi bi-search" style={{ fontSize: '24px', color: 'gray' }} data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tooltip on bottom"></i>
                    </div>
                </div>
                {showAlert && (
                    <div className={`alert alert-warning ${showAlert ? 'show' : 'hide'}`} role="alert">
                        <i className="bi bi-exclamation-circle-fill" style={{ color: 'darkorange' }}></i>
                        <span className='ms-2' style={{ fontWeight: '600' }}>You must enter a city name!</span>
                    </div>
                )}
            </div>
            {weatherData && (
                <div className='weather-container'>
                    <ActualWeatherCard weatherData={weatherData} />
                    <hr className="hr" style={{ color: 'white' }} />
                    <button type="button" class="btn btn-primary" onClick={toggleForecastVisibility}>
                        <i class="me-2 bi bi-clock-history"></i>
                        {showForecast ? 'Hide Forecast' : 'Show Forecast'}
                    </button>
                    {showForecast && (
                        <div className='forecastRow'>
                            {/* Render forecast for today */}
                            <div className='row'>
                                {weatherData.forecast.forecastday.length > 0 &&
                                    weatherData.forecast.forecastday[0].hour.map((hour, hourIndex) => (
                                        <ForecastHourCard key={hourIndex} hour={hour} />
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
            {error && <div className='error'>{error}</div>}
        </div>
    );
};

export default WeatherApp;
