import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Box, List, ListItem, Heading } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'
import { fetchNews, fetchSingleNew, setCurrentNews } from '../../slices/newsSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/app.hook'
import { INew } from '../../slices/newsSlice.types'

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

  function test(newsItem: INew) {
    dispatch(setCurrentNews(newsItem))
  }

  return (
    <Box maxW='1200px' m='0 auto' p='20px'>
      {newsList.length > 0 ? (
        <List display='flex' flexDirection='column' gap='20px'>
          {newsList.map((newsItem, index) => (
            <ListItem
              key={uuidv4()}
              background='blue.500'
              color='white'
              p='20px'
              borderRadius='10px'
              transition='all 0.5s ease'
              _hover={{ transform: 'scale(1.02)' }}
            >
              <Heading as='h2' fontWeight='700' fontSize='24px' mb='10px'>
                <Link to={`/${newsItem.id}`} onClick={() => test(newsItem)}>
                  <span>{`${index + 1}. ${newsItem.title}`}</span>
                </Link>
              </Heading>
              <Heading as='h3' fontWeight='400' fontSize='16px' mb='2px'>
                Author: {newsItem.by}
              </Heading>
              <Heading as='h3' fontWeight='400' fontSize='16px' mb='2px'>
                Score: {newsItem.score}
              </Heading>
              <Heading as='h3' fontWeight='400' fontSize='16px' mb='2px'>{`Time: ${new Date(
                newsItem.time * 1000,
              ).toLocaleString()}`}</Heading>
            </ListItem>
          ))}
        </List>
      ) : null}
    </Box>
  )
}

export default NewsList
