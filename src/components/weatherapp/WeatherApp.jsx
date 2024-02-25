import React, { useState, useEffect } from 'react';
import ForecastCard from '../ForecastCard';
import './WeatherApp.css';


const WeatherApp = () => {
    const [weatherData, setWeatherData] = useState();
    const [error, setError] = useState();
    const [showAlert, setShowAlert] = useState(false);
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
            // setError('Please enter a city');
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }
        fetchWeatherData(city);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            search();
        }
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
                        <i class="bi bi-search"></i>
                    </div>
                </div>
            </div>
            {showAlert && (
                <div className={`alert alert-warning ${showAlert ? 'show' : ''}`} role="alert">
                    <i className="bi bi-exclamation-diamond-fill" style={{ color: 'darkorange' }}></i>
                    <span className='ms-2'>You must enter a city name</span>
                </div>
            )}
            {/* <div className="alert alert-warning" role="alert">
            <i className="bi bi-exclamation-diamond-fill" style={{ color: 'darkorange' }}></i>
            <span className='ms-2'>You must enter a city name</span>
            </div> */}
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
                            <i className="bi bi-water" style={{ fontSize: '60px' }}></i>
                            <div className='data'>
                                <div className='humidity-percent'>{weatherData.current.humidity}%</div>
                                <div className='text'>Humidity</div>
                            </div>
                        </div>
                        <div className='element'>
                            <i class="bi bi-wind" style={{ fontSize: '60px' }}></i>
                            <div className='data'>
                                <div className='wind-rate'>{Math.floor(weatherData.current.wind_kph)}km/h</div>
                                <div className='text'>Wind Speed</div>
                            </div>
                        </div>
                    </div>
                    <hr className="hr" style={{ color: 'white' }} />
                    <div className='forecastRow'>
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
