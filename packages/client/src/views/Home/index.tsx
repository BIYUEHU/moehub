import { Flex, Image, Card, Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { getCharacters } from '@/http/index'
import Loading from '@/components/Loading'
import ErrorResult from '@/components/result/error'
import styles from './styles.module.css'
import useSWR from 'swr'

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

  if (isLoading) return <Loading />
  if (error || !data) return <ErrorResult />

  return (
    <div>
      <h1>主页</h1>
      <Flex justify="center" wrap>
        <Card className={`card ${styles.card}`}>
          <span>
            欢迎来到 Arimura Sena の角色收藏网站~
            <br />
            角色列表会定期不断更新，欢迎关注！
          </span>
          <h2>
            <strong>关于我</strong>
          </h2>
          <div className="cardList">
            {[
              ['GitHub', 'https://github.com/biyuehu'],
              ['个人博客', 'https://hotaru.icu'],
              ['哔哩哔哩', 'https://space.bilibili.com/293767574'],
              ['班固米', 'https://bgm.tv/user/himeno']
            ].map(([text, link], index) => (
              <React.Fragment key={Number(index)}>{renderLinkBlock(link, text)}</React.Fragment>
            ))}
          </div>
        </Card>

        <Card className={`card ${styles.card}`}>
          <h2>
            <strong>时间线</strong>
          </h2>
          <ul>
            {[
              ['2024/6/16', '网站上线'],
              ['2024/6/14', '网站上线']
            ].map(([date, content], index) => (
              <React.Fragment key={Number(index)}>{renderTimeline(date, content)}</React.Fragment>
            ))}
          </ul>
        </Card>

        <Card className={`card ${styles.card}`}>
          <h3>
            <strong>这是什么？</strong>
          </h3>
          <span>
            <strong>MoeHub</strong>{' '}
            是一个开源的个人向喜爱角色收藏网站，在这里可以收集曾经经历过的故事与邂逅并令你心动的美少女。
          </span>
          <h3>
            <strong>如何创建自己的网站？</strong>
          </h3>
          <span>
            请前往 <a href="https://github.com/biyuehu/moehub">GitHub</a> 了解详情。
          </span>
        </Card>
      </Flex>

      <h1>角色列表</h1>
      <Flex justify="center" wrap className={styles.characterList}>
        {/* TODO: custom sort method */}
        {data
          .filter((item) => !!item.images && item.images.length > 0)
          .reverse()
          .map((item) => (
            <Card
              key={item.id}
              hoverable
              className={`card ${styles.characterCard}`}
              cover={
                <Image
                  src={(item.images as Exclude<typeof item.images, undefined>)[0]}
                  className={styles.characterImage}
                  alt={item.romaji}
                />
              }
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
