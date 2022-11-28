import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Card, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../services/auth';
import { setToken } from "../../utils/localStorage";
import "./index.less";
import login_image from '../../assets/img/login-image.jpeg';

// 设置背景图片
const backStyle = {
  width: '100%',
  height: '100%',
  backgroundImage: `url(${login_image})`,
  backgroundSize: '100%, 100%',
}
const Login = (props) => {
  const navigate = useNavigate();
  const onFinish = async ({ username, password }) => {
    // 写入token
    let res = await loginApi({ username, password });
    if (res.err === 0) {
      setToken(res.token);
      message.success("您好管理员, 登录成功！");
      navigate("/");
    } else {
      message.info("登录失败, 请重试!");
    }
    navigate('/');
  };

  return (
    <div className="back" style={backStyle}>
      <Card className="login-form" bordered={false} title="后台管理系统">
        {/* Form - 登录框 */}
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          {/* 用户名 */}
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          {/* 密码 */}
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {/* 记住我 */}
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            {/* 忘记密码 */}
            <a className="login-form-forgot" href="#password">
              Forgot password
            </a>
          </Form.Item>
          {/* 登录 */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="#reg">register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;