import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";

interface StatusBadgeProps {
  status: "success" | "error" | "pending" | "warning";
  label?: string;
  className?: string;
}

const StatusBadge = ({ status, label, className }: StatusBadgeProps) => {
  const configs = {
    success: {
      icon: CheckCircle2,
      bg: "bg-success/10",
      border: "border-success/30",
      text: "text-success",
      label: label || "Valid",
    },
    error: {
      icon: XCircle,
      bg: "bg-destructive/10",
      border: "border-destructive/30",
      text: "text-destructive",
      label: label || "Invalid",
    },
    pending: {
      icon: Clock,
      bg: "bg-muted",
      border: "border-muted-foreground/30",
      text: "text-muted-foreground",
      label: label || "Pending",
    },
    warning: {
      icon: AlertCircle,
      bg: "bg-primary/10",
      border: "border-primary/30",
      text: "text-primary",
      label: label || "Warning",
    },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full border",
        config.bg,
        config.border,
        config.text,
        className
      )}
    >
      <Icon className="w-4 h-4" />
      <span className="font-medium">{config.label}</span>
    </div>
  );
};

export default StatusBadge;
