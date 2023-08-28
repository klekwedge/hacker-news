/* eslint-disable react/self-closing-comp */
import { useEffect, useState } from 'react';
import { Flex, Box, Heading, Link, List, Button } from '@chakra-ui/react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchNew } from '../slices/newsSlice';
import Comment from '../components/Comment/Comment';
import Spinner from '../components/Spinner/Spinner';
import { IComment } from '../types';
import { useAllFetch } from '../hooks/useFetch';

function NewsPage() {
  const { newsId } = useParams();
  const dispatch = useAppDispatch();
  const [comments, setComments] = useState<IComment[]>([]);
  const { currentNews, currentNewsLoadingStatus, commentsLoadingStatus } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNew(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`));
  }, [newsId]);

  useEffect(() => {
    if (currentNews && currentNews.kids) {
      const urls = currentNews.kids.map(
        (commentId) => `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`,
      );

      const fetchPromises: Promise<Response>[] = [];

      urls.forEach((url) => {
        fetchPromises.push(fetch(url));
      });

      const { request } = useAllFetch();

      request(fetchPromises).then((data) => setComments(data as IComment[]));
    }
  }, [currentNews]);

  function updateComments() {
    // if (currentNews && currentNews.kids) {
    //   dispatch(resetComments());
    //   const urls = currentNews.kids.map(
    //     (commentId) => `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`,
    //   );
    //   const fetchPromises: Promise<Response>[] = [];
    //   urls.forEach((url) => {
    //     fetchPromises.push(fetch(url));
    //   });
    //   dispatch(fetchComments(fetchPromises));
    // }
  }

  // if (currentNewsLoadingStatus === 'loading' || commentsLoadingStatus === 'loading') {
  //   return <Spinner />;
  // }

  return (
    <Box maxW="1200px" m="0 auto" p="20px" gap="20px">
      <Flex gap="20px" alignItems="center" mb="30px" justifyContent="space-between">
        <RouterLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <BsFillArrowLeftSquareFill size={30} /> Back to the main
        </RouterLink>
        <Button colorScheme="blue" onClick={() => updateComments()}>
          Update
        </Button>
      </Flex>
      {currentNews ? (
        <>
          <Heading as="h1" fontWeight="700" fontSize="24px" mb="10px">
            {currentNews.title}
          </Heading>
          <Link href={currentNews.url} fontWeight="400" fontSize="16px">
            Link to news
          </Link>
          <Heading as="h2" fontWeight="400" fontSize="16px" mb="2px">
            Author: {currentNews.by}
          </Heading>
          <Heading as="h2" fontWeight="400" fontSize="16px" mb="2px">
            Score: {currentNews.score}
          </Heading>
          <Heading as="h2" fontWeight="400" fontSize="16px" mb="2px">
            {`Time: ${new Date(currentNews.time * 1000).toLocaleString()}`}
          </Heading>
          <Heading as="h2" fontWeight="400" fontSize="16px" mb="2px">
            Comments: {comments.length}
          </Heading>
          <Flex flexDirection="column" gap="30px" p="20px 10px">
            {comments.map((commentItem) => (
              <Comment commentItem={commentItem} key={commentItem.id} />
            ))}
          </Flex>
        </>
      ) : null}
    </Box>
  );
}

export default NewsPage;
