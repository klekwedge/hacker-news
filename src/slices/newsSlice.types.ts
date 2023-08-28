import { IComment, INews, LoadingStatus } from "../types";

export type NewsListState = {
  newsLinks: string[],
  newsList: INews[],
  newsListLoadingStatus: LoadingStatus
  currentNews: null | INews,
  currentNewsLoadingStatus: LoadingStatus,
  comments: IComment[],
  commentsLoadingStatus: LoadingStatus
};
