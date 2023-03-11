import mongoose from "mongoose";

// Define user schema
const userRoleSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    
  },
  lastname: {
    type: String,
    required: true,
    
  },
  email: {
    type: String,
    required: true,
    unique: true,
    
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true
  },
  phoneNumber: { 
    type: String,
    required: true
  },
  companyId: {
    type: String,
    
    
  },

  companyName:{
  type: String
  },
  businessType: {
    type: String,
    enum:[]
  },
  address: [
    {
      address: { type: String },
      state: { type: String },
      country: { type: String }
    }
  ],
  noOfEmployee:{
    type:Number
  },
  registrationNo:{
    type:Number
  },

  role: {
    type: String,
    enum: ['superuser', 'admin', 'instructor', 'student'],
    default: 'student'
  },
  notifications: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    courses: [
      {
        courseName: { 
          type: String, 
          required: true },
        courseId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'User' },
        status: { 
          type: String, 
          enum: ['enrolled', 'completed'], default: 'enrolled' }
      }
    ]
  }],
  isBlock: {
    type:Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
    },

  views: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    }
  ],
  Blocked: [{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User"
}],
     
},
{timestamps:true,
toJSON:{virtuals:true}
}
);

// Create user model
const User = mongoose.model('User', userRoleSchema);


export default User;