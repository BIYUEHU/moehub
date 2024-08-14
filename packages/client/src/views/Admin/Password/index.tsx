import { Button, Card, Flex, Form, Input, notification, Space } from 'antd'
import type { MoehubDataUpdateLoginSubmit } from '@moehub/common'
import { useDispatch } from 'react-redux'
import { updateLogin } from '@/http'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/store/adminReducer'
import { t } from '@/i18n'

const PasswordView: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function onSubmit(values: MoehubDataUpdateLoginSubmit & { confirmPassword: string }) {
    if (values.newPassword !== values.confirmPassword) {
      notification.warning({ message: t`view.password.passwordMismatch` })
      return
    }
    try {
      await updateLogin(values.newPassword, values.oldPassword)
      notification.success({ message: t`view.password.updateSuccess` })
      dispatch(logout())
      setTimeout(() => {
        navigate(0)
      }, 500)
    } catch {
      notification.error({ message: t`view.password.updateFailure` })
    }
  }

  return (
    <div>
      <h1>{t`view.password.changePassword`}</h1>
      <Flex justify="center" align="center" vertical>
        <Card hoverable className="card cardFixed cardSquare">
          <Form name="control-hooks" className="cardForm cleanAll" onFinish={onSubmit}>
            <Form.Item name="oldPassword" label={t`view.password.oldPassword`} rules={[{ required: true }]}>
              <Input type="password" />
            </Form.Item>
            <Form.Item name="newPassword" label={t`view.password.newPassword`} rules={[{ required: true }]}>
              <Input type="password" />
            </Form.Item>
            <Form.Item name="confirmPassword" label={t`view.password.confirmPassword`} rules={[{ required: true }]}>
              <Input type="password" />
            </Form.Item>
            <br />
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" className="cardButton">
                  {t`view.password.updatePassword`}
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
