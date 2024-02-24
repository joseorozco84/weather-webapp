// ForecastCard.js
import React from 'react';

const ForecastCard = ({ hour }) => {

    const parsedTime = new Date(hour.time);
    const hours = parsedTime.getHours();
    const minutes = parsedTime.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return (
        <div className='forecast-card'>
            <img src={hour.condition.icon} alt='weather' className='forecast-icon' />
            <div>{Math.floor(hour.temp_c)}°C</div>
            <div>{formattedTime}</div>
        </div>
    );
};

export default ForecastCard;
