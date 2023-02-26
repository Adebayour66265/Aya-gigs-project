import Notification from "../../model/notification";
import User from "../../model/user";

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

export const getParticularTask = async(req,res)=>{
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
