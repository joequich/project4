import { Toaster } from "react-hot-toast";
import { useMedia } from "../hooks/useMedia";

export const AlertMessage = () => {
    const small = useMedia('(max-width: 640px)');

    return (
        <Toaster position={small ? "top-center" : "bottom-right"} />
    );
};
