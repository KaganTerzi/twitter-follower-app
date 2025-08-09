'use client'

import { TrendKeyword } from '../types'
import { TrendingUp, TrendingDown, Minus, Hash } from 'lucide-react'

interface TrendsProps {
  trends: TrendKeyword[]
}

export function Trends({ trends }: TrendsProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-3 h-3 text-green-500" />
    if (change < 0) return <TrendingDown className="w-3 h-3 text-red-500" />
    return <Minus className="w-3 h-3 text-gray-500" />
  }

  const getChangeColor = (change: number): string => {
    if (change > 0) return 'text-green-600 dark:text-green-400'
    if (change < 0) return 'text-red-600 dark:text-red-400'
    return 'text-gray-600 dark:text-gray-400'
  }

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2 mb-4">
        <Hash className="w-5 h-5 text-primary-blue" />
        <h2 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
          Trending Keywords
        </h2>
      </div>

      <div className="space-y-3">
        {trends.map((trend, index) => (
          <div
            key={trend.keyword}
            className="flex items-center justify-between p-3 bg-background-light dark:bg-background-dark rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-6 h-6 bg-primary-blue/10 text-primary-blue rounded-full text-xs font-bold">
                {index + 1}
              </div>
              <div>
                <div className="font-medium text-text-primary-light dark:text-text-primary-dark text-sm">
                  #{trend.keyword}
                </div>
                <div className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                  {formatNumber(trend.mentions)} mentions
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-1 ${getChangeColor(trend.change)}`}>
                {getChangeIcon(trend.change)}
                <span className="text-xs font-medium">
                  {trend.change > 0 ? '+' : ''}{trend.change}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark text-center">
          Updated 5 minutes ago
        </p>
      </div>
    </div>
  )
} 