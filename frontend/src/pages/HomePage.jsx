import { useEffect } from 'react';
import ChatContainer from '../components/ChatContainer';
import NoChatSelected from '../components/NoChatSelected';
import Sidebar from '../components/Sidebar';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const { user } = useAuthStore();
  

  useEffect(() => {
    // Prevent body scroll when chat is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pt-16">
        <div className="bg-base-100/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-base-300/20 w-full container h-[90vh] min-h-[600px] overflow-hidden">
          <div className="flex flex-col md:flex-row lg:flex-row h-full">
            {/* Sidebar with smooth transitions */}
            <div className={`
              w-full md:w-80 lg:w-96 transition-all duration-300 ease-in-out border-r border-base-300/20
              ${selectedUser ? 'hidden md:block' : 'flex'}
            `}>
              <Sidebar />
            </div>

            {/* Chat Area */}
            <div className={`
              flex-1 transition-all duration-300 ease-in-out
              ${!selectedUser ? 'md:flex' : 'flex'}
              ${selectedUser ? 'opacity-100' : 'opacity-00'}
            `}>
              {selectedUser ? <ChatContainer /> : <NoChatSelected />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;