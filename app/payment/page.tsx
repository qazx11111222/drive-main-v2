"use client"

import { useState, useEffect, Suspense } from "react"
import { use } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Calendar, Shield, User } from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { supabase } from "../../lib/supabaseClient"

function PaymentForm({ params }: { params: Promise<{}> }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [user, setUser] = useState<any>(null)

  // URLパラメータから予約情報を取得
  const carId = searchParams.get("carId")
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")
  const total = searchParams.get("total")

  // クレジットカード情報の状態
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardholderName, setCardholderName] = useState("")

  // バリデーションエラー
  const [errors, setErrors] = useState<{
    cardNumber?: string
    expiryDate?: string
    cvv?: string
    cardholderName?: string
  }>({})

  const [car, setCar] = useState({
    id: carId,
    name: "トヨタ プリウス",
    image: "/placeholder.svg?height=200&width=300",
    price: 5500,
  })

  // 車両データを取得
  useEffect(() => {
    const fetchVehicle = async () => {
      if (!carId) return
      
      try {
        const response = await fetch('/api/vehicles')
        const vehicles = await response.json()
        const vehicle = vehicles.find((v: any) => v.id === parseInt(carId))
        
        if (vehicle) {
          setCar({
            id: vehicle.id,
            name: vehicle.name,
            image: vehicle.image,
            price: vehicle.price,
          })
        }
      } catch (error) {
        console.error('Error fetching vehicle:', error)
      }
    }

    fetchVehicle()
  }, [carId])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  // カード番号のフォーマット
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  // 有効期限のフォーマット
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  // バリデーション
  const validateForm = () => {
    const newErrors: any = {}

    if (!cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) {
      newErrors.cardNumber = "16桁のカード番号を入力してください"
    }

    if (!expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
      newErrors.expiryDate = "MM/YY形式で入力してください"
    }

    if (!cvv.match(/^\d{3}$/)) {
      newErrors.cvv = "3桁のセキュリティコードを入力してください"
    }

    if (!cardholderName.match(/^[A-Za-z\s]+$/)) {
      newErrors.cardholderName = "英字のみで入力してください"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 決済処理
  const handlePayment = async () => {
    if (!validateForm()) return
    if (!agreedToTerms) {
      alert("利用規約に同意してください")
      return
    }

    setIsLoading(true)

    try {
      // クレジットカード情報をコンソールに出力（実際には送信しない）
      console.log("クレジットカード情報:", {
        cardNumber: cardNumber.replace(/\s/g, ""),
        expiryDate,
        cvv,
        cardholderName,
      })

      // Supabaseに予約情報を保存
      if (user) {
        const startDateObj = new Date(startDate || '')
        const endDateObj = new Date(endDate || '')
        
        const { error } = await supabase.from("reservations").insert([
          {
            user_id: user?.id,
            car_id: parseInt(carId || "0"),
            start_date: startDateObj.toISOString().split('T')[0],
            end_date: endDateObj.toISOString().split('T')[0],
            total_amount: parseInt(total || "0"),
            status: "confirmed",
          },
        ])

        if (error) {
          console.error("予約の保存に失敗しました:", error)
          alert("予約の保存に失敗しました")
          return
        }

        console.log("予約が正常に保存されました")
      } else {
        console.log("ユーザーがログインしていません")
      }

      // 成功時の処理
      router.push("/payment/success")
    } catch (error) {
      console.error("決済処理中にエラーが発生しました:", error)
      alert("決済処理中にエラーが発生しました")
    } finally {
      setIsLoading(false)
    }
  }

  if (!carId || !startDate || !endDate || !total) {
    return (
      <div className="min-h-screen bg-yanbaru-sand flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <p className="text-center text-gray-600">予約情報が見つかりません</p>
            <Link href="/cars">
              <Button className="w-full mt-4">車両一覧に戻る</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)
  const days = Math.ceil((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-yanbaru-sand">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 戻るボタン */}
        <Link href={`/cars/${carId}`} className="inline-flex items-center text-yanbaru-emerald hover:text-yanbaru-emerald/80 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          車両詳細に戻る
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 左側 - 予約内容確認 */}
          <div className="space-y-6">
            <Card className="border-yanbaru-emerald/20 bg-white">
              <CardHeader>
                <CardTitle className="text-xl">予約内容の確認</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 車両情報 */}
                <div className="flex items-center space-x-4">
                  <Image
                    src={car.image}
                    alt={car.name}
                    width={80}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{car.name}</h3>
                    <p className="text-sm text-gray-600">¥{car.price.toLocaleString()}/日</p>
                  </div>
                </div>

                <Separator />

                {/* 予約期間 */}
                <div className="space-y-2">
                  <h4 className="font-medium">予約期間</h4>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(startDateObj, "yyyy年MM月dd日", { locale: ja })} 〜 {format(endDateObj, "yyyy年MM月dd日", { locale: ja })}
                    </span>
                    <Badge variant="outline">{days}日間</Badge>
                  </div>
                </div>

                <Separator />

                {/* 料金内訳 */}
                <div className="space-y-2">
                  <h4 className="font-medium">料金内訳</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>基本料金 × {days}日</span>
                      <span>¥{(car.price * days).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>合計</span>
                      <span className="text-yanbaru-emerald">¥{parseInt(total).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右側 - クレジットカード情報 */}
          <div className="space-y-6">
            <Card className="border-yanbaru-emerald/20 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>クレジットカード情報</span>
                </CardTitle>
                <CardDescription>
                  決済情報を入力してください（実際の決済は行われません）
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                                 {/* カード番号 */}
                 <div className="space-y-2">
                   <Label htmlFor="cardNumber">カード番号</Label>
                   <Input
                     id="cardNumber"
                     type="text"
                     placeholder="カード番号を入力してください"
                     value={cardNumber}
                     onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                     maxLength={19}
                     className={errors.cardNumber ? "border-red-500" : ""}
                   />
                   {errors.cardNumber && <p className="text-sm text-red-500">{errors.cardNumber}</p>}
                 </div>

                {/* 有効期限とCVV */}
                <div className="grid grid-cols-2 gap-4">
                                     <div className="space-y-2">
                     <Label htmlFor="expiryDate">有効期限</Label>
                     <Input
                       id="expiryDate"
                       type="text"
                       placeholder="MM/YY"
                       value={expiryDate}
                       onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                       maxLength={5}
                       className={errors.expiryDate ? "border-red-500" : ""}
                     />
                     {errors.expiryDate && <p className="text-sm text-red-500">{errors.expiryDate}</p>}
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="cvv">セキュリティコード</Label>
                     <Input
                       id="cvv"
                       type="text"
                       placeholder="CVV"
                       value={cvv}
                       onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                       maxLength={3}
                       className={errors.cvv ? "border-red-500" : ""}
                     />
                     {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>}
                   </div>
                </div>

                                 {/* カード名義人 */}
                 <div className="space-y-2">
                   <Label htmlFor="cardholderName">カード名義人</Label>
                   <Input
                     id="cardholderName"
                     type="text"
                     placeholder="カードに記載されている名義人を入力"
                     value={cardholderName}
                     onChange={(e) => setCardholderName(e.target.value)}
                     className={errors.cardholderName ? "border-red-500" : ""}
                   />
                   {errors.cardholderName && <p className="text-sm text-red-500">{errors.cardholderName}</p>}
                 </div>

                {/* 規約同意 */}
                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox
                    id="paymentTerms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  />
                  <Label htmlFor="paymentTerms" className="text-sm cursor-pointer">
                    <Link href="/terms" className="text-yanbaru-emerald hover:underline">
                      利用規約
                    </Link>
                    および
                    <Link href="/privacy" className="text-yanbaru-emerald hover:underline">
                      プライバシーポリシー
                    </Link>
                    に同意します
                  </Label>
                </div>

                {/* 決済ボタン */}
                <Button
                  onClick={handlePayment}
                  disabled={isLoading || !agreedToTerms}
                  className="w-full bg-yanbaru-sunset hover:bg-yanbaru-sunset/90 text-white"
                >
                  {isLoading ? "処理中..." : "予約を確定"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentPage({ params }: { params: Promise<{}> }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentForm params={params} />
    </Suspense>
  )
} 