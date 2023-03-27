import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../model/Admin.js";
import User from "../model/User.js";
import generateToken from "../utilis/generateToken.js";
const defaultPassword = "Admin123";

// register an admin
export const adminRegister = async (req, res) => {
  const { username, password } = req.body;

  try {
    const findUser = await Admin.findOne({ username });

    if (findUser) {
      console.log(findUser);
      return res.json({
        status: "error",
        message: "Account Already Exists, Please login"
      });
    }

    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, salt);
    const admin = await Admin.create({
      username,
      password: hashedPassword
    });

    res.json({
      status: "success",
      data: admin
      // message: "Admin account created successfully"
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message
    });
  }
};

// admin login controller
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const findUser = await Admin.findOne({ username });

    if (!findUser) {
      res.json({
        status: "error",
        message: "Sorry you can not access this page"
      });
    }

    const passwordFound = await bcrypt.compare(password, findUser.password);
    if (!passwordFound) {
      res.json({
        status: "error",
        message: "Incorrect Password"
      });
    } else {
      res.json({
        status: "success",
        data: findUser,
        token:generateToken(findUser.id)
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message
    });
  }
};

// change admin password
export const changePassword = async (req, res) => {
  const { password } = req.body;
  const { username } = req.params;

  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await Admin.findOne({ username });

  try {
    await Admin.updateOne(
      admin,
      {
        $set: {
          password: hashedPassword
        }
      },
      {
        new: true
      }
    );

    admin.save();

    res.json({
      status: "success",
      message: "Password updated successfully"
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message
    });
  }
};
