'use client'

import { Tweet } from '../types'
import { TweetCard } from './TweetCard'
import { Zap, Star } from 'lucide-react'

interface PriorityInboxProps {
  tweets: Tweet[]
  onBookmarkToggle: (tweetId: string) => void
}

export function PriorityInbox({ tweets, onBookmarkToggle }: PriorityInboxProps) {
  const priorityTweets = tweets.filter(tweet => tweet.score >= 70)

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Zap className="w-5 h-5 text-yellow-500" />
        <h2 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
          Priority Inbox
        </h2>
        <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
          <Star className="w-3 h-3 text-yellow-600" />
          <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">
            Score ≥ 70
          </span>
        </div>
      </div>

      {priorityTweets.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {priorityTweets.slice(0, 4).map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} onBookmarkToggle={onBookmarkToggle} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">
            No Priority Tweets
          </h3>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
            High-scoring tweets (≥70) will appear here
          </p>
        </div>
      )}
    </div>
  )
} 