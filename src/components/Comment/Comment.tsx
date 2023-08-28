/* eslint-disable react/self-closing-comp */
import { v4 as uuidv4 } from 'uuid';
import { Avatar, Flex, Heading, ListItem } from '@chakra-ui/react';
import { IComment } from '../../slices/newsSlice.types';

interface CommentProps {
  commentItem: IComment;
}

function Comment({ commentItem }: CommentProps) {
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
          mb="2px"
          dangerouslySetInnerHTML={{ __html: commentItem.text }}
        />
      </Flex>
    </ListItem>
  );
}

export default Comment;
