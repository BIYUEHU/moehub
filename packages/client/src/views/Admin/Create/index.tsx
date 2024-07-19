import { Card, Flex, notification } from 'antd'
import { createCharacter } from '@/http'
import CharacterForm, { handleMoehubDataCharacter } from '@/components/CharacterForm'
import type { MoehubDataCharacterHandle } from '@/components/CharacterForm'
import { useNavigate } from 'react-router-dom'

const CreateView: React.FC = () => {
  const navigate = useNavigate()

  function onSubmit(values: MoehubDataCharacterHandle) {
    createCharacter(handleMoehubDataCharacter(values)).then(() => {
      notification.success({ message: '角色创建成功' })
      setTimeout(() => navigate(0), 500)
    })
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
