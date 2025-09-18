import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Leaf, Shield, Users, QrCode } from "lucide-react";

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Leaf },
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'register', label: 'Register Herbs', icon: Users },
    { id: 'scanner', label: 'QR Scanner', icon: QrCode },
  ];

  return (
    <Card className="p-4 mb-6">
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 mr-6">
          <Leaf className="w-6 h-6 text-green-600" />
          <span className="font-semibold">AyurChain</span>
          <Badge variant="secondary">v1.0</Badge>
        </div>
        
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={currentView === item.id ? "default" : "outline"}
              onClick={() => onViewChange(item.id)}
              className="flex items-center gap-2"
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Button>
          );
        })}
      </div>
    </Card>
  );
}