const User = require('../models/user');
const {
  ERROR_CODE_USER, ERROR_CODE_BAD_REQUEST, ERROR_CODE_SERVER, message400, message500,
} = require('../utils/errors');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(ERROR_CODE_USER).send({ message: message400 });
    } else {
      res.status(ERROR_CODE_SERVER).send({ message: message500 });
    }
  }
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_USER).send({ message: message400 });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_SERVER).send({ message: message500 });
      }
      throw err;
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar,
  } = req.body;
  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_SERVER).send({ message: message500 });
      }
      throw err;
    })
    .catch(next);
};


const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {
      name: req.body.name,
      about: req.body.about,
    }, { runValidators: true, new: true })
      .orFail(new Error('NotValidId'));
    res.send(user);
  } catch (err) {
    if (err.message === 'NotValidId') {
      res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'No such user' });
    } else if (err.name === 'ValidationError') {
      res.status(ERROR_CODE_USER).send({ message: err.message });
    } else {
      res.status(ERROR_CODE_SERVER).send({ message: message500 });
    }
  }
};

const updateAvatarUser = async (req, res) => {
  try {
    const avatarLink = req.body.avatar;

    const pattern = /^(http|https):\/\/(?:www\.)?[a-zA-Z0-9._~:\/?%#\[\]@!$&'()*+,;=-]+(?:#[a-zA-Z0-9._~:\/?%#\[\]@!$&'()*+,;=-]+)?$/;

    if (!pattern.test(avatarLink)) {
      return res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Invalid avatar link' });
    }

    const avatar = await User.findByIdAndUpdate(req.user._id, {
      avatar: avatarLink,
    }, { runValidators: true, new: true })
      .orFail(new Error('NotValidId'));

    res.send(avatar);
  } catch (err) {
    if (err.message === 'NotValidId') {
      res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'No such user' });
    } else if (err.name === 'ValidationError') {
      res.status(ERROR_CODE_USER).send({ message: err.message });
    } else {
      res.status(ERROR_CODE_SERVER).send({ message: message500 });
    }
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatarUser,
};
