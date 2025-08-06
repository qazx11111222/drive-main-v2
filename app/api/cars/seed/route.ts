import { NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabaseClient'

export async function POST() {
  try {
    // 残りの3台の車を追加
    const additionalCars = [
      {
        name: "スズキ ジムニー",
        image_url: "https://example.com/jimny.jpg",
        price: 7200,
        passengers: 4,
        transmission: "MT"
      },
      {
        name: "トヨタ ヴォクシー",
        image_url: "https://example.com/voxy.jpg",
        price: 9200,
        passengers: 8,
        transmission: "AT"
      },
      {
        name: "ホンダ ヴェゼル",
        image_url: "https://example.com/vezel.jpg",
        price: 6800,
        passengers: 5,
        transmission: "AT"
      }
    ]

    const { data, error } = await supabase
      .from('cars')
      .insert(additionalCars)
      .select()

    if (error) {
      console.error('Error inserting cars:', error)
      return NextResponse.json({ error: 'Failed to insert cars' }, { status: 500 })
    }

    return NextResponse.json({ 
      message: 'Cars added successfully', 
      cars: data 
    })
  } catch (error) {
    console.error('Error in seed cars API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 