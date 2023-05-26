import { useEffect, useState } from "react";

export const Debounce = (value: string, delay: number) => {
    const [debounce, setDebounce] = useState<any>();

    useEffect(() => {
        const handler = setTimeout(() => setDebounce(value), delay);
        return () => clearInterval(handler);
    }, [value]);
    return debounce
}