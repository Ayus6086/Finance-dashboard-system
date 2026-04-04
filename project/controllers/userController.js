const User = require("../models/users");

// get all users
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ users });
};

// update role/status
exports.updateUser = async (req, res) => {
  const { role, status } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role, status },
    { new: true }
  );

  res.json({ message: "User updated", user });
};