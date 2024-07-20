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

const ListView: React.FC = () => {
  const { data, isLoading } = useSWR('/api/character', getCharacters)

  return (
    <div>
      <h1>角色列表</h1>
      <Flex justify="center" align="center" vertical wrap>
        <Card hoverable className="card cardFixed">
          {data ? (
            <Table dataSource={data.map((data) => ({ ...data, key: data.id }))} className={`${styles.table} cleanAll`}>
              <ColumnGroup title="角色名">
                <Column title="原名" dataIndex="name" key="name" />
                <Column title="罗马音" dataIndex="romaji" key="romaji" />
              </ColumnGroup>

              <ColumnGroup title="来源" responsive={['md']}>
                <Column title="作品" dataIndex="series" key="series" />
                <Column title="类型" dataIndex="seriesGenre" key="seriesGenre" />
              </ColumnGroup>
              <Column title="创建时间" responsive={['md']} dataIndex="createdAt" key="createdAt" />
              <Column
                title="操作"
                key="name"
                render={(_, { id }: MoehubDataCharacter) => (
                  <Space size="middle">
                    <Link to={`/admin/edit/${id}`}>编辑</Link>
                    <Popconfirm
                      title="删除角色"
                      description="确定要删除这个角色吗?"
                      onConfirm={() =>
                        deleteCharacter(id).then(() => notification.success({ message: '角色删除成功！' }))
                      }
                      okText="Yes"
                      cancelText="No"
                    >
                      <span>删除</span>
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
