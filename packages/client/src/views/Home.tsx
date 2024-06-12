import { Flex, Image, Card } from 'antd';
import { useEffect, useState } from 'react';
import { MoehubDataCharacter } from '@moehub/common';
import { Link } from 'react-router-dom';
import { getCharacters } from '../http';

export default () => {
  const [data, setData] = useState<null | MoehubDataCharacter[]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    getCharacters()
      .then((data) => setData(data.data))
      .catch((error) => setError(error instanceof Error ? error.message : error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (error || data === null) return <div>Error: {error}</div>;

  const { Meta } = Card;

  return (
    <div>
      <h1>角色列表</h1>
      <Flex justify="center" wrap="wrap">
        {data
          .filter((item) => item.images && item.images.length > 0)
          .map((item) => (
            <Card
              key={item.id}
              hoverable
              style={{ width: 220, float: 'none', margin: '0.8vh 0.8vw' }}
              cover={
                <Image
                  src={item.images![0]}
                  style={{ width: 200, height: 300, objectFit: 'cover' }}
                  alt={item.romaji}
                />
              }
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
