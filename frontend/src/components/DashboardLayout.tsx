import { ReactNode } from "react";
import { NavLink } from "@/components/NavLink";
import { Send, Shield, Activity, Layers } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const navItems = [
  { title: "Send Intent", url: "/dashboard/send", icon: Send },
  { title: "Verify Receipt", url: "/dashboard/verify", icon: Shield },
  { title: "Activity", url: "/dashboard/activity", icon: Activity },
  { title: "Root Anchors", url: "/dashboard/anchors", icon: Layers },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-sidebar p-6 hidden md:block">
        <div className="mb-8">
          <h1 className="text-2xl font-bold aurora-text">StratosProof</h1>
          <p className="text-sm text-muted-foreground mt-1">Crypto receipts verified</p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground/70 transition-all hover:bg-sidebar-accent hover:text-sidebar-foreground"
              activeClassName="bg-sidebar-accent text-sidebar-foreground font-medium border border-primary/20"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-8">
          <NavLink
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Home
          </NavLink>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border/50 z-50">
        <nav className="flex justify-around p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              className="flex flex-col items-center gap-1 text-muted-foreground"
              activeClassName="text-primary"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.title.split(" ")[0]}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10 mb-20 md:mb-0">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
