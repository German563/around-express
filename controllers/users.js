const { getJsonFromFile } = require("../helpers/files");
const path = require("path");

const usersFilePath = path.join(__dirname, "..", "data", "users.json");
const getUsers = async (req, res) => {
  try {
    const users = await getJsonFromFile(usersFilePath);
    res.send(users);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

const getUserById = async (req, res) => {
  try {
    const users = await getJsonFromFile(usersFilePath);
    const user = users.find((user) => user._id === req.params._id);

    if (!user) {
      res.status(404).send("User not exist");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};
module.exports = { getUsers, getUserById };
