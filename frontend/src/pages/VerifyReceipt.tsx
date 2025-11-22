import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/components/DashboardLayout";
import StatusBadge from "@/components/StatusBadge";
import { Shield, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

const VerifyReceipt = () => {
  const [cid, setCid] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    valid: boolean;
    merkleRoot?: string;
    timestamp?: string;
    blockNumber?: string;
  } | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cid || cid.length < 10) {
      toast.error("Please enter a valid CID");
      return;
    }

    setLoading(true);
    setResult(null);

    // Mock verification - random valid/invalid
    await new Promise((resolve) => setTimeout(resolve, 1800));

    const isValid = Math.random() > 0.3; // 70% valid
    
    if (isValid) {
      setResult({
        valid: true,
        merkleRoot: `0x${Math.random().toString(16).slice(2, 66)}`,
        timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        blockNumber: Math.floor(Math.random() * 1000000 + 18000000).toString(),
      });
      toast.success("Receipt verified successfully!");
    } else {
      setResult({ valid: false });
      toast.error("Receipt verification failed");
    }

    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Verify Receipt</h1>
          <p className="text-muted-foreground">
            Verify the authenticity of a receipt using its IPFS CID
          </p>
        </div>

        <form onSubmit={handleVerify} className="glass-panel p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cid">IPFS CID</Label>
            <Input
              id="cid"
              type="text"
              placeholder="QmXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={cid}
              onChange={(e) => setCid(e.target.value)}
              className="bg-background/50 border-border/50 font-mono h-12"
            />
            <p className="text-sm text-muted-foreground">
              Enter the Content Identifier (CID) of the receipt to verify
            </p>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
          >
            {loading ? (
              <>Verifying...</>
            ) : (
              <>
                <Shield className="mr-2 w-4 h-4" />
                Verify Receipt
              </>
            )}
          </Button>
        </form>

        {result && (
          <div className={`glass-panel p-8 mt-6 animate-fade-in ${result.valid ? 'glow-border' : 'border-destructive/30'}`}>
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                result.valid ? 'bg-success/20' : 'bg-destructive/20'
              }`}>
                {result.valid ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">
                  {result.valid ? "Receipt Valid" : "Receipt Invalid"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {result.valid
                    ? "This receipt has been verified on-chain"
                    : "This receipt could not be verified"}
                </p>
              </div>
              <StatusBadge status={result.valid ? "success" : "error"} />
            </div>

            {result.valid && (
              <div className="space-y-3 border-t border-border/50 pt-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Merkle Root</p>
                  <code className="text-sm bg-background/50 px-3 py-2 rounded block font-mono break-all">
                    {result.merkleRoot}
                  </code>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Block Number</p>
                    <p className="text-sm font-mono">{result.blockNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Timestamp</p>
                    <p className="text-sm">{new Date(result.timestamp!).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VerifyReceipt;
