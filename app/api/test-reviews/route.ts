import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabaseClient'

export async function GET() {
  try {
    // レビューテーブルの構造を確認
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('*')
      .limit(1)

    if (error) {
      console.error('Error checking reviews table:', error)
      return NextResponse.json({ 
        error: 'Reviews table error',
        details: error 
      }, { status: 500 })
    }

    // テーブル構造を確認するために、空のレコードを挿入してみる
    const testReview = {
      rating: 5,
      comment: 'Test review',
      user_id: null,
      vehicle_id: null,
      booking_id: null
    }

    const { data: insertedTest, error: insertError } = await supabase
      .from('reviews')
      .insert([testReview])
      .select()

    if (insertError) {
      console.error('Error inserting test review:', insertError)
      return NextResponse.json({
        message: 'Reviews table exists but has constraints',
        sampleData: reviews,
        tableStructure: reviews.length > 0 ? Object.keys(reviews[0]) : [],
        insertError: insertError
      })
    }

    // テストレコードを削除
    if (insertedTest && insertedTest.length > 0) {
      await supabase
        .from('reviews')
        .delete()
        .eq('id', insertedTest[0].id)
    }

    return NextResponse.json({
      message: 'Reviews table exists and can accept data',
      sampleData: reviews,
      tableStructure: reviews.length > 0 ? Object.keys(reviews[0]) : [],
      testInsert: insertedTest
    })
  } catch (error) {
    console.error('Error in test-reviews API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 