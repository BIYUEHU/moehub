import { Alert, Button, Card, Flex, Form, Input, InputNumber, notification, Space, Switch, Tabs } from 'antd'
import type { MoehubDataSettings, MoehubDataSettingsSubmit } from '@moehub/common'
import { useDispatch, useSelector } from 'react-redux'
import { getSettings, loadSettings } from '@/store/settingsReducer'
import { useEffect } from 'react'
import { postEmail, updateSettings } from '@/http'
import { useNavigate } from 'react-router-dom'
import ListForm from '@/components/ListForm'
import { t } from '@/i18n'

const items = (isSame: boolean, testEmail: () => void) => [
  {
    key: '1',
    label: t`view.settings.websiteSettings`,
    children: (
      <>
        <Form.Item name="site_title" label={t`view.settings.siteTitle`} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="site_name" label={t`view.settings.siteName`} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="site_url" label={t`view.settings.siteUrl`} rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        {isSame ? null : (
          <>
            <Alert message={t`view.settings.urlMismatchWarning`} type="warning" showIcon closable />
            <br />
          </>
        )}
        <Form.Item name="site_logo" label={t`view.settings.siteLogo`} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label={t`view.settings.siteBackground`}>
          <ListForm name="site_backgrounds" addButtonText={t`view.settings.addImage`}>
            {(name) => (
              <Form.Item name={name} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            )}
          </ListForm>
        </Form.Item>
      </>
    )
  },
  {
    key: '2',
    label: t`view.settings.homepageSettings`,
    children: (
      <>
        <Form.Item name="home_description" label={t`view.settings.homepageDescription`}>
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label={t`view.settings.homepageButtons`}>
          <ListForm name="home_buttons" addButtonText={t`view.settings.addButton`}>
            {(key) => (
              <>
                <Form.Item name={[key, '0']} rules={[{ required: true }]}>
                  <Input placeholder={t`view.settings.buttonText`} />
                </Form.Item>
                <Form.Item name={[key, '1']} rules={[{ required: true }]}>
                  <Input placeholder={t`view.settings.buttonLink`} />
                </Form.Item>
              </>
            )}
          </ListForm>
        </Form.Item>
        <Form.Item label={t`view.settings.homepageTimeline`}>
          <ListForm name="home_timeline" addButtonText={t`view.settings.addRecord`}>
            {(key) => (
              <>
                <Form.Item name={[key, '0']} rules={[{ required: true }]}>
                  <Input placeholder={t`view.settings.time`} />
                </Form.Item>
                <Form.Item name={[key, '1']} rules={[{ required: true }]}>
                  <Input placeholder={t`view.settings.content`} />
                </Form.Item>
              </>
            )}
          </ListForm>
        </Form.Item>
        <Form.Item name="home_custom" label={t`view.settings.homepageCustomHtml`}>
          <Input.TextArea rows={5} />
        </Form.Item>
      </>
    )
  },
  {
    key: '3',
    label: t`view.settings.advancedSettings`,
    children: (
      <>
        <Form.Item name="admin_username" label={t`view.settings.adminUsername`} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="admin_email" label={t`view.settings.adminEmail`} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="custom_head_code" label={t`view.settings.customHeadCode`}>
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item name="custom_foot_code" label={t`view.settings.customFootCode`}>
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item name="google_analytics_id" label={t`view.settings.googleAnalyticsId`}>
          <Input />
        </Form.Item>
      </>
    )
  },
  {
    key: '4',
    label: t`view.settings.emailSettings`,
    children: (
      <>
        <Form.Item name="birthdays" label={t`view.settings.sendBirthdayReminders`} rules={[{ required: true }]}>
          <Switch
            checkedChildren={t`view.settings.enabled`}
            unCheckedChildren={t`view.settings.disabled`}
            defaultChecked
          />
        </Form.Item>
        <Form.Item name="smtp_host" label={t`view.settings.smtpHost`}>
          <Input />
        </Form.Item>
        <Form.Item name="smtp_port" label={t`view.settings.smtpPort`}>
          <InputNumber max={65535} min={1} />
        </Form.Item>
        <Form.Item name="smtp_email" label={t`view.settings.email`}>
          <Input />
        </Form.Item>
        <Form.Item name="smtp_key" label={t`view.settings.key`}>
          <Input />
        </Form.Item>
        <Form.Item name="smtp_hours" label={t`view.settings.sendingHour`}>
          <InputNumber max={23} min={0} />
        </Form.Item>
        <Form.Item name="smtp_target" label={t`view.settings.targetEmail`}>
          <Input />
        </Form.Item>
        <Form.Item name="smtp_template" label={t`view.settings.emailTemplate`}>
          <Input.TextArea rows={5} />
        </Form.Item>
        <Button type="primary" className="cardButton" onClick={testEmail}>
          {t`view.settings.testEmail`}
        </Button>
      </>
    )
  }
]

const SettingsView: React.FC = () => {
  const [form] = Form.useForm<MoehubDataSettings>()
  const settings = useSelector(getSettings)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => form.setFieldsValue(settings))

  async function onSubmit(values: MoehubDataSettingsSubmit) {
    const handler = (items: ([string, string] | { 0: string; 1: string })[]) =>
      items.map((item) => [item[0], item[1]]) as [string, string][]

    const data = {
      ...values,
      home_buttons: values.home_buttons ? handler(values.home_buttons) : undefined,
      home_timeline: values.home_timeline ? handler(values.home_timeline) : undefined
    }

    await updateSettings(data)
    notification.success({ message: t`view.settings.saveSuccess` })
    dispatch(loadSettings(data))
    setTimeout(() => {
      navigate(0)
    }, 500)
  }

  async function testEmail() {
    await postEmail()
    notification.success({ message: t`view.settings.testEmailSuccess` })
  }

  return (
    <div>
      <h1>{t`view.settings.systemSettings`}</h1>
      <Flex justify="center" align="center" vertical>
        <Card hoverable className="card cardFixed">
          <Form form={form} name="control-hooks" className="cardForm cleanAll" onFinish={onSubmit}>
            <Tabs defaultActiveKey="1" items={items(new URL(location.href).origin === settings.site_url, testEmail)} />
            <br />
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" className="cardButton">
                  {t`view.settings.saveSettings`}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Flex>
    </div>
  )
}

export default SettingsView
