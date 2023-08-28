/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useAllFetch, useFetch } from '../hooks/useFetch';
import { NewsListState } from './newsSlice.types';
import { INews } from '../types';

const initialState: NewsListState = {
  newsLinks: [],
  newsList: [],
  newsListLoadingStatus: 'loading',
  currentNews: null,
  currentNewsLoadingStatus: 'loading',
  comments: [],
  commentsLoadingStatus: 'loading',
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
      state.newsListLoadingStatus = 'idle'
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
        state.newsListLoadingStatus = 'idle';
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
        state.newsListLoadingStatus = 'idle';
      })
      .addCase(fetchNews.rejected, (state) => {
        state.newsListLoadingStatus = 'error';
      })
      .addCase(fetchNew.pending, (state) => {
        state.currentNewsLoadingStatus = 'loading';
      })
      .addCase(fetchNew.fulfilled, (state, action: PayloadAction<INews>) => {
        state.currentNewsLoadingStatus = 'idle';
        state.currentNews = action.payload;
      })
      .addCase(fetchNew.rejected, (state) => {
        state.currentNewsLoadingStatus = 'error';
      })
      .addCase(fetchComments.pending, (state) => {
        state.commentsLoadingStatus = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action: any) => {
        state.commentsLoadingStatus = 'idle';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.commentsLoadingStatus = 'error';
      })
  },
});

const { actions, reducer } = newsSlice;
export const { resetComments } = actions;
export default reducer;