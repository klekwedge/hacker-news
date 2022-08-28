export type NewsListState = {
  newsRefs: string[],
  newsList: INew[],
  newsListLoadingStatus: 'loading' | 'not loading' | 'error',
  currentNews: null | INew,
  comments: IComment[]
};

export interface INew {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface IComment {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: string;
}
