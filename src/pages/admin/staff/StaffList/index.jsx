import { useNavigate } from "react-router-dom";
import { Button, Card, Table, Space, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { findStaffList, delStaffList } from "../../../../services/staff";
import "./index.less";

const StaffList = (props) => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [total, setTotal] = useState(0); // 总条数
  const defaultPer = 5; // 默认一页显示5条
  const loadData = (page, per = defaultPer) => {
    findStaffList(page, per).then((res) => {
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
      title: '员工照片',
      render: (text, row, index) => row.img ? (<img alt="主图" src={row.img} style={{ width: 50 }} />) : ("暂无图片"),
    },
    {
      title: '员工姓名',
      dataIndex: "name",
    },
    {
      title: '职位',
      dataIndex: "position",
    },
    {
      title: '工资(元)',
      dataIndex: "salary",
    },
    {
      title: '平均耗油量(%)',
      dataIndex: "oilConsumption",
    },
    {
      title: '罚款(%)',
      dataIndex: "fine",
    },
    {
      title: '操作',
      render: (text, row, index) => (
        <>
          <Space>
            <Button type="default" onClick={() => navigate(`/admin/staff-edit/${row.id}`)}>修改</Button>
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
    await delStaffList(_id)
    let tempArr = [...dataSource];
    tempArr.splice(index, 1);
    setDataSource(tempArr);
  };

  return (
    <Card
      title="经费管理"
      bordered={false}
      extra={
        <Button type="primary" onClick={() => navigate("/admin/staff-edit")}>新增</Button>
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
export default StaffList;