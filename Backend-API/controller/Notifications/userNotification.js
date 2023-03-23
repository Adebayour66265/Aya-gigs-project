import Notification from "../../model/notification.js";
import User from "../../model/userModel.js";
import Course from '../model/Courses.js';


export const createNotification = async(req,res)=>{
  try {
    const course = await Course.findById(courseId).populate('students');
    const instructor = course.instructor;
    const courseName = course.title;
    const newNotification = new Notification({
      recipient: null, // null since the notification is for all students in the course
      subject: 'New Course Created',
      message: `A new course titled ${courseName} has been created by ${instructor}.`
    });
    await newNotification.save();
    for (const student of course.students) {
      const existingNotification = await Notification.findOne({
        recipient: student._id,
        subject: 'New Course Created',
        message: `A new course titled ${courseName} has been created by ${instructor}.`
      }); 
      if (!existingNotification) {
        newNotification.recipient = student._id;
        await newNotification.save();
        student.notifications.push(newNotification);
        await student.save();
      }
    }
  } catch (error) {
    console.error(error);
  }
}


export const getAllNotifications = async(req,res)=>{
    try {
        const notifications = await Notification.find({ recipient });
            res.json({
                status: "Success",
                data: notifications
            })
    } catch (error) {
    res.json({
      status: "Error",
      message: "An error occured while retrieving Notifications"
    });
    }
}

export const getParticularNotification = async(req,res)=>{
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.json({
                status: "Error",
                message: "Notification not found"
            })
          }
          res.json({
            status: "Success",
            data: notification
          });
    } catch (error) {
        res.json({
            status: "Error",
            message: "An error occured while retrieving this Notification"
        })
    }
}
export const deleteParticularNotification = async(req,res)=>{
    try {
        const deletedNotification = await Notification.findByIdAndDelete(req.params.id);
        if (!deletedNotification) {
          return res.json({
            status: "Error",
            message: "Notification not found"
          })
        }
        res.json({
            status: "Success",
            message: "Notification deleted successfully"
        });
      } catch (err) {
        console.error(err);
        res.json({
          status: "Error",
          message: "Internal Server Error"
        });
      }
}

export const clearNotifications = async(req,res)=>{
  try {
    await Notification.deleteMany({});
    res.json({
      status: "Success",
      message: "Notifications Cleared Successfully"
    });
  } catch (error) {
    res.json({
      status: "Error",
      message: "An error occured while clearing notifications"
    });
  }
}