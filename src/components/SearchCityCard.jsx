// SearchCityCard.jsx
import React from 'react';

const SearchCityCard = ({ handleKeyPress, search, showAlert }) => {
    return (
        <div className='top-bar'>
            <div className='search-container'>
                <input
                    className='cityInput'
                    type='text'
                    placeholder='Search for a city'
                    onKeyPress={handleKeyPress}
                />
                <div className='search-icon' onClick={search}>
                    <i className="bi bi-search" style={{ fontSize: '24px', color: 'gray' }}></i>
                </div>
            </div>
            {showAlert && (
                <div className={`alert alert-warning ${showAlert ? 'show' : 'hide'}`} role="alert">
                    <i className="bi bi-exclamation-circle-fill" style={{ color: 'darkorange' }}></i>
                    <span className='ms-2' style={{ fontWeight: '600' }}>You must enter a city name!</span>
                </div>
            )}
        </div>
    );
};

export default SearchCityCard;
