import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const SearchCityCard = ({ handleKeyPress, search, showAlert }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let intervalId;
        if (showAlert) {
            // Update progress from 0 to 100 in 3000ms
            const startTime = Date.now();
            intervalId = setInterval(() => {
                const elapsedTime = Date.now() - startTime;
                const progressValue = (elapsedTime / 2800) * 100;
                setProgress(progressValue >= 100 ? 100 : progressValue);
                if (progressValue >= 100) {
                    clearInterval(intervalId);
                }
            }, 100);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [showAlert]);

    const handleInputChange = (event) => {
        const inputValue = event.target.value.trim();
        // Regular expression pattern to allow only alphabet characters
        const regex = /^[a-zA-Z\s]*$/;
        if (!regex.test(inputValue)) {
            event.target.value = inputValue.slice(0, -1); // Remove the last character
        }
    };

    return (
        <div className='top-bar'>
            <div className='search-container'>
                <input
                    className='cityInput'
                    type='text'
                    placeholder='Search for a city'
                    onKeyPress={handleKeyPress}
                    onChange={handleInputChange} // Add onChange event handler
                />
                <div className='search-icon' onClick={search}>
                    <i className="bi bi-search" style={{ fontSize: '24px', color: 'gray' }}></i>
                </div>
            </div>
            {showAlert && (
                <div className={`alert alert-warning ${showAlert ? 'show' : 'hide'}`} role="alert">
                    <i className="bi bi-exclamation-circle-fill" style={{ color: 'darkorange' }}></i>
                    <span className='ms-2' style={{ fontWeight: '600' }}>You must enter a valid city name!</span>
                    <div>
                        <ProgressBar striped variant="danger" now={progress} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchCityCard;
