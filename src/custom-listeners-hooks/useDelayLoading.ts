import { useEffect } from "react";

interface useDelayLoadingProps {
    loading: boolean;
    setLoading(loading: boolean): void;
}

export const useDelayLoadingHook = ({ loading, setLoading }: useDelayLoadingProps) => {

    useEffect(() => {
        setTimeout(() => {
            setLoading(loading)
        }, 200)
    }, [loading]);

};