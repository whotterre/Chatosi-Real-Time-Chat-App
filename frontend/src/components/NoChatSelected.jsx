import { MessagesSquare, Users, Sparkles, ArrowLeft } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const NoChatSelected = () => {
  const { users } = useChatStore();
  const { onlineUsers, user: currentUser } = useAuthStore();

  const onlineContacts = users.filter(user =>
    user._id !== currentUser?._id && onlineUsers.includes(user._id)
  ).length;

  const tips = [
    "💡 Start with a friendly greeting",
    "🎯 Be clear and concise in your messages",
    "🤝 Respect others' time and privacy",
    "✨ Use emojis to express emotions",
    "📱 Messages are delivered in real-time"
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-base-100 via-base-100/80 to-base-200 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-secondary/5 rounded-full blur-xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-accent/5 rounded-full blur-lg animate-pulse-slow delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-md text-center space-y-8">
        {/* Animated Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shadow-lg border border-primary/10">
              <MessagesSquare className="w-10 h-10 text-primary" />
            </div>

            {/* Floating elements */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-success" />
            </div>

            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-warning/20 rounded-full flex items-center justify-center">
              <Users className="w-3 h-3 text-warning" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to Chatosi!
          </h2>

          <p className="text-base-content/70 text-lg leading-relaxed">
            {onlineContacts > 0
              ? `Start chatting with ${onlineContacts} online contacts`
              : "Select a conversation to begin messaging"
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-base-200/50 rounded-xl p-4 backdrop-blur-sm border border-base-300/30">
            <div className="flex items-center justify-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm">Contacts</span>
            </div>
            <p className="text-2xl font-bold mt-1">{users.filter(u => u._id !== currentUser?._id).length}</p>
          </div>

          <div className="bg-base-200/50 rounded-xl p-4 backdrop-blur-sm border border-base-300/30">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="font-semibold text-sm">Online</span>
            </div>
            <p className="text-2xl font-bold mt-1">{onlineContacts}</p>
          </div>
        </div>

        {/* Helpful Tip */}
        <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
          <div className="flex items-center gap-2 text-sm text-primary/80 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">Pro Tip</span>
          </div>
          <p className="text-base-content/70 text-sm">{randomTip}</p>
        </div>

        {/* Mobile Hint */}
        <div className="md:hidden bg-base-200/50 rounded-lg p-3 border border-base-300/30">
          <div className="flex items-center justify-center gap-2 text-sm text-base-content/60">
            <ArrowLeft className="w-4 h-4" />
            <span>Tap the menu to browse contacts</span>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="flex justify-center gap-6 opacity-60">
          <div className="text-center">
            <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-success text-xs">⚡</span>
            </div>
            <span className="text-xs">Real-time</span>
          </div>

          <div className="text-center">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-primary text-xs">🔒</span>
            </div>
            <span className="text-xs">Secure</span>
          </div>

          <div className="text-center">
            <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-secondary text-xs">🎨</span>
            </div>
            <span className="text-xs">Themes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;