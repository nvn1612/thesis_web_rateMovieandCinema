import React, { useState, useEffect } from "react";
import axios from "axios";

export const MovieCreate = () => {
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [posterImage, setPosterImage] = useState(null);
  const [backdropImage, setBackdropImage] = useState(null);
  const [formData, setFormData] = useState({
    name_movie: "",
    trailer_link: "",
    country: "",
    description: "",
    director: "",
    release_date: "",
    duration: "",
    genre: [],
  });

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get("/movie/getgenres");
      setGenres(response.data);
    };
    fetchGenres();

    const fetchCountries = async () => {
      const response = await axios.get("/movie/getallcountries");
      setCountries(response.data);
    };
    fetchCountries();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleGenreChange = (e) => {
    const options = e.target.options;
    const selectedGenres = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedGenres.push(options[i].value);
      }
    }
    setFormData({ ...formData, genre: selectedGenres });
  };

  const handlePosterImageChange = (e) => {
    setPosterImage(e.target.files[0]);
  };

  const handleBackdropImageChange = (e) => {
    setBackdropImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name_movie", formData.name_movie);
    data.append("trailer_link", formData.trailer_link);
    data.append("country", formData.country);
    data.append("description", formData.description);
    data.append("director", formData.director);
    data.append("release_date", formData.release_date);
    data.append("duration", formData.duration);
    data.append("genre", formData.genre.join(','));
    if (posterImage) data.append("poster_image", posterImage);
    if (backdropImage) data.append("backdrop_image", backdropImage);

    try {
      const response = await axios.post("/movie/createmovie", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Movie created successfully!");
      console.log("Movie created successfully:", response.data);
    } catch (error) {
      alert("Error creating movie.");
      console.error("Error creating movie:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name_movie"
            >
              Tên phim
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="name_movie"
              type="text"
              placeholder="Tên phim"
              value={formData.name_movie}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="trailer_link"
            >
              Trailer_link
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="trailer_link"
              type="text"
              placeholder="trailer_link"
              value={formData.trailer_link}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="description"
            >
              Tóm tắt phim
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="description"
              placeholder="Viết tóm tắt"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="country"
            >
              Quốc gia
            </label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Chọn quốc gia</option>
              {countries.map((country) => (
                <option key={country.country_id} value={country.country_id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="genre"
            >
              Thể loại
            </label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="genre"
              multiple
              onChange={handleGenreChange}
            >
              {genres.map((genre) => (
                <option key={genre.genre_id} value={genre.genre_id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="director"
            >
              Đạo diễn
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="director"
              placeholder="Tên đạo diễn"
              value={formData.director}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="release_date"
            >
              Ngày phát hành
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="release_date"
              type="date"
              value={formData.release_date}
              onChange={handleChange}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="duration"
            >
              Thời lượng
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex space-x-5">
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="poster_image"
            >
              Poster
            </label>
            <input
              className=""
              id="poster_image"
              type="file"
              onChange={handlePosterImageChange}
            />
            {posterImage && <img src={URL.createObjectURL(posterImage)} alt="Poster preview" className="mt-2 w-24 h-24 object-cover float-left" />}
          </div>
          <div>
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="backdrop_image"
            >
              Bìa
            </label>
            <input
              className=""
              id="backdrop_image"
              type="file"
              onChange={handleBackdropImageChange}
            />
            {backdropImage && (
              <img src={URL.createObjectURL(backdropImage)} alt="Backdrop preview" className="mt-2 w-24 h-24 object-cover float-left" />
            )}
          </div>
        </div>
        <div className="md:flex md:items-center flex items-center justify-center">
          <button
            className="shadow bg-green-500 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
