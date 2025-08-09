import { NextRequest, NextResponse } from 'next/server'
import { Tweet } from '../../types'

// GET: Retrieve tweets for n8n
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const minScore = parseInt(searchParams.get('minScore') || '0')
  const keyword = searchParams.get('keyword') || ''
  const limit = parseInt(searchParams.get('limit') || '10')

  try {
    // Bu kısımda gerçek veritabanından veri çekebilirsiniz
    // Şimdilik mock data döndürüyoruz
    const { mockTweets } = await import('../../data/mockData')
    
    let filteredTweets = mockTweets.filter(tweet => tweet.score >= minScore)
    
    if (keyword) {
      filteredTweets = filteredTweets.filter(tweet => 
        tweet.content.toLowerCase().includes(keyword.toLowerCase()) ||
        tweet.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
      )
    }

    const limitedTweets = filteredTweets.slice(0, limit)

    return NextResponse.json({
      success: true,
      data: limitedTweets,
      total: filteredTweets.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tweets' },
      { status: 500 }
    )
  }
}

// POST: Receive new tweets from n8n
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tweets, source } = body

    // Gelen tweet verilerini doğrula
    if (!Array.isArray(tweets)) {
      return NextResponse.json(
        { success: false, error: 'Tweets must be an array' },
        { status: 400 }
      )
    }

    // Bu kısımda veritabanına kaydetme işlemi yapılacak
    console.log(`Received ${tweets.length} tweets from ${source || 'n8n'}`)
    
    // Örnek işlem: Tweet skorlarını hesaplama
    const processedTweets = tweets.map((tweet: any) => ({
      ...tweet,
      score: calculateTweetScore(tweet),
      processedAt: new Date().toISOString(),
      source: source || 'n8n-automation'
    }))

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${processedTweets.length} tweets`,
      data: processedTweets
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process tweets' },
      { status: 500 }
    )
  }
}

// AI Score hesaplama fonksiyonu
function calculateTweetScore(tweet: any): number {
  let score = 50 // Base score
  
  // Engagement bazlı scoring
  const engagement = (tweet.metrics?.likes || 0) + 
                    (tweet.metrics?.retweets || 0) + 
                    (tweet.metrics?.replies || 0)
  
  if (engagement > 10000) score += 30
  else if (engagement > 1000) score += 20
  else if (engagement > 100) score += 10
  
  // Verified account bonus
  if (tweet.author?.verified) score += 10
  
  // Content quality indicators
  const hasLinks = tweet.content?.includes('http')
  const hasHashtags = tweet.content?.includes('#')
  const hasAI_Keywords = ['AI', 'artificial intelligence', 'machine learning', 'neural'].some(
    keyword => tweet.content?.toLowerCase().includes(keyword.toLowerCase())
  )
  
  if (hasAI_Keywords) score += 15
  if (hasLinks) score += 5
  if (hasHashtags) score += 5
  
  return Math.min(100, Math.max(0, score))
} 