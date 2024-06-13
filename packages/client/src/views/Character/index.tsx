import { Card, Carousel, Descriptions, Flex, Image } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { MoehubDataCharacter } from '@moehub/common';
import { useNavigate, useParams } from 'react-router-dom';
import { getCharacter } from '../../http/index';
import Loading from '../../components/loading';
import ErrorResult from '../../components/result/error';
import styles from './styles.module.css';

const GenderReflect = {
  MALE: '男性',
  OTHER: '其它/未知'
};

const SeriesGenreReflect = {
  ANIME: '动画',
  COMIC: '漫画',
  GALGAME: 'Galgame',
  GAME: '游戏',
  NOVEL: '轻小说',
  OTHER: '其它'
};

function RenderDescriptionItem(value: unknown, label: string, callback?: () => string | ReactElement | ReactElement[]) {
  if (value === false || value === null || value === undefined) return null;
  return <Descriptions.Item label={label}>{callback ? callback() : String(value)}</Descriptions.Item>;
}

const CharacterView: React.FC = () => {
  const { id: characterId } = useParams();
  const [data, setData] = useState<null | MoehubDataCharacter>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  if (!characterId) {
    useNavigate()('/', { replace: true });
    return <></>;
  }

  useEffect(() => {
    getCharacter(Number(characterId))
      .then((data) => setData(data.data))
      .catch((error) => setError(error instanceof Error ? error.message : String(error)))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loading />;

  if (error || data === null) return <ErrorResult />;

  document.title = `${data.name} - MoeHub`;

  return (
    <div>
      <h1>角色详情页</h1>
      <Flex justify="center" align="center" vertical>
        <Card hoverable className={`card ${styles.card}`}>
          {data.hitokoto ? <div className={styles.hitokoto}>『{data.hitokoto}』</div> : null}
          {data.images && data.images.length > 1 ? (
            <Carousel arrows infinite={false}>
              {data.images.map((item, index) => (
                <Image className={styles.content} src={item} key={index} />
              ))}
            </Carousel>
          ) : null}
          {data.images && data.images.length === 1 ? <Image className={styles.content} src={data.images[0]} /> : null}
          <Descriptions layout="vertical" title="角色信息">
            <Descriptions.Item label="角色名">{data.name}</Descriptions.Item>
            <Descriptions.Item label="罗马音">{data.romaji}</Descriptions.Item>
            {RenderDescriptionItem(
              data.gender !== 'FEMALE',
              '性别',
              () => GenderReflect[data.gender as 'MALE' | 'OTHER']
            )}
            {RenderDescriptionItem(data.alias, '别名', () =>
              data.alias!.map((item, index) => (
                <React.Fragment key={index}>{item + (index === data.alias!.length - 1 ? '' : '、')}</React.Fragment>
              ))
            )}
            {RenderDescriptionItem(data.age, '年龄')}
            {RenderDescriptionItem(
              data.birthday,
              '出生日期',
              () => `${new Date(data.birthday!).getMonth() + 1}月${new Date(data.birthday!).getDate()}日`
            )}
            <Descriptions.Item label="来源作品">{data.series}</Descriptions.Item>
            <Descriptions.Item label="作品类型">{SeriesGenreReflect[data.seriesGenre]}</Descriptions.Item>
          </Descriptions>
          <Descriptions layout="vertical" title="详细信息">
            {RenderDescriptionItem(data.tags, '萌点', () =>
              data.tags!.map((item, index) => (
                <React.Fragment key={index}>{item + (index === data.tags!.length - 1 ? '' : '、')}</React.Fragment>
              ))
            )}
            {RenderDescriptionItem(data.description, '描述')}
            {RenderDescriptionItem(data.voice, '声优')}
            {RenderDescriptionItem(data.bloodType, '血型', () => `${data.bloodType} 型`)}
            {RenderDescriptionItem(data.height, '身高', () => `${data.height}cm`)}
            {RenderDescriptionItem([data.bust, data.waist, data.hip].filter((el) => el).length > 0, '三围', () => {
              let content = '';
              if (data.bust) content += `B${data.bust}`;
              if (data.waist) content += `${data.bust ? `/` : ``}W${data.waist}`;
              if (data.hip) content += `${data.bust || data.waist ? `/` : ``}H${data.hip}`;
              return content;
            })}
            {RenderDescriptionItem(data.hairColor, '发色')}
            {RenderDescriptionItem(data.eyeColor, '瞳色')}
          </Descriptions>
          <Descriptions layout="vertical" title="其他">
            {RenderDescriptionItem(data.comment, '个人评价')}
            {RenderDescriptionItem(data.url, '相关链接', () =>
              data.url!.map((item, index) => (
                <>
                  <br />
                  <li key={index}>
                    <a target="_blank" href={item}>
                      {item.length > 30 ? `${item.slice(0, 30)}...` : item}
                    </a>
                  </li>
                </>
              ))
            )}
          </Descriptions>
        </Card>
      </Flex>
    </div>
  );
};

export default CharacterView;
