const express = require("express");
const router = express.Router();
const { getUsers, updateUser } = require("../controllers/userController");
const { auth } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

// only admin can manage users
router.get("/", auth, authorize("admin"), getUsers);
router.put("/:id", auth, authorize("admin"), updateUser);

module.exports = router;