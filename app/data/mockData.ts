import { Tweet, TrendKeyword } from '../types'

export const mockTweets: Tweet[] = [
  {
    id: '1',
    author: {
      name: 'Perplexity',
      username: 'perplexity_ai',
      avatar: 'https://pbs.twimg.com/profile_images/1730334391501598720/XCJ3gvNz_400x400.jpg',
      verified: true,
    },
    content: 'Our new Pro Search can now reason through complex multi-step problems with citations from multiple sources. This is a game-changer for research workflows.',
    contentTr: 'Yeni Pro Search\'ümüz artık birden fazla kaynaktan alıntılarla karmaşık çok adımlı problemleri çözebiliyor. Bu, araştırma iş akışları için oyun değiştirici bir gelişme.',
    score: 95,
    summary: 'Perplexity announces enhanced Pro Search with multi-step reasoning and citation capabilities.',
    keyTakeaways: [
      'Pro Search multi-step reasoning',
      'Multiple source citations',
      'Research workflow improvements'
    ],
    timestamp: '2024-01-15T10:30:00Z',
    url: 'https://twitter.com/perplexity_ai/status/1',
    metrics: {
      likes: 8420,
      retweets: 1210,
      replies: 445
    },
    tags: ['Search', 'AI', 'Research']
  },
  {
    id: '2',
    author: {
      name: 'Sam Altman',
      username: 'sama',
      avatar: 'https://pbs.twimg.com/profile_images/1692741696851038208/ClLNnHOB_400x400.jpg',
      verified: true,
    },
    content: 'The progress in AI reasoning over the past 6 months has been remarkable. We\'re seeing capabilities emerge that weren\'t possible just last year.',
    contentTr: 'Son 6 ayda AI akıl yürütmedeki ilerleme olağanüstü oldu. Geçen yıl mümkün olmayan yeteneklerin ortaya çıktığını görüyoruz.',
    score: 92,
    summary: 'Sam Altman reflects on rapid AI reasoning progress and emerging new capabilities.',
    keyTakeaways: [
      'Remarkable 6-month progress',
      'New capabilities emerging',
      'Faster than expected advancement'
    ],
    timestamp: '2024-01-15T09:15:00Z',
    url: 'https://twitter.com/sama/status/2',
    metrics: {
      likes: 15750,
      retweets: 3240,
      replies: 1180
    },
    tags: ['AI', 'Progress', 'Reasoning']
  },
  {
    id: '3',
    author: {
      name: 'Perplexity',
      username: 'perplexity_ai',
      avatar: 'https://pbs.twimg.com/profile_images/1730334391501598720/XCJ3gvNz_400x400.jpg',
      verified: true,
    },
    content: 'Built a new feature that summarizes research papers and automatically finds related work. The AI can now understand academic context at a much deeper level.',
    contentTr: 'Araştırma makalelerini özetleyen ve ilgili çalışmaları otomatik olarak bulan yeni bir özellik geliştirdik. AI artık akademik bağlamı çok daha derin seviyede anlayabiliyor.',
    score: 88,
    summary: 'Perplexity introduces academic paper summarization with related work discovery.',
    keyTakeaways: [
      'Research paper summarization',
      'Automated related work finding',
      'Deep academic context understanding'
    ],
    timestamp: '2024-01-15T08:45:00Z',
    url: 'https://twitter.com/perplexity_ai/status/3',
    metrics: {
      likes: 6340,
      retweets: 890,
      replies: 267
    },
    tags: ['Research', 'Papers', 'Academic']
  },
  {
    id: '4',
    author: {
      name: 'Sam Altman',
      username: 'sama',
      avatar: 'https://pbs.twimg.com/profile_images/1692741696851038208/ClLNnHOB_400x400.jpg',
      verified: true,
    },
    content: 'AI agents that can plan, execute, and adapt are closer than most people think. The combination of reasoning and tool use is unlocking new possibilities.',
    contentTr: 'Planlama, uygulama ve adaptasyon yapabilen AI ajanları çoğu insanın düşündüğünden daha yakın. Akıl yürütme ve araç kullanımının kombinasyonu yeni olanakların kapısını açıyor.',
    score: 89,
    summary: 'Sam Altman discusses the near-term potential of AI agents with planning and adaptation capabilities.',
    keyTakeaways: [
      'AI agents closer than expected',
      'Plan, execute, adapt capabilities',
      'Reasoning + tool use combination'
    ],
    timestamp: '2024-01-15T07:20:00Z',
    url: 'https://twitter.com/sama/status/4',
    metrics: {
      likes: 12900,
      retweets: 2560,
      replies: 890
    },
    tags: ['Agents', 'Planning', 'Tools']
  },
  {
    id: '5',
    author: {
      name: 'Perplexity',
      username: 'perplexity_ai',
      avatar: 'https://pbs.twimg.com/profile_images/1730334391501598720/XCJ3gvNz_400x400.jpg',
      verified: true,
    },
    content: 'Just shipped real-time search that can process breaking news and provide instant analysis. The speed and accuracy improvements are incredible.',
    contentTr: 'Son dakika haberlerini işleyebilen ve anlık analiz sağlayan gerçek zamanlı aramayı yeni çıkardık. Hız ve doğruluk iyileştirmeleri inanılmaz.',
    score: 85,
    summary: 'Perplexity launches real-time search with breaking news analysis capabilities.',
    keyTakeaways: [
      'Real-time search launched',
      'Breaking news processing',
      'Speed and accuracy improvements'
    ],
    timestamp: '2024-01-15T06:30:00Z',
    url: 'https://twitter.com/perplexity_ai/status/5',
    metrics: {
      likes: 7650,
      retweets: 1340,
      replies: 423
    },
    tags: ['Real-time', 'News', 'Analysis']
  },
  {
    id: '6',
    author: {
      name: 'Sam Altman',
      username: 'sama',
      avatar: 'https://pbs.twimg.com/profile_images/1692741696851038208/ClLNnHOB_400x400.jpg',
      verified: true,
    },
    content: 'The next breakthrough in AI will likely come from better training techniques rather than just more compute. Efficiency and reasoning are key.',
    contentTr: 'AI\'daki bir sonraki atılım muhtemelen sadece daha fazla hesaplama gücünden ziyade daha iyi eğitim tekniklerinden gelecek. Verimlilik ve akıl yürütme anahtardır.',
    score: 81,
    summary: 'Sam Altman predicts AI breakthroughs will come from training techniques over compute scaling.',
    keyTakeaways: [
      'Training techniques over compute',
      'Efficiency is crucial',
      'Reasoning improvements needed'
    ],
    timestamp: '2024-01-15T05:45:00Z',
    url: 'https://twitter.com/sama/status/6',
    metrics: {
      likes: 9210,
      retweets: 1890,
      replies: 567
    },
    tags: ['Training', 'Efficiency', 'Innovation']
  },
  {
    id: '7',
    author: {
      name: 'Perplexity',
      username: 'perplexity_ai',
      avatar: 'https://pbs.twimg.com/profile_images/1730334391501598720/XCJ3gvNz_400x400.jpg',
      verified: true,
    },
    content: 'Our AI can now understand context across multiple languages and provide accurate translations while maintaining semantic meaning. Global knowledge access is improving.',
    contentTr: 'AI\'ımız artık birden fazla dilde bağlamı anlayabiliyor ve anlamsal anlamı koruyarak doğru çeviriler sağlayabiliyor. Küresel bilgi erişimi gelişiyor.',
    score: 76,
    summary: 'Perplexity enhances multilingual capabilities with context-aware translation.',
    keyTakeaways: [
      'Multi-language context understanding',
      'Accurate semantic translations',
      'Global knowledge access'
    ],
    timestamp: '2024-01-15T04:15:00Z',
    url: 'https://twitter.com/perplexity_ai/status/7',
    metrics: {
      likes: 5890,
      retweets: 780,
      replies: 234
    },
    tags: ['Translation', 'Multilingual', 'Global']
  },
  {
    id: '8',
    author: {
      name: 'Sam Altman',
      username: 'sama',
      avatar: 'https://pbs.twimg.com/profile_images/1692741696851038208/ClLNnHOB_400x400.jpg',
      verified: true,
    },
    content: 'Building AI systems that are both powerful and safe requires careful consideration at every step. The stakes are high, but the potential is enormous.',
    contentTr: 'Hem güçlü hem de güvenli AI sistemleri inşa etmek her adımda dikkatli düşünmeyi gerektirir. Riskler yüksek ama potansiyel muazzam.',
    score: 78,
    summary: 'Sam Altman emphasizes the importance of building powerful yet safe AI systems.',
    keyTakeaways: [
      'Power and safety balance',
      'Careful development process',
      'High stakes, enormous potential'
    ],
    timestamp: '2024-01-15T03:30:00Z',
    url: 'https://twitter.com/sama/status/8',
    metrics: {
      likes: 11200,
      retweets: 2100,
      replies: 789
    },
    tags: ['Safety', 'Development', 'Responsibility']
  }
]

export const mockTrends: TrendKeyword[] = [
  {
    keyword: 'AI Search',
    mentions: 2340,
    change: 25.3,
    tweets: ['1', '3', '5']
  },
  {
    keyword: 'AI Agents',
    mentions: 1890,
    change: 18.7,
    tweets: ['2', '4', '6']
  },
  {
    keyword: 'Real-time AI',
    mentions: 1650,
    change: 32.1,
    tweets: ['5', '7']
  },
  {
    keyword: 'AI Reasoning',
    mentions: 1230,
    change: 15.8,
    tweets: ['1', '2', '4']
  },
  {
    keyword: 'OpenAI',
    mentions: 980,
    change: 12.4,
    tweets: ['2', '4', '6', '8']
  },
  {
    keyword: 'Perplexity',
    mentions: 780,
    change: 28.9,
    tweets: ['1', '3', '5', '7']
  },
  {
    keyword: 'AI Safety',
    mentions: 690,
    change: 8.2,
    tweets: ['6', '8']
  },
  {
    keyword: 'Machine Learning',
    mentions: 590,
    change: 5.8,
    tweets: ['3', '7']
  }
] 