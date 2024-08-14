import { Card, Flex, notification } from 'antd'
import { createCharacter } from '@/http'
import CharacterForm, { handleMoehubDataCharacter } from '@/components/CharacterForm'
import type { MoehubDataCharacterHandle } from '@/components/CharacterForm'
import { useNavigate } from 'react-router-dom'
import { t } from '@/i18n'

const CreateView: React.FC = () => {
  const navigate = useNavigate()

  async function onSubmit(values: MoehubDataCharacterHandle) {
    await createCharacter(handleMoehubDataCharacter(values))
    notification.success({ message: t`view.characterCreate.success` })
    setTimeout(() => navigate(0), 500)
  }

  return (
    <div>
      <h1>{t`view.characterCreate.title`}</h1>
      <Flex justify="center" align="center" vertical>
        <Card hoverable className="card cardFixed">
          <CharacterForm onSubmit={onSubmit} />
        </Card>
      </Flex>
    </div>
  )
}

export default CreateView
