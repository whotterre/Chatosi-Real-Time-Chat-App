import { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmationDialog = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure?",
    message = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "warning"
}) => {
    // ESC key to close
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const getTypeStyles = () => {
        switch (type) {
            case 'danger':
                return {
                    iconBg: 'bg-error/20',
                    iconColor: 'text-error',
                    button: 'btn-error'
                };
            case 'warning':
                return {
                    iconBg: 'bg-warning/20',
                    iconColor: 'text-warning',
                    button: 'btn-warning'
                };
            default:
                return {
                    iconBg: 'bg-primary',
                    iconColor: 'text-primary',
                    button: 'text-primary'
                };
        }
    };

    const styles = getTypeStyles();

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all duration-300"
            onClick={handleOverlayClick}
        >
            <div
                className="bg-base-100 rounded-2xl shadow-2xl border border-base-300/30 w-full max-w-md transform transition-transform duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-base-300/30">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${styles.iconBg}`}>
                            <AlertTriangle className={`size-5 ${styles.iconColor}`} />
                        </div>
                        <h3 className="text-lg font-semibold text-base-content">{title}</h3>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-base-300 rounded-lg transition-colors"
                        aria-label="Close dialog"
                    >
                        <X className="size-5 text-base-content/60" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-base-content/70 leading-relaxed">{message}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end p-6 border-t border-base-300/30">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 border border-base-300/50 rounded-lg hover:bg-base-300/50 transition-colors font-medium text-primary"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`px-6 py-2.5 text-${type}-content rounded-lg hover:opacity-90 transition-colors font-medium shadow-lg`}
                        autoFocus
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;