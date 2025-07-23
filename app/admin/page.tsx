"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Car,
  CalendarIcon,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  MessageSquare,
  TrendingUp,
  Settings,
  BarChart3,
} from "lucide-react"
import Image from "next/image"

export default function AdminDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  // Mock data
  const stats = {
    totalBookings: 45,
    totalRevenue: 247500,
    availableCars: 8,
    totalCars: 12,
  }

  const recentBookings = [
    {
      id: 1,
      customerName: "田中太郎",
      carName: "トヨタ プリウス",
      startDate: "2024/01/20",
      endDate: "2024/01/22",
      status: "confirmed",
      amount: 11000,
    },
    {
      id: 2,
      customerName: "佐藤花子",
      carName: "ホンダ フィット",
      startDate: "2024/01/21",
      endDate: "2024/01/23",
      status: "pending",
      amount: 9600,
    },
    {
      id: 3,
      customerName: "山田次郎",
      carName: "日産 セレナ",
      startDate: "2024/01/19",
      endDate: "2024/01/21",
      status: "completed",
      amount: 17000,
    },
  ]

  const cars = [
    {
      id: 1,
      name: "トヨタ プリウス",
      totalUnits: 3,
      availableUnits: 2,
      bookingsToday: 1,
      revenue: 55000,
    },
    {
      id: 2,
      name: "ホンダ フィット",
      totalUnits: 2,
      availableUnits: 1,
      bookingsToday: 1,
      revenue: 38400,
    },
    {
      id: 3,
      name: "日産 セレナ",
      totalUnits: 2,
      availableUnits: 2,
      bookingsToday: 0,
      revenue: 68000,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-yanbaru-emerald text-white">確定</Badge>
      case "pending":
        return <Badge variant="secondary">保留中</Badge>
      case "completed":
        return <Badge className="bg-yanbaru-sunset text-white">完了</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-yanbaru-sand">
      {/* Header */}
      <header className="bg-yanbaru-emerald shadow-sm border-b border-yanbaru-emerald/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="やんばるドライブ ロゴ" width={32} height={32} className="rounded" />
              <h1 className="text-2xl font-bold text-white">やんばるドライブ 管理画面</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                <MessageSquare className="h-4 w-4 mr-2" />
                メッセージ
              </Button>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                <Settings className="h-4 w-4 mr-2" />
                設定
              </Button>
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-white hover:bg-white hover:text-yanbaru-emerald bg-transparent"
                >
                  サイトを見る
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-yanbaru-emerald/20 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今月の予約数</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-yanbaru-emerald/20 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">今月の売上</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥{stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-yanbaru-emerald/20 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">利用可能車両</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.availableCars}/{stats.totalCars}
              </div>
              <p className="text-xs text-muted-foreground">現在利用可能</p>
            </CardContent>
          </Card>

          <Card className="border-yanbaru-emerald/20 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">稼働率</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67%</div>
              <p className="text-xs text-muted-foreground">今月の平均稼働率</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Bookings */}
            <Card className="border-yanbaru-emerald/20 bg-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>最近の予約</CardTitle>
                  <CardDescription>直近の予約状況</CardDescription>
                </div>
                <Button size="sm">すべて見る</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{booking.customerName}</span>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="text-sm text-gray-600">{booking.carName}</div>
                        <div className="text-sm text-gray-500">
                          {booking.startDate} - {booking.endDate}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">¥{booking.amount.toLocaleString()}</div>
                        <Button variant="ghost" size="sm">
                          詳細
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Car Management */}
            <Card className="border-yanbaru-emerald/20 bg-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>車両管理</CardTitle>
                  <CardDescription>車両の状況と管理</CardDescription>
                </div>
                <Button size="sm" className="gap-2 bg-yanbaru-emerald hover:bg-yanbaru-emerald/90 text-white">
                  <Plus className="h-4 w-4" />
                  車両追加
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cars.map((car) => (
                    <div key={car.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-semibold">{car.name}</div>
                        <div className="text-sm text-gray-600">
                          総台数: {car.totalUnits}台 | 利用可能: {car.availableUnits}台
                        </div>
                        <div className="text-sm text-gray-500">今日の予約: {car.bookingsToday}件</div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="font-semibold">¥{car.revenue.toLocaleString()}</div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card className="border-yanbaru-emerald/20 bg-white">
              <CardHeader>
                <CardTitle>予約カレンダー</CardTitle>
                <CardDescription>日別の予約状況</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-yanbaru-emerald/20 bg-white">
              <CardHeader>
                <CardTitle>クイックアクション</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start gap-2 bg-yanbaru-sunset hover:bg-yanbaru-sunset/90 text-white">
                  <Plus className="h-4 w-4" />
                  新しい車両を追加
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <Settings className="h-4 w-4" />
                  料金設定を変更
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <MessageSquare className="h-4 w-4" />
                  顧客メッセージ確認
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <BarChart3 className="h-4 w-4" />
                  売上レポート
                </Button>
              </CardContent>
            </Card>

            {/* Price Settings */}
            <Card className="border-yanbaru-emerald/20 bg-white">
              <CardHeader>
                <CardTitle>料金設定</CardTitle>
                <CardDescription>動的料金設定</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>繁忙期料金倍率</Label>
                  <Select defaultValue="1.2">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.0">1.0倍（通常料金）</SelectItem>
                      <SelectItem value="1.2">1.2倍</SelectItem>
                      <SelectItem value="1.5">1.5倍</SelectItem>
                      <SelectItem value="2.0">2.0倍</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>閑散期料金倍率</Label>
                  <Select defaultValue="0.8">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.6">0.6倍</SelectItem>
                      <SelectItem value="0.8">0.8倍</SelectItem>
                      <SelectItem value="1.0">1.0倍（通常料金）</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button size="sm" className="w-full">
                  設定を保存
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
