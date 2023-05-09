const path = require('path');

const { getJsonFromFile } = require('../helpers/files');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');
const getUsers = async (req, res) => {
  try {
    const users = await getJsonFromFile(usersFilePath);
    res.send(users);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
};

const getUserById = async (req, res) => {
  try {
    const users = await getJsonFromFile(usersFilePath);
    const foundUser = users.find((user) => user._id === req.params._id);

    if (!foundUser) {
      res.status(404).send({ message: 'User not exist' });
    }
    res.send(foundUser);
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong' });
  }
};
module.exports = { getUsers, getUserById };
