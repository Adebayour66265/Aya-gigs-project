import Notification from '../../model/notification.js'
import User from '../../model/userModel.js'
import Course from '../model/Courses.js';


export const sendNewMaterialNotification = async (courseId, title) => {
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    const students = await User.find({ _id: { $in: course.students } });
    const notificationMessage = `New course material "${title}" has been created in ${course.title}`;
    const notifications = students.map(student => ({
      recipient: student._id,
      subject: "New Course Material Created",
      message: notificationMessage,
      isRead: false
    }));
    const savedNotifications = await Notification.insertMany(notifications);

    students.forEach(async (student) => {
      student.notifications.push(savedNotifications.find(n => n.recipient.toString() === student._id.toString())._id);
      await student.save();
    });
  } catch (error) {
    console.error(`Error sending notification: ${error.message}`);
  }
};


export const getAllNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("notifications");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

export const getParticularNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).send({ message: "Notification not found" });
    }
    notification.isRead = true;
    await notification.save();
    res.send(notification);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
}
export const deleteParticularNotification = async(req,req)=>{
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

export const clearNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({})
    res.json({
      status: 'Success',
      message: 'Notifications Cleared Successfully',
    })
  } catch (error) {
    res.json({
      status: 'Error',
      message: 'An error occured while clearing notifications',
    })
  }
}
