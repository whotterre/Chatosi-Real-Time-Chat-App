import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";
import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await userModel
      .find({ _id: { $ne: loggedInUserId } })
      .select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUserForSideBar", error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await messageModel.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller:", error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};


export const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      text,
      image: imageUrl || "",
    });

    await newMessage.save(); // Save to database

    // 🚀 FIX: Emit to BOTH users via socket!
    const receiverSocketId = getRecieverSocketId(receiverId);
    const senderSocketId = getRecieverSocketId(senderId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage); // Tell receiver
    }
    if (senderSocketId) {
      io.to(senderSocketId).emit("newMessage", newMessage); // Tell sender too
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessages controller:", error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};


export const getUnreadMessageCount = async (req, res) => {
  try {
    const myId = req.user._id; 
    const unreadCounts = await messageModel.aggregate([
      {
        $match: {
          receiverId: myId, 
          isRead: false,   
        }
      },
      {
        $group: {
          _id: "$senderId", 
          count: { $sum: 1 } 
        }
      }
    ]);
    const unreadMap = {};
    unreadCounts.forEach(item => {
      unreadMap[item._id.toString()] = item.count;
    });

    res.status(200).json(unreadMap);
  } catch (error) {
    console.log("Error counting unread messages:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};


export const markMessagesAsRead = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;  // Tunde's ID
    const myId = req.user._id;  // My ID

    const updatedMessages = await messageModel.updateMany(
      {
        senderId: userToChatId, 
        receiverId: myId,  
        isRead: false    
      },
      { isRead: true } 
    );

    res.status(200).json({ 
      message: "Messages marked as read!", 
      updatedCount: updatedMessages.modifiedCount 
    });
  } catch (error) {
    console.log("Error marking messages as read:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};