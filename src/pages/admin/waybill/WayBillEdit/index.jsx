import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, DatePicker, Form, Input, InputNumber, Select, Space } from "antd";
import { findWayBillDetail, createWayBill, modifyWayBill } from "../../../../services/waybill";
import moment from "moment";
import "./index.less";

const { Option } = Select;
const WayBillEdit = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams(); // 获取路由跳转传入id
  const [gmDate, setGMDate] = useState('');
  const [amDate, setAMDate] = useState('');

  // 地点可选项
  const placeSelector = [
    { value: '河北省', label: '河北省' }, { value: '山西省', label: '山西省' }, { value: '辽宁省', label: '辽宁省' },
    { value: '吉林省', label: '吉林省' }, { value: '黑龙江省', label: '黑龙江省' }, { value: '江苏省', label: '江苏省' },
    { value: '浙江省', label: '浙江省' }, { value: '安徽省', label: '安徽省' }, { value: '福建省', label: '福建省' },
    { value: '江西省', label: '江西省' }, { value: '山东省', label: '山东省' }, { value: '河南省', label: '河南省' },
    { value: '湖北省', label: '湖北省' }, { value: '湖南省', label: '湖南省' }, { value: '广东省', label: '广东省' },
    { value: '海南省', label: '海南省' }, { value: '四川省', label: '四川省' }, { value: '贵州省', label: '贵州省' },
    { value: '云南省', label: '云南省' }, { value: '广西省', label: '广西省' }, { value: '甘肃省', label: '甘肃省' },
    { value: '青海省', label: '青海省' }, { value: '台湾省', label: '台湾省' },
  ]
  // 电话号前缀
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+61</Option>
      </Select>
    </Form.Item>
  );

  useEffect(() => {
    // 把读到的数据写入到表单元素中
    if (id) {
      findWayBillDetail(id).then((res) => {
        setGMDate(res.data.gDate ? moment(res.data.gDate) : null);
        setAMDate(res.data.aDate ? moment(res.data.aDate) : null);
        form.setFieldsValue(res.data);
      });
    }
  }, [id, form]);

  // 信息提交成功
  const onFinish = async (values) => {
    console.log("ok", values);
    let updateGDate = moment(gmDate).format('YYYY-MM-DD');
    let updateADate = moment(amDate).format('YYYY-MM-DD');
    if (id) {
      await modifyWayBill(id, { ...values, gDate: updateGDate, aDate: updateADate }); /* 提交编辑后的产品信息 */
    } else {
      await createWayBill({ ...values, gDate: updateGDate, aDate: updateADate }); /* 提交新增后的产品信息 */
    }
    navigate("/admin/waybill-list");
  };
  // 重置表格
  const onReset = () => {
    findWayBillDetail(id).then((res) => {
      setGMDate(res.data.gDate ? moment(res.data.gDate) : null);
      setAMDate(res.data.aDate ? moment(res.data.aDate) : null);
      form.setFieldsValue(res.data);
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("no", errorInfo);
  };

  return (
    <Card title="运单编辑" bordered={false} extra={<Button type="primary" onClick={() => navigate(-1)}>返回</Button>}>
      <Form form={form} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={{ prefix: '86', }} wrapperCol={{ span: 18 }}>
        <Form.Item
          label="发车日期"
        >
          <DatePicker value={gmDate} onChange={(gmDate) => setGMDate(gmDate)} />
        </Form.Item>

        <Form.Item
          label="到车日期"
        >
          <DatePicker value={amDate} onChange={(amDate) => setAMDate(amDate)} />
        </Form.Item>

        <Form.Item
          label="去程邮路"
          name="start"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="去程邮路" options={placeSelector}></Select>
        </Form.Item>

        <Form.Item
          label="返程邮路"
          name="destination"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="返程邮路" options={placeSelector}></Select>
        </Form.Item>

        <Form.Item
          label="路单流水号"
          name="wayBillNum"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="司机姓名"
          name="driver"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="司机电话"
          name="tel"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item
          label="载重量"
          name="weight"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            <Select.Option value="s1">8.0</Select.Option>
            <Select.Option value="s2">10.0</Select.Option>
            <Select.Option value="s3">12.0</Select.Option>
            <Select.Option value="s4">15.0</Select.Option>
            <Select.Option value="s5">20.0</Select.Option>
            <Select.Option value="s6">25.0</Select.Option>
            <Select.Option value="s7">30.0</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Space wrap>
            <Button type="primary" htmlType="submit">提交</Button>
            <Button htmlType="button" onClick={onReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};
export default WayBillEdit;