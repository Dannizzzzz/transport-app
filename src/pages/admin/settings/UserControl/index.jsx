import { Button, Card, Table, Space, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { findUserControlList, delUserControlList } from "../../../../services/userControl";
import "./index.less";

const UserControl = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0); // 总条数
  const defaultPer = 4; // 默认一页显示4条
  const loadData = (page, per = defaultPer) => {
    findUserControlList(page, per).then((res) => {
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
      title: '身份',
      dataIndex: "role",
    },
    {
      title: '联系方式',
      dataIndex: "tel",
    },
    {
      title: '允许访问',
      dataIndex: "permission",
      render: (text, row, index) => row.permission ? (
        <ul style={{ listStyle: "none", marginBottom: 0 }}>
          {row.permission.map((val, index_i) =>
          (
            <li style={{ display: "inline", border: "1px solid green", borderRadius: "5px", marginRight: "10px", padding: "5px" }} key={index_i}>
              {val}
            </li>
          )
          )}
        </ul>
      ) : ("暂无访问权限"),
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
    await delUserControlList(_id)
    let tempArr = [...dataSource];
    tempArr.splice(index, 1);
    setDataSource(tempArr);
  };

  return (
    <Card
      title="用户管理"
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
export default UserControl;