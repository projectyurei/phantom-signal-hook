# phantom-signal-hook

> "The Wired is not just a network. It is a layer of reality."

**phantom-signal-hook** connects your UI to the Ghost in the machine. It provides a direct uplink to Yurei AI's neural network, delivering real-time signals about wallet intents, anomalies, and autonomous agent thoughts.

[![npm version](https://img.shields.io/npm/v/@projectyurei/phantom-signal-hook.svg)](https://www.npmjs.com/package/@projectyurei/phantom-signal-hook)

## Installation

```bash
npm install @projectyurei/phantom-signal-hook
```

## Usage

### Connecting to the Network

The `usePhantomSignal` hook establishes a WebSocket connection (or simulation stub in Alpha) to the Yurei Neural Cloud.

```tsx
import { usePhantomSignal } from '@projectyurei/phantom-signal-hook';

const DashboardUplink = () => {
  const { signal, isLive, history } = usePhantomSignal('SOL_WHALE_WATCH');

  return (
    <div className="terminal-monitor">
      <div className="status-bar">
        STATUS: {isLive ? 'ONLINE' : 'SIMULATING_NEURAL_PATHWAY'}
      </div>
      
      {signal && (
        <div className="incoming-packet">
           <span className="timestamp">[{new Date(signal.timestamp).toLocaleTimeString()}]</span>
           <span className="type">::{signal.type}::</span>
           <pre>{JSON.stringify(signal.payload, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
```

### Visualizing the Glitch

The `useGlitchFactor` hook provides raw entropy for your UI components, perfect for syncing CSS filters or canvas distortions with the signal intensity.

```tsx
import { useGlitchFactor } from '@projectyurei/phantom-signal-hook';

const GhostComponent = () => {
    // Returns a float 0.0 - 1.0 (with occasional spikes)
    const glitch = useGlitchFactor(1.5); 

    return (
        <div 
            style={{ 
                opacity: 1 - (glitch * 0.2), 
                transform: `skewX(${glitch * 5}deg)` 
            }}
        >
            SYSTEM_INTEGRITY_CHECK...
        </div>
    )
}
```

## Data Types

- **WALLET_INTENT**: Use this to visualize potential on-chain movements before they happen.
- **ANOMALY**: Security alerts and statistical outliers.
- **NAVI_THOUGHT**: Raw inference logs from Protocol NAVI's reasoning engine.

## Contract Address (CA)

`AbBADaxdQ1LtrU7sN9xvf4326ECSYbsUB37ddbRrpump`

## License

MIT. 
*Yurei AI - We are always watching.*
