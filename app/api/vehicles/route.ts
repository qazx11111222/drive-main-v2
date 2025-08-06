import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabaseClient'

export async function GET() {
  try {
    const { data: cars, error } = await supabase
      .from('cars')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Error fetching cars:', error)
      return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 })
    }

    // 画像URLを処理
    const carsWithImages = cars.map((car) => {
      console.log('Processing car:', car.name, 'Image URL:', car.image_url)
      
      return {
        id: car.id,
        name: car.name,
        image: car.image_url || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
        price: car.price,
        passengers: car.passengers,
        transmission: car.transmission || 'AT',
        rating: 4.8, // 仮の評価
        reviews: 24, // 仮のレビュー数
        available: 3, // 仮の在庫数
        features: ["カーナビ", "ETC"], // 仮の特徴
        location: "名護店", // 仮の場所
        description: "燃費性能に優れた車です。静かで快適な乗り心地で、沖縄の美しい景色をゆったりとお楽しみいただけます。",
        fuel_type: "ガソリン",
        engine_size: "1.8L",
        doors: 5,
        luggage_size: "大",
      }
    })

    return NextResponse.json(carsWithImages)
  } catch (error) {
    console.error('Error in cars API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 