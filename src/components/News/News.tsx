/* eslint-disable react/self-closing-comp */
import { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';

import Comment from '../Comment/Comment';
import { IComment, INews } from '../../types';
import { useAllFetch } from '../../hooks/useFetch';

interface NewsProps {
  currentNews: INews;
}

function News({ currentNews }: NewsProps) {
  const [comments, setComments] = useState<IComment[]>([]);

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
  }

  // if (currentNewsLoadingStatus === 'loading' || commentsLoadingStatus === 'loading') {
  //   return <Spinner />;
  // }

  return (
    <>
      <Flex justifyContent="space-between">
        <Box>
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
            {comments.length ? `Comments: ${comments.length}` : ''}
          </Heading>
        </Box>
        <Button colorScheme="blue" onClick={() => updateComments()}>
          Update
        </Button>
      </Flex>
      <Flex flexDirection="column" gap="30px" p="20px 10px">
        {comments.map((commentItem) => (
          <Comment commentItem={commentItem} key={commentItem.id} />
        ))}
      </Flex>
    </>
  );
}

export default News;
