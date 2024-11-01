// CUSTOM HOOK for when refs enter into the screen. Mostly done with the help of chatgpt.
import { useEffect, useState } from "react";

export default function useIntersectionObserver(refs) {
    const [isVisible, setIsVisible] = useState(Array(refs.length).fill(false));
    const [hasAnimated, setHasAnimated] = useState(Array(refs.length).fill(false)); // New state to track animation

    useEffect(() => {
        const observers = refs.map((ref, index) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => {
                            const updated = [...prev];
                            if (!updated[index] && !hasAnimated[index]) { // Only update if not already visible and not animated
                                updated[index] = true;
                                console.log(`Element ${index} is visible`);
                            }
                            return updated;
                        });

                        // Mark as animated
                        setHasAnimated((prev) => {
                            const updated = [...prev];
                            if (!updated[index]) { // Only update if not animated yet
                                updated[index] = true; // Mark as animated
                            }
                            return updated;
                        });

                        observer.unobserve(ref.current); // Stop observing once visible
                    } else {
                        setIsVisible((prev) => {
                            const updated = [...prev];
                            if (updated[index]) {
                                console.log(`Element ${index} is not visible anymore`);
                            }
                            return updated;
                        });
                    }
                },
                { threshold: 0.05 }
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
    }, [refs, hasAnimated]);

    return [isVisible, hasAnimated]; // Return both visibility and animation states
}
