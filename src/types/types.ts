export interface IRepo {
  id: number;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  owner: IOwner;
  html_url: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  language?: string;
  archived?: boolean;
  isFavorite: boolean;
}

interface IOwner {
  avatar_url: string;
  login: string;
  html_url: string;
}

export enum SortCriterial {
  Name = 'name',
  Stars = 'stars',
  Forks = 'forks',
  Novelty = 'novelty'
}

export enum TypeMessage {
  Success = 'success', 
  Error = 'error',
  Info = 'info'
}