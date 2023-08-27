/* eslint-disable react/self-closing-comp */
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Avatar, Flex, Box, Heading, Link, List, ListItem } from '@chakra-ui/react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { GrUpdate } from 'react-icons/gr'
import { useAppDispatch, useAppSelector } from '../hooks/app.hook'
import { fetchComment, fetchNew, resetComments } from '../slices/newsSlice'

function NewsPage() {
  const { newsId } = useParams()
  const dispatch = useAppDispatch()
  const { currentNews, comments } = useAppSelector((state) => state.news)

  useEffect(() => {
    dispatch(resetComments())
    dispatch(fetchNew(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`))
  }, [newsId])


  useEffect(() => {
    if (currentNews) {
      currentNews.kids.forEach((commentId) => {
        dispatch(
          fetchComment(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`),
        )
      })
    }
  }, [currentNews])

  console.log(currentNews?.kids)
  console.log(comments)

  function updateComments() {
    if (currentNews) {
      dispatch(resetComments())
      currentNews.kids.forEach((commentId) => {
        dispatch(
          fetchComment(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`),
        )
      })
    }
  }

  return (
    <Box maxW='1200px' m='0 auto' p='20px' gap='20px'>
      <Flex gap='20px' alignItems='center' mb='30px'>
        <RouterLink to='/'>
          <BsFillArrowLeftSquareFill size='30px' />
        </RouterLink>
        <GrUpdate size='30px' cursor='pointer' onClick={() => updateComments()} />
      </Flex>
      {currentNews ? (
        <>
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
            Comments: {comments.length}
          </Heading>
          {/* список комментариев в виде дерева */}
          <List display='flex' flexDirection='column' gap='30px' p='20px 10px'>
            {comments.map((commentItem) => (
              <ListItem key={uuidv4()} display='flex' gap='30px'>
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
