import DashboardLayout from "@/components/DashboardLayout";
import StatusBadge from "@/components/StatusBadge";
import { Layers, ExternalLink } from "lucide-react";

interface RootAnchor {
  id: string;
  merkleRoot: string;
  blockNumber: string;
  timestamp: string;
  intentCount: number;
  txHash: string;
}

const mockAnchors: RootAnchor[] = [
  {
    id: "1",
    merkleRoot: "0x" + "a".repeat(64),
    blockNumber: "18294756",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    intentCount: 42,
    txHash: "0x" + "b".repeat(64),
  },
  {
    id: "2",
    merkleRoot: "0x" + "c".repeat(64),
    blockNumber: "18294123",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    intentCount: 38,
    txHash: "0x" + "d".repeat(64),
  },
  {
    id: "3",
    merkleRoot: "0x" + "e".repeat(64),
    blockNumber: "18293890",
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    intentCount: 51,
    txHash: "0x" + "f".repeat(64),
  },
];

const RootAnchors = () => {
  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Root Anchors</h1>
          <p className="text-muted-foreground">
            View Merkle roots anchored on-chain for batch verification
          </p>
        </div>

        <div className="space-y-4">
          {mockAnchors.map((anchor, index) => (
            <div
              key={anchor.id}
              className="glass-panel p-6 hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-semibold mb-1">Merkle Root Anchored</h3>
                      <p className="text-sm text-muted-foreground">
                        Block #{anchor.blockNumber} • {anchor.intentCount} intents batched
                      </p>
                    </div>
                    <StatusBadge status="success" label="Confirmed" className="flex-shrink-0" />
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t border-border/50 pt-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Merkle Root</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-background/50 px-3 py-2 rounded flex-1 font-mono break-all">
                      {anchor.merkleRoot}
                    </code>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-background/50 px-2 py-1 rounded font-mono truncate">
                        {anchor.txHash.slice(0, 20)}...
                      </code>
                      <button className="text-primary hover:text-primary/80 transition-colors">
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Timestamp</p>
                    <p className="text-xs">
                      {new Date(anchor.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RootAnchors;
