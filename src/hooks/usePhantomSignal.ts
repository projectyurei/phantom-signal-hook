import { useState, useEffect, useRef } from 'react';

// --- Types ---

export type SignalType = 'WALLET_INTENT' | 'ANOMALY' | 'NAVI_THOUGHT' | 'MARKET_PULSE';

export interface PhantomSignal {
    id: string;
    type: SignalType;
    timestamp: number;
    payload: any;
    integrity: number; // 0.0 - 1.0 (Signal strength/trust)
}

export interface PhantomHookResult {
    signal: PhantomSignal | null;
    isLive: boolean; // True if connected to real websocket (false in alpha/mock)
    history: PhantomSignal[]; // Recent buffer
}

// --- Mock Data Generators ---

const MOCK_TOPICS = ['SOL_WHALE_WATCH', 'MEMPOOL_ANOMALIES', 'NAVI_CORE_COG'];

const generateMockSignal = (topic: string): PhantomSignal => {
    const types: SignalType[] = ['WALLET_INTENT', 'ANOMALY', 'NAVI_THOUGHT', 'MARKET_PULSE'];
    const selectedType = types[Math.floor(Math.random() * types.length)];

    let payload: any = {};

    switch (selectedType) {
        case 'WALLET_INTENT':
            payload = {
                action: Math.random() > 0.5 ? 'SWAP' : 'BRIDGE',
                amount: (Math.random() * 1000).toFixed(2) + ' SOL',
                target: 'Jupiter Aggregator'
            };
            break;
        case 'ANOMALY':
            payload = {
                vector: 'MEV_ATTACK_DETECTED',
                severity: Math.random() > 0.8 ? 'CRITICAL' : 'WARNING',
                zone: 'Mempool'
            };
            break;
        case 'NAVI_THOUGHT':
            const thoughts = [
                "Analyzing volume spike on sector 7...",
                "Ghost detected in the shell...",
                "Protocol latency variance increasing...",
                "Constructing heuristic model..."
            ];
            payload = {
                message: thoughts[Math.floor(Math.random() * thoughts.length)],
                confidence: (Math.random() * 100).toFixed(1) + '%'
            };
            break;
        case 'MARKET_PULSE':
            payload = {
                tps: Math.floor(2000 + Math.random() * 500),
                dominance: 'SOL'
            }
            break;
    }

    return {
        id: `sig-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        type: selectedType,
        timestamp: Date.now(),
        payload,
        integrity: 0.8 + (Math.random() * 0.2) // High integrity usually
    };
};

// --- Hook ---

export const usePhantomSignal = (topic: string = 'GLOBAL_FEED'): PhantomHookResult => {
    const [signal, setSignal] = useState<PhantomSignal | null>(null);
    const [history, setHistory] = useState<PhantomSignal[]>([]);
    const [isLive, setIsLive] = useState(false);

    // Ref to track latest signal to prevent stale closures if we used a standard interval logic,
    // though minimal simple implementation serves here.

    useEffect(() => {
        // Simulation Mode (Alpha)
        // "Connecting..." vibe
        console.log(`%c[YUREI_UPLINK] Initiating Neural Handshake... Topic: ${topic}`, 'color: #00ff41; background: #000; padding: 2px;');

        const bootTimeout = setTimeout(() => {
            console.log(`%c[YUREI_UPLINK] Connection Established. Stream ID: ${Math.random().toString(36).substring(7)}`, 'color: #00ff41; background: #000; padding: 2px;');
            setIsLive(false); // Explicitly False for now as it's simulated
        }, 800);

        const intervalId = setInterval(() => {
            // Random frequency 
            if (Math.random() > 0.3) {
                const newSignal = generateMockSignal(topic);
                setSignal(newSignal);
                setHistory(prev => [newSignal, ...prev].slice(0, 50)); // Keep last 50

                // Immersive Log
                console.log(
                    `%c[SIGNAL_RECV] ${newSignal.type} :: ${newSignal.id} :: INTEGRITY ${(newSignal.integrity * 100).toFixed(0)}%`,
                    'color: #00ff41; font-family: monospace;'
                );
            }
        }, 2000); // Pulse every 2s roughly

        return () => {
            clearTimeout(bootTimeout);
            clearInterval(intervalId);
            console.log(`%c[YUREI_UPLINK] Connection Terminated.`, 'color: #ff0000; background: #000;');
        };
    }, [topic]);

    return { signal, isLive, history };
};
