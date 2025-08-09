'use client'

import { useState } from 'react'
import { FilterOptions } from '../types'
import { Search, Filter, SlidersHorizontal } from 'lucide-react'

interface FilterBarProps {
  onFilterChange: (filters: FilterOptions) => void
  totalTweets: number
}

export function FilterBar({ onFilterChange, totalTweets }: FilterBarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [scoreRange, setScoreRange] = useState<[number, number]>([0, 100])
  const [sortBy, setSortBy] = useState<'score' | 'engagement' | 'timestamp'>('score')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const handleFilterChange = () => {
    onFilterChange({
      scoreRange,
      keywords: searchTerm ? [searchTerm] : [],
      authors: [],
      sortBy,
      sortOrder
    })
  }

  // Update filters whenever any input changes
  const updateSearch = (value: string) => {
    setSearchTerm(value)
    onFilterChange({
      scoreRange,
      keywords: value ? [value] : [],
      authors: [],
      sortBy,
      sortOrder
    })
  }

  const updateScoreRange = (value: [number, number]) => {
    setScoreRange(value)
    onFilterChange({
      scoreRange: value,
      keywords: searchTerm ? [searchTerm] : [],
      authors: [],
      sortBy,
      sortOrder
    })
  }

  const updateSort = (newSortBy: typeof sortBy, newSortOrder: typeof sortOrder) => {
    setSortBy(newSortBy)
    setSortOrder(newSortOrder)
    onFilterChange({
      scoreRange,
      keywords: searchTerm ? [searchTerm] : [],
      authors: [],
      sortBy: newSortBy,
      sortOrder: newSortOrder
    })
  }

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-primary-blue" />
          <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
            Filters
          </h3>
        </div>
        <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
          <span className="font-medium">{totalTweets}</span> tweets found
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <label className="block text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
            Search Keywords
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
            <input
              type="text"
              placeholder="Search tweets..."
              value={searchTerm}
              onChange={(e) => updateSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark placeholder-text-secondary-light dark:placeholder-text-secondary-dark focus:ring-2 focus:ring-primary-blue focus:border-transparent"
            />
          </div>
        </div>

        {/* Score Range */}
        <div>
          <label className="block text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
            Min Score Range
          </label>
          <select
            value={scoreRange[0]}
            onChange={(e) => updateScoreRange([parseInt(e.target.value), scoreRange[1]])}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          >
            <option value={0}>All Scores</option>
            <option value={70}>High Priority (70+)</option>
            <option value={80}>Very High (80+)</option>
            <option value={90}>Excellent (90+)</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => updateSort(e.target.value as typeof sortBy, sortOrder)}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          >
            <option value="score">AI Score</option>
            <option value="engagement">Engagement</option>
            <option value="timestamp">Time</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
            Order
          </label>
          <select
            value={sortOrder}
            onChange={(e) => updateSort(sortBy, e.target.value as typeof sortOrder)}
            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-text-primary-light dark:text-text-primary-dark focus:ring-2 focus:ring-primary-blue focus:border-transparent"
          >
            <option value="desc">High to Low</option>
            <option value="asc">Low to High</option>
          </select>
        </div>
      </div>
    </div>
  )
} 