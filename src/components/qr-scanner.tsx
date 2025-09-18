import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  QrCode, 
  Camera, 
  MapPin, 
  Calendar, 
  Truck, 
  Factory, 
  Store,
  CheckCircle,
  Clock,
  Leaf,
  Users
} from "lucide-react";

export function QRScanner() {
  const [scanResult, setScanResult] = useState<any>(null);
  const [manualCode, setManualCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  // Mock product data
  const mockProductData = {
    productId: "AYR-PROD-2024-001234",
    productName: "Premium Turmeric Capsules",
    manufacturer: "Ayurvedic Wellness Ltd.",
    batchNumber: "TWC-2024-0156",
    manufactureDate: "2024-01-18",
    expiryDate: "2025-01-18",
    ingredients: [
      {
        name: "Turmeric (Curcuma longa)",
        batchId: "AYR-2024-001234",
        percentage: "95%"
      },
      {
        name: "Organic Starch", 
        batchId: "STR-2024-0089",
        percentage: "5%"
      }
    ],
    supplyChain: [
      {
        stage: "Origin",
        date: "2024-01-15",
        location: "Ravi Sharma's Farm, Kerala",
        gps: "10.8505° N, 76.2711° E",
        operator: "Ravi Sharma",
        operatorId: "FRM-KER-001",
        status: "Completed",
        details: "Organic turmeric harvested, Quality Grade A+",
        blockchainTx: "0x1a2b3c4d5e6f..."
      },
      {
        stage: "Transport",
        date: "2024-01-15",
        location: "Kerala to Bangalore",
        gps: "12.9716° N, 77.5946° E", 
        operator: "GreenLogistics Pvt Ltd",
        operatorId: "TRK-001",
        status: "Completed",
        details: "Temperature controlled transport, No contamination detected",
        blockchainTx: "0x2b3c4d5e6f7a..."
      },
      {
        stage: "Processing",
        date: "2024-01-16",
        location: "Spice Processing Center, Bangalore",
        gps: "12.9716° N, 77.5946° E",
        operator: "SpiceMax Processing",
        operatorId: "FAC-BLR-003",
        status: "Completed", 
        details: "Cleaned, dried, and powdered. Quality tests passed",
        blockchainTx: "0x3c4d5e6f7a8b..."
      },
      {
        stage: "Manufacturing",
        date: "2024-01-18",
        location: "Ayurvedic Wellness Manufacturing Unit",
        gps: "13.0827° N, 80.2707° E",
        operator: "Ayurvedic Wellness Ltd",
        operatorId: "MFG-CHN-001",
        status: "Completed",
        details: "Encapsulated with organic starch, packed in bottles",
        blockchainTx: "0x4d5e6f7a8b9c..."
      }
    ],
    certifications: [
      "Organic Certified",
      "FSSAI Approved", 
      "ISO 22000:2018",
      "Ayush Premium"
    ],
    qualityTests: [
      { test: "Heavy Metals", result: "Pass", date: "2024-01-16" },
      { test: "Pesticide Residue", result: "Pass", date: "2024-01-16" },
      { test: "Microbial Count", result: "Pass", date: "2024-01-18" },
      { test: "Curcumin Content", result: "6.8% (Target: >6%)", date: "2024-01-18" }
    ]
  };

  const handleScan = () => {
    setIsScanning(true);
    // Simulate camera scanning
    setTimeout(() => {
      setScanResult(mockProductData);
      setIsScanning(false);
    }, 2000);
  };

  const handleManualEntry = () => {
    if (manualCode.trim()) {
      setScanResult(mockProductData);
    }
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case "Origin": return <Leaf className="w-5 h-5" />;
      case "Transport": return <Truck className="w-5 h-5" />;
      case "Processing": return <Factory className="w-5 h-5" />;
      case "Manufacturing": return <Store className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Origin": return "text-green-600 bg-green-100";
      case "Transport": return "text-blue-600 bg-blue-100";
      case "Processing": return "text-yellow-600 bg-yellow-100";
      case "Manufacturing": return "text-purple-600 bg-purple-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-6">
      {!scanResult ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              Verify Product Authenticity
            </CardTitle>
            <CardDescription>
              Scan the QR code on your Ayurvedic product to view its complete supply chain history.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* QR Scanner Section */}
            <div className="text-center space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                {isScanning ? (
                  <div className="space-y-4">
                    <div className="animate-pulse">
                      <Camera className="w-16 h-16 text-gray-400 mx-auto" />
                    </div>
                    <p className="text-muted-foreground">Scanning QR code...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <QrCode className="w-16 h-16 text-gray-400 mx-auto" />
                    <p className="text-muted-foreground">
                      Position the QR code within the camera frame
                    </p>
                    <Button onClick={handleScan} className="flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      Start Scanning
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            {/* Manual Entry Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="manual-code">Enter Product Code Manually</Label>
                <div className="flex gap-2">
                  <Input
                    id="manual-code"
                    placeholder="e.g., AYR-PROD-2024-001234"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                  />
                  <Button onClick={handleManualEntry} disabled={!manualCode.trim()}>
                    Verify
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Product Information */}
          <Card className="border-green-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="w-5 h-5" />
                    Verified Authentic Product
                  </CardTitle>
                  <CardDescription>
                    This product has been verified on the AyurChain blockchain
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={() => setScanResult(null)}>
                  Scan Another
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Product Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Name:</span> {scanResult.productName}</p>
                    <p><span className="font-medium">Manufacturer:</span> {scanResult.manufacturer}</p>
                    <p><span className="font-medium">Batch:</span> {scanResult.batchNumber}</p>
                    <p><span className="font-medium">Manufactured:</span> {scanResult.manufactureDate}</p>
                    <p><span className="font-medium">Expires:</span> {scanResult.expiryDate}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-1">
                    {scanResult.certifications.map((cert: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle>Ingredients Traceability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scanResult.ingredients.map((ingredient: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{ingredient.name}</p>
                      <p className="text-sm text-muted-foreground">Batch: {ingredient.batchId}</p>
                    </div>
                    <Badge variant="outline">{ingredient.percentage}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Supply Chain Journey */}
          <Card>
            <CardHeader>
              <CardTitle>Supply Chain Journey</CardTitle>
              <CardDescription>
                Complete traceability from farm to your hands
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scanResult.supplyChain.map((step: any, index: number) => (
                  <div key={index} className="relative">
                    {index < scanResult.supplyChain.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200" />
                    )}
                    <div className="flex gap-4">
                      <div className={`p-2 rounded-full ${getStageColor(step.stage)}`}>
                        {getStageIcon(step.stage)}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{step.stage}</h4>
                          <Badge variant="outline" className="text-xs">
                            {step.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {step.date}
                          </p>
                          <p className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {step.location}
                          </p>
                          <p className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {step.operator} ({step.operatorId})
                          </p>
                          <p>{step.details}</p>
                          <p className="font-mono text-xs bg-gray-100 p-1 rounded">
                            Blockchain TX: {step.blockchainTx}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quality Tests */}
          <Card>
            <CardHeader>
              <CardTitle>Quality Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scanResult.qualityTests.map((test: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{test.test}</p>
                      <p className="text-sm text-muted-foreground">{test.date}</p>
                    </div>
                    <Badge className={test.result === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {test.result}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}