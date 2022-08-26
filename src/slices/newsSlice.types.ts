export type NewsListState = {
  newsRefs: string[],
  newsList: INew[],
  newsListLoadingStatus: string
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
