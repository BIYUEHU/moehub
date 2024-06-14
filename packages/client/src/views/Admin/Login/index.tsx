import { Button, Card, Flex, Form, Input, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Store from '../../../store';
import styles from '../styles.module.css';

interface LoginData {
  username: string;
  password: string;
}

const LoginView: React.FC = () => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Store.get('login') === 'yes') {
      navigate('./', { replace: true });
    }
  }, [navigate, loginSuccess]);

  const [form] = Form.useForm();

  const onFinish = ({ username, password }: LoginData) => {
    if (username === 'ArimuraSena' && password === '123456') {
      Store.set('login', 'yes');
      notification.success({ message: '登录成功' });
      setLoginSuccess(true);
      return;
    }
    notification.error({ message: '用户名或密码错误' });
  };

  return (
    <div>
      <h1>登录后台</h1>
      <Flex justify="center" align="center" vertical>
        <Card hoverable className="card cardFixed cleanAll">
          <Form form={form} name="horizontal_login" className={styles.form} onFinish={onFinish}>
            <Form.Item name="username" label="账户" rules={[{ required: true }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item name="password" label="密码" rules={[{ required: true }]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" />
            </Form.Item>
            <br />
            <Form.Item shouldUpdate>
              {() => (
                <Button type="primary" htmlType="submit" className="cardButton">
                  登录
                </Button>
              )}
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </div>
  );
};

export default LoginView;
