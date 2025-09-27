import { useEffect } from "react";
import { THEMES } from "../constants/constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, X } from "lucide-react";

const PREVIEW_MESSAGES = [
  {
    id: 1,
    content: "Hey! How's it going? Who created this Application",
    isSent: false,
  },
  {
    id: 2,
    content: "I'm doing great! It was created by Bragosi.",
    isSent: true,
  },
  {
    id: 3,
    content: (
      <a
        href="https://github.com/Bragosi/Chatosi-Real-Time-Chat-App/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline hover:text-blue-600"
      >
        View GitHub Repo
      </a>
    ),
    isSent: false,
  },
];

const SettingsPage = () => {
  const { theme, setTheme, isSettingOpen: isOpen, openSettings } = useThemeStore();

  const onClose = () => {
    openSettings(false);
  }

  // ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Close modal when clicking on overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  console.debug({isOpen});

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-base-100 rounded-2xl shadow-2xl border border-base-300/30 w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-transform duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-base-300/30 bg-base-100/80 backdrop-blur-lg">
          <div>
            <h2 className="text-2xl font-bold text-base-content">Theme Settings</h2>
            <p className="text-base-content/70 mt-1">Customize your chat appearance</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-base-300 rounded-lg transition-colors group"
            aria-label="Close settings"
          >
            <X className="size-6 text-base-content/60 group-hover:text-base-content" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="space-y-8">
            {/* Theme Selection */}
            <div>
              <div className="flex flex-col gap-2 mb-4">
                <h3 className="text-lg font-semibold">Choose Theme</h3>
                <p className="text-sm text-base-content/70">
                  Select from {THEMES.length} beautiful themes
                </p>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                {THEMES.map((t) => (
                  <button
                    key={t}
                    className={`
                      group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200
                      ${theme === t
                        ? "bg-primary/10 ring-2 ring-primary/30 shadow-lg"
                        : "hover:bg-base-200/50 hover:shadow-md hover:scale-105"
                      }
                    `}
                    onClick={() => setTheme(t)}
                  >
                    <div
                      className="relative h-10 w-full rounded-lg overflow-hidden shadow-inner"
                      data-theme={t}
                    >
                      <div className="absolute inset-0 grid grid-cols-4 gap-px p-1.5">
                        <div className="rounded bg-primary"></div>
                        <div className="rounded bg-secondary"></div>
                        <div className="rounded bg-accent"></div>
                        <div className="rounded bg-neutral"></div>
                      </div>

                      {/* Selected checkmark */}
                      {theme === t && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-medium truncate w-full text-center">
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Theme Display */}
            <div className="bg-base-200/30 rounded-xl p-4 border border-base-300/20">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-base-content">Current Theme</span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </span>
              </div>
              <p className="text-sm text-base-content/70">
                This theme is applied across your entire chat experience
              </p>
            </div>

            {/* Preview Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
              <div className="rounded-xl border border-base-300/30 overflow-hidden bg-base-100 shadow-lg">
                <div className="p-6 bg-base-200/50">
                  <div className="max-w-md mx-auto">
                    {/* Mock Chat UI */}
                    <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden border border-base-300/30">
                      {/* Chat Header */}
                      <div className="px-4 py-3 border-b border-base-300/30 bg-base-100/80">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-primary-content font-medium shadow-lg">
                            B
                          </div>
                          <div>
                            <h3 className="font-semibold text-base-content">Boluwatife</h3>
                            <p className="text-sm text-base-content/70 flex items-center gap-1">
                              <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                              Online
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Chat Messages */}
                      <div className="p-4 space-y-3 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100 scrollbar-thin">
                        {PREVIEW_MESSAGES.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`
                                max-w-[85%] rounded-2xl p-3 shadow-sm transition-all duration-200
                                ${message.isSent
                                  ? "bg-primary text-primary-content rounded-br-md"
                                  : "bg-base-200 rounded-bl-md"
                                }
                              `}
                            >
                              <div className="text-sm">{message.content}</div>
                              <div
                                className={`
                                  text-xs mt-2 opacity-70
                                  ${message.isSent ? "text-primary-content/80" : "text-base-content/60"}
                                `}
                              >
                                12:00 PM
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Chat Input */}
                      <div className="p-4 border-t border-base-300/30 bg-base-100">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            className="input input-bordered flex-1 text-sm h-10 bg-base-200 border-base-300/50"
                            placeholder="Type a message..."
                            value="This is a live preview"
                            readOnly
                          />
                          <button className="btn btn-primary h-10 min-h-0 px-3 shadow-lg">
                            <Send size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-base-300/30">
              <button
                onClick={onClose}
                className="px-6 py-2.5 border border-base-300/50 rounded-lg hover:bg-base-300/50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-lg"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;