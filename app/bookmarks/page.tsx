'use client'

import { useState, useMemo, useEffect } from 'react'
import { Header } from '../components/Header'
import { TweetCard } from '../components/TweetCard'
import { mockTweets } from '../data/mockData'
import { Tweet } from '../types'
import { Bookmark, Trash2 } from 'lucide-react'

export default function BookmarksPage() {
  const [bookmarkedTweets, setBookmarkedTweets] = useState<Set<string>>(new Set())

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('twitter-bookmarks')
    if (savedBookmarks) {
      setBookmarkedTweets(new Set(JSON.parse(savedBookmarks)))
    }
  }, [])



  const handleBookmarkToggle = (tweetId: string) => {
    setBookmarkedTweets(prev => {
      const newBookmarks = new Set(prev)
      if (newBookmarks.has(tweetId)) {
        newBookmarks.delete(tweetId)
      } else {
        newBookmarks.add(tweetId)
      }
      // Immediately save to localStorage
      localStorage.setItem('twitter-bookmarks', JSON.stringify(Array.from(newBookmarks)))
      return newBookmarks
    })
  }

  const handleClearAllBookmarks = () => {
    setBookmarkedTweets(new Set())
  }

  const bookmarkedTweetsList = useMemo(() => {
    return mockTweets
      .filter(tweet => bookmarkedTweets.has(tweet.id))
      .map(tweet => ({
        ...tweet,
        isBookmarked: true
      }))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [bookmarkedTweets])

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Bookmark className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                Bookmarked Tweets
              </h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                {bookmarkedTweetsList.length} saved tweets
              </p>
            </div>
          </div>

          {/* Clear All Button */}
          {bookmarkedTweetsList.length > 0 && (
            <button
              onClick={handleClearAllBookmarks}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>
        
        {/* Bookmarked Tweets Grid */}
        <section>
          {bookmarkedTweetsList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bookmarkedTweetsList.map((tweet, index) => (
                <div
                  key={tweet.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <TweetCard tweet={tweet} onBookmarkToggle={handleBookmarkToggle} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
              <div className="text-gray-400 mb-4">
                <Bookmark className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                No bookmarked tweets yet
              </h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-md mx-auto mb-4">
                Start bookmarking tweets you want to save for later by clicking the bookmark icon on any tweet.
              </p>
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-blue/90 transition-colors"
              >
                Browse Tweets
              </a>
            </div>
          )}
        </section>
      </main>
    </div>
  )
} 