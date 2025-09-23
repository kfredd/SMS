import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    contactnumber: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ["SuperAdminHR", "AdminHR"],
      default: "AdminHR",
    },
    organization: {
      name: { type: String, required: true, trim: true },
      description: { type: String, trim: true },
      url: { type: String, trim: true },
      mail: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

// 🔑 Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔑 Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
