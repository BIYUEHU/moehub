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
import { f, t } from '@/i18n'

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
      <h1>{t`view.admin.title`}</h1>
      <Flex justify="center" align="center" vertical wrap>
        <Card hoverable className="card cardFixed">
          {/* biome-ignore lint: */}
          <h2 dangerouslySetInnerHTML={{ __html: f('view.admin.welcome', admin_username) }} />
          <h2>{t`view.admin.canDo`}</h2>
          <Flex justify="center" className="cardList" wrap>
            <Link to="./settings">
              <Button className="cardButton" ghost>
                {t`view.admin.button.settings`}
              </Button>
            </Link>
            <Link to="./password">
              <Button className="cardButton" ghost>
                {t`view.admin.button.changePassword`}
              </Button>
            </Link>
            <Link to="./list">
              <Button className="cardButton" ghost>
                {t`view.admin.button.viewCharacters`}
              </Button>
            </Link>
            <Link to="./create">
              <Button className="cardButton" ghost>
                {t`view.admin.button.createCharacter`}
              </Button>
            </Link>
            <Link to="./imgs">
              <Button className="cardButton" ghost>
                {t`view.admin.button.uploadImages`}
              </Button>
            </Link>
            <Button className="cardButton" ghost onClick={() => setIsModalOpen(true)}>
              {t`view.admin.button.logout`}
            </Button>
            <Modal
              title={t`view.admin.modal.title`}
              open={isModalOpen}
              onOk={logoutOk}
              onCancel={() => setIsModalOpen(false)}
              okText={t`view.admin.modal.ok`}
              cancelText={t`view.admin.modal.cancel`}
            >
              <p>{t`view.admin.modal.content`}</p>
            </Modal>
          </Flex>
        </Card>
        <Card hoverable className="card cardFixed" style={{ margin: 10 }}>
          <h2>{t`view.admin.dashboard.title`}</h2>
          <Row gutter={16}>
            {characters && collections ? (
              <>
                {' '}
                <Col span={12}>
                  <Statistic
                    title={t`view.admin.dashboard.characterCount`}
                    value={characterTotal}
                    prefix={<FireOutlined />}
                  />
                </Col>
                <Col span={12}>
                  <Statistic title={t`view.admin.dashboard.tagCount`} value={tagsTotal} prefix={<BookOutlined />} />
                </Col>
                <Col span={12}>
                  <Statistic
                    title={t`view.admin.dashboard.seriesCount`}
                    value={seriesTotal}
                    prefix={<TagsOutlined />}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title={t`view.admin.dashboard.collectionCount`}
                    value={collectionTotal}
                    prefix={<StarOutlined />}
                  />
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
