export interface Tweet {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  contentTr?: string; // Turkish translation for English tweets
  score: number;
  summary: string;
  keyTakeaways: string[];
  timestamp: string;
  url: string;
  metrics: {
    likes: number;
    retweets: number;
    replies: number;
  };
  tags: string[];
  isBookmarked?: boolean; // Bookmark status
}

export interface TrendKeyword {
  keyword: string;
  mentions: number;
  change: number; // percentage change from previous period
  tweets: string[]; // tweet IDs
}

export interface FilterOptions {
  scoreRange: [number, number];
  keywords: string[];
  authors: string[];
  sortBy: 'score' | 'timestamp' | 'engagement';
  sortOrder: 'asc' | 'desc';
} 