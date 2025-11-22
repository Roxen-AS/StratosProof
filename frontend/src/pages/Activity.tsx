import DashboardLayout from "@/components/DashboardLayout";
import StatusBadge from "@/components/StatusBadge";
import { Activity as ActivityIcon, Send, Shield, Layers } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "intent" | "verification" | "anchor";
  title: string;
  timestamp: string;
  status: "success" | "pending" | "error";
  details?: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "intent",
    title: "Intent Submitted",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    status: "success",
    details: "Amount: 0.5 ETH",
  },
  {
    id: "2",
    type: "anchor",
    title: "Merkle Root Anchored",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    status: "success",
    details: "Block #18294756",
  },
  {
    id: "3",
    type: "verification",
    title: "Receipt Verified",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: "success",
    details: "CID: QmX...abc",
  },
  {
    id: "4",
    type: "intent",
    title: "Intent Processing",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    status: "pending",
    details: "Amount: 1.2 ETH",
  },
  {
    id: "5",
    type: "anchor",
    title: "Merkle Root Anchored",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    status: "success",
    details: "Block #18294123",
  },
  {
    id: "6",
    type: "verification",
    title: "Verification Failed",
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    status: "error",
    details: "Invalid CID",
  },
];

const Activity = () => {
  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "intent":
        return Send;
      case "verification":
        return Shield;
      case "anchor":
        return Layers;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Activity Feed</h1>
          <p className="text-muted-foreground">
            Track your intents, verifications, and on-chain anchors
          </p>
        </div>

        <div className="space-y-4">
          {mockActivities.map((activity, index) => {
            const Icon = getIcon(activity.type);
            return (
              <div
                key={activity.id}
                className="glass-panel p-6 hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold">{activity.title}</h3>
                      <StatusBadge status={activity.status} className="flex-shrink-0" />
                    </div>
                    
                    {activity.details && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {activity.details}
                      </p>
                    )}
                    
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {mockActivities.length === 0 && (
          <div className="glass-panel p-12 text-center">
            <ActivityIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Activity Yet</h3>
            <p className="text-muted-foreground">
              Your activity will appear here once you submit intents or verify receipts
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Activity;
