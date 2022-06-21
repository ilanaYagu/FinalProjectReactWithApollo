
import { useEffect } from "react";

export const useSearchShourtCutHook = () => {

    useEffect(() => {
        const listener = (event: Event) => {
            if (event instanceof KeyboardEvent) {
                if (event.ctrlKey && event.code === "KeyF") {
                    event.preventDefault();
                    (document.querySelector("#search") as HTMLElement).focus();
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    });
};