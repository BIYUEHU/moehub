import { MoehubDataCharacter } from '@moehub/common';
import { Button, Card, Flex, Popconfirm, Space, Table, notification } from 'antd';
import Column from 'antd/es/table/Column';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteCharacter, getCharacters } from '../../http';
import Loading from '../../components/loading';
import ErrorResult from '../../components/result/error';
import styles from './styles.module.css';
import Store from '../../store';

const AdminView: React.FC = () => {
  const [data, setData] = useState<null | MoehubDataCharacter[]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (Store.get('login') !== 'yes') {
      navigate('./login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    getCharacters()
      .then((data) => setData(data.data))
      .catch((error) => setError(error instanceof Error ? error.message : String(error)))
      .finally(() => setIsLoading(false));
  }, []);

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
          {/* eslint-disable-next-line no-nested-ternary */}
          {isLoading || error ? (
            isLoading ? (
              <Loading />
            ) : (
              <ErrorResult />
            )
          ) : (
            <Table dataSource={data!} className={`${styles.table} cleanAll`}>
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
                      <a>删除</a>
                    </Popconfirm>
                  </Space>
                )}
              />
            </Table>
          )}
        </Card>
      </Flex>
    </div>
  );
};

export default AdminView;
