import React from 'react';

const ForecastDayCard = ({ day }) => {
    const maxTemperature = day.day.maxtemp_c;
    
    // Extract year, month, and day from the date string
    const [year, month, dayOfMonth] = day.date.split('-').map(Number);

    // Create a new Date object with the extracted values
    const date = new Date(year, month - 1, dayOfMonth);

    const options = { weekday: 'short' };
    const formattedDay = new Intl.DateTimeFormat('en-US', options).format(date);

    return (
        <div className='forecast-day-card'>
            <img src={day.day.condition.icon} alt='weather' className='forecast-icon' />
            <span>{formattedDay}</span>
            <p>{maxTemperature}°C</p>
        </div>
    );
};

export default ForecastDayCard;
