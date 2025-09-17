import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessages : async(messageData)=>{
    const { selectedUser, messages } = get()
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData)
      set({ messages: [...messages, res.data] })
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  subscribeToMessages : ()=>{
    const { selectedUser } = get()
    if(!selectedUser) return ;

    const socket = useAuthStore.getState().socket;
    // optimize later
socket.off("newMessage");
socket.on("newMessage", (newMessage) => {
  set({ messages: [...get().messages, newMessage] });
});

  },
  unSubscribeFromMessages : ()=>{
    const socket = useAuthStore.getState().socket
    socket.off("newMessage")
  },
  // todo: optimize later 
  setSelectedUser : (selectedUser) => set({ selectedUser }),
}));
