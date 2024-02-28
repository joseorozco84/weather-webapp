import React from 'react';

const ForecastHourCard = ({ hour }) => {
    const parsedTime = new Date(hour.time);
    const hours = parsedTime.getHours();
    const minutes = parsedTime.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    // Get the current time
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    // Define a threshold for "close" to the current hour (e.g., within 1 hour)
    const threshold = 0.5;
    
    // Check if the hour is close to the current hour
    const isCloseToCurrentHour = Math.abs(hours - currentHour) <= threshold;

    // Define a class name based on the condition
    const cardClassName = isCloseToCurrentHour ? 'forecast-now-hour-card' : 'forecast-hour-card';

    // // Define styles based on the condition
    // const cardStyles = {
    //     backgroundColor: isCloseToCurrentHour ? 'blue' : 'inherit', // Change to your desired color
    //     // Add more styles here if needed
    // };

    return (
        <div className={cardClassName}>
            <img src={hour.condition.icon} alt='weather' className='forecast-icon' />
            <div>{formattedTime}</div>
            <div>{Math.floor(hour.temp_c)}°C</div>
        </div>
    );
};

export default ForecastHourCard;
