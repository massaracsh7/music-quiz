export type LeaderboardUser = {
  email: string;
  score: number;
};

export type LeaderboardCategory = {
  id: string;
  title: string;
  users: LeaderboardUser[];
};
