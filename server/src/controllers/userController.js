const User = require("../models/User");

const updateBudget = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (typeof amount != "number" || amount < 0) {
      const error = new Error("Invalid budget amount");
      error.status = 400;
      throw error;
    }
    const user = await User.findById(req.user._id);
    user.monthlyBudget = amount;
    await user.save();

    res.status(200).json({
      message: "Budget updated successfully",
      monthlyBudget: user.monthlyBudget,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = updateBudget;
