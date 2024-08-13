import { Button, Card, Col, Flex, Modal, Row, Statistic } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSettings } from '@/store/settingsReducer'
import { logout } from '@/store/adminReducer'
import { useEffect, useState } from 'react'
import { BookOutlined, FireOutlined, StarOutlined, TagsOutlined } from '@ant-design/icons'
import useSWR from 'swr'
import { getCharacters, getCollections } from '@/http'
import ErrorResult from '@/components/result/error'
import Loading from '@/components/Loading'

const AdminView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { admin_username } = useSelector(getSettings)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: characters, error: errorCharacters } = useSWR('/api/characters', getCharacters)
  const { data: collections, error: errorCollections } = useSWR('/api/collections', getCollections)
  const [characterTotal, setCharacterTotal] = useState<number>()
  const [tagsTotal, setTagsTotal] = useState<number>()
  const [seriesTotal, setSeriesTotal] = useState<number>()
  const [collectionTotal, setCollectionTotal] = useState<number>()

  useEffect(() => {
    if (!characters || !collections) return
    setCharacterTotal(characters.length)
    const series = new Set<string>()
    const tags = new Set<string>()

    for (const character of characters) {
      series.add(character.series)
      if (!character.tags) continue
      for (const tag of character.tags) tags.add(tag)
    }

    setSeriesTotal(series.size)
    setTagsTotal(tags.size)
    setCollectionTotal(collections.length)
  }, [characters, collections])

  function logoutOk() {
    setIsModalOpen(false)
    dispatch(logout())
    navigate('/admin/login')
  }

  return (
    <div>
      <h1>管理中心</h1>
      <Flex justify="center" align="center" vertical wrap>
        <Card hoverable className="card cardFixed">
          <h2>
            欢迎来到管理后台，<strong>{admin_username}</strong>！
          </h2>
          <h2>在这里，你可以：</h2>
          <Flex justify="center" className="cardList" wrap>
            <Link to="./settings">
              <Button className="cardButton" ghost>
                系统设置
              </Button>
            </Link>
            <Link to="./password">
              <Button className="cardButton" ghost>
                修改密码
              </Button>
            </Link>
            <Link to="./list">
              <Button className="cardButton" ghost>
                查看角色
              </Button>
            </Link>
            <Link to="./create">
              <Button className="cardButton" ghost>
                创建角色
              </Button>
            </Link>
            <Link to="./imgs">
              <Button className="cardButton" ghost>
                上传图片
              </Button>
            </Link>
            <Button className="cardButton" ghost onClick={() => setIsModalOpen(true)}>
              退出登录
            </Button>
            <Modal
              title="确认框"
              open={isModalOpen}
              onOk={logoutOk}
              onCancel={() => setIsModalOpen(false)}
              okText="确定"
              cancelText="取消"
            >
              <p>确定要退出登录吗？</p>
            </Modal>
          </Flex>
        </Card>
        <Card hoverable className="card cardFixed" style={{ margin: 10 }}>
          <h2>仪表盘</h2>
          <Row gutter={16}>
            {characters && collections ? (
              <>
                {' '}
                <Col span={12}>
                  <Statistic title="角色数" value={characterTotal} prefix={<FireOutlined />} />
                </Col>
                <Col span={12}>
                  <Statistic title="标签数" value={tagsTotal} prefix={<BookOutlined />} />
                </Col>
                <Col span={12}>
                  <Statistic title="作品数" value={seriesTotal} prefix={<TagsOutlined />} />
                </Col>
                <Col span={12}>
                  <Statistic title="收藏数" value={collectionTotal} prefix={<StarOutlined />} />
                </Col>
              </>
            ) : errorCharacters || errorCollections ? (
              <ErrorResult />
            ) : (
              <Loading />
            )}
          </Row>
        </Card>
      </Flex>
    </div>
  )
}

export default AdminView
