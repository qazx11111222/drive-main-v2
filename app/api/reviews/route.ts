import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabaseClient'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const vehicleId = searchParams.get('vehicleId')

    if (!vehicleId) {
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 })
    }

    // レビューを取得（vehicle_idを使用）
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select(`
        id,
        rating,
        comment,
        created_at,
        user_id
      `)
      .eq('vehicle_id', vehicleId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching reviews:', error)
      // エラー時は空の配列を返す
      return NextResponse.json([])
    }

    // レビューデータを整形
    const formattedReviews = reviews.map((review: any) => ({
      id: review.id,
      user: review.user_id ? `ユーザー${review.user_id.slice(0, 8)}` : 'Anonymous',
      rating: review.rating,
      comment: review.comment,
      date: new Date(review.created_at).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    }))

    return NextResponse.json(formattedReviews)
  } catch (error) {
    console.error('Error in reviews API:', error)
    return NextResponse.json([])
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { vehicleId, userId, userName, rating, comment } = body

    console.log('Review POST - Received data:', { vehicleId, userId, userName, rating, comment })

    if (!vehicleId || !rating || !comment) {
      console.log('Review POST - Missing required fields')
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      console.log('Review POST - Invalid rating')
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    // user_idのみを使用（ログインしていない場合はnull）
    const insertData = {
      vehicle_id: vehicleId,
      user_id: userId || null,
      rating: rating,
      comment: comment,
      booking_id: null
    }

    console.log('Review POST - Inserting data:', insertData)

    const { data, error } = await supabase
      .from('reviews')
      .insert([insertData])
      .select()

    if (error) {
      console.error('Review POST - Error creating review:', error)
      return NextResponse.json({ error: `Failed to create review: ${error.message}` }, { status: 500 })
    }

    console.log('Review POST - Success:', data)

    return NextResponse.json({
      message: 'Review created successfully',
      review: data[0]
    })
  } catch (error) {
    console.error('Review POST - Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 