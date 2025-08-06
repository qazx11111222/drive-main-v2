"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  Star,
  Heart,
  MapPin,
  CalendarIcon,
  Shield,
  Wifi,
  Navigation,
  Camera,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { supabase } from "../../../lib/supabaseClient"
import CustomCalendar from "../../components/CustomCalendar"
import { useAuth } from "../../contexts/AuthContext"

export default function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const { user, loading } = useAuth()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [startTime, setStartTime] = useState("10:00")
  const [endTime, setEndTime] = useState("18:00")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [startDateOpen, setStartDateOpen] = useState(false)
  const [endDateOpen, setEndDateOpen] = useState(false)

  const [car, setCar] = useState({
    id: Number.parseInt(resolvedParams.id),
    name: "トヨタ プリウス",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    price: 5500,
    passengers: 5,
    transmission: "AT",
    rating: 4.8,
    reviews: 24,
    available: 3,
    location: "名護店",
    description:
      "燃費性能に優れたハイブリッド車です。静かで快適な乗り心地で、沖縄の美しい景色をゆったりとお楽しみいただけます。",
    features: [
      { icon: <Wifi className="h-4 w-4" />, name: "カーナビ" },
      { icon: <Shield className="h-4 w-4" />, name: "ETC" },
      { icon: <Camera className="h-4 w-4" />, name: "バックカメラ" },
      { icon: <Navigation className="h-4 w-4" />, name: "ハイブリッド" },
    ],
    specifications: {
      fuel: "ハイブリッド",
      engine: "1.8L",
      doors: "5ドア",
      luggage: "大",
    },
  })

  // 車両データを取得
  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch('/api/vehicles')
        const vehicles = await response.json()
        const vehicle = vehicles.find((v: any) => v.id === resolvedParams.id)
        
        if (vehicle) {
          console.log('Fetched vehicle:', vehicle)
          console.log('Vehicle image URL:', vehicle.image)
          
          setCar({
            id: vehicle.id,
            name: vehicle.name,
            images: [vehicle.image || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop"], // 1枚の画像のみ
            price: vehicle.price,
            passengers: vehicle.passengers,
            transmission: vehicle.transmission,
            rating: vehicle.rating,
            reviews: vehicle.reviews,
            available: vehicle.available,
            location: vehicle.location || "名護店",
            description: vehicle.description || "燃費性能に優れたハイブリッド車です。静かで快適な乗り心地で、沖縄の美しい景色をゆったりとお楽しみいただけます。",
            features: [
              { icon: <Wifi className="h-4 w-4" />, name: "カーナビ" },
              { icon: <Shield className="h-4 w-4" />, name: "ETC" },
              { icon: <Camera className="h-4 w-4" />, name: "バックカメラ" },
              { icon: <Navigation className="h-4 w-4" />, name: "ハイブリッド" },
            ],
            specifications: {
              fuel: vehicle.fuel_type || "ハイブリッド",
              engine: vehicle.engine_size || "1.8L",
              doors: `${vehicle.doors || 5}ドア`,
              luggage: vehicle.luggage_size || "大",
            },
          })
        }
      } catch (error) {
        console.error('Error fetching vehicle:', error)
      }
    }

    fetchVehicle()
  }, [resolvedParams.id])

  const options = [
    { id: "child-seat", name: "チャイルドシート", price: 500 },
    { id: "insurance-upgrade", name: "免責補償アップグレード", price: 1000 },
    { id: "wifi-router", name: "Wi-Fiルーター", price: 300 },
    { id: "snow-chains", name: "スノーチェーン", price: 800 },
  ]

  const [reviews, setReviews] = useState<Array<{
    id: number
    user: string
    rating: number
    date: string
    comment: string
  }>>([])
  const [reviewsLoading, setReviewsLoading] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
      rating: 5,
    comment: ''
  })

  // デバッグ用：newReviewの状態変化を監視
  useEffect(() => {
    console.log('newReview state changed:', newReview)
  }, [newReview])
  const [submittingReview, setSubmittingReview] = useState(false)

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const basePrice = car.price * days
    const optionsPrice = selectedOptions.reduce((total, optionId) => {
      const option = options.find((opt) => opt.id === optionId)
      return total + (option ? option.price * days : 0)
    }, 0)

    return basePrice + optionsPrice
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length)
  }

  const toggleOption = (optionId: string) => {
    setSelectedOptions((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]))
  }

  // レビューデータを取得
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setReviewsLoading(true)
        const response = await fetch(`/api/reviews?vehicleId=${resolvedParams.id}`)
        if (response.ok) {
          const reviewsData = await response.json()
          setReviews(reviewsData)
        } else {
          console.error('Failed to fetch reviews')
          // フォールバックとしてデフォルトのレビューを設定
          setReviews([
            {
              id: 1,
              user: "田中さん",
              rating: 5,
              date: "2024/01/10",
              comment: "とても綺麗な車で、燃費も良く快適でした。スタッフの対応も丁寧で満足です。",
            },
            {
              id: 2,
              user: "佐藤さん",
              rating: 4,
              date: "2024/01/05",
              comment: "カーナビが使いやすく、初めての沖縄旅行でも安心して運転できました。",
            },
            {
              id: 3,
              user: "山田さん",
              rating: 5,
              date: "2023/12/28",
              comment: "家族4人でちょうど良いサイズでした。また利用したいと思います。",
            },
          ])
        }
      } catch (error) {
        console.error('Error fetching reviews:', error)
        // エラー時もデフォルトのレビューを設定
        setReviews([
          {
            id: 1,
            user: "田中さん",
            rating: 5,
            date: "2024/01/10",
            comment: "とても綺麗な車で、燃費も良く快適でした。スタッフの対応も丁寧で満足です。",
          },
          {
            id: 2,
            user: "佐藤さん",
            rating: 4,
            date: "2024/01/05",
            comment: "カーナビが使いやすく、初めての沖縄旅行でも安心して運転できました。",
          },
          {
            id: 3,
            user: "山田さん",
            rating: 5,
            date: "2023/12/28",
            comment: "家族4人でちょうど良いサイズでした。また利用したいと思います。",
          },
        ])
      } finally {
        setReviewsLoading(false)
      }
    }
    fetchReviews()
  }, [resolvedParams.id])

  // レビュー投稿
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitting review - User state:', user)
    
    if (!newReview.comment.trim()) {
      alert('コメントを入力してください')
      return
    }

    setSubmittingReview(true)
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vehicleId: resolvedParams.id,
          userId: user?.id || null, // ログインしていない場合はnull
          rating: newReview.rating,
          comment: newReview.comment.trim()
        })
      })

      if (response.ok) {
        // レビューを再取得
        const reviewsResponse = await fetch(`/api/reviews?vehicleId=${resolvedParams.id}`)
        if (reviewsResponse.ok) {
          const reviewsData = await reviewsResponse.json()
          setReviews(reviewsData)
        }
        
        setNewReview({ rating: 5, comment: '' })
        setShowReviewForm(false)
        alert('レビューを投稿しました')
      } else {
        const errorData = await response.json()
        console.error('Review submission error:', errorData)
        alert(`レビューの投稿に失敗しました: ${errorData.error || '不明なエラー'}`)
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('レビューの投稿に失敗しました')
    } finally {
      setSubmittingReview(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!startDate || !endDate) {
      alert("日付を選択してください")
      return
    }

    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)
    const days = Math.ceil((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24))

    const { error } = await supabase.from("reservations").insert([
      {
        user_id: user?.id,
        car_id: car.id,
        start_date: startDateObj.toISOString().split('T')[0],
        end_date: endDateObj.toISOString().split('T')[0],
        total_amount: calculateTotal(),
        status: "pending",
      }
    ])
    
    if (error) {
      console.error("予約に失敗しました: " + error.message)
      alert("予約に失敗しました: " + error.message)
    } else {
      console.log("予約が完了しました！")
      setStartDate(undefined)
      setEndDate(undefined)
      setSelectedOptions([])
      alert("予約が完了しました！")
    }
  }

  return (
    <div className="min-h-screen bg-yanbaru-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-yanbaru-charcoal/70 mb-6">
          <Link href="/" className="hover:text-yanbaru-charcoal">
            ホーム
          </Link>
          <span>/</span>
          <Link href="/cars" className="hover:text-yanbaru-charcoal">
            車両一覧
          </Link>
          <span>/</span>
          <span className="text-yanbaru-charcoal">{car.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Car Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car Images */}
            <Card className="border-yanbaru-emerald/20 bg-white">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={car.images[0] || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop"}
                    alt={car.name}
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover rounded-t-lg"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop"
                    }}
                  />
                  <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Car Info */}
            <Card className="border-yanbaru-emerald/20 bg-white">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{car.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <MapPin className="h-4 w-4" />
                      {car.location}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={car.available > 0 ? "default" : "destructive"}
                    className={car.available > 0 ? "bg-yanbaru-emerald text-white" : ""}
                  >
                    {car.available > 0 ? `残り${car.available}台` : "満車"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{car.description}</p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yanbaru-sunset text-yanbaru-sunset" />
                    <span className="font-semibold">{car.rating}</span>
                    <span className="text-gray-500">({reviews.length}件のレビュー)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{car.passengers}人乗り</span>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">{car.transmission}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {feature.icon}
                      <span>{feature.name}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">燃料</span>
                    <div className="font-semibold">{car.specifications.fuel}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">エンジン</span>
                    <div className="font-semibold">{car.specifications.engine}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">ドア数</span>
                    <div className="font-semibold">{car.specifications.doors}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">荷物</span>
                    <div className="font-semibold">{car.specifications.luggage}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="border-yanbaru-emerald/20 bg-white">
              <CardHeader>
                <div className="flex justify-between items-center">
                <CardTitle>レビュー ({reviews.length}件)</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="text-yanbaru-emerald border-yanbaru-emerald hover:bg-yanbaru-emerald hover:text-white"
                  >
                    {showReviewForm ? 'キャンセル' : 'レビューを投稿'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviewsLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yanbaru-emerald mx-auto"></div>
                    <p className="text-gray-500 mt-2">レビューを読み込み中...</p>
                  </div>
                ) : reviews.length > 0 ? (
                  reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.user}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">まだレビューがありません</p>
                  </div>
                )}

                                {/* レビュー投稿フォーム */}
                {showReviewForm && (
                  <div className="border-t pt-4 mt-4">
                    <form onSubmit={handleReviewSubmit} className="space-y-4">

                      <div>
                        <Label htmlFor="rating" className="text-sm font-medium">
                          評価
                        </Label>
                        <div className="flex items-center gap-2 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => {
                                console.log('Rating clicked:', star)
                                setNewReview(prev => ({ ...prev, rating: star }))
                              }}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`h-5 w-5 ${
                                  star <= newReview.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="comment" className="text-sm font-medium">
                          コメント
                        </Label>
                        <textarea
                          id="comment"
                          value={newReview.comment}
                          onChange={(e) => {
                            console.log('Comment onChange:', e.target.value)
                            setNewReview(prev => ({ ...prev, comment: e.target.value }))
                          }}
                          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yanbaru-emerald focus:border-transparent"
                          rows={3}
                          placeholder="この車両についての感想を教えてください..."
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          type="submit"
                          disabled={submittingReview}
                          className="bg-yanbaru-emerald hover:bg-yanbaru-emerald/90 text-white"
                        >
                          {submittingReview ? '投稿中...' : 'レビューを投稿'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowReviewForm(false)}
                          disabled={submittingReview}
                        >
                          キャンセル
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking */}
          <div className="space-y-6">
            <Card className="sticky top-4 border-yanbaru-emerald/20 bg-white">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>予約・料金</span>
                  <span className="text-2xl text-yanbaru-emerald">¥{car.price.toLocaleString()}/日</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>利用開始日</Label>
                    <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "MM/dd", { locale: ja }) : "選択"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <div className="p-3">
                          <CustomCalendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          disabled={(date) => date < new Date()}
                        />
                          <div className="flex justify-end mt-3">
                            <Button 
                              size="sm" 
                              onClick={() => setStartDateOpen(false)}
                              className="bg-yanbaru-emerald hover:bg-yanbaru-emerald/90 text-white"
                            >
                              決定
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>返却日</Label>
                    <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "MM/dd", { locale: ja }) : "選択"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <div className="p-3">
                          <CustomCalendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => date < (startDate || new Date())}
                        />
                          <div className="flex justify-end mt-3">
                            <Button 
                              size="sm" 
                              onClick={() => setEndDateOpen(false)}
                              className="bg-yanbaru-emerald hover:bg-yanbaru-emerald/90 text-white"
                            >
                              決定
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Time Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>開始時間</Label>
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => {
                          const hour = i + 8
                          const time = `${hour.toString().padStart(2, "0")}:00`
                          return (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>返却時間</Label>
                    <Select value={endTime} onValueChange={setEndTime}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => {
                          const hour = i + 8
                          const time = `${hour.toString().padStart(2, "0")}:00`
                          return (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-2">
                  <Label>オプション</Label>
                  <div className="space-y-2">
                    {options.map((option) => (
                      <div key={option.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={option.id}
                            checked={selectedOptions.includes(option.id)}
                            onCheckedChange={() => toggleOption(option.id)}
                          />
                          <Label htmlFor={option.id} className="text-sm cursor-pointer">
                            {option.name}
                          </Label>
                        </div>
                        <span className="text-sm text-gray-600">+¥{option.price}/日</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                {startDate && endDate && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        基本料金 × {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))}日
                      </span>
                      <span>
                        ¥
                        {(
                          car.price * Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
                        ).toLocaleString()}
                      </span>
                    </div>
                    {selectedOptions.length > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>オプション</span>
                        <span>
                          ¥
                          {selectedOptions
                            .reduce((total, optionId) => {
                              const option = options.find((opt) => opt.id === optionId)
                              const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
                              return total + (option ? option.price * days : 0)
                            }, 0)
                            .toLocaleString()}
                        </span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>合計</span>
                      <span className="text-yanbaru-emerald">¥{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Terms Agreement */}
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm cursor-pointer">
                    <Link href="/terms" className="text-yanbaru-emerald hover:underline">
                      利用規約
                    </Link>
                    および
                    <Link href="/insurance" className="text-yanbaru-emerald hover:underline">
                      保険・補償内容
                    </Link>
                    に同意します
                  </Label>
                </div>

                {/* Booking Button */}
                {user ? (
                  <Link href={`/payment?carId=${resolvedParams.id}&startDate=${startDate?.toISOString()}&endDate=${endDate?.toISOString()}&total=${calculateTotal()}`}>
                <Button
                  className="w-full bg-yanbaru-sunset hover:bg-yanbaru-sunset/90 text-white"
                  disabled={!startDate || !endDate || !agreedToTerms || car.available === 0}
                >
                  予約・決済へ進む
                </Button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button
                      className="w-full bg-yanbaru-sunset hover:bg-yanbaru-sunset/90 text-white"
                      disabled={!startDate || !endDate || !agreedToTerms || car.available === 0}
                    >
                      ログインして予約
                    </Button>
                  </Link>
                )}

                <div className="text-center">
                  <Link href="/contact">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    店舗に問い合わせ
                  </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Reservation Section */}
            <ReservationSection carId={resolvedParams.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ReservationForm({ carId, userId }: { carId: string; userId: string }) {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!startDate || !endDate) {
      setMessage("日付を選択してください")
      return
    }

    const startDateObj = new Date(startDate)
    const endDateObj = new Date(endDate)
    const days = Math.ceil((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24))

    const { error } = await supabase.from("reservations").insert([
      {
        user_id: userId,
        car_id: parseInt(carId),
        start_date: startDateObj.toISOString().split('T')[0],
        end_date: endDateObj.toISOString().split('T')[0],
        total_amount: 5500 * days,
        status: "pending",
      }
    ])
    
    if (error) {
      setMessage("予約に失敗しました: " + error.message)
    } else {
      setMessage("予約が完了しました！")
      setStartDate("")
      setEndDate("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>開始日</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
      </div>
      <div>
        <label>終了日</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
      </div>
      <button type="submit" className="bg-yanbaru-sunset text-white px-4 py-2 rounded">予約する</button>
      {message && <p>{message}</p>}
    </form>
  )
}

function ReservationSection({ carId }: { carId: string }) {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  if (!user) {
    return (
      <div>
        <p>予約にはログインが必要です。</p>
        <Link href="/login">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">ログインページへ</button>
        </Link>
      </div>
    )
  }
  return <ReservationForm carId={carId} userId={user.id} />
}
