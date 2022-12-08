import { Button, Card, Avatar, List } from "antd";
import { useState } from "react";
import pubsub from "pubsub-js";
import "./index.less";

const Notices = (props) => {
  // 模拟假的列表数据
  const data = [
    {
      title: '黑龙江省发布第75号公告, 疫情防控...',
      content: '根据当前疫情形势变化和病毒变异情况，为科学精准落实国家第九版防控方案、二十条和新十条...'
    },
    {
      title: '哈尔滨市部分地区的风险等级调整如下...',
      content: '关于调整哈尔滨市南岗区风险等级的通告: 根据国务院联防联控机制有关的要求，经专家综合...'
    },
    {
      title: '腾亿物流集团祝您中秋快乐, 阖家团圆!',
      content: '致各位敬爱的顾客和同仁，感谢您一路以来的陪伴和支持。中秋将至，腾亿物流集团全体成员...'
    },
    {
      title: '腾亿物流集团2023年春节假期服务安排...',
      content: '致尊敬的客户: 在新春佳节即将来临之际，腾亿物流集团在此向各位致以最深切的祝福，预祝...'
    },
  ];
  const [noticesCount, setNoticesCount] = useState(4);
  const checkNotices = (val) => {
    if (val === "clear") {
      setNoticesCount(0);
      // 发布
      pubsub.publish("has-notices", 0);
    } else {
      setNoticesCount(noticesCount - val);
      // 发布
      pubsub.publish("has-notices", noticesCount - val);
    }
  };

  return (
    <Card title="通知中心" bordered={false} extra={<Button onClick={() => checkNotices("clear")}>全部已读</Button>}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={[<Button onClick={() => checkNotices(1)}>已读</Button>]}>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={<span>{item.content}</span>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};
export default Notices;