/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import useHttp from '../hooks/useHttp';
import { IComment, INew, NewsListState } from './newsSlice.types';

const initialState: NewsListState = {
  newsRefs: [],
  newsList: [],
  newsListLoadingStatus: 'not loading',
  currentNews: null,
  comments: [],
  commentsLoadingStatus: 'not loading'
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

export const fetchComments = createAsyncThunk('news/fetchComment', (url: string) => {
  const { request } = useHttp();
  return request(url);

  // Promise.all(fetchPromises)
  // .then(responses => {
  //   // Обрабатываем ответы на запросы здесь
  //   responses.forEach(response => {
  //     if (response.ok) {
  //       // Если запрос успешен (HTTP-код 200), то обрабатываем данные
  //       response.json().then(data => {
  //         console.log(data);
  //       });
  //     } else {
  //       // В случае ошибки, обрабатываем её здесь
  //       console.error('Ошибка при запросе:', response.status);
  //     }
  //   });
  // })
  // .catch(error => {
  //   console.error('Произошла ошибка при выполнении запросов:', error);
  // });
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
      .addCase(fetchComments.pending, () => {
        // state.newsListLoadingStatus = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<IComment>) => {
        // state.newsListLoadingStatus = 'not loading';
        state.comments.push(action.payload);
      })
      .addCase(fetchComments.rejected, () => {
        // state.newsListLoadingStatus = 'error';
      })
      .addDefaultCase(() => { });
  },
});

const { actions, reducer } = newsSlice;
export const { resetComments } = actions;
export default reducer;