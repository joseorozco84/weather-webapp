import React, { useState } from 'react';

const ActualWeatherCard = ({ weatherData, onCityClick, defaultCity }) => {
    const [isCelsius, setIsCelsius] = useState(true);
    const [isKilometersPerHour, setIsKilometersPerHour] = useState(true);

    const toggleTemperatureUnit = () => {
        setIsCelsius((prevIsCelsius) => !prevIsCelsius);
    };

    const toggleWindSpeedUnit = () => {
        setIsKilometersPerHour((prevIsKilometersPerHour) => !prevIsKilometersPerHour);
    };

    const temperature = isCelsius ? weatherData.current.temp_c : weatherData.current.temp_f;
    const temperatureUnit = isCelsius ? "°C" : "°F";

    const windSpeed = isKilometersPerHour ? weatherData.current.wind_kph : weatherData.current.wind_mph;
    const windSpeedUnit = isKilometersPerHour ? "km/h" : "mi/h";

    return (
        <>
            <div className='weather-image'>
                <img src={weatherData.current.condition.icon} alt='weather' className='weather-icon' />
            </div>
            <div className='weather-temp'>
                <span onClick={toggleTemperatureUnit} style={{ cursor: 'pointer' }}>
                {Math.floor(temperature)}{temperatureUnit}
                </span>
            </div>
            <div className='weather-city'>
                {weatherData.location.name}
                {defaultCity === weatherData.location.name ? (
                    <span onClick={onCityClick} style={{ cursor: 'pointer' }}>
                    <i className="bi bi-star-fill" style={{ fontSize: '40px', color: '#ffa73c' }}></i>
                    </span>
                ) : (
                    <span onClick={onCityClick} style={{ cursor: 'pointer' }}>
                    <i className="bi bi-star" style={{ fontSize: '40px', color: '#6c757d' }}></i>
                    </span>
                )}
            </div>
            <div className='weather-country'>{weatherData.location.country}</div>
            <div className='data-container'>
                <div className='element'>
                    <i className="bi bi-water" style={{ fontSize: '60px', color: '#0dcaf0' }}></i>
                    <div className='data'>
                        <div className='humidity-percent'>{weatherData.current.humidity}%</div>
                        <div className='text' style={{ fontSize: '18px', color: '#6c757d' }}>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <i className="bi bi-wind" style={{ fontSize: '60px', color: '#bdbdbd' }}></i>
                    <div className='data'>
                        <div className='wind-rate'>
                            <span onClick={toggleWindSpeedUnit} style={{ cursor: 'pointer' }}>
                            {Math.floor(windSpeed)}{windSpeedUnit}
                            </span>
                        </div>
                        <div className='text' style={{ fontSize: '18px', color: '#6c757d' }}>Wind Speed</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ActualWeatherCard;
