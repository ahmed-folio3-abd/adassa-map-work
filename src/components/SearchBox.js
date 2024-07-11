import React, { useState } from 'react';
import axios from 'axios';
import './SearchBox.css';

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const handleSearch = async () => {
    if (!query && (!latitude || !longitude)) return;

    if (latitude && longitude) {
      onSearch({ latitude: parseFloat(latitude), longitude: parseFloat(longitude) });
    } else if (query) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
        );
        const location = response.data[0];
        if (location) {
          const { lat, lon } = location;
          onSearch({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
        }
      } catch (error) {
        console.error('Error searching location:', error);
      }
    }
  };

  return (
    <div className="search-box">
      {/* <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search location"
      /> */}
      <div className="lat-lon-inputs">
        <input
          type="text"
          value={latitude}
          onChange={handleLatitudeChange}
          placeholder="Latitude"
        />
        <input
          type="text"
          value={longitude}
          onChange={handleLongitudeChange}
          placeholder="Longitude"
        />
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBox;
