import express from "express"
import { protectRoute } from "../middlewares/protectRoutes.js"
import { getMessages, getUnreadMessageCount, getUsersForSideBar, markMessagesAsRead, sendMessages } from "../controllers/messageController.js"

const router = express.Router()


router.get("/users", protectRoute, getUsersForSideBar)
router.get("/unread-count", protectRoute, getUnreadMessageCount) 

router.post("/send/:id", protectRoute, sendMessages)

router.get("/:id", protectRoute, getMessages) 
router.put("/:id/mark-read", protectRoute, markMessagesAsRead) 

export default router