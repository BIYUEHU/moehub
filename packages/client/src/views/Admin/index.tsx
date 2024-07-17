import type { MoehubDataCharacter } from '@moehub/common'
import { Button, Card, Flex, Popconfirm, Space, Table, notification } from 'antd'
import Column from 'antd/es/table/Column'
import ColumnGroup from 'antd/es/table/ColumnGroup'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCharacter, getCharacters } from '@/http'
import Loading from '@/components/Loading'
import ErrorResult from '@/components/result/error'
import styles from './styles.module.css'
import Store from '@/store'
import useSWR from 'swr'

const AdminView: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (Store.get('login') !== 'yes') {
      navigate('./login', { replace: true })
    }
  }, [navigate])

  const { data, isLoading } = useSWR('/api/character', getCharacters)

  return (
    <div>
      <h1>管理后台</h1>
      <Flex justify="center" align="center" vertical wrap>
        <Card hoverable className="card cardFixed">
          <h2>
            欢迎来到管理后台，<strong>ArimuraSena</strong>！
          </h2>
          <h2>在这里，你可以：</h2>
          <Flex justify="center" className="cardList" wrap>
            <Link to="./create">
              <Button className="cardButton" ghost>
                创建角色
              </Button>
            </Link>
          </Flex>
        </Card>
        <Card hoverable className="card cardFixed" style={{ margin: 10 }}>
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
                    <Link to={`./edit/${id}`}>编辑</Link>
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

export default AdminView
