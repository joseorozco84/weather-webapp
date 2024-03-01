import React, { useState, useEffect } from 'react';
import ForecastHourCard from '../ForecastHourCard';
import ForecastDayCard from '../ForecastDayCard';
import ActualWeatherCard from '../ActualWeatherCard';
import SearchCityCard from '../SearchCityCard'; // Import the new component
import './WeatherApp.css';
import Spinner from 'react-bootstrap/Spinner';

const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState();
    const [error, setError] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [defaultCity, setDefaultCity] = useState(() => {
        return localStorage.getItem('defaultCity') || 'Neuquen';
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchWeatherData(defaultCity);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchWeatherData = async (city) => {
        try {
            setIsLoading(true); // Start loading
            const API_KEY = process.env.REACT_APP_API_KEY;
            const URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&aqi=no&days=7`;
            const response = await fetch(URL);
            if (!response.ok) {
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 3000);
                return;
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            // Introduce a delay before setting isLoading to false
            setTimeout(() => setIsLoading(false), 100); // Adjust the delay time as needed
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
        const newDefaultCity = weatherData.location.name;
        if (newDefaultCity !== defaultCity) {
            setDefaultCity(newDefaultCity);
            localStorage.setItem('defaultCity', newDefaultCity);
        }
    }
};


    return (
        <div className='container'>
            <SearchCityCard
                handleKeyPress={handleKeyPress}
                search={search}
                showAlert={showAlert}
            />
            {isLoading && <div><Spinner animation="grow" variant="primary" /></div>}
            {!isLoading && error && <div className='error'>{error}</div>}
            {!isLoading && weatherData && (
                <div className='weather-container'>
                    <ActualWeatherCard 
                        weatherData={weatherData}
                        onCityClick={handleCityClick}
                        defaultCity={defaultCity}
                    />
                    <hr className="hr" style={{ color: '#7d5fa3de' }} />
                    <div className='forecast-row'>
                        {weatherData.forecast.forecastday.map((day, dayIndex) => (
                            <ForecastDayCard
                                key={dayIndex}
                                day={day}
                            />
                        ))}
                    </div>
                    <hr className="hr" style={{ color: '#7d5fa3de' }} />
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
