import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import avatar from "../../public/avatar.png";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { getUsers, selectedUser, users, setSelectedUser, isUserLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setshowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUserLoading) return <SidebarSkeleton />;
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block"> Contacts</span>
        </div>
        {/**  online Users toggle */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 ">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setshowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online Users</span>
          </label>
          <span className="text-sm text-zinc-500">
            ({onlineUsers.length - 1} online )
          </span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((i) => (
          <button
            key={i._id}
            onClick={() => setSelectedUser(i)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transitions-colors
                ${
                  selectedUser?._id === i._id
                    ? "bg-base-300 ring-1 ring-base-300"
                    : ""
                }`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={i.profilePic || avatar}
                alt={i.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(i._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>
            {/** User info- only visible to large screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{i.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(i._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500">No Online Users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
