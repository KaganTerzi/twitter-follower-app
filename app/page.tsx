'use client'

import { useState, useMemo, useEffect } from 'react'
import { Header } from './components/Header'
import { FilterBar } from './components/FilterBar'
import { TweetCard } from './components/TweetCard'
import { mockTweets } from './data/mockData'
import { Tweet, FilterOptions } from './types'

export default function Home() {
  const [filters, setFilters] = useState<FilterOptions>({
    scoreRange: [0, 100],
    keywords: [],
    authors: [],
    sortBy: 'score',
    sortOrder: 'desc'
  })

  const [bookmarkedTweets, setBookmarkedTweets] = useState<Set<string>>(new Set())

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('twitter-bookmarks')
    if (savedBookmarks) {
      setBookmarkedTweets(new Set(JSON.parse(savedBookmarks)))
    }
  }, [])

  // Reload bookmarks when returning to this page
  useEffect(() => {
    const reloadBookmarks = () => {
      const savedBookmarks = localStorage.getItem('twitter-bookmarks')
      if (savedBookmarks) {
        setBookmarkedTweets(new Set(JSON.parse(savedBookmarks)))
      }
    }
    
    // Reload when window gets focus (user returns from another tab/window)
    window.addEventListener('focus', reloadBookmarks)
    
    // Reload when user navigates back to this page
    window.addEventListener('popstate', reloadBookmarks)
    
    // Reload when page becomes visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        reloadBookmarks()
      }
    })
    
    return () => {
      window.removeEventListener('focus', reloadBookmarks)
      window.removeEventListener('popstate', reloadBookmarks)
      document.removeEventListener('visibilitychange', reloadBookmarks)
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

  const tweetsWithBookmarks = useMemo(() => {
    return mockTweets.map(tweet => ({
      ...tweet,
      isBookmarked: bookmarkedTweets.has(tweet.id)
    }))
  }, [bookmarkedTweets])

  const filteredTweets = useMemo(() => {
    let filtered = tweetsWithBookmarks.filter(tweet => {
      // Score filter
      const scoreInRange = tweet.score >= filters.scoreRange[0] && tweet.score <= filters.scoreRange[1]
      
      // Keywords filter
      const keywordsMatch = filters.keywords.length === 0 || 
        filters.keywords.some(keyword => 
          tweet.content.toLowerCase().includes(keyword.toLowerCase()) ||
          tweet.summary.toLowerCase().includes(keyword.toLowerCase()) ||
          tweet.tags.some(tag => tag.toLowerCase().includes(keyword.toLowerCase()))
        )
      
      // Authors filter
      const authorsMatch = filters.authors.length === 0 || 
        filters.authors.includes(tweet.author.username)
      
      return scoreInRange && keywordsMatch && authorsMatch
    })

    // Sort tweets
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (filters.sortBy) {
        case 'score':
          comparison = a.score - b.score
          break
        case 'timestamp':
          comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          break
        case 'engagement':
          const aEngagement = a.metrics.likes + a.metrics.retweets + a.metrics.replies
          const bEngagement = b.metrics.likes + b.metrics.retweets + b.metrics.replies
          comparison = aEngagement - bEngagement
          break
      }
      
      return filters.sortOrder === 'desc' ? -comparison : comparison
    })

    return filtered
  }, [filters, tweetsWithBookmarks])

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar onFilterChange={setFilters} totalTweets={filteredTweets.length} />
        
        {/* All Tweets Grid - 4 columns */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
              Latest Tweets
            </h2>
            <span className="text-text-secondary-light dark:text-text-secondary-dark">
              {filteredTweets.length} tweets from your followed accounts
            </span>
          </div>
          
          {filteredTweets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTweets.map((tweet, index) => (
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
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0v10a2 2 0 01-2 2H9a2 2 0 01-2-2V8m0 0V6a2 2 0 012-2h6a2 2 0 012 2v2" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                No tweets found
              </h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-md mx-auto">
                Try adjusting your filters or search terms to see more tweets from your followed accounts.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
} 