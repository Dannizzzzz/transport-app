import { useNavigate } from "react-router-dom";
import { Button, Card, Table, Space, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { findFundsList, delFundsList } from "../../../../services/funds";
import "./index.less";

const FundsList = (props) => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0); // 总条数
  const defaultPer = 10; // 默认一页显示10条
  const loadData = (page, per = defaultPer) => {
    findFundsList(page, per).then((res) => {
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
      title: '图片发票',
      render: (text, row, index) => row.img ? (<img alt="主图" src={row.img} style={{ width: 50 }} />) : ("暂无图片"),
    },
    {
      title: '日期',
      dataIndex: "date",
    },
    {
      title: '姓名',
      dataIndex: "name",
    },
    {
      title: '花销项目类型',
      dataIndex: "content",
    },
    {
      title: '购买数量',
      dataIndex: "count",
    },
    {
      title: '花费金额',
      dataIndex: "cost",
    },
    {
      title: '操作',
      render: (text, row, index) => (
        <>
          <Space>
            <Button type="default" onClick={() => navigate(`/admin/funds-edit/${row.id}`)}>修改</Button>
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
    await delFundsList(_id)
    let tempArr = [...dataSource];
    tempArr.splice(index, 1);
    setDataSource(tempArr);
  };

  return (
    <Card
      title="经费管理"
      bordered={false}
      extra={
        <Button type="primary" onClick={() => navigate("/admin/funds-edit")}>新增</Button>
      }
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
export default FundsList;