import { Button, Card, Flex, Form, Input, InputNumber, notification, Select, Space, Switch, Tabs } from 'antd'
import type { MoehubDataSettings, MoehubDataSettingsSubmit } from '@moehub/common'
import { useDispatch, useSelector } from 'react-redux'
import { getSettings, loadSettings } from '@/store/settingsReducer'
import { useEffect } from 'react'
import { updateSettings } from '@/http'
import { useNavigate } from 'react-router-dom'
import ListForm from '@/components/ListForm'

const items = [
  {
    key: '1',
    label: '网站设置',
    children: (
      <>
        <Form.Item name="site_title" label="网站标题" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="site_name" label="网站名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="site_url" label="网站地址" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="site_backgrounds" label="网站背景" rules={[{ required: true }]}>
          <Select mode="tags" allowClear />
        </Form.Item>
        <Form.Item name="site_logo" label="网站 Logo" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </>
    )
  },
  {
    key: '2',
    label: '主页设置',
    children: (
      <>
        <Form.Item name="home_description" label="主页描述">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="主页按钮">
          <ListForm name="home_buttons" addButtonText="添加按钮">
            {(key) => (
              <>
                <Form.Item name={[key, '0']} rules={[{ required: true }]}>
                  <Input placeholder="按钮文字" />
                </Form.Item>
                <Form.Item name={[key, '1']} rules={[{ required: true }]}>
                  <Input placeholder="按钮链接" />
                </Form.Item>
              </>
            )}
          </ListForm>
        </Form.Item>
        <Form.Item label="主页时间线">
          <ListForm name="home_timeline" addButtonText="添加记录">
            {(key) => (
              <>
                <Form.Item name={[key, '0']} rules={[{ required: true }]}>
                  <Input placeholder="时间" />
                </Form.Item>
                <Form.Item name={[key, '1']} rules={[{ required: true }]}>
                  <Input placeholder="内容" />
                </Form.Item>
              </>
            )}
          </ListForm>
        </Form.Item>
        <Form.Item name="home_custom" label="主页自定义 HTML">
          <Input.TextArea rows={5} />
        </Form.Item>
      </>
    )
  },
  {
    key: '3',
    label: '高级设置',
    children: (
      <>
        <Form.Item name="admin_username" label="管理员用户名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="admin_email" label="管理员邮箱" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="custom_head_code" label="自定义头部代码">
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item name="custom_foot_code" label="自定义脚部代码">
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item name="google_analytics_id" label="Google Analytics ID">
          <Input />
        </Form.Item>
      </>
    )
  },
  {
    key: '4',
    label: '邮箱设置',
    children: (
      <>
        <Form.Item name="birthdays" label="发送角色生日提醒" rules={[{ required: true }]}>
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
        </Form.Item>
        <Form.Item name="smtp_host" label="SMTP 主机">
          <Input />
        </Form.Item>
        <Form.Item name="smtp_port" label="SMTP 端口">
          <InputNumber max={65535} min={1} />
        </Form.Item>
        <Form.Item name="smtp_email" label="SMTP 邮箱">
          <Input />
        </Form.Item>
        <Form.Item name="smtp_key" label="SMTP 密钥">
          <Input />
        </Form.Item>
        <Form.Item name="smtp_name" label="SMTP 名称">
          <Input />
        </Form.Item>
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

  function onSubmit(values: MoehubDataSettingsSubmit) {
    const handler = (items: ([string, string] | { 0: string; 1: string })[]) =>
      items.map((item) => [item[0], item[1]]) as [string, string][]
    console.log(values.site_logo, values['logo_url'])
    const data = {
      ...values,
      home_buttons: values.home_buttons ? handler(values.home_buttons) : undefined,
      home_timeline: values.home_timeline ? handler(values.home_timeline) : undefined
    }
    updateSettings(data).then(() => {
      notification.success({ message: '保存成功' })
      dispatch(loadSettings(data))
      setTimeout(() => {
        navigate(0)
      }, 500)
    })
  }

  return (
    <div>
      <h1>系统设置</h1>
      <Flex justify="center" align="center" vertical>
        <Card hoverable className="card cardFixed">
          <Form form={form} name="control-hooks" className="cardForm cleanAll" onFinish={onSubmit}>
            <Tabs defaultActiveKey="1" items={items} />
            <br />
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" className="cardButton">
                  保存设置
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
