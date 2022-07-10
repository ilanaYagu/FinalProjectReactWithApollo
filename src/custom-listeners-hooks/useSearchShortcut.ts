
import { RefObject, useEffect } from "react";

interface UseSearchShortcutProps {
    searchInputRef?: RefObject<HTMLDivElement> | null
}

export const useSearchShortcutHook = ({ searchInputRef }: UseSearchShortcutProps) => {

    useEffect(() => {
        const listener = (event: Event) => {
            if (event instanceof KeyboardEvent) {
                if (event.ctrlKey && event.code === "KeyF") {
                    event.preventDefault();
                    searchInputRef?.current?.focus();
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    });
};