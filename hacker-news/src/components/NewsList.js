import { Button } from "antd";
import { Divider, List, Typography } from "antd";

const NewsList = () => (
  <>
    <Button>new</Button>
    <Button>past</Button>
    <Button>comments</Button>
    <Button>ask</Button>
    <Button>show</Button>
    <Button>jobs</Button>
    <div>{new Date().toLocaleDateString}</div>
    <Divider orientation="left">Default Size</Divider>
    <List
      bordered
      dataSource={"data"}
      renderItem={(item) => <List.Item>{item}</List.Item>}
    />
  </>
);

export default NewsList;
