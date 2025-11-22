import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/components/DashboardLayout";
import StatusBadge from "@/components/StatusBadge";
import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const SendIntent = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    intentId: string;
    timestamp: string;
    status: "pending" | "success";
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);
    setResult(null);

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockResult = {
      intentId: `0x${Math.random().toString(16).slice(2, 18)}`,
      timestamp: new Date().toISOString(),
      status: "success" as const,
    };

    setResult(mockResult);
    setLoading(false);
    toast.success("Intent submitted successfully!");
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Send Intent</h1>
          <p className="text-muted-foreground">
            Submit an intent to be batched and anchored on-chain
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-background/50 border-border/50 text-lg h-12"
            />
            <p className="text-sm text-muted-foreground">
              Enter the amount for your intent transaction
            </p>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
          >
            {loading ? (
              <>Processing...</>
            ) : (
              <>
                <Send className="mr-2 w-4 h-4" />
                Send Intent
              </>
            )}
          </Button>
        </form>

        {result && (
          <div className="glass-panel p-8 mt-6 animate-fade-in glow-border">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">Intent Submitted</h3>
                <p className="text-sm text-muted-foreground">
                  Your intent has been added to the batch queue
                </p>
              </div>
              <StatusBadge status={result.status} />
            </div>

            <div className="space-y-3 border-t border-border/50 pt-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Intent ID</p>
                <code className="text-sm bg-background/50 px-3 py-2 rounded block font-mono">
                  {result.intentId}
                </code>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Timestamp</p>
                <p className="text-sm">{new Date(result.timestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SendIntent;
