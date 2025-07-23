"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  // オーナー判定用リスト
  const OWNER_EMAILS = ["admin@yanbaru-drive.com", "owner@example.com"];
  const OWNER_PHONES = ["090-1234-5678", "080-0000-0000"];
  const OWNER_PASSWORD = "yanbaruadmin";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    // 入力値でオーナー判定
    const isOwner = (OWNER_EMAILS.includes(email) || OWNER_PHONES.includes(email)) && password === OWNER_PASSWORD;
    setTimeout(() => {
      if (isOwner) {
        router.push("/admin");
      } else {
        router.push(redirect);
      }
    }, 1000);
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg text-center">
            <p className="text-yanbaru-emerald text-lg mb-4">ログイン中...</p>
          </div>
        </div>
      )}
      {/* 通常のログインフォーム */}
      <div className="min-h-screen bg-yanbaru-sand">
        <div className="max-w-md mx-auto py-12 px-4">
          <Card className="border-yanbaru-emerald/20 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-yanbaru-charcoal">ログイン</CardTitle>
              <CardDescription className="text-yanbaru-charcoal/70">アカウントにログインしてください</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">メールアドレスまたは電話番号</Label>
                    <Input id="email" type="text" placeholder="example@email.com または 090-xxxx-xxxx" required value={email} onChange={e => setEmail(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">パスワード</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="パスワードを入力してください"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
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
                  <Link href="/forgot-password" className="text-sm text-yanbaru-emerald hover:underline">
                    パスワードを忘れた方
                  </Link>
                </div>

                <Button type="submit" className="w-full bg-yanbaru-emerald hover:bg-yanbaru-emerald/90 text-white">
                  ログイン
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">または</span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    アカウントをお持ちでない方は{" "}
                    <Link href="/register" className="text-yanbaru-emerald hover:underline">
                      新規登録
                    </Link>
                  </p>
                </div>
              </div>

              {/* オーナー向けログイン */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">オーナー様はこちら</p>
                  <Link href="/admin/login">
                    <Button
                      variant="outline"
                      className="w-full bg-transparent border-yanbaru-emerald text-yanbaru-emerald hover:bg-yanbaru-emerald hover:text-white"
                    >
                      オーナー管理画面へ
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
