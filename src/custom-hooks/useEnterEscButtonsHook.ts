import { useEffect } from "react";

interface UseEnterEscButtonsProps {
    handleCancel: Function;
    handleConfirm: Function;
}

export const useEnterEscButtonsHook = ({ handleCancel, handleConfirm }: UseEnterEscButtonsProps) => {
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
    }, [handleConfirm]);

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
    }, [handleCancel]);
};