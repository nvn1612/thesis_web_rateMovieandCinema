import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { CompletedModal } from '../../../components/Completed-modal/CompletedModal';

export const MovieEdit = () => {
  const [formData, setFormData] = useState({
    name_movie: '',
    trailer_link: '',
    country: '',
    description: '',
    director: '',
    release_date: '',
    duration: '',
    genre: []
  });
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [posterImage, setPosterImage] = useState(null);
  const [posterImageUrl, setPosterImageUrl] = useState('');
  const [backdropImage, setBackdropImage] = useState(null);
  const [backdropImageUrl, setBackdropImageUrl] = useState('');
  const [countries, setCountries] = useState([]);
  const [showCompletedModal, setShowCompletedModal] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    axios.get(`/movie/getmovie/${movieId}`)
      .then(response => {
        const movie = response.data;
        setFormData({
          name_movie: movie.name_movie,
          trailer_link: movie.trailer_link,
          country: movie.country_id,
          description: movie.description,
          director: movie.director,
          release_date: movie.release_date ? movie.release_date.split('T')[0] : '',
          duration: movie.duration,
          genre: movie.movie_genres.map(g => g.genre_id)
        });
        setPosterImageUrl(`/${movie.poster_image}`);
        setBackdropImageUrl(`/${movie.backdrop_image}`);
      })
      .catch(error => {
        console.error('There was an error fetching the movie data!', error);
      });

    axios.get('/movie/getgenres')
      .then(response => {
        setGenres(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the genres data!', error);
      });

    axios.get('/movie/getallcountries')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the genres data!', error);
      });
  }, [movieId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleGenreChange = (e) => {
    const options = e.target.options;
    const selectedGenres = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedGenres.push(parseInt(options[i].value));
      }
    }
    setFormData(prevState => ({
      ...prevState,
      genre: selectedGenres
    }));
  };

  const handlePosterImageChange = (e) => {
    setPosterImage(e.target.files[0]);
  };

  const handleBackdropImageChange = (e) => {
    setBackdropImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('name_movie', formData.name_movie);
    formDataToSend.append('trailer_link', formData.trailer_link);
    formDataToSend.append('country', formData.country);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('director', formData.director);
    formDataToSend.append('release_date', formData.release_date);
    formDataToSend.append('duration', formData.duration);
    formDataToSend.append('genre', formData.genre.join(','));
    if (posterImage) formDataToSend.append('poster_image', posterImage);
    if (backdropImage) formDataToSend.append('backdrop_image', backdropImage);

    try {
      const response = await axios.put(`/movie/updatemovie/${movieId}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setShowCompletedModal(true);
    } catch (error) {
      alert('Cập nhật thất bại. Vui lòng thử lại.');
      console.error('Có vấn đề khi cập nhập phim !', error);
    }
  };
  const closeModal = () => {
    setShowCompletedModal(false);
    navigate('/admin/movies');
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name_movie"
            >
              Tên phim
            </label>
            <input
              className="px-5 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
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
              className="px-5 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              id="trailer_link"
              type="text"
              placeholder="Trailer link"
              value={formData.trailer_link}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="description"
            >
              Tóm tắt phim
            </label>
            <textarea
              className="px-5 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              id="description"
              placeholder="Viết tóm tắt"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
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
              value={formData.genre}
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
              className="px-5 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
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
              placeholder="Ngày phát hành"
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
              className="px-5 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
              id="duration"
              type="number"
              placeholder="Thời lượng (phút)"
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
            {posterImage ? (
              <img src={URL.createObjectURL(posterImage)} alt="Poster preview" className="mt-2 w-24 h-24 object-cover float-left" />
            ) : (
              <img src={posterImageUrl} alt="Poster" className="mt-2 w-24 h-24 object-cover float-left" />
            )}
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
            {backdropImage ? (
              <img src={URL.createObjectURL(backdropImage)} alt="Backdrop preview" className="mt-2 h-24 object-cover float-left" />
            ) : (
              <img src={backdropImageUrl} alt="Backdrop" className="mt-2  h-24 object-cover float-left" />
            )}
          </div>
        </div>
        <div className="md:flex md:items-center flex items-center justify-center mt-3">
          <button
            className="shadow bg-green-500 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Cập nhập phim
          </button>
        </div>
      </form>
      {showCompletedModal && (
          <CompletedModal isOpen={showCompletedModal} onClose={closeModal} />
        )}
    </div>
  );
};