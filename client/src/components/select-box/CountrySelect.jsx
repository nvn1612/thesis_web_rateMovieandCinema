import React, { useState } from 'react';

export const CountrySelect = () => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const countries = ['Việt Nam', 'Trung Quốc', 'Mỹ', 'Nhật Bản', 'Hàn Quốc', 'Pháp', 'Đức', 'Tây Ban Nha'];

  const handleChange = (event) => {
    setSelectedCountry(event.target.value);
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
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};
