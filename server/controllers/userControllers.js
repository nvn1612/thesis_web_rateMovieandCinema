const { PrismaClient, PrismaClientKnownRequestError } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const activation_token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  try {
    const user = await prisma.users.create({
      data: {
        email,
        username,
        password: hashedPassword,
        activation_token,
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: "Account Activation Link",
      text: `Hello ${username},\n\nPlease click on the following link to activate your account:\nhttp://${req.headers.host}/user/activate/${activation_token}\n\nIf you did not request this, please ignore this email.\n`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
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
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      async function (err, decodedToken) {
        if (err) {
          return res.status(400).json({ error: "Incorrect or Expired link." });
        }
        const { email } = decodedToken;
        const user = await prisma.users.update({
          where: { email: email },
          data: { is_active: true },
        });
        return res.redirect("http://localhost:3000/notify-success");
      }
    );
  } else {
    return res.json({ error: "Error activating account." });
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
  
      const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
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
    return res.status(400).json({ error: 'No user found with that username.' });
  }

  const resetPasswordToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
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
    subject: 'Password Reset',
    text: `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\nhttp://${req.headers.host}/reset-password/${resetPasswordToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.status(200).json({ message: 'A password reset email has been sent.' });
};


const getUsers = async (req, res) => {
  const users = await prisma.users.findMany();
  res.json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await prisma.users.findUnique({ where: { user_id: Number(id) } });
  res.json(user);
};

const createUser = async (req, res) => {
  const { email, username, password, first_name, last_name, phone_number, address, isAdmin } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const activation_token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  const newUser = await prisma.users.create({
    data: {
      email,
      username,
      password: hashedPassword,
      first_name,
      last_name,
      phone_number,
      address,
      activation_token,
      is_active: true,
      isAdmin,
    },
  });

  res.status(201).json(newUser);
};


const deleteUser = async (req, res) => {
  const { id } = req.params;
  try{
    const deletedUser = await prisma.users.delete({ where: { user_id: Number(id) } });
    res.status(200).json(deletedUser);
  }catch(error){
    if(error instanceof PrismaClientKnownRequestError && error.code === 'p2025'){
      res.status(404).json({error:"User not found"});
    }else{
      res.status(500).json({error:error.message})
    }
  }
};
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploadimage/') 
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) 
  }
});

const upload = multer({ storage: storage });
exports.updateUser = [upload.single('avatar'), async (req, res) => {
  const {id} = req.params;
  const {username,email,password,phone_number,address,is_Admin,is_active,is_expert}= req.body;
  const avatar = req.file.path;
  try{
    const updateUser = await prisma.users.update({
      where:{user_id: Number(id)},
      data:{username,email,password,phone_number,address,avatar,is_Admin,is_active,is_expert}
    })
    res.status(200).json(updateUser);
  }catch(error){
    if(error instanceof PrismaClientKnownRequestError && error.code === 'p2025'){
      res.status(404).json({error:"User not found"});
    }else{
      res.status(500).json({error:error.message})
    }
  }
}];


module.exports = {
  registerUser,
  activateUser,
  loginUser,
  forgotPassword,
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
};
