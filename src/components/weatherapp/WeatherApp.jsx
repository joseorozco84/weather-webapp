import React, { useState, useEffect } from 'react';
import ForecastCard from '../ForecastCard';
import './WeatherApp.css';


import search_icon from '../assets/search.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState();
    const [error, setError] = useState();
    const [inputValue, setInputValue] = useState('');
    const defaultCity = 'Neuquen'; // Specify your default city here

    useEffect(() => {
        fetchWeatherData(defaultCity);
    }, [defaultCity]); // Empty dependency array to run once on component mount

    const fetchWeatherData = async (city) => {
        try {
            const API_KEY = process.env.REACT_APP_API_KEY;
            const URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&aqi=no`;

            const response = await fetch(URL);
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            setError('An error occurred while fetching data');
        }
    };

    const search = () => {
        const cityInput = document.querySelector('.cityInput');
        const city = cityInput.value.trim();
        if (!city) {
            setError('Please enter a city');
            return;
        }

        fetchWeatherData(city);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    };

    const handleChange = (event) => {
        const { value } = event.target;
        // Validate input using regex
        if (/^[a-zA-Z\s]*$/.test(value) || value === '') {
            setInputValue(value);
        }
    };

    return (
        <div className='container'>
            <div className='top-bar'>
                <div className='search-container'>
                    <input
                        className='cityInput'
                        type='text'
                        placeholder='Search'
                        value={inputValue}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress} // Trigger search on "Enter" key press
                    />
                    <div className='search-icon' onClick={search}>
                        <img src={search_icon} alt='search' />
                    </div>
                </div>
            </div>
            {weatherData && (
                <div className='weather-container'>
                    <div className='weather-image'>
                        <img src={weatherData.current.condition.icon} alt='weather' className='icon' />
                    </div>
                    <div className='weather-temp'>{Math.floor(weatherData.current.temp_c)}°C</div>
                    <div className='weather-city'>{weatherData.location.name}</div>
                    <div className='weather-country'>{weatherData.location.country}</div>
                    <div className='data-container'>
                        <div className='element'>
                            <img src={humidity_icon} alt='humidity' />
                            <div className='data'>
                                <div className='humidity-percent'>{weatherData.current.humidity}%</div>
                                <div className='text'>Humidity</div>
                            </div>
                        </div>
                        <div className='element'>
                            <img src={wind_icon} alt='wind' />
                            <div className='data'>
                                <div className='wind-rate'>{Math.floor(weatherData.current.wind_kph)}km/h</div>
                                <div className='text'>Wind Speed</div>
                            </div>
                        </div>
                    </div>
                    <div className='forecast'>Forecast</div>
                    <div>
                        {weatherData.forecast.forecastday.map((day, index) => (
                            <div className='row' key={index}>
                            {day.hour.map((hour, hourIndex) => (
                                <ForecastCard key={hourIndex} hour={hour} />
                            ))}
                        </div>
                        ))}
                    </div>
                </div>
            )}
            {error && <div className='error'>{error}</div>}
        </div>
    );
};

export default WeatherApp;
