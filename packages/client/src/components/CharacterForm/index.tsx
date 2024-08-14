import { Button, ColorPicker, DatePicker, Form, Input, InputNumber, Radio, Select, Space, Switch, Tabs } from 'antd'
import type { MoehubDataCharacter, MoehubDataCharacterSubmit } from '@moehub/common'
import dayjs from 'dayjs'
import { getTags } from '@/http'
import useSWR from 'swr'
import { useEffect } from 'react'
import ListForm from '../ListForm'
import { t } from '@/i18n'

export type MoehubDataCharacterHandle = Omit<MoehubDataCharacterSubmit, 'birthday' | 'color'> & {
  birthday?: dayjs.Dayjs
  color?: { toHex(): string; cleared: false | string }
}

export function handleMoehubDataCharacter(values: MoehubDataCharacterHandle): MoehubDataCharacterSubmit {
  // console.log(values.color)
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
    label: t`com.characterForm.label.1`,
    children: (
      <>
        <Form.Item name="name" label={t`com.characterForm.name`} rules={[{ required: true }]}>
          <Input disabled={isDisabled} />
        </Form.Item>
        <Form.Item name="romaji" label={t`com.characterForm.romaji`} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="gender" label={t`com.characterForm.gender`} rules={[{ required: true }]}>
          <Radio.Group>
            <Radio.Button value="MALE">{t`com.characterForm.gender.male`}</Radio.Button>
            <Radio.Button value="FEMALE">{t`com.characterForm.gender.female`}</Radio.Button>
            <Radio.Button value="OTHER">{t`com.characterForm.gender.other`}</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="series" label={t`com.characterForm.series`} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="seriesGenre" label={t`com.characterForm.seriesGenre`} rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="ANIME">{t`com.characterForm.seriesGenre.anime`}</Radio>
            <Radio value="COMIC">{t`com.characterForm.seriesGenre.comic`}</Radio>
            <Radio value="GALGAME">{t`com.characterForm.seriesGenre.galgame`}</Radio>
            <Radio value="GAME">{t`com.characterForm.seriesGenre.game`}</Radio>
            <Radio value="NOVEL">{t`com.characterForm.seriesGenre.novel`}</Radio>
            <Radio value="OTHER">{t`com.characterForm.seriesGenre.other`}</Radio>
          </Radio.Group>
        </Form.Item>
      </>
    )
  },
  {
    key: '2',
    label: t`com.characterForm.label.2`,
    children: (
      <>
        <Form.Item name="alias" label={t`com.characterForm.alias`}>
          <Select mode="tags" />
        </Form.Item>
        <Form.Item label={t`com.characterForm.images`}>
          <ListForm name="images" addButtonText={t`com.characterForm.images.button`}>
            {(name) => (
              <Form.Item name={name} rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            )}
          </ListForm>
        </Form.Item>
        <Form.Item name="description" label={t`com.characterForm.description`}>
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="hitokoto" label={t`com.characterForm.hitokoto`}>
          <Input />
        </Form.Item>
        <Form.Item name="birthday" label={t`com.characterForm.birthday`}>
          <DatePicker format="MM-DD" />
        </Form.Item>
        <Form.Item name="comment" label={t`com.characterForm.comment`}>
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item name="tags" label={t`com.characterForm.tags`}>
          <Select mode="tags" options={tags ?? []} />
        </Form.Item>
        <Form.Item name="color" label={t`com.characterForm.color`}>
          <ColorPicker showText allowClear />
        </Form.Item>
        <Form.Item name="songId" label={t`com.characterForm.songId`}>
          <InputNumber placeholder={t`com.characterForm.songId.placeholder`} min="1" />
        </Form.Item>
      </>
    )
  },
  {
    key: '3',
    label: t`com.characterForm.label.3`,
    children: (
      <>
        <Form.Item name="voice" label={t`com.characterForm.voice`}>
          <Input />
        </Form.Item>
        <Form.Item name="age" label={t`com.characterForm.age`} rules={[{ type: 'number' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="height" label={t`com.characterForm.height`} rules={[{ type: 'number' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="weight" label={t`com.characterForm.weight`} rules={[{ type: 'number' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="bust" label={t`com.characterForm.bust`} rules={[{ type: 'number' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="waist" label={t`com.characterForm.waist`} rules={[{ type: 'number' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="hip" label={t`com.characterForm.hip`} rules={[{ type: 'number' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="hairColor" label={t`com.characterForm.hairColor`}>
          <Input />
        </Form.Item>
        <Form.Item name="eyeColor" label={t`com.characterForm.eyeColor`}>
          <Input />
        </Form.Item>
        <Form.Item name="bloodType" label={t`com.characterForm.bloodType`}>
          <Radio.Group>
            <Radio value="A">{t`com.characterForm.bloodType.A`}</Radio>
            <Radio value="B">{t`com.characterForm.bloodType.B`}</Radio>
            <Radio value="AB">{t`com.characterForm.bloodType.AB`}</Radio>
            <Radio value="O">{t`com.characterForm.bloodType.O`}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="url" label={t`com.characterForm.url`}>
          <Select mode="tags" />
        </Form.Item>
        <Form.Item name="order" label={t`com.characterForm.order`} rules={[{ type: 'number' }]}>
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item name="hide" label={t`com.characterForm.hide`}>
          <Switch
            checkedChildren={t`com.characterForm.hide.checked`}
            unCheckedChildren={t`com.characterForm.hide.unchecked`}
          />
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
            {t`com.characterForm.submit`}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default CharacterForm
