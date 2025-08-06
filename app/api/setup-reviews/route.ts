import { NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabaseClient'

export async function POST() {
  try {
    // サンプルレビューデータ（user_idをnullに設定）
    const sampleReviews = [
      {
        user_id: null, // 外部キー制約を回避
        vehicle_id: '08ec7607-cbf0-4e3c-944a-3e238b95220a', // ホンダ ヴェゼル
        rating: 5,
        comment: 'とても綺麗な車で、燃費も良く快適でした。スタッフの対応も丁寧で満足です。'
      },
      {
        user_id: null, // 外部キー制約を回避
        vehicle_id: '0b9a100b-b260-44ab-b9ad-812751355924', // トヨタ プリウス
        rating: 4,
        comment: 'カーナビが使いやすく、初めての沖縄旅行でも安心して運転できました。'
      },
      {
        user_id: null, // 外部キー制約を回避
        vehicle_id: '14154fa7-92b9-47a3-9c26-8d10e9e41984', // 日産 セレナ
        rating: 5,
        comment: '家族4人でちょうど良いサイズでした。また利用したいと思います。'
      }
    ]

    // レビューテーブルが存在するかチェック
    const { data: existingReviews, error: checkError } = await supabase
      .from('reviews')
      .select('id')
      .limit(1)

    if (checkError && checkError.code === 'PGRST200') {
      console.log('Reviews table does not exist')
      return NextResponse.json({ 
        message: 'Reviews table does not exist. Please create it manually in Supabase dashboard.',
        sampleData: sampleReviews 
      })
    }

    // 既存のレビューを削除（クリーンアップ）
    const { error: deleteError } = await supabase
      .from('reviews')
      .delete()
      .neq('id', 0) // すべてのレビューを削除

    if (deleteError) {
      console.error('Error deleting existing reviews:', deleteError)
    }

    // サンプルレビューデータを挿入
    const { data: insertedReviews, error: insertError } = await supabase
      .from('reviews')
      .insert(sampleReviews)
      .select()

    if (insertError) {
      console.error('Error inserting sample reviews:', insertError)
      return NextResponse.json({ 
        error: 'Failed to insert sample reviews',
        details: insertError 
      }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Sample reviews inserted successfully',
      insertedCount: insertedReviews?.length || 0
    })
  } catch (error) {
    console.error('Error in setup-reviews API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 