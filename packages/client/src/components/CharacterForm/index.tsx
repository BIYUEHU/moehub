import { Button, ColorPicker, DatePicker, Form, Input, InputNumber, Radio, Select, Space, Tabs } from 'antd'
import type { MoehubDataCharacter, MoehubDataCharacterSubmit } from '@moehub/common'
import dayjs from 'dayjs'
import { getTags } from '@/http'
import useSWR from 'swr'
import { useEffect } from 'react'
import ListForm from '../ListForm'

export type MoehubDataCharacterHandle = Omit<MoehubDataCharacterSubmit, 'birthday' | 'color'> & {
  birthday?: dayjs.Dayjs
  color?: { toHex(): string; cleared: false | string }
}

export function handleMoehubDataCharacter(values: MoehubDataCharacterHandle): MoehubDataCharacterSubmit {
  console.log(values.color)
  return {
    ...values,
    color: values.color ? (values.color.cleared === false ? values.color.toHex() : '') : undefined,
    birthday: values.birthday ? new Date(values.birthday.toString()).getTime() : undefined
  }
}

interface CharacterFormProps {
  onSubmit: (values: MoehubDataCharacterHandle) => void
  data?: MoehubDataCharacter
}

const items = (isDisabled: boolean, tags?: { label: string; value: string }[]) => [
  {
    key: '1',
    label: '基本信息',
    children: (
      <>
        <Form.Item name="name" label="角色名" rules={[{ required: true }]}>
          <Input disabled={isDisabled} />
        </Form.Item>
        <Form.Item name="romaji" label="罗马音" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="性别" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio.Button value="MALE">男性</Radio.Button>
            <Radio.Button value="FEMALE">女性</Radio.Button>
            <Radio.Button value="OTHER">其它/未知</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="series" label="作品名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="seriesGenre" label="作品类型" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="ANIME">动画</Radio>
            <Radio value="COMIC">漫画</Radio>
            <Radio value="GALGAME">Galgame</Radio>
            <Radio value="GAME">游戏</Radio>
            <Radio value="NOVEL">轻小说</Radio>
            <Radio value="OTHER">其它</Radio>
          </Radio.Group>
        </Form.Item>
      </>
    )
  },
  {
    key: '2',
    label: '详细信息',
    children: (
      <>
        <Form.Item name="alias" label="角色别名">
          <Select mode="tags" />
        </Form.Item>
        <Form.Item label="相关图片">
          <ListForm name="images" addButtonText="添加图片链接">
            {(name) => (
              <Form.Item name={name} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            )}
          </ListForm>
        </Form.Item>
        <Form.Item name="description" label="描述">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="hitokoto" label="一言">
          <Input />
        </Form.Item>
        <Form.Item name="birthday" label="生日">
          <DatePicker format="MM-DD" />
        </Form.Item>
        <Form.Item name="comment" label="评价">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="tags" label="萌点">
          <Select mode="tags" options={tags ?? []} />
        </Form.Item>
        <Form.Item name="color" label="代表色">
          <ColorPicker showText allowClear />
        </Form.Item>
        <Form.Item name="songId" label="主题曲">
          <InputNumber placeholder="请输入网易云歌曲 ID，如：2077744392" min="1" />
        </Form.Item>
      </>
    )
  },
  {
    key: '3',
    label: '其它信息',
    children: (
      <>
        <Form.Item name="voice" label="声优">
          <Input />
        </Form.Item>
        <Form.Item name="age" label="年龄" rules={[{ type: 'number' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="height" label="身高" rules={[{ type: 'number' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="weight" label="体重" rules={[{ type: 'number' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="bust" label="胸围" rules={[{ type: 'number' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="waist" label="腰围" rules={[{ type: 'number' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="hip" label="臀围" rules={[{ type: 'number' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="hairColor" label="发色">
          <Input />
        </Form.Item>
        <Form.Item name="eyeColor" label="瞳色">
          <Input />
        </Form.Item>
        <Form.Item name="bloodType" label="血型">
          <Radio.Group>
            <Radio value="A">A 型</Radio>
            <Radio value="B">B 型</Radio>
            <Radio value="AB">AB 型</Radio>
            <Radio value="O">O 型</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="url" label="相关链接">
          <Select mode="tags" />
        </Form.Item>
      </>
    )
  }
]

const CharacterForm: React.FC<CharacterFormProps> = ({ onSubmit, data }) => {
  const [form] = Form.useForm<MoehubDataCharacterHandle>()

  useEffect(() => {
    if (data)
      form.setFieldsValue(
        (data.birthday ? { ...data, birthday: dayjs(data.birthday) } : data) as unknown as MoehubDataCharacterHandle
      )
  }, [form, data])

  const { data: tags } = useSWR('/api/tags', async () => {
    return (await getTags()).data.map((tag) => ({ label: tag.name, value: tag.name }))
  })

  return (
    <Form form={form} name="control-hooks" className="cardForm cleanAll" onFinish={onSubmit}>
      <Tabs defaultActiveKey="1" items={items(!!data, tags)} />
      <br />
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" className="cardButton">
            提交
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default CharacterForm
