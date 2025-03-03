import { AxiosError } from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { getData } from "src/api/api";
import { JSON_KEY, MESSAGE } from "src/constants/constants";
import { IRepo, SortCriterial } from "src/types/types";
import { debounce } from "src/utils/debounce";
import { formatDate } from "src/utils/formatDate";
import { message } from "src/utils/message";

interface IResponse {
  data: {
    items: IRepo[];
  }
}

class SearchStore {
  title: string = '';
  result: IRepo[] = [];
  favorites: IRepo[] = [];
  sortCriterial: SortCriterial = SortCriterial.Name;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.fetchData = debounce(this.fetchData, 1000);
    this.loadFavoritesFromStorage();
  }

  loadFavoritesFromStorage = (): void => {
    const storedFavorites = localStorage.getItem(JSON_KEY);
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  };

  saveFavoritesToLocalStorage = (): void => {
    localStorage.setItem(JSON_KEY, JSON.stringify(this.favorites));
  };

  setTitle = (title: string): void => {
    this.title = title;
    this.fetchData();
  };

  fetchData = async () => {
    if (!this.title.trim()) return;

    this.setIsLoading(true);
    try {
      const { data: { items } }: IResponse = await getData(this.title);

      if (items.length === 0) {
        message.info(MESSAGE.empty);
      }

      runInAction(() => {
        this.result = this.sortRepos(
          items.map(repo => ({
            ...repo,
            isFavorite: this.isFavorite(repo.id),
          }))
        );
      });
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.status === 403) {
        message.error(MESSAGE.limits);
      }
    } finally {
      this.setIsLoading(false);
    }
  };

  sortRepos = (repos: IRepo[]): IRepo[] => {
    const { sortCriterial } = this;
  
    return [...repos].sort((a, b) => {
      switch (sortCriterial) {
        case SortCriterial.Name:
          return a.full_name.localeCompare(b.full_name);
        case SortCriterial.Stars:
          return b.stargazers_count - a.stargazers_count;
        case SortCriterial.Forks:
          return b.forks_count - a.forks_count;
        case SortCriterial.Novelty: {
          const dateA = a.created_at ? formatDate(a.created_at) : '';
          const dateB = b.created_at ? formatDate(b.created_at) : '';
          return dateB.localeCompare(dateA);
        }
        default:
          return 0;
      }
    });
  };

  setSortCriterial = (criterial: SortCriterial): void => {
    this.sortCriterial = criterial;

    runInAction(() => {
      this.result = this.sortRepos(this.result);
      this.favorites = this.sortRepos(this.favorites);
    });
  };

  addFavorite = (repo: IRepo): void => {
    runInAction(() => {
      if (!this.isFavorite(repo.id)) {
        this.favorites.push(repo);
        const index = this.result.findIndex((r) => r.id === repo.id);
        if (index !== -1) {
          this.result[index].isFavorite = true;
        }

        this.saveFavoritesToLocalStorage();
      }
    });
  };

  removeFavorite = (id: number): void => {
    runInAction(() => {
      this.favorites = this.favorites.filter((repo) => repo.id !== id);

      const repo = this.result.find((repo) => repo.id === id);
      if (repo) {
        repo.isFavorite = false;
      }

      this.saveFavoritesToLocalStorage();
    });
  };

  isFavorite = (id: number): boolean => {
    return this.favorites.some((repo) => repo.id === id);
  };

  setIsLoading = (loading: boolean): void => {
    this.isLoading = loading;
  };
}

export default new SearchStore;