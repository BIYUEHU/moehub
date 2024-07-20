import { Button, Card, Flex, Form, Input, notification, Space } from 'antd'
import type { MoehubDataUpdateLoginSubmit } from '@moehub/common'
import { useDispatch } from 'react-redux'
import { updateLogin } from '@/http'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/store/adminReducer'

const PasswordView: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function onSubmit(values: MoehubDataUpdateLoginSubmit & { confirmPassword: string }) {
    if (values.newPassword !== values.confirmPassword) {
      notification.warning({ message: '新密码与确认密码不一致！' })
      return
    }
    try {
      await updateLogin(values.newPassword, values.oldPassword)
      notification.success({ message: '更新成功，正在跳转至登录页...' })
      dispatch(logout())
      setTimeout(() => {
        navigate(0)
      }, 500)
    } catch {
      notification.error({ message: '更新失败，密码错误' })
    }
  }

  return (
    <div>
      <h1>密码修改</h1>
      <Flex justify="center" align="center" vertical>
        <Card hoverable className="card cardFixed cardSquare">
          <Form name="control-hooks" className="cardForm cleanAll" onFinish={onSubmit}>
            <Form.Item name="oldPassword" label="旧密码" rules={[{ required: true }]}>
              <Input type="password" />
            </Form.Item>
            <Form.Item name="newPassword" label="新密码" rules={[{ required: true }]}>
              <Input type="password" />
            </Form.Item>
            <Form.Item name="confirmPassword" label="确认密码" rules={[{ required: true }]}>
              <Input type="password" />
            </Form.Item>
            <br />
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" className="cardButton">
                  更新密码
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </div>
  )
}

export default PasswordView
