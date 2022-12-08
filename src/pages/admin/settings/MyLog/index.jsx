import { Button, Card, Table, Space, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { findMyLogList, delMyLogList } from "../../../../services/myLog";
import "./index.less";

const MyLog = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0); // 总条数
  const defaultPer = 10; // 默认一页显示10条
  const loadData = (page, per = defaultPer) => {
    findMyLogList(page, per).then((res) => {
      // 行数据
      setDataSource(res.data);
      setTotal(res.data.totalCount);
    });
  };
  useEffect(loadData, []); // 渲染页面时加载数据
  const columns = [
    {
      title: '序号',
      render: (text, row, index) => index + 1,
    },
    {
      title: '姓名',
      dataIndex: "name",
    },
    {
      title: '查询方式',
      dataIndex: "request",
    },
    {
      title: '查询方法',
      dataIndex: "method",
    },
    {
      title: '日志内容',
      dataIndex: "content",
    },
    {
      title: '时间',
      dataIndex: "time",
    },
    {
      title: '操作',
      render: (text, row, index) => (
        <>
          <Space>
            <Button type="default">修改</Button>
            <Popconfirm
              title="确定要删除这条数据吗?"
              onConfirm={() => confirm(row.id, index)}
              okText="Yes"
              cancelText="No"
            > {/* Popconfirm - 气泡确认框 */}
              <Button danger type="primary">删除</Button>
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];
  // 确认删除操作
  const confirm = async (_id, index) => {
    await delMyLogList(_id)
    let tempArr = [...dataSource];
    tempArr.splice(index, 1);
    setDataSource(tempArr);
  };

  return (
    <Card
      title="操作日志"
      bordered={false}
    >
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(row) => row.id}
        align="center"
        pagination={{
          onChange: loadData,
          total,
          pageSize: defaultPer,
        }} /* Pagination - 分页 */ /* 点击分页器的时候也重新进行数据加载 */
      />
    </Card>
  );
};
export default MyLog;