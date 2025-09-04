"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  Send,
  Download,
  Users,
  Settings,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  ExternalLink,
} from "lucide-react"

interface Transaction {
  id: string
  type: "send" | "receive"
  amount: string
  token: string
  to?: string
  from?: string
  status: "pending" | "executed" | "failed"
  confirmations: number
  requiredConfirmations: number
  timestamp: string
}

interface SafeModule {
  id: string
  name: string
  description: string
  enabled: boolean
  version: string
}

export function SafeDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [safeAddress] = useState("0x1234...5678")
  const [balance] = useState("12.5")

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "send",
      amount: "2.5",
      token: "ETH",
      to: "0xabcd...efgh",
      status: "pending",
      confirmations: 2,
      requiredConfirmations: 3,
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      type: "receive",
      amount: "5.0",
      token: "USDC",
      from: "0x9876...5432",
      status: "executed",
      confirmations: 3,
      requiredConfirmations: 3,
      timestamp: "1 day ago",
    },
  ]

  const modules: SafeModule[] = [
    {
      id: "1",
      name: "Daily Limit Module",
      description: "Set daily spending limits for Safe owners",
      enabled: true,
      version: "1.0.0",
    },
    {
      id: "2",
      name: "Social Recovery Module",
      description: "Recover Safe access through trusted guardians",
      enabled: false,
      version: "1.2.0",
    },
    {
      id: "3",
      name: "Recurring Payments Module",
      description: "Automate recurring transactions",
      enabled: true,
      version: "1.1.0",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-muted-foreground" />
      case "executed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Safe Wallet</h1>
            <p className="text-sm text-muted-foreground">Multi-signature wallet management</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="font-mono">
            {safeAddress}
          </Badge>
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Balance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="h-5 w-5" />
            <span>Safe Balance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-foreground">{balance} ETH</p>
              <p className="text-sm text-muted-foreground">≈ $23,450.00 USD</p>
            </div>
            <div className="flex space-x-2">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Receive
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Safe Owners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-2xl font-bold">3</span>
                  <span className="text-sm text-muted-foreground">of 5</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Required confirmations: 3</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="text-2xl font-bold text-accent">2</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Awaiting confirmations</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Active Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <span className="text-2xl font-bold">2</span>
                  <span className="text-sm text-muted-foreground">enabled</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">3 total available</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest Safe transactions and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.slice(0, 3).map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {tx.type === "send" ? (
                        <ArrowUpRight className="h-4 w-4 text-destructive" />
                      ) : (
                        <ArrowDownLeft className="h-4 w-4 text-green-500" />
                      )}
                      <div>
                        <p className="font-medium text-sm">
                          {tx.type === "send" ? "Send" : "Receive"} {tx.amount} {tx.token}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {tx.type === "send" ? `To: ${tx.to}` : `From: ${tx.from}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(tx.status)}
                      <Badge variant={tx.status === "executed" ? "default" : "secondary"}>
                        {tx.confirmations}/{tx.requiredConfirmations}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Complete transaction history for this Safe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {tx.type === "send" ? (
                        <ArrowUpRight className="h-5 w-5 text-destructive" />
                      ) : (
                        <ArrowDownLeft className="h-5 w-5 text-green-500" />
                      )}
                      <div>
                        <p className="font-medium">
                          {tx.type === "send" ? "Send" : "Receive"} {tx.amount} {tx.token}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {tx.type === "send" ? `To: ${tx.to}` : `From: ${tx.from}`} • {tx.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {tx.confirmations}/{tx.requiredConfirmations} confirmations
                        </p>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(tx.status)}
                          <span className="text-xs capitalize text-muted-foreground">{tx.status}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Safe Modules</h3>
              <p className="text-sm text-muted-foreground">Extend your Safe with additional functionality</p>
            </div>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Module
            </Button>
          </div>

          <div className="grid gap-4">
            {modules.map((module) => (
              <Card key={module.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">{module.name}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={module.enabled ? "default" : "secondary"}>v{module.version}</Badge>
                      <Badge variant={module.enabled ? "default" : "outline"}>
                        {module.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {module.enabled ? "Module is active and running" : "Module is not currently active"}
                    </p>
                    <Button variant={module.enabled ? "destructive" : "default"} size="sm">
                      {module.enabled ? "Disable" : "Enable"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Safe Configuration</CardTitle>
              <CardDescription>Manage your Safe settings and security parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="safe-name">Safe Name</Label>
                <Input id="safe-name" placeholder="My Safe Wallet" />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Security Settings</h4>
                <div className="space-y-2">
                  <Label htmlFor="threshold">Required Confirmations</Label>
                  <Input id="threshold" type="number" min="1" max="5" defaultValue="3" />
                  <p className="text-xs text-muted-foreground">
                    Number of owner confirmations required to execute transactions
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Owners Management</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">0x1234...5678</p>
                      <p className="text-xs text-muted-foreground">Owner (You)</p>
                    </div>
                    <Badge>Owner</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">0xabcd...efgh</p>
                      <p className="text-xs text-muted-foreground">Owner</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Owner
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
