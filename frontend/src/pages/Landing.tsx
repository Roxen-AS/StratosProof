import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Zap, Lock, ArrowRight } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            {/* Logo placeholder */}
            <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary to-aurora-mid flex items-center justify-center">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="aurora-text">StratosProof</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Crypto receipts that actually prove something.
            </p>
            
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-12">
              A cross-network cryptographic receipt engine for Web3. Generate verifiable proofs, 
              anchor them on-chain, and store them on IPFS—all with a single intent.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg group"
                onClick={() => navigate("/dashboard/send")}
              >
                Launch App
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg"
                onClick={() => navigate("/dashboard/verify")}
              >
                Verify Receipt
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="glass-panel p-8 hover-lift">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Batched Proofs</h3>
            <p className="text-muted-foreground">
              Efficient Merkle tree batching reduces gas costs and maximizes throughput.
            </p>
          </div>

          <div className="glass-panel p-8 hover-lift">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">On-Chain Anchoring</h3>
            <p className="text-muted-foreground">
              Merkle roots are anchored on-chain for immutable cryptographic verification.
            </p>
          </div>

          <div className="glass-panel p-8 hover-lift">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">IPFS Storage</h3>
            <p className="text-muted-foreground">
              Receipts are stored on IPFS with verifiable CIDs for permanent accessibility.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-24">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2024 StratosProof. Built for the future of Web3.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
