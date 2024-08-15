import { Flex, Image, Card, Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { getCharacters } from '@/http/index'
import Loading from '@/components/Loading'
import ErrorResult from '@/components/result/error'
import styles from './styles.module.css'
import useSWR from 'swr'
import { getSettings } from '@/store/settingsReducer'
import { useSelector } from 'react-redux'
import { t } from '@/i18n'

function renderLinkBlock(link: string, text: string) {
  return (
    <a href={link} target="_blank" rel="noreferrer">
      <Button className="cardButton" ghost>
        {text}
      </Button>
    </a>
  )
}

function renderTimeline(date: string, content: string) {
  return (
    <li>
      <strong>{date}</strong> {content}
    </li>
  )
}

const HomeView: React.FC = () => {
  const { data, error, isLoading } = useSWR('/api/character', getCharacters)
  const { home_description, home_buttons, home_timeline, home_custom } = useSelector(getSettings)

  if (isLoading) return <Loading />
  if (error || !data) return <ErrorResult />

  return (
    <div>
      <h1>{t`view.home.title`}</h1>
      <Flex justify="center" wrap>
        <Card className={`card ${styles.card}`}>
          {/* biome-ignore lint: */}
          <span dangerouslySetInnerHTML={{ __html: home_description }} />
          <h2>
            <strong>{t`view.home.aboutMe`}</strong>
          </h2>
          <div className="cardList">
            {home_buttons.map(([text, link], index) => (
              <React.Fragment key={Number(index)}>{renderLinkBlock(link, text)}</React.Fragment>
            ))}
          </div>
        </Card>
        <Card className={`card ${styles.card}`}>
          <h2>
            <strong>{t`view.home.timeline`}</strong>
          </h2>
          <ul>
            {Array.from(home_timeline)
              .reverse()
              .map(([date, content], index) => (
                <React.Fragment key={Number(index)}>{renderTimeline(date, content)}</React.Fragment>
              ))}
          </ul>
        </Card>

        <Card className={`card ${styles.card}`}>
          {/* biome-ignore lint: */}
          <div dangerouslySetInnerHTML={{ __html: home_custom }} />
        </Card>
      </Flex>

      <h1>{t`view.home.characterList`}</h1>
      <Flex justify="center" wrap className={styles.characterList}>
        {data
          .filter((item) => Array.isArray(item.images) && item.images.length > 0 && !item.hide)
          .reverse()
          .sort((a, b) => (a.order ?? 50) - (b.order ?? 50))
          .map((item) => (
            <Card
              key={item.id}
              hoverable
              className={`card ${styles.characterCard}`}
              cover={<Image src={(item.images as string[])[0]} className={styles.characterImage} alt={item.romaji} />}
            >
              <br />
              <span>{}</span>
              <Link to={`/character/${item.id}`}>
                <Card.Meta
                  title={item.name}
                  description={
                    item.description
                      ? item.description.length > 70
                        ? `${item.description.slice(0, 67)} ...`
                        : item.description
                      : ''
                  }
                />
              </Link>
            </Card>
          ))}
      </Flex>
    </div>
  )
}

export default HomeView
