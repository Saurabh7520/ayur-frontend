import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  MapPin, 
  Calendar, 
  Leaf, 
  Users, 
  CheckCircle,
  AlertCircle,
  QrCode,
  Upload
} from "lucide-react";

export function HerbRegistration() {
  const [formData, setFormData] = useState({
    herbType: "",
    quantity: "",
    harvestDate: "",
    farmerName: "",
    farmerId: "",
    location: "",
    gpsCoordinates: "",
    qualityGrade: "",
    notes: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [generatedBatchId, setGeneratedBatchId] = useState("");

  const herbTypes = [
    "Turmeric (Curcuma longa)",
    "Ashwagandha (Withania somnifera)", 
    "Neem (Azadirachta indica)",
    "Tulsi (Ocimum sanctum)",
    "Ginger (Zingiber officinale)",
    "Brahmi (Bacopa monnieri)",
    "Amla (Phyllanthus emblica)",
    "Triphala Mix",
    "Other"
  ];

  const qualityGrades = ["A+", "A", "B+", "B", "C"];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude.toFixed(6)}° N, ${position.coords.longitude.toFixed(6)}° E`;
          setFormData(prev => ({ ...prev, gpsCoordinates: coords }));
        },
        () => {
          // Fallback to mock coordinates
          setFormData(prev => ({ ...prev, gpsCoordinates: "10.8505° N, 76.2711° E" }));
        }
      );
    } else {
      setFormData(prev => ({ ...prev, gpsCoordinates: "10.8505° N, 76.2711° E" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate batch ID
    const batchId = `AYR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`;
    setGeneratedBatchId(batchId);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setFormData({
      herbType: "",
      quantity: "",
      harvestDate: "",
      farmerName: "",
      farmerId: "",
      location: "",
      gpsCoordinates: "",
      qualityGrade: "",
      notes: ""
    });
    setSubmitted(false);
    setGeneratedBatchId("");
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-green-800">Registration Successful!</CardTitle>
            <CardDescription>
              Your herb batch has been successfully registered on the AyurChain blockchain.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Label>Generated Batch ID</Label>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge variant="outline" className="text-lg px-4 py-2 font-mono">
                  {generatedBatchId}
                </Badge>
                <QrCode className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="space-y-2">
                <Label>Blockchain Transaction</Label>
                <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                  0x{Math.random().toString(16).substr(2, 12)}...
                </p>
              </div>
              <div className="space-y-2">
                <Label>Timestamp</Label>
                <p className="text-sm">
                  {new Date().toLocaleString()}
                </p>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Save your Batch ID for future reference. This unique identifier will be used 
                throughout the supply chain to track your herbs.
              </AlertDescription>
            </Alert>

            <div className="flex gap-4 justify-center mt-6">
              <Button onClick={resetForm}>
                Register Another Batch
              </Button>
              <Button variant="outline">
                Download Certificate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            Register New Herb Batch
          </CardTitle>
          <CardDescription>
            Register harvested herbs on the AyurChain blockchain to create an immutable record of origin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Herb Information */}
              <div className="space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  Herb Information
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="herbType">Herb Type *</Label>
                  <Select value={formData.herbType} onValueChange={(value) => handleInputChange('herbType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select herb type" />
                    </SelectTrigger>
                    <SelectContent>
                      {herbTypes.map((herb) => (
                        <SelectItem key={herb} value={herb}>
                          {herb}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (kg) *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter quantity in kg"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="harvestDate">Harvest Date *</Label>
                  <Input
                    id="harvestDate"
                    type="date"
                    value={formData.harvestDate}
                    onChange={(e) => handleInputChange('harvestDate', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qualityGrade">Quality Grade *</Label>
                  <Select value={formData.qualityGrade} onValueChange={(value) => handleInputChange('qualityGrade', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {qualityGrades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          Grade {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Farmer & Location Information */}
              <div className="space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Farmer & Location
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="farmerName">Farmer Name *</Label>
                  <Input
                    id="farmerName"
                    placeholder="Enter farmer name"
                    value={formData.farmerName}
                    onChange={(e) => handleInputChange('farmerName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmerId">Farmer ID</Label>
                  <Input
                    id="farmerId"
                    placeholder="e.g., FRM-KER-001"
                    value={formData.farmerId}
                    onChange={(e) => handleInputChange('farmerId', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="Village, District, State"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gpsCoordinates">GPS Coordinates</Label>
                  <div className="flex gap-2">
                    <Input
                      id="gpsCoordinates"
                      placeholder="Will be auto-detected"
                      value={formData.gpsCoordinates}
                      onChange={(e) => handleInputChange('gpsCoordinates', e.target.value)}
                      readOnly
                    />
                    <Button type="button" variant="outline" onClick={getCurrentLocation}>
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information about the harvest, soil conditions, etc."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
              />
            </div>

            {/* Photo Upload Section */}
            <div className="space-y-2">
              <Label>Harvest Photos</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Click to upload photos of the harvested herbs
                </p>
                <Button type="button" variant="outline" className="mt-2">
                  Choose Files
                </Button>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Once submitted, this information will be permanently recorded on the blockchain 
                and cannot be modified. Please ensure all details are accurate.
              </AlertDescription>
            </Alert>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Recording on Blockchain..." : "Register Herb Batch"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}