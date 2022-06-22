import { useEffect } from "react";

interface UseEnterButtonProps {
    handleConfirm: Function;
}

export const useEnterButtonHook = ({ handleConfirm }: UseEnterButtonProps) => {

    useEffect(() => {
        const listener = (event: Event) => {
            if (event instanceof KeyboardEvent) {
                if ((event.key === "Enter" || event.key === "NumpadEnter")) {
                    event.preventDefault();
                    handleConfirm();
                }
            }
        };

        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    });

};