const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  monthlyBudget: { type: Number, default: 0 },
  categories: {
    type: [String],
    default: [
      "Food",
      "Transport",
      "Shopping",
      "Entertainment",
      "Bills",
      "Health",
      "Groceries",
      "Education",
      "Subscriptions",
      "Other",
    ],
  },
});

// Auto-strip sensitive fields when serializing to JSON
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

// 🔐 Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidate) {
  if (!this.password) {
    throw new Error(
      "Password not selected. Use .select('+password') in query."
    );
  }
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("User", userSchema);
