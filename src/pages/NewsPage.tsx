import React, { useEffect } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/app.hook'
import { fetchNew } from '../slices/newsSlice'

function NewsPage() {
  const { newsId } = useParams()
  const dispatch = useAppDispatch()
  const { currentNews } = useAppSelector((state) => state.news)

  useEffect(() => {
    if (!currentNews) {
      dispatch(fetchNew(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`))
    }
  }, [])

  return (
    <Box>
      {currentNews ? (
        <>
          {' '}
          <Heading as='h2' fontWeight='700' fontSize='24px' mb='10px'>
            {currentNews.title}
          </Heading>
          <Heading as='h3' fontWeight='400' fontSize='16px' mb='2px'>
            Author: {currentNews.by}
          </Heading>
          <Heading as='h3' fontWeight='400' fontSize='16px' mb='2px'>
            Score: {currentNews.score}
          </Heading>
          <Heading as='h3' fontWeight='400' fontSize='16px' mb='2px'>
            {`Time: ${new Date(currentNews.time * 1000).toLocaleString()}`}
          </Heading>
        </>
      ) : null}
    </Box>
  )
}

export default NewsPage
