import { Card, Flex, notification } from 'antd'
import type { MoehubDataCharacter } from '@moehub/common'
import type dayjs from 'dayjs'
import { createCharacter } from '@/http'
import CharacterForm from '@/components/CharacterForm'

const CreateView: React.FC = () => {
  function onSubmit(values: Omit<MoehubDataCharacter, 'birthday'> & { birthday: dayjs.Dayjs }) {
    const data = { ...values, birthday: values.birthday ? new Date(values.birthday.toString()).getTime() : undefined }
    createCharacter(data).then(() => notification.success({ message: '角色创建成功' }))
  }

  return (
    <div>
      <h1>角色创建</h1>
      <Flex justify="center" align="center" vertical>
        <Card hoverable className="card cardFixed">
          <CharacterForm onSubmit={onSubmit} />
        </Card>
      </Flex>
    </div>
  )
}
console.log
export default CreateView
