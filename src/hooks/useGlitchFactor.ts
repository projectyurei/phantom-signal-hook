import { useState, useEffect, useRef } from 'react';

/**
 * Returns a fluctuating value between 0.0 and 1.0 (or higher if intensity > 1)
 * useful for driving visual glitch effects, opacity flickers, or CSS transforms.
 * 
 * @param intensity Base intensity multiplier (default: 1.0)
 * @param frequencyMs How often the glitch factor updates (default: 100ms)
 */
export const useGlitchFactor = (intensity: number = 1.0, frequencyMs: number = 100) => {
    const [glitchFactor, setGlitchFactor] = useState(0);
    const timeRef = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            timeRef.current += 0.1;

            // Combine a smooth sine wave with random noise
            // Math.sin for "breathing"
            // Math.random for "digital noise"
            const baseWave = Math.sin(timeRef.current) * 0.5 + 0.5;
            const noise = Math.random();

            // If noise is high, we "glitch" peak
            const isGlitchSpike = noise > 0.92;

            let val = (baseWave * 0.3) + (noise * 0.2);

            if (isGlitchSpike) {
                val += 0.5; // Big spike
            }

            // Apply intensity scaling
            setGlitchFactor(val * intensity);

        }, frequencyMs);

        return () => clearInterval(interval);
    }, [intensity, frequencyMs]);

    return glitchFactor;
};
