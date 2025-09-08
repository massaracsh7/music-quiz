export interface LeaderboardUser {
    email: string;
    score: number;
}

export interface LeaderboardCategory {
    id: string;
    title: string;
    users: LeaderboardUser[];
}

