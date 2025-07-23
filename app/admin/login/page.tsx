"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Shield } from "lucide-react"
import Image from "next/image"

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle admin login logic here
    console.log("Admin login submitted")
  }

  return (
    <div className="min-h-screen bg-yanbaru-sand">
      {/* Header */}
      <header className="bg-yanbaru-emerald shadow-sm border-b border-yanbaru-emerald/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="やんばるドライブ ロゴ" width={32} height={32} className="rounded" />
              <h1 className="text-2xl font-bold text-white">やんばるドライブ</h1>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/cars" className="text-white/80 hover:text-white transition-colors">
                車両一覧
              </Link>
              <Link href="/login" className="text-white/80 hover:text-white transition-colors">
                お客様ログイン
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto py-12 px-4">
        <Card className="border-yanbaru-emerald/20 shadow-lg bg-white">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-yanbaru-emerald/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-yanbaru-emerald" />
            </div>
            <CardTitle className="text-2xl text-yanbaru-charcoal">オーナー管理画面</CardTitle>
            <CardDescription className="text-yanbaru-charcoal/70">
              管理者アカウントでログインしてください
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">管理者ID</Label>
                  <Input id="email" type="email" placeholder="admin@yanbaru-drive.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">パスワード</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="管理者パスワードを入力"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    ログイン状態を保持
                  </Label>
                </div>
                <Link href="/admin/forgot-password" className="text-sm text-yanbaru-emerald hover:underline">
                  パスワードを忘れた方
                </Link>
              </div>

              <Button type="submit" className="w-full bg-yanbaru-emerald hover:bg-yanbaru-emerald/90 text-white">
                管理画面にログイン
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">お客様はこちら</p>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-yanbaru-emerald text-yanbaru-emerald hover:bg-yanbaru-emerald hover:text-white"
                  >
                    お客様ログイン画面へ
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yanbaru-sunset/10 border border-yanbaru-sunset/20 rounded-lg">
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-yanbaru-sunset mt-0.5" />
                <div className="text-sm text-yanbaru-charcoal">
                  <p className="font-semibold mb-1">セキュリティについて</p>
                  <p>
                    管理画面は認証されたオーナー様のみアクセス可能です。不正アクセスは記録され、法的措置の対象となります。
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
