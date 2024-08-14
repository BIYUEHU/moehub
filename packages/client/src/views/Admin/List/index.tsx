import type { MoehubDataCharacter } from '@moehub/common'
import { Card, Flex, Popconfirm, Space, Table, notification } from 'antd'
import Column from 'antd/es/table/Column'
import ColumnGroup from 'antd/es/table/ColumnGroup'
import { Link } from 'react-router-dom'
import { deleteCharacter, getCharacters } from '@/http'
import Loading from '@/components/Loading'
import ErrorResult from '@/components/result/error'
import styles from './styles.module.css'
import useSWR from 'swr'
import { t } from '@/i18n'

const ListView: React.FC = () => {
  const { data, isLoading } = useSWR('/api/character', getCharacters)

  return (
    <div>
      <h1>{t`view.characterList.title`}</h1>
      <Flex justify="center" align="center" vertical wrap>
        <Card hoverable className="card cardFixed">
          {data ? (
            <Table
              dataSource={data.map((data) => ({ ...data, key: data.id })).sort((el1, el2) => el1.order - el2.order)}
              className={`${styles.table} cleanAll`}
            >
              <ColumnGroup title={t`view.characterList.column.characterName`}>
                <Column title={t`view.characterList.column.originalName`} dataIndex="name" key="name" />
                <Column title={t`view.characterList.column.romaji`} dataIndex="romaji" key="romaji" />
              </ColumnGroup>

              <ColumnGroup title={t`view.characterList.column.source`} responsive={['md']}>
                <Column title={t`view.characterList.column.series`} dataIndex="series" key="series" />
                <Column title={t`view.characterList.column.type`} dataIndex="seriesGenre" key="seriesGenre" />
              </ColumnGroup>
              <Column
                title={t`view.characterList.column.createdAt`}
                responsive={['md']}
                dataIndex="createdAt"
                key="createdAt"
              />
              <Column
                title={t`view.characterList.column.actions`}
                key="name"
                render={(_, data: MoehubDataCharacter) => (
                  <Space size="middle">
                    <Link to={`/admin/edit/${data.id}`}>{t`view.characterList.action.edit`}</Link>
                    <Popconfirm
                      title={t`view.characterList.delete.title`}
                      description={t`view.characterList.delete.description`}
                      onConfirm={() =>
                        deleteCharacter(data.id).then(() =>
                          notification.success({ message: t`view.characterList.delete.success` })
                        )
                      }
                      okText={t`view.characterList.delete.confirm`}
                      cancelText={t`view.characterList.delete.cancel`}
                    >
                      <span>{t`view.characterList.action.delete`}</span>
                    </Popconfirm>
                  </Space>
                )}
              />
            </Table>
          ) : isLoading ? (
            <Loading />
          ) : (
            <ErrorResult />
          )}
        </Card>
      </Flex>
    </div>
  )
}

export default ListView
