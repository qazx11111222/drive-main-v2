"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, MapPin, Phone, Mail } from "lucide-react"

export default function PaymentSuccessPage() {
  const reservationNumber = `YB${Date.now().toString().slice(-8)}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* 成功メッセージ */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="pt-8 pb-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                予約が完了しました！
              </h1>
              <p className="text-gray-600 mb-6">
                ご予約ありがとうございます。予約番号をお控えください。
              </p>
              <Badge variant="outline" className="text-lg px-4 py-2">
                予約番号: {reservationNumber}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* 予約詳細 */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              予約詳細
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">車両</h3>
                <p className="text-gray-600">トヨタ プリウス</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">利用期間</h3>
                <p className="text-gray-600">2024年1月15日 - 2024年1月17日</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">利用時間</h3>
                <p className="text-gray-600">10:00 - 18:00</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">料金</h3>
                <p className="text-gray-600">¥16,500</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 店舗情報 */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              店舗情報
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">やんばるドライブ 名護店</h3>
                <p className="text-gray-600 mb-2">
                  〒905-0011 沖縄県名護市名護1234-5
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    <span>0980-52-1234</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>info@yanbaru-drive.com</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">受取時のご注意</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 運転免許証とクレジットカードをご持参ください</li>
                  <li>• 受取時間の15分前にお越しください</li>
                  <li>• 車両の点検を行ってからお渡しします</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="flex-1">
            <Link href="/">
              トップページに戻る
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <Link href="/cars">
              他の車両を見る
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 