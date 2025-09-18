import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Progress } from "./ui/progress";
import { 
  Package, 
  MapPin, 
  Clock, 
  Truck, 
  Factory, 
  CheckCircle,
  AlertCircle,
  Users,
  TrendingUp,
  Activity
} from "lucide-react";

export function Dashboard() {
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

  // Mock data
  const stats = [
    { title: "Total Batches", value: "1,247", icon: Package, change: "+12%" },
    { title: "Active Farmers", value: "324", icon: Users, change: "+8%" },
    { title: "Processing Centers", value: "45", icon: Factory, change: "+3%" },
    { title: "Products Verified", value: "8,932", icon: CheckCircle, change: "+24%" }
  ];

  const recentBatches = [
    {
      id: "AYR-2024-001234",
      herb: "Turmeric",
      farmer: "Ravi Sharma",
      location: "Kerala, India",
      date: "2024-01-15",
      status: "In Transit",
      stage: "Processing"
    },
    {
      id: "AYR-2024-001235", 
      herb: "Ashwagandha",
      farmer: "Priya Patel",
      location: "Gujarat, India",
      date: "2024-01-14",
      status: "Completed",
      stage: "Final Product"
    },
    {
      id: "AYR-2024-001236",
      herb: "Neem",
      farmer: "Arjun Singh",
      location: "Rajasthan, India", 
      date: "2024-01-13",
      status: "Processing",
      stage: "Storage"
    }
  ];

  const blockchainTransactions = [
    {
      id: "0x1a2b3c...",
      action: "Origin Recorded",
      timestamp: "2024-01-15 09:30:00",
      location: "Farm ID: FRM-KER-001",
      status: "Confirmed"
    },
    {
      id: "0x4d5e6f...",
      action: "Transport Started", 
      timestamp: "2024-01-15 14:20:00",
      location: "Vehicle ID: TRK-001",
      status: "Confirmed"
    },
    {
      id: "0x7g8h9i...",
      action: "Processing Started",
      timestamp: "2024-01-16 08:15:00", 
      location: "Facility ID: FAC-BLR-003",
      status: "Pending"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Transit": return "bg-blue-100 text-blue-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="batches" className="space-y-4">
        <TabsList>
          <TabsTrigger value="batches">Recent Batches</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain Activity</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="batches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Herb Batches</CardTitle>
              <CardDescription>
                Latest batches registered in the AyurChain system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch ID</TableHead>
                    <TableHead>Herb</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBatches.map((batch) => (
                    <TableRow key={batch.id}>
                      <TableCell className="font-mono text-sm">{batch.id}</TableCell>
                      <TableCell>{batch.herb}</TableCell>
                      <TableCell>{batch.farmer}</TableCell>
                      <TableCell className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {batch.location}
                      </TableCell>
                      <TableCell>{batch.date}</TableCell>
                      <TableCell>{batch.stage}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(batch.status)}>
                          {batch.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedBatch(batch.id)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Transactions</CardTitle>
              <CardDescription>
                Real-time blockchain activity for supply chain tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blockchainTransactions.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        tx.status === 'Confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <div>
                        <p className="font-medium">{tx.action}</p>
                        <p className="text-sm text-muted-foreground">{tx.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono">{tx.id}</p>
                      <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Supply Chain Efficiency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Origin to Processing</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Processing to Manufacturing</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Manufacturing to Retail</span>
                    <span>95%</span>
                  </div>
                  <Progress value={95} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Regional Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { region: "Kerala", percentage: 35, batches: 436 },
                    { region: "Gujarat", percentage: 28, batches: 349 },
                    { region: "Rajasthan", percentage: 22, batches: 274 },
                    { region: "Karnataka", percentage: 15, batches: 188 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.region}</p>
                        <p className="text-sm text-muted-foreground">{item.batches} batches</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Batch Details Modal (simplified) */}
      {selectedBatch && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Batch Details: {selectedBatch}</CardTitle>
              <Button variant="outline" onClick={() => setSelectedBatch(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium mb-2">Origin Information</h4>
                <p className="text-sm text-muted-foreground">Farmer: Ravi Sharma</p>
                <p className="text-sm text-muted-foreground">Location: Kerala, India</p>
                <p className="text-sm text-muted-foreground">GPS: 10.8505° N, 76.2711° E</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Processing Details</h4>
                <p className="text-sm text-muted-foreground">Facility: Processing Center BLR-003</p>
                <p className="text-sm text-muted-foreground">Date: 2024-01-16</p>
                <p className="text-sm text-muted-foreground">Quality Grade: A+</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Current Status</h4>
                <Badge className="mb-2">In Transit</Badge>
                <p className="text-sm text-muted-foreground">Expected delivery: 2024-01-18</p>
                <p className="text-sm text-muted-foreground">Destination: Manufacturing Unit MFG-001</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}