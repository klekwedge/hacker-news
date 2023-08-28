/* eslint-disable react/self-closing-comp */
import { useEffect } from 'react';
import { Flex, Box, Button } from '@chakra-ui/react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchNew } from '../slices/newsSlice';
import News from '../components/News/News';
import Spinner from '../components/Spinner/Spinner';

function NewsPage() {
  const { newsId } = useParams();
  const dispatch = useAppDispatch();
  const { currentNews, currentNewsLoadingStatus } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNew(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`));
  }, [newsId]);

  if (currentNewsLoadingStatus === 'loading') {
    return <Spinner />;
  }

  return (
    <Box maxW="1200px" m="0 auto" p="20px" gap="20px">
      <Flex gap="20px" alignItems="center" mb="30px" justifyContent="space-between">
        <RouterLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <BsFillArrowLeftSquareFill size={30} /> Back to the main
        </RouterLink>
      </Flex>
      {currentNews ? <News currentNews={currentNews} /> : null}
    </Box>
  );
}

export default NewsPage;
