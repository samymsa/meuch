export type Contributor = {
  author: {
    id: number;
    login: string;
    type: string;
    avatar_url: string;
  };
  total: number;
  weeks: Array<{
    a: number;
    d: number;
    c: number;
  }>;
};
