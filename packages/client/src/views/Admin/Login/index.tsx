import { Button, Card, Flex, Form, Input, notification } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getToken, login } from '@/store/adminReducer'
import { postLogin } from '@/http'
import { t } from '@/i18n'

interface LoginData {
  email: string
  password: string
}

const LoginView: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLogged = !!useSelector(getToken)

  useEffect(() => {
    if (!isLogged) return
    navigate('/admin')
    // biome-ignore lint:
    window.location = window.location
  }, [navigate, isLogged])

  const [form] = Form.useForm<LoginData>()

  async function onSubmit({ email, password }: LoginData) {
    try {
      const { token } = await postLogin(email, password)
      dispatch(login(token))
      notification.success({ message: t`view.login.success` })
    } catch {
      notification.error({ message: t`view.login.error` })
    }
  }

  return (
    <div>
      <h1>{t`view.login.title`}</h1>
      <Flex justify="center" align="center" vertical>
        <Card hoverable className="card cardFixed cleanAll cardSquare">
          <Form form={form} name="horizontal_login" onFinish={onSubmit}>
            <Form.Item name="email" label={t`view.login.email`} rules={[{ required: true }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item name="password" label={t`view.login.password`} rules={[{ required: true }]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" />
            </Form.Item>
            <br />
            <Form.Item shouldUpdate>
              <Button type="primary" htmlType="submit" className="cardButton">
                {t`view.login.button`}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </div>
  )
}

export default LoginView
