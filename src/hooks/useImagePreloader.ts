import { useState, useEffect } from 'react';

export const useImagePreloader = (images: string[]) => {
    const [imagesPreloaded, setImagesPreloaded] = useState(false);
    const [loadingError, setLoadingError] = useState<string | null>(null);

    useEffect(() => {
        if (!images || images.length === 0) {
            setImagesPreloaded(true);
            return;
        }

        let isMounted = true;
        const promises = images.map((src) => {
            return new Promise<void>((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve();
                img.onerror = () => {
                    console.error(`Failed to preload image: ${src}`);
                    // Resolve anyway to not block the site indefinitely, but log the error
                    resolve();
                };
            });
        });

        Promise.all(promises).then(() => {
            if (isMounted) {
                setImagesPreloaded(true);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [images]);

    return { imagesPreloaded, loadingError };
};
