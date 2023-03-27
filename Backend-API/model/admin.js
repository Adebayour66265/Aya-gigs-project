import mongoose from "mongoose";


const adminRoleSchema = new mongoose.Schema({
  username: {
      type: String,
      required: [true, "Please enter your email address"]
  },
  password: {
      type: String,
      required: [true, "Please enter your password"],
      default: "0000"
  }
})

const Admin = mongoose.model("Admin", adminRoleSchema);

export default Admin;
