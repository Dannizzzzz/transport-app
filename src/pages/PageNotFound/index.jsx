import { Button, Result } from 'antd';
import "./index.less";

const PageNotFound = (props) => {
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" href='/admin/dashboard'>Back Home</Button>}
      />
    </>
  );
};
export default PageNotFound;