"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Eye, EyeOff } from "lucide-react"
import { supabase } from '../../lib/supabaseClient';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [licenseFile, setLicenseFile] = useState<File | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [showModal, setShowModal] = useState(false);

  // 入力値の管理
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // エラー管理
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState("");

  const handleLicenseUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLicenseFile(file)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    let newErrors: any = {};
    if (!lastName) newErrors.lastName = "姓を入力してください";
    if (!firstName) newErrors.firstName = "名を入力してください";
    if (!email) newErrors.email = "メールアドレスを入力してください";
    if (!phone) newErrors.phone = "電話番号を入力してください";
    if (!password) newErrors.password = "パスワードを入力してください";
    if (!confirmPassword) newErrors.confirmPassword = "パスワード確認を入力してください";
    if (password && confirmPassword && password !== confirmPassword) newErrors.confirmPassword = "パスワードが一致しません";
    if (!licenseFile) newErrors.license = "運転免許証をアップロードしてください";
    if (!agreedToTerms) newErrors.terms = "利用規約に同意してください";
    setErrors(newErrors);
    setSuccess("");
    if (Object.keys(newErrors).length > 0) return;
    // Supabase登録例（usersテーブルに保存）
    const { error } = await supabase.from("users").insert([
      { name: lastName + firstName, email, password, phone }
    ]);
    if (error) {
      setErrors({ submit: "登録に失敗しました: " + error.message });
    } else {
      setSuccess("登録が完了しました！");
      setShowModal(true);
      setLastName(""); setFirstName(""); setEmail(""); setPhone(""); setPassword(""); setConfirmPassword(""); setLicenseFile(null); setAgreedToTerms(false);
      setErrors({});
    }
  }

  return (
    <div className="min-h-screen bg-yanbaru-sand">
      <div className="max-w-md mx-auto py-12 px-4">
        <Card className="border-yanbaru-emerald/20 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-yanbaru-charcoal">新規会員登録</CardTitle>
            <CardDescription className="text-yanbaru-charcoal/70">
              やんばるドライブへようこそ！アカウントを作成してください。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 基本情報 */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lastName">姓 *</Label>
                    <Input id="lastName" placeholder="山田" required value={lastName} onChange={e => setLastName(e.target.value)} />
                    {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">名 *</Label>
                    <Input id="firstName" placeholder="太郎" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                    {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス *</Label>
                  <Input id="email" type="email" placeholder="example@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
                  {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">電話番号 *</Label>
                  <Input id="phone" type="tel" placeholder="090-1234-5678" required value={phone} onChange={e => setPhone(e.target.value)} />
                  {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">パスワード *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="8文字以上で入力してください"
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
                  {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">パスワード確認 *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="パスワードを再入力してください"
                      required
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* 運転免許証アップロード */}
              <div className="space-y-2">
                <Label htmlFor="license">運転免許証 *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    id="license"
                    type="file"
                    accept="image/*"
                    onChange={handleLicenseUpload}
                    className="hidden"
                    required
                  />
                  <label htmlFor="license" className="cursor-pointer">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    {licenseFile ? (
                      <p className="text-sm text-green-600">{licenseFile.name} がアップロードされました</p>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">運転免許証の写真をアップロードしてください</p>
                        <p className="text-xs text-gray-500">JPG, PNG形式（最大5MB）</p>
                      </div>
                    )}
                  </label>
                  {errors.license && <p className="text-red-600 text-xs mt-1">{errors.license}</p>}
                </div>
              </div>

              {/* 利用規約同意 */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  />
                  <div className="text-sm">
                    <label htmlFor="terms" className="cursor-pointer">
                      <Link href="/terms" className="text-yanbaru-emerald hover:underline">
                        利用規約
                      </Link>
                      および
                      <Link href="/privacy" className="text-yanbaru-emerald hover:underline">
                        プライバシーポリシー
                      </Link>
                      に同意します *
                    </label>
                  </div>
                </div>
                {errors.terms && <p className="text-red-600 text-xs mt-1">{errors.terms}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-yanbaru-sunset hover:bg-yanbaru-sunset/90 text-white"
                disabled={!agreedToTerms}
              >
                アカウントを作成
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                すでにアカウントをお持ちですか？{" "}
                <Link href="/login" className="text-yanbaru-emerald hover:underline">
                  ログイン
                </Link>
              </p>
            </div>
            {errors.submit && <p className="text-red-600 text-xs mt-4">{errors.submit}</p>}
            {success && (
              <div className="mt-6 text-center">
                <p className="text-green-600 text-base mt-4">{success}</p>
                <Link href="/">
                  <Button className="mt-4 bg-yanbaru-emerald text-white">トップページに戻る</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {/* モーダル表示 */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg text-center">
            <p className="text-green-600 text-lg mb-4">登録が完了しました！</p>
            <Link href="/">
              <Button className="bg-yanbaru-emerald text-white">OK</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
