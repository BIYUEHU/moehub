import { Card, Carousel, Descriptions, Flex, Image, Tag } from 'antd'
import { useParams } from 'react-router-dom'
import Loading from '@/components/Loading'
import ErrorResult from '@/components/result/error'
import styles from './styles.module.css'
import useSWR from 'swr'
import { getCharacter } from '@/http'
import { useSelector } from 'react-redux'
import { getSettings } from '@/store/settingsReducer'
import { useEffect } from 'react'

interface InfoCardProps {
  children: React.ReactNode
  title: string
}

function getRandomColor() {
  const list = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
  return list[Math.floor(Math.random() * list.length)]
}

const GenderReflect = {
  MALE: '男性',
  OTHER: '其它/未知'
}

const SeriesGenreReflect = {
  ANIME: '动画',
  COMIC: '漫画',
  GALGAME: 'Galgame',
  GAME: '游戏',
  NOVEL: '轻小说',
  OTHER: '其它'
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children }) => (
  <Card title={title} bordered={false} className={styles.infoCard}>
    {children}
  </Card>
)

const CharacterView: React.FC = () => {
  const { id: characterId } = useParams()
  const { data, error, isLoading } = useSWR(`/api/character/${characterId}`, () => getCharacter(Number(characterId)))
  const { site_title } = useSelector(getSettings)

  useEffect(() => {
    if (data) document.title = `${data.name} - ${site_title}`
  }, [data, site_title])

  if (isLoading) return <Loading />
  if (error || !data) return <ErrorResult />

  return (
    <div>
      <h1>角色详情页</h1>
      <Flex justify="center" align="center" vertical>
        <Card hoverable className="card cardFixed">
          {data.hitokoto ? <div className={styles.hitokoto}>『{data.hitokoto}』</div> : null}
          {data.songId ? (
            <>
              <br />
              <iframe
                title="主题曲"
                width="330"
                height="86"
                src={`https://music.163.com/outchain/player?auto=1&type=2&id=${data.songId}&height=66`}
              />
              <br />
            </>
          ) : null}
          {data.images && data.images.length > 1 ? (
            <Carousel arrows draggable fade infinite autoplay>
              {data.images.map((item, index) => (
                <Image className={styles.content} src={item} key={Number(index)} />
              ))}
            </Carousel>
          ) : null}
          {data.images && data.images.length === 1 ? <Image className={styles.content} src={data.images[0]} /> : null}
          <div className={styles.characterNameCard} style={data.color ? { color: `#${data.color}` } : {}}>
            <div>{data.name}</div>
            <div>{data.romaji}</div>
          </div>
          <Descriptions layout="vertical" title="详细信息">
            {data.gender !== 'FEMALE' && (
              <Descriptions.Item label="性别">{GenderReflect[data.gender]}</Descriptions.Item>
            )}
            {data.alias && <Descriptions.Item label="别名">{data.alias.join('、')}</Descriptions.Item>}
            {data.age && <Descriptions.Item label="年龄">{data.age}</Descriptions.Item>}
            {data.birthday && (
              <Descriptions.Item label="出生日期">
                {new Date(data.birthday).getMonth() + 1}月{new Date(data.birthday).getDate()}日
              </Descriptions.Item>
            )}
            <Descriptions.Item label="来源作品">{data.series}</Descriptions.Item>
            <Descriptions.Item label="作品类型">{SeriesGenreReflect[data.seriesGenre]}</Descriptions.Item>

            {data.voice && <Descriptions.Item label="声优">{data.voice}</Descriptions.Item>}
            {data.bloodType && <Descriptions.Item label="血型">{data.bloodType} 型</Descriptions.Item>}
            {data.height && <Descriptions.Item label="身高">{data.height}cm</Descriptions.Item>}
            {data.weight && <Descriptions.Item label="体重">{data.weight}kg</Descriptions.Item>}
            {(data.bust || data.waist || data.hip) && (
              <Descriptions.Item label="三围">
                {(() => {
                  let content = ''
                  if (data.bust) content += `B${data.bust}`
                  if (data.waist) content += `${data.bust ? '/' : ''}W${data.waist}`
                  if (data.hip) content += `${data.bust || data.waist ? '/' : ''}H${data.hip}`
                  return content
                })()}
              </Descriptions.Item>
            )}
          </Descriptions>
          {data.description && <InfoCard title="我是谁">{data.description}</InfoCard>}
          {data.tags && data.tags.length > 0 && (
            <InfoCard title="我的萌点">
              {data.tags.map((value, index) => (
                <Tag key={Number(index)} color={getRandomColor()}>
                  {value}
                </Tag>
              ))}
            </InfoCard>
          )}
          {data.comment ? <InfoCard title="站长评价">{data.comment}</InfoCard> : null}
          {data.url && data.url.length > 0 && (
            <InfoCard title="相关链接">
              {(data.url as string[]).map((item, index) => (
                <li key={Number(index)}>
                  <a href={item} target="_blank" rel="noreferrer">
                    {item.length > 30 ? `${item.slice(0, 30)}...` : item}
                  </a>
                </li>
              ))}
            </InfoCard>
          )}
        </Card>
      </Flex>
    </div>
  )
}

export default CharacterView
