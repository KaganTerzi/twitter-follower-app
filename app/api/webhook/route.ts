import { NextRequest, NextResponse } from 'next/server'

// Webhook endpoint for n8n triggers
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventType, data, metadata } = body

    console.log(`Webhook received: ${eventType}`, { data, metadata })

    switch (eventType) {
      case 'high_score_tweet':
        return await handleHighScoreTweet(data)
      
      case 'trending_keyword':
        return await handleTrendingKeyword(data)
      
      case 'daily_summary':
        return await handleDailySummary(data)
      
      case 'user_mention':
        return await handleUserMention(data)
      
      default:
        return NextResponse.json({
          success: true,
          message: `Event ${eventType} received but not processed`
        })
    }
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { success: false, error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Yüksek skorlu tweet işleme
async function handleHighScoreTweet(data: any) {
  const { tweet, score } = data
  
  // Bu kısımda:
  // - Email bildirimi gönderebilirsiniz
  // - Slack/Discord'a mesaj atabilirsiniz
  // - Veritabanına priority flag ekleyebilirsiniz
  
  console.log(`High score tweet detected: ${score}`, tweet)
  
  return NextResponse.json({
    success: true,
    message: 'High score tweet processed',
    actions: ['notification_sent', 'priority_flagged']
  })
}

// Trending keyword işleme
async function handleTrendingKeyword(data: any) {
  const { keyword, mentions, change } = data
  
  // Bu kısımda:
  // - Trend raporları oluşturabilirsiniz
  // - Analytics dashboard'a veri gönderebilirsiniz
  
  console.log(`Trending keyword: ${keyword} (${mentions} mentions, ${change}% change)`)
  
  return NextResponse.json({
    success: true,
    message: 'Trending keyword processed',
    data: { keyword, mentions, change }
  })
}

// Günlük özet işleme
async function handleDailySummary(data: any) {
  const { date, totalTweets, avgScore, topKeywords } = data
  
  // Bu kısımda:
  // - Günlük rapor oluşturabilirsiniz
  // - Email ile özet gönderebilirsiniz
  
  console.log(`Daily summary for ${date}:`, {
    totalTweets,
    avgScore,
    topKeywords
  })
  
  return NextResponse.json({
    success: true,
    message: 'Daily summary processed',
    summary: { date, totalTweets, avgScore, topKeywords }
  })
}

// Kullanıcı mention işleme
async function handleUserMention(data: any) {
  const { mentionedUser, tweet, context } = data
  
  // Bu kısımda:
  // - Mention bildirimi gönderebilirsiniz
  // - Response oluşturabilirsiniz
  
  console.log(`User mention detected: @${mentionedUser}`, { tweet, context })
  
  return NextResponse.json({
    success: true,
    message: 'User mention processed',
    data: { mentionedUser, tweet }
  })
} 