import { NextResponse } from 'next/server'
import { supabase } from '../../../../lib/supabaseClient'

export async function POST() {
  try {
    // 既存の車両データを取得
    const { data: existingCars, error: fetchError } = await supabase
      .from('cars')
      .select('id, name')
      .order('id', { ascending: true })

    if (fetchError) {
      console.error('Error fetching existing cars:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch existing cars' }, { status: 500 })
    }

    console.log('Existing cars:', existingCars)

    // 各車両に画像URLを設定
    const imageUpdates = existingCars.map((car, index) => {
      const images = [
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop", // Toyota
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop", // Nissan
        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop", // Honda
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop", // Suzuki
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop", // Toyota
        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&h=600&fit=crop", // Honda
      ]
      
      return {
        id: car.id,
        image_url: images[index] || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop"
      }
    })

    // 画像URLを更新
    const { data, error } = await supabase
      .from('cars')
      .upsert(imageUpdates, { onConflict: 'id' })
      .select()

    if (error) {
      console.error('Error updating car images:', error)
      return NextResponse.json({ error: 'Failed to update car images' }, { status: 500 })
    }

    return NextResponse.json({ 
      message: 'Car images updated successfully', 
      cars: data 
    })
  } catch (error) {
    console.error('Error in update-images API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 