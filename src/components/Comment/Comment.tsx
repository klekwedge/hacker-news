/* eslint-disable react/self-closing-comp */
import { useState } from 'react';
import { Avatar, Flex, Heading, Accordion, AccordionItem, AccordionButton, AccordionPanel, Spinner } from '@chakra-ui/react';
import { IComment } from '../../types';
import { useAllFetch } from '../../hooks/useFetch';

interface CommentProps {
  commentItem: IComment;
}

function Comment({ commentItem }: CommentProps) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);

  const getCommentsKids = () => {
    if (commentItem.kids && !comments.length) {
      setIsCommentsLoading(true);

      const urls = commentItem.kids.map(
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
  };

  return (
    <Flex gap="15px">
      <Avatar name={commentItem.by} />
      <Flex flexDirection="column">
        <Flex gap="20px" alignItems="center" mb="10px">
          <Heading as="h2" fontWeight="500" fontSize="20px" mb="2px">
            {commentItem.by}
          </Heading>
          <Heading as="h2" fontWeight="400" fontSize="14px" color="gray.500" mb="2px">
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
          <Accordion border="transparent" allowToggle>
            <AccordionItem>
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    _expanded={{ bg: 'blue.500', color: 'white' }}
                    display="inline"
                    maxW="150px"
                    background="teal.500"
                    _hover={{
                      background: 'teal.600',
                      color: 'white',
                    }}
                    borderRadius="5px"
                    color="white"
                    onClick={getCommentsKids}
                    mb="30px"
                  >
                    {isExpanded ? 'Close comments' : 'Open comments'}
                  </AccordionButton>
                  <AccordionPanel p="0">
                    {isCommentsLoading ? (
                      <Flex justifyContent="center">
                        <Spinner size="xl" />
                      </Flex>
                    ) : (
                      comments.map((comment) => <Comment commentItem={comment} key={comment.id} />)
                    )}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        )}
      </Flex>
    </Flex>
  );
}

export default Comment;
