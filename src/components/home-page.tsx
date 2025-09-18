import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Leaf, 
  Shield, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle, 
  ArrowRight,
  QrCode
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HomePageProps {
  onViewChange: (view: string) => void;
}

export function HomePage({ onViewChange }: HomePageProps) {
  const features = [
    {
      icon: Shield,
      title: "Immutable Records",
      description: "Once recorded on blockchain, data cannot be altered or deleted, ensuring complete integrity."
    },
    {
      icon: MapPin,
      title: "Geo-tagged Origins",
      description: "GPS coordinates track exact location of herb collection with timestamp verification."
    },
    {
      icon: Users,
      title: "Complete Transparency",
      description: "Every stakeholder and consumer can view the complete journey of each product."
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Live updates at every step from harvest to final product packaging."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Origin Registration",
      description: "Farmers register harvested herbs with GPS location and batch details",
      image: "https://images.unsplash.com/photo-1643474004250-05d73e1473e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBoYXJ2ZXN0JTIwaGVyYnN8ZW58MXx8fHwxNzU4MTc5ODg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      number: "02", 
      title: "Processing & Storage",
      description: "Transportation and processing facilities record each handling step",
      image: "https://images.unsplash.com/photo-1748002388689-c62b45d5c28b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW51ZmFjdHVyaW5nJTIwcHJvY2Vzc2luZyUyMGZhY2lsaXR5fGVufDF8fHx8MTc1ODE3OTg4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      number: "03",
      title: "Final Formulation", 
      description: "Manufacturers document which herbs go into each product batch",
      image: "https://images.unsplash.com/photo-1617144323307-73f0015007b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkaWMlMjBoZXJicyUyMHR1cm1lcmljJTIwZ2luZ2VyfGVufDF8fHx8MTc1ODE3OTg4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      number: "04",
      title: "Consumer Verification",
      description: "End consumers can scan QR codes to view complete product history",
      image: "https://images.unsplash.com/photo-1644343262170-e40d72e19a84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwdGVjaG5vbG9neSUyMG5ldHdvcmt8ZW58MXx8fHwxNzU4MTMyNzAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="relative overflow-hidden">
        <CardContent className="p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className="mb-4" variant="secondary">
                Blockchain-Powered Authenticity
              </Badge>
              <h1 className="text-4xl mb-4 text-foreground">
                AyurChain: Ensuring Authentic Ayurvedic Herbs
              </h1>
              <p className="text-muted-foreground mb-6 text-lg">
                A decentralized blockchain system that tracks Ayurvedic herbs from harvest to shelf, 
                building consumer trust and eliminating counterfeiting in the supply chain.
              </p>
              <div className="flex gap-4">
                <Button onClick={() => onViewChange('dashboard')} className="flex items-center gap-2">
                  View Dashboard <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" onClick={() => onViewChange('scanner')} className="flex items-center gap-2">
                  <QrCode className="w-4 h-4" />
                  Scan Product
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1617144323307-73f0015007b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkaWMlMjBoZXJicyUyMHR1cm1lcmljJTIwZ2luZ2VyfGVufDF8fHx8MTc1ODE3OTg4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Ayurvedic herbs and spices"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Section */}
      <div>
        <h2 className="text-3xl mb-6 text-center">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index}>
                <CardHeader>
                  <Icon className="w-8 h-8 text-green-600 mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* How It Works Section */}
      <div>
        <h2 className="text-3xl mb-6 text-center">How It Works</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-48">
                <ImageWithFallback
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-semibold">
                  {step.number}
                </div>
              </div>
              <CardHeader>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Impact on the Ayurvedic Industry</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle, title: "Boost Consumer Confidence", desc: "Verifiable authentic products" },
              { icon: Shield, title: "Prevent Counterfeiting", desc: "Unique digital identities" },
              { icon: Users, title: "Empower Farmers", desc: "Direct link to end products" },
              { icon: Leaf, title: "Standardize Industry", desc: "Quality and sourcing standards" }
            ].map((impact, index) => {
              const Icon = impact.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h4 className="mb-2">{impact.title}</h4>
                  <p className="text-muted-foreground text-sm">{impact.desc}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}