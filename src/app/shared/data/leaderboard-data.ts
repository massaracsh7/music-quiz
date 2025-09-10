export type LeaderboardEntry = {
  id: string;
  username: string;
  score: number;
  category: string;
};

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: '1',
    username: 'Jacob',
    score: 205,
    category: 'Movies and Series',
  },
  {
    id: '2',
    username: 'Jackson',
    score: 81,
    category: 'Eminem',
  },
  {
    id: '3',
    username: 'Jack',
    score: 102,
    category: 'Russian songs',
  },
  {
    id: '4',
    username: 'Logan',
    score: 77,
    category: 'The Beatles',
  },
  {
    id: '5',
    username: 'Matthew',
    score: 159,
    category: 'Level: Hard',
  },
  {
    id: '6',
    username: 'Emma',
    score: 38,
    category: 'Level: Easy',
  },
  {
    id: '7',
    username: 'Ava',
    score: 195,
    category: 'Pop music',
  },
  {
    id: '8',
    username: 'Riley',
    score: 82,
    category: 'Pop music',
  },
  {
    id: '9',
    username: 'William',
    score: 227,
    category: 'Kanye West',
  },
  {
    id: '10',
    username: 'Charlotte',
    score: 95,
    category: 'Michael Jackson',
  },
  {
    id: '11',
    username: 'Sophia',
    score: 55,
    category: 'Level: Medium',
  },
  {
    id: '12',
    username: 'Emma',
    score: 7,
    category: 'Rock music',
  },
  {
    id: '13',
    username: 'Jessica',
    score: 19,
    category: 'Pop music',
  },
  {
    id: '14',
    username: 'Thomas',
    score: 37,
    category: 'Russian songs',
  },
  {
    id: '15',
    username: 'Ella',
    score: 180,
    category: 'Michael Jackson',
  },
  {
    id: '16',
    username: 'Sienna',
    score: 107,
    category: 'Pop music',
  },
  {
    id: '17',
    username: 'William',
    score: 237,
    category: 'Pop music',
  },
  {
    id: '18',
    username: 'Lily',
    score: 18,
    category: 'The Beatles',
  },
  {
    id: '19',
    username: 'Grace',
    score: 170,
    category: 'The Beatles',
  },
  {
    id: '20',
    username: 'Ava',
    score: 239,
    category: 'The 500 Greatest Songs',
  },
  {
    id: '21',
    username: 'James',
    score: 25,
    category: 'Rap and Hip-Hop music',
  },
  {
    id: '22',
    username: 'Mia',
    score: 18,
    category: 'Russian songs',
  },
  {
    id: '23',
    username: 'Cooper',
    score: 147,
    category: 'The 500 Greatest Songs',
  },
  {
    id: '24',
    username: 'Olivia',
    score: 110,
    category: 'Michael Jackson',
  },
  {
    id: '25',
    username: 'Ella',
    score: 198,
    category: 'The 500 Greatest Songs',
  },
  {
    id: '26',
    username: 'Lucy',
    score: 210,
    category: 'Level: Medium',
  },
  {
    id: '27',
    username: 'Ella',
    score: 158,
    category: 'Level: Easy',
  },
  {
    id: '28',
    username: 'Sophia',
    score: 112,
    category: 'Level: Hard',
  },
  {
    id: '29',
    username: 'Isabella',
    score: 173,
    category: 'Level: Hard',
  },
  {
    id: '30',
    username: 'Mia',
    score: 36,
    category: 'The Beatles',
  },
];

export const getLeaderboard = (): LeaderboardEntry[] => {
  return MOCK_LEADERBOARD.sort((a, b) => a.score - b.score);
};

export const getScoresByCategory = (category: string): LeaderboardEntry[] => {
  return MOCK_LEADERBOARD.filter((leaderboard) => leaderboard.category === category);
};
