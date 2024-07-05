const { PrismaClient, PrismaClientKnownRequestError } = require('@prisma/client');
const { uploadTheaterImages } = require('../uploadMiddleware');
const fs = require('fs');
const prisma = new PrismaClient();


const searchTheatersByName = async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Tên rạp không được bỏ trống' });
  }

  try {
    const theaters = await prisma.movie_theaters.findMany({
      where: {
        theater_name: {
          contains: name, 
        },
      },
      include: {
        theater_rating: true,
      },
    });
    res.json(theaters);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Có lỗi xảy ra' });
  }
};

const getAllTheaters = async (req, res) => {
  try {
    const theaters = await prisma.movie_theaters.findMany();
    res.json(theaters);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching movie theaters.' });
  }
};

const getTheatersByRegion = async (req, res) => {
  const { region } = req.params;

  if (!region) {
    return res.status(400).json({ error: 'Khu vực không được bỏ trống' });
  }

  try {
    const theaters = await prisma.movie_theaters.findMany({
      where: {
        region: region,
        
      },
      include: {
        theater_rating: true,
      },
    });
    res.json(theaters);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Có lỗi xảy ra khi lấy danh sách rạp chiếu phim.' });
  }
};

const getTheaterById = async (req, res) => {
  const { id } = req.params;
  try {
    const theater = await prisma.movie_theaters.findUnique({
      where: { theater_id: parseInt(id) }
    });
    if (theater) {
      res.json(theater);
    } else {
      res.status(404).json({ error: 'Movie theater not found.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while fetching the movie theater.' });
  }
};

const createTheater = async (req, res) => {
  uploadTheaterImages(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Error uploading files.' });
    }

    const { theater_name, address, region, description } = req.body;
    const theaterLogoPath = req.files['theater_logo'] ? req.files['theater_logo'][0].path : null;
    const theaterImage1Path = req.files['theater_image_1'] ? req.files['theater_image_1'][0].path : null;
    const theaterImage2Path = req.files['theater_image_2'] ? req.files['theater_image_2'][0].path : null;

    try {
      const newTheater = await prisma.movie_theaters.create({
        data: {
          theater_name,
          theater_logo: theaterLogoPath,
          theater_image_1: theaterImage1Path,
          theater_image_2: theaterImage2Path,
          address,
          region,
          description
        }
      });

      res.status(201).json(newTheater);
    } catch (error) {
      console.log(error);

      [theaterLogoPath, theaterImage1Path, theaterImage2Path].forEach((path) => {
        if (path) fs.unlinkSync(path);
      });

      res.status(500).json({ error: 'An error occurred while creating the movie theater.' });
    }
  });
};

const updateTheater = async (req, res) => {
  uploadTheaterImages(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Error uploading files.' });
    }

    const { id } = req.params;
    const { theater_name, address, region, description } = req.body;
    const theaterLogoPath = req.files['theater_logo'] ? req.files['theater_logo'][0].path : null;
    const theaterImage1Path = req.files['theater_image_1'] ? req.files['theater_image_1'][0].path : null;
    const theaterImage2Path = req.files['theater_image_2'] ? req.files['theater_image_2'][0].path : null;

    try {
      const existingTheater = await prisma.movie_theaters.findUnique({
        where: { theater_id: parseInt(id) }
      });

      if (!existingTheater) {
        [theaterLogoPath, theaterImage1Path, theaterImage2Path].forEach((path) => {
          if (path) fs.unlinkSync(path);
        });
        return res.status(404).json({ error: 'Movie theater not found.' });
      }

      const updatedTheater = await prisma.movie_theaters.update({
        where: { theater_id: parseInt(id) },
        data: {
          theater_name,
          theater_logo: theaterLogoPath || existingTheater.theater_logo,
          theater_image_1: theaterImage1Path || existingTheater.theater_image_1,
          theater_image_2: theaterImage2Path || existingTheater.theater_image_2,
          address,
          region,
          description
        }
      });

      [theaterLogoPath, theaterImage1Path, theaterImage2Path].forEach((path, index) => {
        const existingPath = index === 0 ? existingTheater.theater_logo : index === 1 ? existingTheater.theater_image_1 : existingTheater.theater_image_2;
        if (path && existingPath) fs.unlinkSync(existingPath);
      });

      res.json(updatedTheater);
    } catch (error) {
      console.log(error);

      [theaterLogoPath, theaterImage1Path, theaterImage2Path].forEach((path) => {
        if (path) fs.unlinkSync(path);
      });

      res.status(500).json({ error: 'An error occurred while updating the movie theater.' });
    }
  });
};

const deleteTheater = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTheater = await prisma.movie_theaters.delete({
      where: { theater_id: parseInt(id) }
    });

    res.status(200).json(deletedTheater);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ error: "Movie theater not found." });
    } else {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while deleting the movie theater.' });
    }
  }
};

module.exports = {
  getAllTheaters,
  getTheaterById,
  createTheater,
  updateTheater,
  deleteTheater,
  searchTheatersByName,
  getTheatersByRegion
};
