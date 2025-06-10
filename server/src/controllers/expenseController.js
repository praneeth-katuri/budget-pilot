const Expense = require("../models/Expense");
const Source = require("../models/Source");

const addExpense = async (req, res, next) => {
  try {
    const { amount, sourceId, category, note, date } = req.body;

    const source = await Source.findOne({ _id: sourceId, userId: req.userId });

    if (!source) {
      const error = new Error("Source not found");
      error.status = 404;
      throw error;
    }

    if (source.balance < amount) {
      const error = new Error("Insufficient source balance");
      error.status = 400;
      throw error;
    }

    source.balance -= amount;
    await source.save();

    const expense = await Expense.create({
      userId: req.userId,
      sourceId,
      amount,
      category,
      note,
      date: new Date(date),
    });

    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};

const getExpenses = async (req, res, next) => {
  try {
    const { month } = req.query;

    let start, end;
    if (month) {
      start = new Date(`${month}-01`);
    } else {
      const now = new Date();
      start = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    end = new Date(start.getFullYear(), start.getMonth() + 1, 0);

    const expenses = await Expense.find({
      userId: req.userId,
      date: { $gte: start, $lt: end },
    }).sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addExpense,
  getExpenses,
};
