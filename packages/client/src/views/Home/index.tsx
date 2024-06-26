import { Flex, Image, Card, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { MoehubDataCharacter } from '@moehub/common';
import { Link } from 'react-router-dom';
import { getCharacters } from '../../http/index';
import Loading from '../../components/loading';
import ErrorResult from '../../components/result/error';
import styles from './styles.module.css';

const HomeView: React.FC = () => {
  const [data, setData] = useState<null | MoehubDataCharacter[]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    getCharacters()
      .then((res) => setData(res.data))
      .catch((error) => setError(error instanceof Error ? error.message : String(error)))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loading />;

  if (error || data === null) return <ErrorResult />;

  const { Meta } = Card;

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
            <a target="_blank" href="https://github.com/biyuehu">
              <Button className="cardButton" ghost>
                GitHub
              </Button>
            </a>
            <a target="_blank" href="https://hotaru.icu">
              <Button className="cardButton" ghost>
                个人博客
              </Button>
            </a>
            <a target="_blank" href="https://space.bilibili.com/293767574">
              <Button className="cardButton" ghost>
                哔哩哔哩
              </Button>
            </a>
            <a target="_blank" href="https://bgm.tv/user/himeno">
              <Button className="cardButton" ghost>
                班固米
              </Button>
            </a>
          </div>
        </Card>
        <Card className={`card ${styles.card}`}>
          <h2>
            <strong>公告</strong>
          </h2>
          <ul>
            <li>
              <strong>2024/6/16</strong> 修了点 bug，更改了标签表单样式
            </li>
            <li>
              <strong>2024/6/14</strong> 网站上线
            </li>
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
      <Flex justify="center" wrap>
        {/* TODO: custom sort method */}
        {data
          .filter((item) => item.images && item.images.length > 0)
          .reverse()
          .map((item) => (
            <Card
              key={item.id}
              hoverable
              className={`card ${styles.characterCard}`}
              cover={<Image src={item.images![0]} className={styles.characterImage} alt={item.romaji} />}
            >
              <br />
              <span>{}</span>
              <Link to={`/character/${item.id}`}>
                <Meta title={item.name} description={item.description} />
              </Link>
            </Card>
          ))}
      </Flex>
    </div>
  );
};

export default HomeView;
