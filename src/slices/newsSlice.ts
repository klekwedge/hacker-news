/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import useHttp from '../hooks/http.hook';
import { IComment, INew, NewsListState } from './newsSlice.types';

const initialState: NewsListState = {
  newsRefs: [],
  newsList: [],
  newsListLoadingStatus: 'not loading',
  currentNews: null,
  comments: [],
};

export const fetchNews = createAsyncThunk('news/fetchNews', (url: string) => {
  const { request } = useHttp();
  return request(url);
});

export const fetchSingleNew = createAsyncThunk('news/fetchSingleNew', (url: string) => {
  const { request } = useHttp();
  return request(url);
});

export const fetchNew = createAsyncThunk('news/fetchNew', (url: string) => {
  const { request } = useHttp();
  return request(url);
});

export const fetchComment = createAsyncThunk('news/fetchComment', (url: string) => {
  const { request } = useHttp();
  return request(url);
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
      .addCase(fetchNews.pending, (state) => {
        state.newsListLoadingStatus = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.newsListLoadingStatus = 'not loading';
        state.newsRefs = action.payload;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.newsListLoadingStatus = 'error';
      })
      .addCase(fetchSingleNew.pending, () => {
        // state.newsListLoadingStatus = 'loading';
      })
      .addCase(fetchSingleNew.fulfilled, (state, action: PayloadAction<INew>) => {
        state.newsList.push(action.payload);
        if (state.newsList.length === 100) {
          state.newsListLoadingStatus = 'not loading';
        }
        else {
          state.newsListLoadingStatus = 'loading';
        }
      })
      .addCase(fetchSingleNew.rejected, (state) => {
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
      .addCase(fetchComment.pending, () => {
        // state.newsListLoadingStatus = 'loading';
      })
      .addCase(fetchComment.fulfilled, (state, action: PayloadAction<IComment>) => {
        // state.newsListLoadingStatus = 'not loading';
        state.comments.push(action.payload);
      })
      .addCase(fetchComment.rejected, () => {
        // state.newsListLoadingStatus = 'error';
      })
      .addDefaultCase(() => { });
  },
});

const { actions, reducer } = newsSlice;
export const { resetComments } = actions;
export default reducer;