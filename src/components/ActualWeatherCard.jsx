import React, { useState } from 'react';

const ActualWeatherCard = ({ weatherData }) => {
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
                <img src={weatherData.current.condition.icon} alt='weather' className='icon' />
            </div>
            
            <div className='weather-temp' onClick={toggleTemperatureUnit}>
            <i className="bi bi-thermometer-half" style={{ fontSize: '60px', color: '#ffa500' }}></i>
                {Math.floor(temperature)}{temperatureUnit}
            </div>
            <div className='weather-city'>{weatherData.location.name}</div>
            <div className='weather-country'>{weatherData.location.country}</div>
            <div className='data-container'>
                <div className='element'>
                    <i className="bi bi-water" style={{ fontSize: '60px', color: '#0dcaf0' }}></i>
                    <div className='data'>
                        <div className='humidity-percent'>{weatherData.current.humidity}%</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element' onClick={toggleWindSpeedUnit} >
                    <i className="bi bi-wind" style={{ fontSize: '60px', color: '#bdbdbd' }}></i>
                    <div className='data'>
                        <div className='wind-rate'>
                            {Math.floor(windSpeed)}{windSpeedUnit}
                        </div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ActualWeatherCard;
