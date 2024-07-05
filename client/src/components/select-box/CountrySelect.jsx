import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const CountrySelect = ({ onCountrySelect }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('movie/getallcountries');
        setCountries(response.data);
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy danh sách quốc gia', error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (event) => {
    const countryId = event.target.value;
    setSelectedCountry(countryId);
    onCountrySelect(countryId);
  };

  return (
    <div className="relative inline-block">
      <select 
        value={selectedCountry} 
        onChange={handleChange}
        className="border rounded-md p-2 flex items-center cursor-pointer"
      >
        <option value="" disabled hidden>
          Quốc gia
        </option>
        <option value="Tất cả">Tất cả</option>
        {countries.map((country) => (
          <option key={country.country_id} value={country.country_id}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};
