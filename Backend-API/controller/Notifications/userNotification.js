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
    const userNotifications = await Notification.find({
      recipient: req.user._id,
      isRead: false,
    });
    res.json(userNotifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export const getParticularNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    notification.isRead = true;
    await notification.save();
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
