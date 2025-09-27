const CustomToast = ({ toast, message, type }) => {
    const getToastStyles = () => {
        const baseStyles = "flex items-center p-4 rounded-lg shadow-lg border-l-4 max-w-md";

        switch (type) {
            case 'success':
                return `${baseStyles} bg-green-50 border-green-500 text-green-800 dark:bg-green-900/20 dark:text-green-300`;
            case 'error':
                return `${baseStyles} bg-red-50 border-red-500 text-red-800 dark:bg-red-900/20 dark:text-red-300`;
            case 'loading':
                return `${baseStyles} bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300`;
            case 'message':
                return `${baseStyles} bg-gray-50 border-gray-500 text-gray-800 dark:bg-gray-800 dark:text-gray-300`;
            default:
                return `${baseStyles} bg-indigo-50 border-indigo-500 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300`;
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                );
            case 'error':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                );
            case 'loading':
                return (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                );
            case 'message':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                );
        }
    };

    return (
        <div className={getToastStyles()}>
            <div className="flex-shrink-0 mr-3">
                {getIcon()}
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium">{message}</p>
            </div>
            <button
                onClick={() => toast.dismiss()}
                className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default CustomToast;
