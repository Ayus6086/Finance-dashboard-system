const express = require("express");
const router = express.Router();
const { createRecord } = require("../controllers/recordController");
const { auth } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");
const { getRecords } = require("../controllers/recordController");
const { updateRecord } = require("../controllers/recordController");
const { deleteRecord } = require("../controllers/recordController");
const { getSummary } = require("../controllers/recordController");
const { getCategorySummary } = require("../controllers/recordController");
const {getRecentRecords} = require("../controllers/recordController");
const {getMonthlyTrends} = require("../controllers/recordController");
// only admin can create
router.post("/", auth, authorize("admin"), createRecord);
router.get("/summary", auth, authorize("admin", "analyst", "viewer"), getSummary);
router.get("/category", auth, authorize("admin", "analyst", "viewer"), getCategorySummary);
// admin + analyst can view
router.get("/", auth, authorize("admin", "analyst"), getRecords);
router.put("/:id", auth, authorize("admin"), updateRecord);
router.delete("/:id", auth, authorize("admin"), deleteRecord);
// admin + analyst can see dashboard
router.get("/recent", auth, authorize("admin", "analyst", "viewer"), getRecentRecords);
router.get("/trends", auth, authorize("admin", "analyst", "viewer"), getMonthlyTrends);
module.exports = router;