import { useEffect } from "react";

interface UseEscButtonProps {
    handleCancel: Function;
}

export const useEscButtonHook = ({ handleCancel }: UseEscButtonProps) => {
    useEffect(() => {
        const listener = (event: Event) => {
            if (event instanceof KeyboardEvent) {
                if (event.ctrlKey && event.code === "KeyC") {
                    handleCancel();
                    event.preventDefault();
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, []);
};