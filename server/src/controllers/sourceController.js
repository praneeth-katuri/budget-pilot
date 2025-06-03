const Source = require("../models/Source");

const addSource = async (req, res, next) => {
  try {
    const { name } = req.body;
    const source = await Source.create({
      name,
      userId: req.userId,
    });
    res.status(201).json(source);
  } catch (err) {
    next(err);
  }
};

const getSources = async (req, res, next) => {
  try {
    const sources = await Source.find({ userId: req.userId });
    res.status(200).json(sources);
  } catch (err) {
    next(err);
  }
};

const depositToSource = async (req, res, next) => {
  try {
    const { amount, note } = req.body;
    const source = await Source.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    console.log(req.params);
    if (!source) {
      res.status(400).json({ message: "Source not found" });
    }

    source.balance += Number(amount);
    await source.save();

    res
      .status(200)
      .json({ message: "Deposit successfully", balance: source.balance });
  } catch (err) {
    next(err);
  }
};

const transferFunds = async (req, res, next) => {
  try {
    const { fromId, toId, amount } = req.body;
    if (fromId === toId) {
      const error = new Error("Cannot transfer to same account");
      error.status = 400;
      throw error;
    }

    const [from, to] = await Promise.all([
      Source.findOne({ _id: fromId, userId: req.userId }),
      Source.findOne({ _id: toId, userId: req.userId }),
    ]);

    if (!from || !to) {
      const error = new Error("Source not found");
      error.status = 404;
      throw error;
    }

    if (from.balance < amount) {
      const error = new Error("Insufficient balance");
      error.status = 400;
      throw error;
    }

    from.balance -= Number(amount);
    to.balance += Number(amount);

    await Promise.all([from.save(), to.save()]);
    res.status(200).json({ message: "Transfer successful" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addSource,
  getSources,
  depositToSource,
  transferFunds,
};
