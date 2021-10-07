import { useEffect, useState } from 'react'

export const useMedia = (query: string) => {
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);
        if(media.matches !== matches) {
            setMatches(media.matches);
        }
        // console.log(media)
        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [query, matches])

    return matches;
}
