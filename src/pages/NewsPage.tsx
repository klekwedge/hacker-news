/* eslint-disable react/self-closing-comp */
import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Avatar, Box, Flex, Heading, Link, List, ListItem } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/app.hook'
import { fetchComment, fetchNew } from '../slices/newsSlice'

function NewsPage() {
  const { newsId } = useParams()
  const dispatch = useAppDispatch()
  const { currentNews, comments } = useAppSelector((state) => state.news)

  useEffect(() => {
    if (!currentNews) {
      dispatch(fetchNew(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`))
    }
  }, [])

  useEffect(() => {
    if (currentNews) {
      // eslint-disable-next-line array-callback-return
      currentNews.kids.map((commentId) => {
        dispatch(
          fetchComment(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`),
        )
      })
    }
  }, [currentNews])

  console.log(comments)

  //   ссылку на новость
  // счётчик количества комментариев
  // список комментариев в виде дерева

  return (
    <Box>
      {currentNews ? (
        <>
          {' '}
          <Heading as='h1' fontWeight='700' fontSize='24px' mb='10px'>
            {currentNews.title}
          </Heading>
          <Link href={currentNews.url} fontWeight='400' fontSize='16px'>
            Link to news
          </Link>
          <Heading as='h2' fontWeight='400' fontSize='16px' mb='2px'>
            Author: {currentNews.by}
          </Heading>
          <Heading as='h2' fontWeight='400' fontSize='16px' mb='2px'>
            Score: {currentNews.score}
          </Heading>
          <Heading as='h2' fontWeight='400' fontSize='16px' mb='2px'>
            {`Time: ${new Date(currentNews.time * 1000).toLocaleString()}`}
          </Heading>
          <Heading as='h2' fontWeight='400' fontSize='16px' mb='2px'>
            Comments:
          </Heading>
          <List display='flex' flexDirection='column' gap='30px' p='20px 10px'>
            {comments.map((commentItem) => (
              <ListItem key={uuidv4()} display='flex' gap="30px">
                <Avatar name={commentItem.by} />
                <Flex flexDirection='column'>
                  <Flex gap='20px' alignItems='center' mb='10px'>
                    <Heading as='h2' fontWeight='400' fontSize='16px' mb='2px'>
                      {commentItem.by}
                    </Heading>
                    <Heading as='h2' fontWeight='400' fontSize='16px' mb='2px'>
                      {`${new Date(commentItem.time * 1000).toLocaleString()}`}
                    </Heading>
                  </Flex>
                  <Heading
                    as='h3'
                    fontWeight='400'
                    fontSize='16px'
                    mb='2px'
                    dangerouslySetInnerHTML={{ __html: commentItem.text }}
                  ></Heading>
                </Flex>
              </ListItem>
            ))}
          </List>
        </>
      ) : null}
    </Box>
  )
}

export default NewsPage
