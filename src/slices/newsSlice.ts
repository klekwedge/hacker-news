/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useAllFetch, useFetch } from '../hooks/useFetch';
import { IComment, INew, NewsListState } from './newsSlice.types';

const initialState: NewsListState = {
  newsLinks: [],
  newsList: [],
  newsListLoadingStatus: 'not loading',
  currentNews: null,
  comments: [],
  commentsLoadingStatus: 'not loading'
};

export const fetchNewsLinks = createAsyncThunk('news/fetchNewsLinks', (url: string) => {
  const { request } = useFetch();
  return request(url);
});

export const fetchNews = createAsyncThunk('news/fetchNews', (fetchPromises: Promise<Response>[]) => {
  const { request } = useAllFetch();
  return request(fetchPromises);
});

export const fetchNew = createAsyncThunk('news/fetchNew', (url: string) => {
  const { request } = useFetch();
  return request(url);
});

export const fetchComments = createAsyncThunk('news/fetchComment', (fetchPromises: Promise<Response>[]) => {
  const { request } = useAllFetch();
  return request(fetchPromises);
});


const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    stopLoadingNews: (state) => {
      state.newsListLoadingStatus = 'not loading'
    },
    resetComments: (state) => {
      state.comments = [];
    },
    resetNews: (state) => {
      state.currentNews = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsLinks.pending, (state) => {
        state.newsListLoadingStatus = 'loading';
      })
      .addCase(fetchNewsLinks.fulfilled, (state, action) => {
        state.newsListLoadingStatus = 'not loading';
        state.newsLinks = action.payload;
      })
      .addCase(fetchNewsLinks.rejected, (state) => {
        state.newsListLoadingStatus = 'error';
      })
      .addCase(fetchNews.pending, (state) => {
        state.newsListLoadingStatus = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action: any) => {
        state.newsList = action.payload
        state.newsListLoadingStatus = 'not loading';
      })
      .addCase(fetchNews.rejected, (state) => {
        state.newsListLoadingStatus = 'error';
      })
      .addCase(fetchNew.pending, () => {
        // state.newsListLoadingStatus = 'loading';
      })
      .addCase(fetchNew.fulfilled, (state, action: PayloadAction<INew>) => {
        // state.newsListLoadingStatus = 'not loading';
        state.currentNews = action.payload;
      })
      .addCase(fetchNew.rejected, () => {
        // state.newsListLoadingStatus = 'error';
      })
      .addCase(fetchComments.pending, () => {
        // state.newsListLoadingStatus = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action: any) => {
        // state.newsListLoadingStatus = 'not loading';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, () => {
        // state.newsListLoadingStatus = 'error';
      })
  },
});

const { actions, reducer } = newsSlice;
export const { resetComments } = actions;
export default reducer;