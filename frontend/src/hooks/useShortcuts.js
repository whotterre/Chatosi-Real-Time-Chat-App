import { useEffect } from 'react';

export const useKeyboardShortcuts = (shortcuts) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            // Prevent shortcuts when user is typing in an input
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
                return;
            }

            const shortcut = shortcuts.find(s =>
                s.key.toLowerCase() === event.key.toLowerCase() &&
                s.ctrlKey === (event.ctrlKey || event.metaKey) &&
                s.shiftKey === event.shiftKey &&
                s.altKey === event.altKey
            );

            if (shortcut) {
                event.preventDefault();
                shortcut.action();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [shortcuts]);
};
