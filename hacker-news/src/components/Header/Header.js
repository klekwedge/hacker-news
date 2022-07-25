import { Box, List, ListItem } from "@chakra-ui/react";

const Header = () => (
  <Box background="#FF6600" padding='0px 20px'>
    <List display="flex" gap="10px" padding="5px 10px"  maxW="1200px">
      <ListItem fontWeight="500">Hacker News</ListItem>
      <ListItem>new</ListItem>
      <ListItem>|</ListItem>
      <ListItem>past</ListItem>
      <ListItem>|</ListItem>
      <ListItem>comments</ListItem>
      <ListItem>|</ListItem>
      <ListItem>new</ListItem>
      <ListItem>|</ListItem>
      <ListItem>ask</ListItem>
      <ListItem>|</ListItem>
      <ListItem>jobs</ListItem>
      <ListItem color="white">{new Date().toLocaleDateString()}</ListItem>
    </List>
  </Box>
);

export default Header;
