export type NewsListState = {
  newsLinks: string[],
  newsList: INew[],
  newsListLoadingStatus: LoadingStatus
  currentNews: null | INew,
  comments: IComment[],
  commentsLoadingStatus: LoadingStatus
};

type LoadingStatus = 'loading' | 'not loading' | 'error';

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
