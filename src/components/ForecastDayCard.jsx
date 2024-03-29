import React from 'react';

const ForecastDayCard = ({ day }) => {
    const maxTemperature = Math.floor(day.day.maxtemp_c);
    const currentDate = new Date(); // Get current date

    // Extract year, month, and day from the date string
    const [year, month, dayOfMonth] = day.date.split('-').map(Number);

    // Create a new Date object with the extracted values
    const dateFromApi = new Date(year, month - 1, dayOfMonth);

    let formattedDay;

    if (currentDate.toDateString() === dateFromApi.toDateString()) {
        formattedDay = 'Today';
    } else {
        const options = { weekday: 'short' };
        formattedDay = new Intl.DateTimeFormat('en-US', options).format(dateFromApi);
    }

    return (
        <div className='forecast-day-card'>
            <img src={day.day.condition.icon} alt='weather' className='forecast-icon' />
            <span className='formatted-day'>{formattedDay}</span>
            <p>{maxTemperature}°C</p>
        </div>
    );
};

export default ForecastDayCard;
