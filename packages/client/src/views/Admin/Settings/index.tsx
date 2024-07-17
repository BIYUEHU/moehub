import { Button, Card, Flex, Form, Input, InputNumber, Radio, Select, Space, Tabs } from 'antd'
import Loading from '@/components/Loading'
import useSWR from 'swr'
import { getSettings } from '@/http'
import ErrorResult from '@/components/result/error'
import { useEffect } from 'react'
import type { MoehubDataSettings } from '@moehub/common'

const EditView: React.FC = () => {
  const [form] = Form.useForm<MoehubDataSettings>()

  const { data, error } = useSWR('/api/user', getSettings)

  useEffect(() => {
    if (data) form.setFieldsValue(data)
  }, [form, data])

  function onSubmit() {}

  return (
    <div>
      <h1>设置</h1>
      <Flex justify="center" align="center" vertical>
        <Card hoverable className="card cardFixed">
          {data ? (
            <Form form={form} name="control-hooks" className="cardForm cleanAll" onFinish={onSubmit}>
              <Tabs
                defaultActiveKey="1"
                items={[
                  {
                    key: '1',
                    label: '网站设置',
                    children: (
                      /* 
                        "data": {
    "site_title": "MoeHub",
    "site_name": "Moe Hub",
    "site_url": "http://127.0.0.1",
    "site_description": "Here is website description",
    "admin_username": "Arimura Sena",
    "admin_email": "me@hotaru.icu",
    "site_keywords": "xxx",
    "logo_url": "https://biyuehu.github.io/images/avatar.pnghttps://biyuehu.github.io/images/avatar.png",
    "favicon_url": "https://biyuehu.github.io/images/avatar.png",
    "google_analytics_id": "11",
    "smtp_host": "smtp.qq.com",
    "smtp_port": 465,
    "smtp_email": "huliapi@qq.com",
    "smtp_key": "leqpcpzcijpmdfbd",
    "smtp_name": "HotaruHelper",
    "birthdays": true,
    "site_backgrounds": [
      "https://himeno-sena.com/pic10.jpg"
    ]
  } */
                      <>
                        <Form.Item name="site_title" label="网站标题">
                          <Input />
                        </Form.Item>
                        <Form.Item name="site_name" label="网站名称">
                          <Input />
                        </Form.Item>
                        <Form.Item name="site_url" label="网站地址">
                          <Input />
                        </Form.Item>
                        <Form.Item name="site_description" label="网站描述">
                          <Input.TextArea />
                        </Form.Item>
                        <Form.Item name="site_keywords" label="网站关键词">
                          <Input />
                        </Form.Item>
                        <Form.Item name="logo_url" label="网站Logo">
                          <Input />
                        </Form.Item>
                        <Form.Item name="favicon_url" label="网站Favicon">
                          <Input />
                        </Form.Item>
                        <Form.Item name="google_analytics_id" label="Google Analytics ID">
                          <Input />
                        </Form.Item>
                        <Form.Item name="site_backgrounds" label="网站背景">
                          <Select mode="tags" />
                        </Form.Item>
                      </>
                    )
                  },
                  {
                    key: '2',
                    label: '登录设置',
                    children: (
                      <>
                        <Form.Item name="admin_username" label="管理员用户名">
                          <Input />
                        </Form.Item>
                        <Form.Item name="admin_email" label="管理员邮箱">
                          <Input />
                        </Form.Item>
                      </>
                    )
                  },
                  {
                    key: '3',
                    label: '邮箱设置',
                    children: (
                      <>
                        <Form.Item name="smtp_host" label="SMTP 主机">
                          <Input />
                        </Form.Item>
                        <Form.Item name="smtp_port" label="SMTP 端口">
                          <InputNumber />
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
                        <Form.Item name="birthdays" label="发送角色生日提醒">
                          <Radio.Group>
                            <Radio value={true}>显示</Radio>
                            <Radio value={false}>隐藏</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </>
                    )
                  }
                ]}
              />
              <br />
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" className="cardButton">
                    保存设置
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          ) : error ? (
            <ErrorResult />
          ) : (
            <Loading />
          )}
        </Card>
      </Flex>
    </div>
  )
}

export default EditView
