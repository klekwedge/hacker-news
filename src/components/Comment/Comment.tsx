/* eslint-disable react/self-closing-comp */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Avatar, Button, Flex, Heading, ListItem } from '@chakra-ui/react';
import { IComment } from '../../types';
import { useAppDispatch } from '../../hooks/useRedux';
import { useAllFetch } from '../../hooks/useFetch';

interface CommentProps {
  commentItem: IComment;
}

function Comment({ commentItem }: CommentProps) {
  const [comments, setComments] = useState<IComment[]>([]);

  const getCommentsKids = () => {
    if (commentItem.kids) {
      const urls = commentItem.kids.map(
        (commentId) => `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`,
      );

      const fetchPromises: Promise<Response>[] = [];

      urls.forEach((url) => {
        fetchPromises.push(fetch(url));
      });

      const { request } = useAllFetch();

      request(fetchPromises).then((data) => setComments(data as IComment[]));
    }
  };

  return (
    <ListItem key={uuidv4()} display="flex" gap="15px">
      <Avatar name={commentItem.by} />
      <Flex flexDirection="column">
        <Flex gap="20px" alignItems="center" mb="10px">
          <Heading as="h2" fontWeight="400" fontSize="16px" mb="2px">
            {commentItem.by}
          </Heading>
          <Heading as="h2" fontWeight="400" fontSize="16px" mb="2px">
            {`${new Date(commentItem.time * 1000).toLocaleString()}`}
          </Heading>
        </Flex>
        <Heading
          as="h3"
          fontWeight="400"
          fontSize="16px"
          mb="10px"
          dangerouslySetInnerHTML={{ __html: commentItem.text }}
        />
        {commentItem.kids && (
          <Button maxW="80px" colorScheme="blue" onClick={getCommentsKids} mb='30px'>
            Else
          </Button>
        )}
        {comments.map((comment) => <Comment commentItem={comment} />)}
      </Flex>
    </ListItem>
  );
}

export default Comment;
