import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import loginValidation from "../validation/login.js";
import registerValidation from "../validation/register.js";
import generateToken from "../utilis/generateToken.js";
import loginInstructorValidation from "../validation/loginInstructor.js";

// Register a new user
export const register = async (req, res) => {
  const { error } = registerValidation.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { email, password, firstname, lastname, role, phoneNumber } = req.body;

  try {
    // Check if user already exists
    const user = await User.findOne({ email });
    if (role !== "admin") return res.status(400).send("Access denied");
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
      // Hash password and save user
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const user = await User.create({
        firstname,
        lastname,
        role,
        phoneNumber,
        email,
        confirmPassword: hashedPassword,
        password: hashedPassword,
      });
      res.json({
        status: "success",
        data: user,
      });
    }
  } catch (error) {
    res.json(error.message);
  }
};

// Login a user
export const login = async (req, res) => {
  const { error } = loginValidation.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { email, password, role } = req.body;

  // console.log(req.headers);

  // Check if user exists and is a student
  const user = await User.findOne({ email, role: "admin" });
  try {
    if (!user) {
      return res.status(401).json({ message: "Wrong details" });
    }
    if (role !== "admin") return res.status(400).send("Access denied");
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      res.json({
        status: "success",
        data: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
          token: generateToken(user.id),
        },
      });
    }
    // // Create JWT token
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // // Send token to client
    // res.json({ token });
  } catch (error) {
    console.log(error.message);
  }
};

// Get all users (requires admin role)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to get all users." });
  }
};

// Get a single user by ID (requires admin role)
export const getUserById = async (req, res) => {
  try {
    // const token = obtainToken(req)
    // // console.log(token);
    const user = await User.findById(req.userAuth);
    if (!user) {
      return res.status(404).json({ message: "User not founds." });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to get user by ID." });
  }
};

// Update a user by ID (requires admin role)
export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, role, password } = req.body;

    await User.findOneAndUpdate(
      { _id: id },
      { firstname, lastname, email, role, password },
      { useFindAndModify: false }
    );

    res.json({ message: "the user has been updated successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.userAuth);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.remove();

    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const registerInstructor = async (req, res) => {
  const { error } = registerValidation.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const { lastname, firstname, email, password, phoneNumber, role } =
      req.body;

    // Check if user already exists
    const user = await User.findOne({ email });
    const companyId = Math.floor(Math.random() * 90000) + 10000;
    if (role !== "instructor") return res.status(400).send("Access denied");
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
      // Hash password and save user
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const instructor = new User({
        firstname,
        lastname,
        role,
        phoneNumber,
        email,
        confirmPassword: hashedPassword,
        password: hashedPassword,
        companyId, // Get company ID from request body
      });
      res.json({
        status: "success",
        data: instructor,
      });
      const savedInstructor = await instructor.save();

      // Generate JWT token and send response
      const token = jwt.sign(
        { userId: savedInstructor._id },
        process.env.JWT_SECRET
      );
      res.status(201).json({ token, user: savedInstructor });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Login for Instructors
export const loginInstructor = async (req, res) => {
  // // Validate the request body using Joi
  const { error } = loginInstructorValidation.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if the user exists
  const { companyId, password, role } = req.body;
  const user = await User.findOne({ companyId });
  try {
    if (!user) {
      return res.status(400).send("Company ID is invalid");
    }
    // Check if the user is an instructor
    if (role !== "instructor") return res.status(400).send("Access denied");

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("Password is invalid");
    } else {
      res.json({
        status: "success",
        data: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role,
          token: generateToken(user.id),
        },
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};


//Block
export const blockUser = async (req, res) => {
  try {
    const userToBlock = await User.findById(req.params.id);
    const userBlocking = await User.findById(req.userAuth);

    if (userToBlock && userBlocking) {
      const isUserBlock = userBlocking.Blocked.find(
        (block) => block.toString() === userToBlock._id.toString()
      );

      if (isUserBlock) {
        return res.json({
          message: `you have block ${userToBlock.firstname} already`,
        });
      } else {
        userBlocking.Blocked.push(userToBlock._id);
        await userBlocking.save();
        return res.json({
          message: `you have just block ${userToBlock.firstname}`,
        });
      }
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};
export const unBlockUser = async (req, res) => {
  try {
    const userToUnblock = await User.findById(req.params.id);
    const userUnblocking = await User.findById(req.userAuth);
    if (userToUnblock && userUnblocking) {
      const isUserUnblock = userUnblocking.Blocked.find(
        (unblocked) => unblocked.toString() === userToUnblock._id.toString()
      );

      if (!isUserUnblock) {
        return res.json({
          message: `you did not block ${userToUnblock.firstname}`,
        });
      } else {
        userUnblocking.Blocked = userUnblocking.Blocked.filter(
          (user) => user.toString() !== userToUnblock._id.toString()
        );
        await userUnblocking.save();

        res.json({
          message: `you have unblock ${userToUnblock.firstname} successfully`,
        });
      }
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};


//Admin BLock

export const AdminBlockUserController = async(req,res)=> {
  try {
    res.json({
      status:"success",
      data: "you "
    })

  } catch (error) {
    
  }
}
