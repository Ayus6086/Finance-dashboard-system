const Record = require("../models/Record");

// create record
exports.createRecordService = async (data) => {
  return await Record.create(data);
};

// get records with filters
exports.getRecordsService = async (userId, query) => {
  const { startDate, endDate, category, type } = query;

  let filter = { userId };

  if (startDate && endDate) {
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  if (category) {
    filter.category = category;
  }

  if (type) {
    filter.type = type;
  }

  return await Record.find(filter).sort({ date: -1 });
};

// summary
exports.getSummaryService = async (userId) => {
  const records = await Record.find({ userId });

  let totalIncome = 0;
  let totalExpense = 0;

  records.forEach(r => {
    if (r.type === "income") totalIncome += r.amount;
    else totalExpense += r.amount;
  });

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense
  };
};

// category summary
exports.getCategoryService = async (userId) => {
  const records = await Record.find({ userId });

  const summary = {};

  records.forEach(r => {
    if (!summary[r.category]) summary[r.category] = 0;
    summary[r.category] += r.amount;
  });

  return summary;
};