import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, MapPin, Star, Users, Calendar, Shield } from "lucide-react"

export default function HomePage() {
  const featuredCars = [
    {
      id: 1,
      name: "トヨタ プリウス",
      image: "/placeholder.svg?height=200&width=300",
      price: "¥5,500",
      passengers: 5,
      transmission: "AT",
      rating: 4.8,
      reviews: 24,
      available: 3,
    },
    {
      id: 2,
      name: "ホンダ フィット",
      image: "/placeholder.svg?height=200&width=300",
      price: "¥4,800",
      passengers: 5,
      transmission: "AT",
      rating: 4.6,
      reviews: 18,
      available: 2,
    },
    {
      id: 3,
      name: "日産 セレナ",
      image: "/placeholder.svg?height=200&width=300",
      price: "¥8,500",
      passengers: 8,
      transmission: "AT",
      rating: 4.9,
      reviews: 31,
      available: 1,
    },
  ]

  return (
    <div className="min-h-screen bg-yanbaru-sand">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yanbaru-emerald to-yanbaru-emerald/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              沖縄の美しい景色を
              <br />
              自由にドライブ
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90">やんばるの大自然を満喫できるレンタカーサービス</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cars">
                <Button size="lg" className="bg-yanbaru-sunset hover:bg-yanbaru-sunset/90 text-white">
                  <Car className="mr-2 h-5 w-5" />
                  車両を検索
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-yanbaru-emerald bg-transparent"
                >
                  今すぐ登録
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-yanbaru-charcoal mb-4">やんばるドライブの特徴</h3>
            <p className="text-lg text-yanbaru-charcoal/70">安心・安全・便利なレンタカーサービス</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-yanbaru-emerald/20 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-yanbaru-emerald mx-auto mb-4" />
                <CardTitle className="text-yanbaru-charcoal">安心の保険・補償</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yanbaru-charcoal/70 text-center">
                  充実した保険・補償制度で、安心してドライブをお楽しみいただけます。
                </p>
              </CardContent>
            </Card>
            <Card className="border-yanbaru-emerald/20 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Calendar className="h-12 w-12 text-yanbaru-emerald mx-auto mb-4" />
                <CardTitle className="text-yanbaru-charcoal">簡単予約システム</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yanbaru-charcoal/70 text-center">
                  24時間いつでもオンラインで予約可能。事前決済で当日はスムーズに出発。
                </p>
              </CardContent>
            </Card>
            <Card className="border-yanbaru-emerald/20 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <MapPin className="h-12 w-12 text-yanbaru-emerald mx-auto mb-4" />
                <CardTitle className="text-yanbaru-charcoal">地元密着サービス</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yanbaru-charcoal/70 text-center">
                  やんばる地域を知り尽くしたスタッフが、おすすめスポットをご案内します。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16 bg-yanbaru-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-yanbaru-charcoal mb-4">おすすめ車両</h3>
            <p className="text-lg text-yanbaru-charcoal/70">人気の車両をご紹介</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <Card
                key={car.id}
                className="overflow-hidden hover:shadow-lg transition-shadow bg-white border-yanbaru-emerald/20"
              >
                <div className="relative">
                  <Image
                    src={car.image || "/placeholder.svg"}
                    alt={car.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-yanbaru-emerald text-white">残り{car.available}台</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex justify-between items-start text-yanbaru-charcoal">
                    <span>{car.name}</span>
                    <span className="text-yanbaru-emerald font-bold">{car.price}/日</span>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 text-yanbaru-charcoal/70">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {car.passengers}人乗り
                    </span>
                    <span>{car.transmission}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yanbaru-sunset text-yanbaru-sunset" />
                      <span className="font-semibold text-yanbaru-charcoal">{car.rating}</span>
                      <span className="text-yanbaru-charcoal/60">({car.reviews}件)</span>
                    </div>
                    <Link href={`/cars/${car.id}`}>
                      <Button size="sm" className="bg-yanbaru-sunset hover:bg-yanbaru-sunset/90 text-white">
                        詳細を見る
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/cars">
              <Button
                variant="outline"
                size="lg"
                className="border-yanbaru-emerald text-yanbaru-emerald hover:bg-yanbaru-emerald hover:text-white bg-transparent"
              >
                すべての車両を見る
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-16 bg-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-yanbaru-charcoal mb-4">お知らせ</h3>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            <Card className="border-yanbaru-emerald/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Badge variant="secondary" className="bg-yanbaru-emerald/10 text-yanbaru-emerald">
                    2024/01/15
                  </Badge>
                  <div>
                    <h4 className="font-semibold mb-2 text-yanbaru-charcoal">春のキャンペーン開始！</h4>
                    <p className="text-yanbaru-charcoal/70">3月末まで全車種20%オフでご利用いただけます。</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-yanbaru-emerald/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Badge variant="secondary" className="bg-yanbaru-emerald/10 text-yanbaru-emerald">
                    2024/01/10
                  </Badge>
                  <div>
                    <h4 className="font-semibold mb-2 text-yanbaru-charcoal">新車両追加のお知らせ</h4>
                    <p className="text-yanbaru-charcoal/70">人気のハイブリッド車を新たに3台追加いたしました。</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-yanbaru-sand" id="contact">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-yanbaru-charcoal mb-4">お問い合わせ</h3>
            <p className="text-lg text-yanbaru-charcoal/70">ご質問・ご相談はお気軽にご連絡ください。</p>
          </div>
          <div className="bg-white rounded-lg shadow p-8">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-yanbaru-charcoal font-semibold mb-1">お名前</label>
                <input type="text" id="name" name="name" className="w-full border border-yanbaru-emerald/30 rounded px-3 py-2" />
              </div>
              <div>
                <label htmlFor="email" className="block text-yanbaru-charcoal font-semibold mb-1">メールアドレス</label>
                <input type="email" id="email" name="email" className="w-full border border-yanbaru-emerald/30 rounded px-3 py-2" />
              </div>
              <div>
                <label htmlFor="message" className="block text-yanbaru-charcoal font-semibold mb-1">お問い合わせ内容</label>
                <textarea id="message" name="message" rows={4} className="w-full border border-yanbaru-emerald/30 rounded px-3 py-2" />
              </div>
              <Button type="submit" className="bg-yanbaru-emerald hover:bg-yanbaru-emerald/90 text-white w-full">送信</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-yanbaru-emerald text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-lg">やんばるドライブ株式会社</span>
            <span className="ml-4 text-white/70">沖縄県名護市○○○-○○</span>
          </div>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-yanbaru-sunset transition-colors">会社概要</a>
            <a href="#" className="hover:text-yanbaru-sunset transition-colors">お問い合わせ</a>
            <a href="#" className="hover:text-yanbaru-sunset transition-colors">プライバシーポリシー</a>
          </div>
          <div className="text-white/60 text-sm">&copy; {new Date().getFullYear()} Yanbaru Drive Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
