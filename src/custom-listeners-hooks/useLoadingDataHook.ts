import { useEffect } from "react";

interface useLoadingDataProps {
    loading: boolean;
    setLoading(loading: boolean): void;
}

export const useLoadingDataHook = ({ loading, setLoading }: useLoadingDataProps) => {

    useEffect(() => {
        setTimeout(() => {
            setLoading(loading)
        }, 200)
    }, [loading]);

};