import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, List, ListItem, Heading } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { fetchNews, fetchNewsLinks } from '../../slices/newsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import Spinner from '../Spinner/Spinner';

function NewsList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { newsList, newsLinks, newsListLoadingStatus } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(
      fetchNewsLinks(
        'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderBy="$key"&limitToFirst=100',
      ),
    );
  }, []);

  const newOnClick = (id: number) => {
    navigate(`/${id}`);
  };

  useEffect(() => {
    if (newsLinks.length) {
      const urls = newsLinks.map((newsId) => `https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`);

      const fetchPromises: Promise<Response>[] = [];
      urls.forEach((url) => {
        fetchPromises.push(fetch(url));
      });
      dispatch(fetchNews(fetchPromises));
    }
  }, [newsLinks]);

  if (newsListLoadingStatus === 'loading') {
    return <Spinner />;
  }

  return (
    <Box maxW="1200px" m="0 auto" p="20px">
      {newsList.length > 0 && newsListLoadingStatus === 'idle' ? (
        <List display="flex" flexDirection="column" gap="20px">
          {newsList.map((newsItem, index) => (
            <ListItem
              onClick={() => newOnClick(newsItem.id)}
              key={uuidv4()}
              background="blue.500"
              color="white"
              p="20px"
              borderRadius="10px"
              transition="all 0.5s ease"
              cursor="pointer"
              _hover={{ transform: 'scale(1.01)' }}
            >
              <Heading as="h2" fontWeight="700" fontSize="24px" mb="10px">
                {index + 1}. {newsItem.title}
              </Heading>
              <Heading as="h3" fontWeight="400" fontSize="16px" mb="2px">
                Author: {newsItem.by}
              </Heading>
              <Heading as="h3" fontWeight="400" fontSize="16px" mb="2px">
                Score: {newsItem.score}
              </Heading>
              <Heading as="h3" fontWeight="400" fontSize="16px" mb="2px">{`Time: ${new Date(
                newsItem.time * 1000,
              ).toLocaleString()}`}</Heading>
            </ListItem>
          ))}
        </List>
      ) : null}
    </Box>
  );
}

export default NewsList;
