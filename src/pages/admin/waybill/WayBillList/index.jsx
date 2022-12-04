import { useNavigate } from "react-router-dom";
import { Button, Card, Table, Space, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { findWayBillList, delWayBillList } from "../../../../services/waybill";
import "./index.less";

const WayBillList = (props) => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0); // 总条数
  const defaultPer = 10; // 默认一页显示10条
  const loadData = (page, per = defaultPer) => {
    findWayBillList(page, per).then((res) => {
      // 行数据
      setDataSource(res.data);
      setTotal(res.data.totalCount);
    });
  };
  useEffect(loadData, []); // 渲染页面时加载数据

  // 列数据
  const columns = [
    {
      title: '序号',
      render: (text, row, index) => index + 1,
    },
    {
      title: '发车日期',
      dataIndex: "gDate",
    },
    {
      title: '到车日期',
      dataIndex: "aDate",
    },
    {
      title: '去程邮路',
      dataIndex: "start",
    },
    {
      title: '返程邮路',
      dataIndex: "destination",
    },
    {
      title: '路单流水号',
      dataIndex: "wayBillNum",
    },
    {
      title: '司机姓名',
      dataIndex: "driver",
    },
    {
      title: '司机电话',
      dataIndex: "tel",
    },
    {
      title: '载重量',
      dataIndex: "weight",
    },
    {
      title: '操作',
      render: (text, row, index) => (
        <>
          <Space>
            <Button type="default" onClick={() => navigate(`/admin/waybill-edit/${row.id}`)}>修改</Button>
            <Popconfirm
              title="确定要删除这条路单吗?"
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
    await delWayBillList(_id)
    let tempArr = [...dataSource];
    tempArr.splice(index, 1);
    setDataSource(tempArr);
  };

  return (
    <Card
      title="运单管理"
      bordered={false}
      extra={
        <Button type="primary" onClick={() => navigate("/admin/waybill-edit")}>新增</Button>
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
export default WayBillList;