'use client'

import { Tweet } from '../types'
import { Heart, MessageCircle, Repeat2, ExternalLink, CheckCircle, Bookmark } from 'lucide-react'

interface TweetCardProps {
  tweet: Tweet
  onBookmarkToggle: (tweetId: string) => void
}

export function TweetCard({ tweet, onBookmarkToggle }: TweetCardProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) return `${diffInHours}h`
    return `${Math.floor(diffInHours / 24)}d`
  }

  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-700'
    if (score >= 70) return 'text-yellow-700'
    return 'text-red-700'
  }

  const getScoreBg = (score: number): string => {
    if (score >= 90) return 'bg-green-100 dark:bg-green-900/30'
    if (score >= 70) return 'bg-yellow-100 dark:bg-yellow-900/30'
    return 'bg-red-100 dark:bg-red-900/30'
  }

  // Check if content is in English (simple detection)
  const isEnglish = /^[a-zA-Z0-9\s.,!?'"()-]+$/.test(tweet.content)

  return (
    <article className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary-blue/30 animate-fade-in">
      {/* Header - Compact */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <img
            src={tweet.author.avatar}
            alt={tweet.author.name}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-1">
              <span className="font-medium text-text-primary-light dark:text-text-primary-dark text-sm truncate">
                {tweet.author.name}
              </span>
              {tweet.author.verified && (
                <CheckCircle className="w-3 h-3 text-primary-blue flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-text-secondary-light dark:text-text-secondary-dark">
              <span>@{tweet.author.username}</span>
              <span>·</span>
              <span>{formatTimestamp(tweet.timestamp)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Bookmark Button */}
          <button
            onClick={() => onBookmarkToggle(tweet.id)}
            className={`p-1 rounded-md transition-colors ${
              tweet.isBookmarked
                ? 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                : 'text-gray-400 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30'
            }`}
            title={tweet.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <Bookmark className={`w-4 h-4 ${tweet.isBookmarked ? 'fill-current' : ''}`} />
          </button>
          
          {/* Compact Score Badge */}
          <div className={`px-2 py-1 rounded-full text-xs font-bold ${getScoreBg(tweet.score)} ${getScoreColor(tweet.score)}`}>
            {tweet.score}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-3">
        <p className="text-text-primary-light dark:text-text-primary-dark text-sm leading-relaxed">
          {tweet.content}
        </p>
        {/* Show Turkish translation for English tweets */}
        {isEnglish && tweet.contentTr && (
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-3 border-blue-400">
            <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">
              🇹🇷 Türkçe Çeviri:
            </p>
            <p className="text-text-primary-light dark:text-text-primary-dark text-sm leading-relaxed">
              {tweet.contentTr}
            </p>
          </div>
        )}
      </div>

      {/* Key Takeaways */}
      <div className="mb-3">
        <div className="text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
          Key Points
        </div>
        <div className="flex flex-wrap gap-1">
          {tweet.keyTakeaways.slice(0, 2).map((takeaway, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-blue/10 text-primary-blue"
            >
              {takeaway}
            </span>
          ))}
          {tweet.keyTakeaways.length > 2 && (
            <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
              +{tweet.keyTakeaways.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
        {/* Engagement Metrics */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 text-text-secondary-light dark:text-text-secondary-dark">
            <Heart className="w-3 h-3" />
            <span className="text-xs">{formatNumber(tweet.metrics.likes)}</span>
          </div>
          <div className="flex items-center space-x-1 text-text-secondary-light dark:text-text-secondary-dark">
            <Repeat2 className="w-3 h-3" />
            <span className="text-xs">{formatNumber(tweet.metrics.retweets)}</span>
          </div>
          <div className="flex items-center space-x-1 text-text-secondary-light dark:text-text-secondary-dark">
            <MessageCircle className="w-3 h-3" />
            <span className="text-xs">{formatNumber(tweet.metrics.replies)}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="flex items-center space-x-1 px-2 py-1 text-xs text-primary-blue hover:bg-primary-blue/10 rounded-md transition-colors">
          <ExternalLink className="w-3 h-3" />
          <span>View</span>
        </button>
      </div>
    </article>
  )
} 