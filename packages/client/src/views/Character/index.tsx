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
import i18n, { t } from '@/i18n'

interface InfoCardProps {
  children: React.ReactNode
  title: string
}

function getRandomColor() {
  const list = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
  return list[Math.floor(Math.random() * list.length)]
}

const GenderReflect = {
  MALE: t`view.character.gender.male`,
  OTHER: t`view.character.gender.other`
}

const SeriesGenreReflect = {
  ANIME: t`view.character.seriesGenre.anime`,
  COMIC: t`view.character.seriesGenre.comic`,
  GALGAME: t`view.character.seriesGenre.galgame`,
  GAME: t`view.character.seriesGenre.game`,
  NOVEL: t`view.character.seriesGenre.novel`,
  OTHER: t`view.character.seriesGenre.other`
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
    if (data)
      document.title = `${['ja_JP', 'zh_CN', 'zh_TW'].includes(i18n.get()) ? data.name : data.romaji} - ${site_title}`
  }, [data, site_title])

  if (isLoading) return <Loading />
  if (error || !data) return <ErrorResult />

  return (
    <div>
      <h1>{t`view.character.title`}</h1>
      <Flex justify="center" align="center" vertical>
        <Card hoverable className="card cardFixed">
          {data.hitokoto ? (
            <div {...(data.color ? { style: { color: `#${data.color}` } } : {})} className={styles.hitokoto}>
              『{data.hitokoto}』
            </div>
          ) : null}
          {data.songId ? (
            <>
              <br />
              <iframe
                title={t`view.character.themeSong`}
                style={{ maxWidth: '80%', width: 330, height: 86 }}
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
          <Descriptions layout="vertical" title={t`view.character.details`}>
            {data.gender !== 'FEMALE' && (
              <Descriptions.Item label={t`view.character.gender`}>{GenderReflect[data.gender]}</Descriptions.Item>
            )}
            {data.alias && (
              <Descriptions.Item label={t`view.character.alias`}>{data.alias.join('、')}</Descriptions.Item>
            )}
            {data.age && <Descriptions.Item label={t`view.character.age`}>{data.age}</Descriptions.Item>}
            {data.birthday && (
              <Descriptions.Item label={t`view.character.birthday`}>
                {new Date(data.birthday).getMonth() + 1}, {new Date(data.birthday).getDate()}
              </Descriptions.Item>
            )}
            <Descriptions.Item label={t`view.character.sourceSeries`}>{data.series}</Descriptions.Item>
            <Descriptions.Item label={t`view.character.seriesType`}>
              {SeriesGenreReflect[data.seriesGenre]}
            </Descriptions.Item>

            {data.voice && <Descriptions.Item label={t`view.character.voiceActor`}>{data.voice}</Descriptions.Item>}
            {data.bloodType && (
              <Descriptions.Item label={t`view.character.bloodType`}>{data.bloodType}</Descriptions.Item>
            )}
            {data.height && <Descriptions.Item label={t`view.character.height`}>{data.height}cm</Descriptions.Item>}
            {data.weight && <Descriptions.Item label={t`view.character.weight`}>{data.weight}kg</Descriptions.Item>}
            {(data.bust || data.waist || data.hip) && (
              <Descriptions.Item label={t`view.character.measurements`}>
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
          {data.description && <InfoCard title={t`view.character.whoAmI`}>{data.description}</InfoCard>}
          {data.tags && data.tags.length > 0 && (
            <InfoCard title={t`view.character.myCharmPoints`}>
              {data.tags.map((value, index) => (
                <Tag key={Number(index)} color={getRandomColor()}>
                  {value}
                </Tag>
              ))}
            </InfoCard>
          )}
          {data.comment ? <InfoCard title={t`view.character.adminComment`}>{data.comment}</InfoCard> : null}
          {data.url && data.url.length > 0 && (
            <InfoCard title={t`view.character.relatedLinks`}>
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
