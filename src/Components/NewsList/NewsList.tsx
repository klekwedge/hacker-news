import React, { useEffect } from 'react'
import { List, ListItem } from '@chakra-ui/react'
import { fetchNews, fetchSingleNew } from '../../slices/newsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/app.hook'

function NewsList() {
  const dispatch = useAppDispatch()
  const { newsList, newsRefs } = useAppSelector((state) => state.news)

  useEffect(() => {
    dispatch(
      fetchNews(
        'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty &orderBy="$key"&limitToFirst=100',
      ),
    )
  }, [])

  useEffect(() => {
    if (newsRefs.length > 0) {
      // eslint-disable-next-line array-callback-return
      newsRefs.map((newsId) => {
        dispatch(
          fetchSingleNew(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`),
        )
      })
    }
  }, [newsRefs])

  console.log(newsList)

  return (
    <h1>
      {newsList.length > 0 ? (
        <List display='flex' flexDirection='column' gap='20px'>
          {newsList.map((newsItem) => (
            <ListItem key={newsItem.id}>
              <h2>{newsItem.title}</h2>
              <h2>{newsItem.by}</h2>
              <h2>{newsItem.score}</h2>
              <h2>{newsItem.type}</h2>
              <h2>{newsItem.url}</h2>
            </ListItem>
          ))}
        </List>
      ) : null}
    </h1>
  )
}

export default NewsList
