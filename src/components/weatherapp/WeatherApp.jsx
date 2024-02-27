import React, { useState, useEffect } from 'react';
import ForecastHourCard from '../ForecastHourCard';
import ForecastDayCard from '../ForecastDayCard';
import ActualWeatherCard from '../ActualWeatherCard';
import SearchCityCard from '../SearchCityCard'; // Import the new component
import './WeatherApp.css';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState();
    const [error, setError] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [defaultCity, setDefaultCity] = useState(() => {
        return localStorage.getItem('defaultCity') || 'Neuquen';
    });

    useEffect(() => {
        fetchWeatherData(defaultCity);
    }, [defaultCity]);

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
        cityInput.value = '';
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            search();
        }
    };

    const handleCityClick = () => {
        if (weatherData) {
            setDefaultCity(weatherData.location.name);
            localStorage.setItem('defaultCity', weatherData.location.name);
        }
    };

    return (
        <div className='container'>
            <SearchCityCard
                handleKeyPress={handleKeyPress}
                search={search}
                showAlert={showAlert}
            />
            {error && <div className='error'>{error}</div>}
            {weatherData && (
                <div className='weather-container'>
                    <ActualWeatherCard 
                        weatherData={weatherData}
                        onCityClick={handleCityClick}
                        defaultCity={defaultCity}
                    />
                    <hr className="hr" style={{ color: 'white' }} />
                    <div className='forecast-row'>
                        {weatherData.forecast.forecastday.map((day, dayIndex) => (
                            <ForecastDayCard
                                key={dayIndex}
                                day={day}
                            />
                        ))}
                    </div>
                    <hr className="hr" style={{ color: 'white' }} />
                    <div className='forecast-row'>
                        <div className='row'>
                            {weatherData.forecast.forecastday.length > 0 &&
                                weatherData.forecast.forecastday[0].hour.map((hour, hourIndex) => (
                                    <ForecastHourCard
                                        key={hourIndex}
                                        hour={hour}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
