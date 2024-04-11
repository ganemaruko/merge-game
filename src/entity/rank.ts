export type Rank = number;

export const getNextRank = (rank: Rank): Rank => {
  return rank + 1;
};
