/* eslint-disable react/self-closing-comp */
import { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Link, Spinner } from '@chakra-ui/react';

import Comment from '../Comment/Comment';
import { IComment, INews } from '../../types';
import { useAllFetch } from '../../hooks/useFetch';

interface NewsProps {
  currentNews: INews;
}

function News({ currentNews }: NewsProps) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);

  useEffect(() => {
    if (currentNews && currentNews.kids) {
      setIsCommentsLoading(true);
      const urls = currentNews.kids.map(
        (commentId) => `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`,
      );

      const fetchPromises: Promise<Response>[] = [];

      urls.forEach((url) => {
        fetchPromises.push(fetch(url));
      });

      const { request } = useAllFetch();

      request(fetchPromises).then((data) => {
        setComments(data as IComment[]);
        setIsCommentsLoading(false);
      });
    }
  }, [currentNews]);

  function updateComments() {
    setIsCommentsLoading(true);
    if (currentNews && currentNews.kids) {
      const urls = currentNews.kids.map(
        (commentId) => `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`,
      );

      const fetchPromises: Promise<Response>[] = [];

      urls.forEach((url) => {
        fetchPromises.push(fetch(url));
      });

      const { request } = useAllFetch();

      request(fetchPromises).then((data) => {
        setComments(data as IComment[]);
        setIsCommentsLoading(false);
      });
    }
  }

  return (
    <>
      <Flex justifyContent="space-between" mb="30px" flexWrap='wrap' gap='20px'>
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
            {comments.length ? `Comments: ${comments.length}` : 'Comments: loading...'}
          </Heading>
        </Box>
        <Button colorScheme="blue" onClick={() => updateComments()}>
          Update
        </Button>
      </Flex>
      {isCommentsLoading ? (
        <Flex justifyContent='center'>
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Flex flexDirection="column" gap="30px">
          {comments.map((commentItem) => (
            <Comment commentItem={commentItem} key={commentItem.id} />
          ))}
        </Flex>
      )}
    </>
  );
}

export default News;
