import { Card, Flex, notification } from 'antd'
import { useParams } from 'react-router-dom'
import { getCharacter, updateCharacter } from '@/http'
import Loading from '@/components/Loading'
import useSWR from 'swr'
import CharacterForm from '@/components/CharacterForm'
import { handleMoehubDataCharacter, type MoehubDataCharacterHandle } from '@/components/CharacterForm'
import ErrorResult from '@/components/result/error'
import { t } from '@/i18n'

const EditView: React.FC = () => {
  const { id: characterId } = useParams()

  const { data, error } = useSWR(`/api/character/${characterId}`, () => getCharacter(Number(characterId)))

  async function onSubmit(values: MoehubDataCharacterHandle) {
    await updateCharacter(Number(characterId), handleMoehubDataCharacter(values))
    notification.success({ message: t`view.characterEdit.success` })
  }

  return (
    <div>
      <h1>{t`view.characterEdit.title`}</h1>
      <Flex justify="center" align="center" vertical>
        <Card hoverable className="card cardFixed cleanAll">
          {data ? <CharacterForm onSubmit={onSubmit} data={data} /> : error ? <ErrorResult /> : <Loading />}
        </Card>
      </Flex>
    </div>
  )
}

export default EditView
