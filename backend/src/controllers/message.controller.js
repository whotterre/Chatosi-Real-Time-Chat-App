import userModel from "../models/userModel";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await userModel
      .find({ _id: { $ne: loggedInUserId } })
      .select("-password");

    res.status(200).json({ filteredUsers });
  } catch (error) {
    console.log("Error in getUserForSideBar", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
