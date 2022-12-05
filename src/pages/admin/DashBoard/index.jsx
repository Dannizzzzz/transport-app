import { useState, useEffect } from 'react';
import { Card, Col, Row, Space, Statistic } from "antd";
import { AimOutlined, CarOutlined, RiseOutlined, PayCircleOutlined, ProfileOutlined, FormOutlined } from "@ant-design/icons";
import { Area, Line, Rose } from '@ant-design/plots';
import "./index.less";

const DashBoard = (props) => {
  // 阶梯折线图模拟数据
  const data1 = [
    { year: '自有车辆8t', value: 3 },
    { year: '自有车辆12t', value: 10 },
    { year: '自有车辆15t', value: 20 },
    { year: '自有车辆20t', value: 6 },
    { year: '外雇车辆8t', value: 4 },
    { year: '外雇车辆12t', value: 12 },
    { year: '外雇车辆15t', value: 19 },
    { year: '外雇车辆20t', value: 30 },
    { year: '邮局车辆', value: 2 },
  ];
  const config1 = {
    data: data1,
    xField: 'year',
    yField: 'value',
    stepType: 'vh',
    height: 150
  };
  // 折线图模拟数据
  const [data2, setData2] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
      .then((response) => response.json())
      .then((json) => setData2(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config2 = {
    data: data2,
    xField: 'timePeriod',
    yField: 'value',
    xAxis: {
      range: [0, 1],
    },
    height: 150
  };
  // 玫瑰图模拟数据
  const data3 = [
    { type: '1月已结算', value: 27 },
    { type: '2月已结算', value: 25 },
    { type: '3月已结算', value: 8 },
    { type: '1月未结算', value: 10 },
    { type: '2月未结算', value: 20 },
    { type: '3月未结算', value: 30 },
  ];
  const config3 = {
    data: data3,
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    radius: 0.9,
    legend: {
      position: 'bottom',
    },
  };

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {/* 第一行 */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <div className="row">
              <Statistic
                title="已结算金额"
                value={111.108}
                precisions={2}
                valueStyle={{ color: "#399" }}
              />
              <div className="color1"><AimOutlined style={{ color: "white", marginTop: 10, marginLeft: 10 }} /></div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div className="row">
              <Statistic
                title="总销售额"
                value={111.108}
                precisions={2}
                valueStyle={{ color: "#399" }}
              />
              <div className="color2"><ProfileOutlined style={{ color: "white", marginTop: 10, marginLeft: 10 }} /></div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div className="row">
              <Statistic
                title="支出费用"
                value={111.108}
                precisions={2}
                valueStyle={{ color: "#399" }}
              />
              <div className="color3"><PayCircleOutlined style={{ color: "white", marginTop: 10, marginLeft: 10 }} /></div>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div className="row">
              <Statistic
                title="利润合计"
                value={111.108}
                precisions={2}
                valueStyle={{ color: "#399" }}
              />
              <div className="color4"><RiseOutlined style={{ color: "white", marginTop: 10, marginLeft: 10 }} /></div>
            </div>
          </Card>
        </Col>
      </Row>
      {/* 第二行 */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="常用功能">
            <div className="containerL">
              <div className="leftItem">
                <div><ProfileOutlined style={{ color: "white", marginTop: 30, marginLeft: 30, fontSize: 40 }} /></div>
                <p>当月运费报表</p>
              </div>
              <div className="leftItem i2">
                <div><CarOutlined style={{ color: "white", marginTop: 30, marginLeft: 30, fontSize: 40 }} /></div>
                <p>当月油耗报表</p>
              </div>
              <div className="leftItem i3">
                <div><PayCircleOutlined style={{ color: "white", marginTop: 30, marginLeft: 30, fontSize: 40 }} /></div>
                <p>当月支出报表</p>
              </div>
              <div className="leftItem i4">
                <div><FormOutlined style={{ color: "white", marginTop: 30, marginLeft: 30, fontSize: 40 }} /></div>
                <p>当月工资报表</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <div>
            <Card title="运单管理" className="rightItem">
              <div className="item"><div>运单增加</div></div>
              <div className="item"><div>运单修改</div></div>
              <div className="item"><div>运单删除</div></div>
            </Card>
            <Card title="车辆管理" className="rightItem">
              <div className="item item2"><div>车辆增加</div></div>
              <div className="item item2"><div>车辆修改</div></div>
              <div className="item item2"><div>车辆删除</div></div>
            </Card>
            <Card title="人员考核" className="rightItem">
              <div className="item item3"><div>人员资料</div></div>
              <div className="item item3"><div>人员增加</div></div>
              <div className="item item3"><div>人员修改</div></div>
              <div className="item item3"><div>人员删除</div></div>
            </Card>
            <Card title="系统设置" className="rightItem">
              <div className="item item4"><div>公司信息</div></div>
              <div className="item item4"><div>用户信息</div></div>
              <div className="item item4"><div>系统升级</div></div>
              <div className="item item4"><div>清空缓存</div></div>
            </Card>
          </div>
        </Col>
      </Row>
      {/* 第三行 */}
      <Row gutter={16}>
        <Col span={12}>
          <Space direction="vertical" style={{ display: 'flex' }}>
            <Card title="本月业务数据统计">
              <Line {...config1} />
            </Card>
            <Card title="近十五年业务数据统计">
              <Area {...config2} />
            </Card>
          </Space>
        </Col>
        <Col span={12}>
          <Card title="本季度已结算 / 未结算">
            <Rose {...config3} />
          </Card>
        </Col>
      </Row>
    </Space>
  );
};
export default DashBoard;