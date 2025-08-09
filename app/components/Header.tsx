'use client'

import { useTheme } from './ThemeProvider'
import { Moon, Sun, Twitter, Zap, Bookmark } from 'lucide-react'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-card-light dark:bg-card-dark shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="p-2 bg-gradient-primary rounded-xl">
                <Twitter className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-blue rounded-full animate-bounce-subtle"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                Twitter Follower
              </h1>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                by Yücetürk
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-blue transition-colors font-medium"
            >
              All Tweets
            </a>
            <a
              href="/bookmarks"
              className="flex items-center space-x-1 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-blue transition-colors font-medium"
            >
              <Bookmark className="w-4 h-4" />
              <span>Bookmarks</span>
            </a>
          </nav>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-background-light dark:bg-background-dark text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-blue transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
} 