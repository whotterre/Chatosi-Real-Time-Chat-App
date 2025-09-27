import { useRef, useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import {
  Image,
  Loader,
  Send,
  X,
  Smile,
  Mic,
  Paperclip,
  Calendar,
  MapPin,
  FileText
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const { sendMessages, selectedUser, socket } = useChatStore();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  // Typing indicators
  useEffect(() => {
    let typingTimeout;

    if (text.trim() && selectedUser) {
      // Send typing start
      socket?.emit('typing-start', { to: selectedUser._id });
      setIsTyping(true);

      // Clear typing after 2 seconds of inactivity
      typingTimeout = setTimeout(() => {
        socket?.emit('typing-stop', { to: selectedUser._id });
        setIsTyping(false);
      }, 2000);
    } else {
      socket?.emit('typing-stop', { to: selectedUser._id });
      setIsTyping(false);
    }

    return () => {
      clearTimeout(typingTimeout);
      if (selectedUser) {
        socket?.emit('typing-stop', { to: selectedUser._id });
      }
    };
  }, [text, selectedUser, socket]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    setIsLoading(true);
    try {
      await sendMessages({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }

    } catch (error) {
      console.error("Failed to send message", error);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    // Send on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const quickReactions = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

  return (
    <div className="border-t border-base-300/30 bg-base-100/80 backdrop-blur-lg p-4">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-3 p-3 bg-base-200/50 rounded-lg border border-base-300/30">
          <div className="relative flex-shrink-0">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-lg border-2 border-base-300"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error border-2 border-base-100 flex items-center justify-center hover:bg-error/90 transition-all shadow-lg"
              aria-label="Remove image"
            >
              <X className="size-3 text-white" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-base-content">Image ready to send</p>
            <p className="text-xs text-base-content/60">Click send to share</p>
          </div>
        </div>
      )}

      {/* Quick Reactions Bar */}
      {/* <div className="flex items-center gap-2 mb-3 overflow-x-auto scrollbar-hide">
        <span className="text-xs text-base-content/50 whitespace-nowrap">Quick reactions:</span>
        <div className="flex gap-1">
          {quickReactions.map((reaction, index) => (
            <button
              key={index}
              onClick={() => setText(prev => prev + reaction)}
              className="p-1.5 hover:bg-base-300 rounded-lg transition-colors text-lg"
              title={`Add ${reaction}`}
            >
              {reaction}
            </button>
          ))}
        </div>
      </div> */}

      <form onSubmit={handleSendMessage} className="flex items-end gap-2">
        {/* Attachment Menu */}
        <div className="relative group">
          <button
            type="button"
            className="p-2.5 hover:bg-base-300 rounded-lg transition-colors text-base-content/60 hover:text-base-content"
            onClick={() => fileInputRef.current?.click()}
            title="Attach files"
          >
            <Paperclip className="size-5" />
          </button>

          {/* Attachment Options Dropdown */}
          <div className="absolute bottom-full left-0 mb-2 bg-base-100 border border-base-300/30 rounded-lg shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 hover:bg-base-300 rounded-lg transition-colors text-xs text-center"
              >
                <Image className="size-4 mx-auto mb-1" />
                <span>Photo</span>
              </button>
              <button
                type="button"
                className="p-2 hover:bg-base-300 rounded-lg transition-colors text-xs text-center"
                onClick={() => toast.success('Document upload coming soon!')}
              >
                <FileText className="size-4 mx-auto mb-1" />
                <span>Document</span>
              </button>
              <button
                type="button"
                className="p-2 hover:bg-base-300 rounded-lg transition-colors text-xs text-center"
                onClick={() => toast.success('Location sharing coming soon!')}
              >
                <MapPin className="size-4 mx-auto mb-1" />
                <span>Location</span>
              </button>
              <button
                type="button"
                className="p-2 hover:bg-base-300 rounded-lg transition-colors text-xs text-center"
                onClick={() => toast.success('Calendar integration coming soon!')}
              >
                <Calendar className="size-4 mx-auto mb-1" />
                <span>Event</span>
              </button>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className={`flex-1 relative transition-all duration-200 ${isFocused ? 'ring-2 ring-primary/20' : ''
          }`}>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type a message..."
            className="w-full resize-none bg-base-200 border border-base-300/50 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-all duration-200 max-h-32 scrollbar-thin"
            rows={1}
            disabled={isLoading}
          />

          {/* Character counter */}
          {text.length > 100 && (
            <div className="absolute bottom-1 right-2 text-xs text-base-content/40">
              {text.length}/1000
            </div>
          )}
        </div>

        {/* Emoji Picker (placeholder) */}
        <button
          type="button"
          className="p-2.5 hover:bg-base-300 rounded-lg transition-colors text-base-content/60 hover:text-base-content"
          onClick={() => toast.success('Emoji picker coming soon!')}
          title="Emoji"
        >
          <Smile className="size-5" />
        </button>

        {/* Voice Message (placeholder) */}
        <button
          type="button"
          className="p-2.5 hover:bg-base-300 rounded-lg transition-colors text-base-content/60 hover:text-base-content"
          onClick={() => toast.success('Voice messages coming soon!')}
          title="Voice message"
        >
          <Mic className="size-5" />
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={(!text.trim() && !imagePreview) || isLoading}
          className={`p-3 rounded-full transition-all duration-200 flex items-center justify-center ${(text.trim() || imagePreview)
              ? 'bg-primary text-primary-content hover:bg-primary/90 shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-base-300 text-base-content/40 cursor-not-allowed'
            } ${isLoading ? 'animate-pulse' : ''}`}
          title="Send message"
        >
          {isLoading ? (
            <Loader className="size-5 animate-spin" />
          ) : (
            <Send className="size-5" />
          )}
        </button>
      </form>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*, .pdf, .doc, .docx"
        className="hidden"
        onChange={handleImageChange}
        ref={fileInputRef}
        id="file-upload"
        multiple={false}
      />

      {/* Typing indicator for current user */}
      {isTyping && (
        <div className="flex items-center gap-2 mt-2 text-xs text-base-content/50">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-base-content/40 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-base-content/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1.5 h-1.5 bg-base-content/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span>You're typing...</span>
        </div>
      )}
    </div>
  );
};

export default MessageInput;