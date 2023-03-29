import mongoose from "mongoose";


const adminRoleSchema = new mongoose.Schema({
  email: {
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







// // Define admin schema
// const adminRoleSchema = new mongoose.Schema(
//   {
//     firstname: {
//       type: String,
//       required: true,
//     },
//     lastname: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       default: 223344
//     }
// }
// );

// const Admin = mongoose.model('Admin', adminRoleSchema);

// export default Admin;

