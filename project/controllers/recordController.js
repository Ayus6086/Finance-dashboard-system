const Record = require("../models/Record");
const User = require("../models/users");
const mongoose = require("mongoose");
const { createRecordService } = require("../services/recordService");
const { getRecordsService } = require("../services/recordService");
const { getSummaryService } = require("../services/recordService");
const { getCategoryService } = require("../services/recordService");
exports.createRecord = async (req, res) => {
  try {
    const record = await createRecordService({
      userId: req.user.id,
      ...req.body
    });

    res.status(201).json({
      message: "Record created",
      record
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};  

exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // ✅ ownership check
      req.body,
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ error: "Record not found or unauthorized" });
    }

    res.json({ message: "Record updated", record });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id // ✅ ownership check
    });

    if (!record) {
      return res.status(404).json({ error: "Record not found or unauthorized" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
        success: false,
        message: "Invalid ID"
    });
}
    res.json({ message: "Record deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getSummary = async (req, res) => {
  try {
    const data = await getSummaryService(req.user.id);

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategorySummary = async (req, res) => {
  try {
    const data = await getCategoryService(req.user.id);

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecentRecords = async (req, res) => {
  try {
    const records = await Record.find({ userId: req.user.id })
      .sort({ date: -1 }) // latest first
      .limit(5); // last 5 records

    res.json({ records });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMonthlyTrends = async (req, res) => {
  try {
    const records = await Record.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(req.user.id) }
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            type: "$type"
          },
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.month": 1 }
      }
    ]);

    res.json({ trends: records });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getRecords = async (req, res) => {
  try {
    const records = await getRecordsService(req.user.id, req.query);

    res.json({ records });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};