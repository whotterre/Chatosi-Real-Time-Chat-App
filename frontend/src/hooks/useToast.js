import { toast } from 'react-hot-toast';

const useToast = () => {
    const showToast = (message, type = 'default', options = {}) => {
        const toastOptions = {
            duration: 4000,
            position: 'top-right',
            ...options,
        };

        switch (type) {
            case 'success':
                return toast.success(message, toastOptions);
            case 'error':
                return toast.error(message, toastOptions);
            case 'loading':
                return toast.loading(message, toastOptions);
            case 'message':
                return toast(message, {
                    ...toastOptions,
                    icon: '💬',
                });
            default:
                return toast(message, toastOptions);
        }
    };

    // Chat-specific toast methods
    const chatToast = {
        messageSent: () => showToast('Message sent', 'success', { duration: 2000 }),
        messageReceived: (username) => showToast(`New message from ${username}`, 'message'),
        userOnline: (username) => showToast(`${username} is now online`, 'success', { duration: 3000 }),
        userOffline: (username) => showToast(`${username} went offline`, 'default', { duration: 3000 }),
        typing: (username) => showToast(`${username} is typing...`, 'loading', { duration: 2000 }),
        connectionError: () => showToast('Connection lost. Reconnecting...', 'error'),
        reconnected: () => showToast('Connection restored', 'success'),
    };

    return {
        toast: showToast,
        chat: chatToast,
        dismiss: toast.dismiss,
    };
};

export default useToast;