import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, DatePicker, Form, Upload, Input, InputNumber, Select, Space } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { findFundsDetail, createFunds, modifyFunds } from "../../../../services/funds";
import { serverUrl } from "../../../../config";
import moment from "moment";
import "./index.less";

const FundsEdit = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams(); // 获取路由跳转传入id
  const [sDate, setSDate] = useState('');
  // antd - Upload 上传组件
  const [imageUrl, setImageUrl] = useState(); // 存放图片
  const [loading, setLoading] = useState(false);
  // 上传文件改变时的回调
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      setImageUrl(info.file.response.info);
    }
  };
  // jsx 上传提示的组件
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  useEffect(() => {
    // 把读到的数据写入到表单元素中
    if (id) {
      findFundsDetail(id).then((res) => {
        setSDate(res.data.date ? moment(res.data.date) : null);
        setImageUrl(res.data.img);
        form.setFieldsValue(res.data);
      });
    }
  }, [id, form]);

  // 信息提交成功
  const onFinish = async (values) => {
    console.log("ok", values);
    let updateSDate = moment(sDate).format('YYYY-MM-DD');
    if (id) {
      await modifyFunds(id, { ...values, img: imageUrl, date: updateSDate }); /* 提交编辑后的产品信息 */
    } else {
      await createFunds({ ...values, img: imageUrl, date: updateSDate }); /* 提交新增后的产品信息 */
    }
    navigate("/admin/funds-list");
  };
  // 重置表格
  const onReset = () => {
    findFundsDetail(id).then((res) => {
      setSDate(res.data.date ? moment(res.data.date) : null);
      setImageUrl(res.data.img);
      form.setFieldsValue(res.data);
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("no", errorInfo);
  };

  return (
    <Card title="经费编辑" bordered={false} extra={<Button type="primary" onClick={() => navigate(-1)}>返回</Button>}>
      <Form form={form} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label="发票图片">
          <Upload
            name="file" // 传给服务器接受文件设定的key
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={`${serverUrl}/api/funds`} // 接口地址
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (uploadButton)
            }
          </Upload>
        </Form.Item>

        <Form.Item label="日期" rules={[{ required: true }]}>
          <DatePicker value={sDate} onChange={(sDate) => setSDate(sDate)} />
        </Form.Item>

        <Form.Item label="姓名" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="花销项目类型" name="content" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="买菜">买菜</Select.Option>
            <Select.Option value="停车费">停车费</Select.Option>
            <Select.Option value="油钱">油钱</Select.Option>
            <Select.Option value="车辆维修">车辆维修</Select.Option>
            <Select.Option value="生活缴费">生活缴费</Select.Option>
            <Select.Option value="其他费用">其他费用</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="花费金额" name="count" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="购买数量" name="cost" rules={[{ required: true }]}>
          <InputNumber />
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
export default FundsEdit;