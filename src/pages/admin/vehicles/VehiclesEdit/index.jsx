import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, DatePicker, Form, Upload, Input, InputNumber, Select, Space } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { findVehicleDetail, createVehicle, modifyVehicle } from "../../../../services/vehicles";
import { serverUrl } from "../../../../config";
import moment from "moment";
import "./index.less";

const VehiclesEdit = (props) => {
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
      findVehicleDetail(id).then((res) => {
        setSDate(res.data.service ? moment(res.data.service) : null);
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
      await modifyVehicle(id, { ...values, img: imageUrl, service: updateSDate }); /* 提交编辑后的产品信息 */
    } else {
      await createVehicle({ ...values, img: imageUrl, service: updateSDate }); /* 提交新增后的产品信息 */
    }
    navigate("/admin/vehicles-list");
  };
  // 重置表格
  const onReset = () => {
    findVehicleDetail(id).then((res) => {
      setSDate(res.data.service ? moment(res.data.service) : null);
      form.setFieldsValue(res.data);
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("no", errorInfo);
  };

  return (
    <Card title="车辆编辑" bordered={false} extra={<Button type="primary" onClick={() => navigate(-1)}>返回</Button>}>
      <Form form={form} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item label="车辆图片">
          <Upload
            name="file" // 传给服务器接受文件设定的key
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={`${serverUrl}/api/vehicles`} // 接口地址
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (uploadButton)
            }
          </Upload>
        </Form.Item>

        <Form.Item
          label="车牌号码"
          name="license"
          rules={[
            { required: true, message: "请输入车牌号码信息" },
            { min: 5, max: 6, message: "车牌号码不少于5位, 不超过6位" },
            { pattern: new RegExp(/[A-Z]{1,2}[0-9]{3,4}/), message: "车牌号码格式不符合规范" }
          ]}>
          <Input />
        </Form.Item>

        <Form.Item label="额定载重量" name="load" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="8.0">8.0</Select.Option>
            <Select.Option value="10.0">10.0</Select.Option>
            <Select.Option value="12.0">12.0</Select.Option>
            <Select.Option value="15.0">15.0</Select.Option>
            <Select.Option value="20.0">20.0</Select.Option>
            <Select.Option value="25.0">25.0</Select.Option>
            <Select.Option value="30.0">30.0</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="自有车辆 / 外雇车辆" name="belonging" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="自有车辆">自有车辆</Select.Option>
            <Select.Option value="外雇车辆">外雇车辆</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="上次检修日期" rules={[{ required: true }]}>
          <DatePicker value={sDate} onChange={(sDate) => setSDate(sDate)} />
        </Form.Item>

        <Form.Item label="车辆品牌" name="brand" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="最高车速"
          name="speed"
          rules={[
            { required: true, type: "number", message: "请输入最高车速" },
            { type: "number", message: "车速必须为数字形式" },
            { min: 50, max: 100, message: "车速范围在50-100" }
          ]}>
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
export default VehiclesEdit;