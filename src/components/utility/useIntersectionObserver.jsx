// CUSTOM HOOK for when refs enter into the screen. Mostly done with the help of chatgpt.

import { useEffect, useState } from "react";

export default function useIntersectionObserver(refs) {
    const [isVisible, setIsVisible] = useState(Array(refs.length).fill(false));

    useEffect(() => {
        const observers = refs.map((ref, index) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => {
                            const updated = [...prev];
                            if (!updated[index]) { // Only update and log if it wasn't visible before
                                updated[index] = true;
                                console.log(`Element ${index} is visible`);
                            }
                            return updated;
                        });
                        observer.unobserve(ref.current); // Stop observing once visible
                    } else {
                        setIsVisible((prev) => {
                            const updated = [...prev];
                            if (updated[index]) {
                                console.log(`Element ${index} is not visible anymore`);
                                updated[index] = false; // Mark as not visible
                            }
                            return updated;
                        });
                    }
                },
                { threshold: 0.1 }
            );

            if (ref.current) {
                observer.observe(ref.current);
            }

            return observer;
        });

        return () => {
            observers.forEach((observer, index) => {
                if (refs[index].current) {
                    observer.unobserve(refs[index].current);
                }
            });
        };
    }, [refs]);

    return isVisible;
}
