import {React,useState} from "react";

export const MovieCreate = () => {
  const [posterImage, setPosterImage] = useState(null);
  const [backdropImage, setBackdropImage] = useState(null);

  const handlePosterImageChange = (e) => {
    setPosterImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleBackdropImageChange = (e) => {
    setBackdropImage(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-full max-w-lg" onSubmit={(e) => e.preventDefault()}>
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
              //   value={formData.username}
              //   onChange={handleChange}
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
              type="trailer_link"
              placeholder="trailer_link"
              //   value={formData.email}
              //   onChange={handleChange}
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
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name_movie"
            >
              Quốc gia
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="name_movie"
              type="text"
              placeholder="Tên phim"
              //   value={formData.username}
              //   onChange={handleChange}
            />
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
              // value={formData.genre}
              // onChange={handleChange}
            >
              <option value="">Chọn thể loại</option>
              <option value="action">Hành động</option>
              <option value="comedy">Hài hước</option>
              <option value="drama">Drama</option>
              <option value="fantasy">Fantasy</option>
              <option value="horror">Kinh dị</option>
              // Thêm các thể loại khác tại đây
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
              //   value={formData.phone_number}
              //   onChange={handleChange}
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
              //   value={formData.address}
              //   onChange={handleChange}
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
              //   value={formData.address}
              //   onChange={handleChange}
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
            {posterImage && <img src={posterImage} alt="Poster preview"  className=" mt-2 w-24 h-24 object-cover float-left" />}
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
              <img src={backdropImage} alt="Backdrop preview"  className=" mt-2 w-24 h-24 object-cover float-left" />
            )}
          </div>
        </div>
        <div className="md:flex md:items-center flex items-center justify-center">
          <button
            className="shadow bg-green-500 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            // onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
