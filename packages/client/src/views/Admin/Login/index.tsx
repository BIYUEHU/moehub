import { Button, Card, Flex, Form, Input, notification } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import styles from '../styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggedIn, login } from '@/store/adminReducer'

interface LoginData {
  username: string
  password: string
}

const LoginView: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLogged = useSelector(isLoggedIn)

  useEffect(() => {
    if (isLogged) navigate('/admin')
  }, [navigate, isLogged])

  const [form] = Form.useForm<LoginData>()

  function onFinish({ username, password }: LoginData) {
    if (username === 'ArimuraSena' && password === '123456') {
      dispatch(login())
      notification.success({ message: '登录成功' })
      return
    }
    notification.error({ message: '用户名或密码错误' })
  }

  return (
    <div>
      <h1>后台登录</h1>
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
              <Button type="primary" htmlType="submit" className="cardButton">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </div>
  )
}

export default LoginView
