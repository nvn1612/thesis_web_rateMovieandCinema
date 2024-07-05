const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { uploadUserImage } = require('../uploadMiddleware');
const fs = require('fs');
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const activation_token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  try {
    const user = await prisma.users.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Kích hoạt tài khoản',
      text: `Chào ${username},\n\nHãy nhấn vào link bên dưới để kích hoạt tài khoản của bạn:\nhttp://${req.headers.host}/user/activate/${activation_token}\n\nNếu bạn không yêu cầu điều này vui lòng bỏ qua email này.\n`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const activateUser = async (req, res) => {
  const { token } = req.params;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decodedToken) {
      if (err) {
        return res.status(400).json({ error: 'Incorrect or Expired link.' });
      }
      const { email } = decodedToken;

      await prisma.users.update({
        where: { email: email },
        data: { is_active: true },
      });

      return res.redirect('http://localhost:3000/notify-success');
    });
  } else {
    return res.json({ error: 'Error activating account.' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.users.findUnique({
      where: { username: username },
    });

    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: 'Incorrect password.' });
    }

    if (!user.is_active) {
      return res.status(400).json({ error: 'Account is not activated.' });
    }

    const token = jwt.sign({ username: user.username, isAdmin: user.is_Admin }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token: token, user: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { username } = req.body;

  const user = await prisma.users.findUnique({ where: { username } });

  if (!user) {
    return res.status(400).json({ error: 'Tài khoản không tồn tại !' });
  }

  const resetPasswordToken = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: user.email,
    subject: 'Đặt lại mật khẩu',
    text: `Hãy nhấn vào đường link dưới đây để đặt lại mật khẩu \n\nhttp://localhost:3000/reset-password/${resetPasswordToken}\n\Nếu bạn không yêu cầu điều này, hãy bỏ qua nó ! \n`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.status(200).json({ message: 'Vui lòng vào email của bạn để thay đổi mật khẩu !' });
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  console.log('Received token:', token);
  const { newPassword } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Invalid or expired token.' });
  }

  try {
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decodedToken);

    const userId = decodedToken.id;
    if (!userId) {
      return res.status(400).json({ error: 'Invalid token payload.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.users.update({
      where: { user_id: userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: 'Mật khẩu đã được thay đổi thành công.' });
  } catch (error) {
    console.error('Error during token verification or password update:', error);
    res.status(400).json({ error: 'Có lỗi xảy ra!.' });
  }
};

const getUsers = async (req, res) => {
  const users = await prisma.users.findMany();
  res.json(users);
};

const searchUsersByUsername = async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Missing username parameter.' });
  }

  try {
    const users = await prisma.users.findMany({
      where: {
        username: {
          contains: username

        },
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while searching for users.' });
  }
};

const getUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await prisma.users.findUnique({
      where: {
        user_id: Number(user_id),
      },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createUser = async (req, res) => {
  uploadUserImage(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Error uploading files.' });
    }

    const { email, username, password, name, phone_number, address, is_Admin, is_expert, occupation } = req.body;
    const avatarPath = req.file ? req.file.path : null;

    try {
      const existingUser = await prisma.users.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });

      if (existingUser) {
        if (avatarPath) {
          fs.unlinkSync(avatarPath);
        }
        return res.status(400).json({ error: 'Email hoặc username đã tồn tại !' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const isAdminBool = is_Admin === 'true';
      const isExpertBool = is_expert === 'true';

      const newUser = await prisma.users.create({
        data: {
          email,
          username,
          password: hashedPassword,
          name,
          phone_number,
          address,
          avatar: avatarPath,
          is_active: true,
          is_Admin: isAdminBool,
          is_expert: isExpertBool,
          occupation,
        },
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);

      if (avatarPath) {
        fs.unlinkSync(avatarPath);
        console.log(`Deleted file: ${avatarPath}`);
      }

      res.status(500).json({ error: 'Có lỗi xảy ra' });
    }
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await prisma.users.delete({ where: { user_id: Number(id) } });
    res.status(200).json(deletedUser);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'p2025') {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const updateUser = async (req, res) => {
  uploadUserImage(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'Error uploading files.' });
    }

    const { name, is_Admin, is_expert } = req.body;
    const { user_id } = req.params;
    const avatarPath = req.file ? req.file.path : null;
    const isAdminBool = is_Admin === 'true';
    const isExpertBool = is_expert === 'true';

    try {
      const oldUser = await prisma.users.findUnique({
        where: { user_id: Number(user_id) },
      });

      const oldAvatarPath = oldUser.avatar;

      const updatedUser = await prisma.users.update({
        where: { user_id: Number(user_id) },
        data: {
          name,
          avatar: avatarPath,
          is_Admin: isAdminBool,
          is_expert: isExpertBool,
        },
      });

      if (avatarPath && oldAvatarPath) {
        fs.unlinkSync(oldAvatarPath);
        console.log(`Deleted old avatar: ${oldAvatarPath}`);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);

      if (avatarPath) {
        fs.unlinkSync(avatarPath);
        console.log(`Deleted file: ${avatarPath}`);
      }

      res.status(500).json({ error: 'Có lỗi xảy ra' });
    }
  });
};

const getUserRatings = async (req, res) => {
  const { user_id } = req.params;

  try {
    const userIdInt = parseInt(user_id, 10);
    if (isNaN(userIdInt)) {
      return res.status(400).json({ error: 'Invalid user_id parameter.' });
    }

    const movieRatings = await prisma.movie_rating.findMany({
      where: { user_id: userIdInt },
      include: {
        movies: true,
      },
    });

    const theaterRatings = await prisma.theater_rating.findMany({
      where: { user_id: userIdInt },
      include: {
        movie_theaters: true,
      },
    });

    return res.status(200).json({ movieRatings, theaterRatings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving the user ratings.' });
  }
};


const getActiveUsers = async (req, res) => {
  try {
    const activeUsers = await prisma.users.findMany({
      where: {
        is_active: true,
      },
    });
    res.status(200).json(activeUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching active users.' });
  }
};

const getUnactiveUsers = async (req, res) => {
  try {
    const inactiveUsers = await prisma.users.findMany({
      where: {
        is_active: false,
      },
    });
    res.status(200).json(inactiveUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching inactive users.' });
  }
}

const getAdmin = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      where: {
        is_Admin: true,
        is_expert: false,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching admin not expert users.' });
  }
};

const getAudience = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      where: {
        is_Admin: false,
        is_expert: false,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching not admin not expert users.' });
  }
};

const getExpert = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      where: {
        is_Admin: false,
        is_expert: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching expert not admin users.' });
  }
};


module.exports = {
  registerUser,
  activateUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  getUserRatings,
  searchUsersByUsername,
  getActiveUsers,
  getUnactiveUsers,
  getExpert,
  getAudience,
  getAdmin
};
