"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  Users,
  Wallet,
  Send,
  History,
  Settings,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  Copy,
} from "lucide-react"

// Mock data for demonstration
const mockSafeData = {
  address: "0x9a8FEe232DCF73060Af348a1B62Cdb0a19852d13",
  threshold: 2,
  owners: [
    { address: "0x5f350bF5feE8e254D6077f8661E9C7B83a30364e", name: "Alice" },
    { address: "0xAfD5f60aA8eb4F488eAA0eF98c1C5B0645D9A0A0", name: "Bob" },
    { address: "0x1bfD64aB61EACf714B2Aa37347057203f3AcA71f", name: "Charlie" },
  ],
  balances: [
    { token: "ETH", amount: "12.5", value: "$31,250" },
    { token: "USDC", amount: "5,000", value: "$5,000" },
    { token: "DAI", amount: "2,500", value: "$2,500" },
  ],
  pendingTransactions: [
    {
      id: "1",
      to: "0x742d35Cc6634C0532925a3b8D4C9db4C4C4C4C4C",
      amount: "1.5 ETH",
      confirmations: 1,
      threshold: 2,
      status: "pending",
    },
  ],
  recentTransactions: [
    {
      id: "1",
      type: "sent",
      amount: "0.5 ETH",
      to: "0x123...456",
      timestamp: "2 hours ago",
      status: "confirmed",
    },
    {
      id: "2",
      type: "received",
      amount: "1000 USDC",
      from: "0x789...012",
      timestamp: "1 day ago",
      status: "confirmed",
    },
  ],
}

export default function SafeApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [newTransactionTo, setNewTransactionTo] = useState("")
  const [newTransactionAmount, setNewTransactionAmount] = useState("")
  const [newTransactionData, setNewTransactionData] = useState("")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-accent rounded-lg">
                <Shield className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-serif text-foreground">SafeVault</h1>
                <p className="text-sm text-muted-foreground">Multisig Wallet Management</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-accent/10 text-accent">
                {mockSafeData.threshold}/{mockSafeData.owners.length} Multisig
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(mockSafeData.address)}
                className="text-muted-foreground hover:text-foreground"
              >
                {formatAddress(mockSafeData.address)}
                <Copy className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="owners" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Owners
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Balance Overview */}
            <div className="grid gap-4 md:grid-cols-3">
              {mockSafeData.balances.map((balance, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{balance.token}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{balance.amount}</div>
                    <p className="text-sm text-muted-foreground">{balance.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pending Transactions */}
            {mockSafeData.pendingTransactions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-accent" />
                    Pending Transactions
                  </CardTitle>
                  <CardDescription>Transactions awaiting confirmations</CardDescription>
                </CardHeader>
                <CardContent>
                  {mockSafeData.pendingTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                          <Send className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium">{tx.amount}</p>
                          <p className="text-sm text-muted-foreground">To: {formatAddress(tx.to)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">
                          {tx.confirmations}/{tx.threshold} confirmations
                        </Badge>
                        <p className="text-sm text-muted-foreground">Pending</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSafeData.recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === "sent" ? "bg-destructive/10" : "bg-accent/10"
                          }`}
                        >
                          {tx.type === "sent" ? (
                            <ArrowUpRight
                              className={`w-5 h-5 ${tx.type === "sent" ? "text-destructive" : "text-accent"}`}
                            />
                          ) : (
                            <ArrowDownLeft className="w-5 h-5 text-accent" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {tx.type === "sent" ? "Sent" : "Received"} {tx.amount}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {tx.type === "sent" ? `To: ${tx.to}` : `From: ${tx.from}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <CheckCircle className="w-4 h-4 text-accent" />
                          <span className="text-sm text-accent">Confirmed</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{tx.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>New Transaction</CardTitle>
                <CardDescription>
                  Create a new transaction that requires {mockSafeData.threshold} confirmations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="to">Recipient Address</Label>
                  <Input
                    id="to"
                    placeholder="0x..."
                    value={newTransactionTo}
                    onChange={(e) => setNewTransactionTo(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (ETH)</Label>
                  <Input
                    id="amount"
                    placeholder="0.0"
                    value={newTransactionAmount}
                    onChange={(e) => setNewTransactionAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="data">Transaction Data (Optional)</Label>
                  <Textarea
                    id="data"
                    placeholder="0x..."
                    value={newTransactionData}
                    onChange={(e) => setNewTransactionData(e.target.value)}
                  />
                </div>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    This transaction will require {mockSafeData.threshold} out of {mockSafeData.owners.length} owner
                    confirmations before execution.
                  </AlertDescription>
                </Alert>
                <Button className="w-full">Create Transaction</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Owners Tab */}
          <TabsContent value="owners" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Safe Owners
                  <Badge variant="secondary">
                    {mockSafeData.threshold}/{mockSafeData.owners.length} Required
                  </Badge>
                </CardTitle>
                <CardDescription>Manage the owners of this Safe wallet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSafeData.owners.map((owner, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-accent text-accent-foreground">
                            {owner.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{owner.name}</p>
                          <p className="text-sm text-muted-foreground">{formatAddress(owner.address)}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(owner.address)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Safe Configuration</CardTitle>
                <CardDescription>View and manage your Safe wallet settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Safe Address</Label>
                    <div className="flex items-center gap-2">
                      <Input value={mockSafeData.address} readOnly />
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(mockSafeData.address)}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Confirmation Threshold</Label>
                    <Input value={`${mockSafeData.threshold} out of ${mockSafeData.owners.length} owners`} readOnly />
                  </div>
                </div>
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    This Safe requires {mockSafeData.threshold} confirmations for any transaction to be executed.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
