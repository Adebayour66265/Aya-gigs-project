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
    
  },
  fullname:{
    type:String
  },
  username:{
    type:String
  },
  profession:{
    type:String
  },
  aboutYou:{
    type:String
  },
  interest:{
    type:String
  },
  phoneNumber: { 
    type: String,
    
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
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  isBlock: {
    type:Boolean,
    default: false
  },

    isAdmin: {
    type: Boolean,
    default: false
    },
    resetPasswordToken: {
      type: String,
      default: null
    },
    resetPasswordTokenExpires: {
      type: Date,
      default: null
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