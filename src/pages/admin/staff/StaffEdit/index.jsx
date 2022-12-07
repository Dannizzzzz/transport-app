import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Form, Upload, Input, InputNumber, Select, Space } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { findStaffDetail, createStaff, modifyStaff } from "../../../../services/staff";
import { serverUrl } from "../../../../config";
import "./index.less";

const StaffEdit = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id } = useParams(); // 获取路由跳转传入id
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
      findStaffDetail(id).then((res) => {
        setImageUrl(res.data.img);
        form.setFieldsValue(res.data);
      });
    }
  }, [id, form]);
  // 信息提交成功
  const onFinish = async (values) => {
    console.log("ok", values);
    if (id) {
      await modifyStaff(id, { ...values, img: imageUrl }); /* 提交编辑后的产品信息 */
    } else {
      await createStaff({ ...values, img: imageUrl }); /* 提交新增后的产品信息 */
    }
    navigate("/admin/staff-list");
  };
  // 重置表格
  const onReset = () => {
    findStaffDetail(id).then((res) => {
      setImageUrl(res.data.img);
      form.setFieldsValue(res.data);
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("no", errorInfo);
  };

  return (
    <Card title="员工编辑" bordered={false} extra={<Button type="primary" onClick={() => navigate(-1)}>返回</Button>}>
      <Form form={form} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label="发票图片">
          <Upload
            name="file" // 传给服务器接受文件设定的key
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={`${serverUrl}/api/staff`} // 接口地址
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (uploadButton)
            }
          </Upload>
        </Form.Item>

        <Form.Item label="员工姓名" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="职位" name="position" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="司机">司机</Select.Option>
            <Select.Option value="车队长">车队长</Select.Option>
            <Select.Option value="会计">会计</Select.Option>
            <Select.Option value="调度员">调度员</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="工资" name="salary" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="平均耗油量 ( 百分比 % )" name="oilConsumption" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item label="罚款 ( 百分比 % )" name="fine" rules={[{ required: true }]}>
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
export default StaffEdit;