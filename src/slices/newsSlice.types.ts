export type NewsListState = {
  newsRefs: string[],
  newsList: INew[],
  newsListLoadingStatus: string,
  currentNews: null | INew
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
