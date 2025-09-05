import messageModel from "../models/messageModel.js";
import userModel from "../models/userModel.js";
import cloudinary from "../lib/cloudinary.js";


export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await userModel
      .find({ _id: { $ne: loggedInUserId } })
      .select("-password");

    res.status(200).json( filteredUsers);
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
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in the Get messages controller", error.message);
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

    await newMessage.save();

    // 🟢 In the future, emit via socket.io here
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessages controller:", error.message);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
