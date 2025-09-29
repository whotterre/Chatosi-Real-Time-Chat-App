import { Toaster } from 'react-hot-toast';
import { useThemeStore } from '../../store/useThemeStore';

const ChatToaster = () => {
    const { theme } = useThemeStore();

    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                className: '',
                duration: 4000,
                style: {
                    background: theme === 'dark' ? '#1f2937' : '#ffffff',
                    color: theme === 'dark' ? '#f9fafb' : '#111827',
                    border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '0.75rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    fontSize: '0.875rem',
                    maxWidth: '500px',
                },

                // Default options for different toast types
                success: {
                    style: {
                        background: theme === 'dark' ? '#065f46' : '#d1fae5',
                        color: theme === 'dark' ? '#d1fae5' : '#065f46',
                        borderColor: theme === 'dark' ? '#047857' : '#10b981',
                    },
                    iconTheme: {
                        primary: theme === 'dark' ? '#10b981' : '#059669',
                        secondary: theme === 'dark' ? '#d1fae5' : '#ffffff',
                    },
                },

                error: {
                    style: {
                        background: theme === 'dark' ? '#7f1d1d' : '#fee2e2',
                        color: theme === 'dark' ? '#fecaca' : '#dc2626',
                        borderColor: theme === 'dark' ? '#b91c1c' : '#ef4444',
                    },
                    iconTheme: {
                        primary: theme === 'dark' ? '#ef4444' : '#dc2626',
                        secondary: theme === 'dark' ? '#fecaca' : '#ffffff',
                    },
                },

                loading: {
                    style: {
                        background: theme === 'dark' ? '#1e3a8a' : '#dbeafe',
                        color: theme === 'dark' ? '#dbeafe' : '#1e3a8a',
                        borderColor: theme === 'dark' ? '#1d4ed8' : '#3b82f6',
                    },
                },
            }}
        />
    );
};

export default ChatToaster;