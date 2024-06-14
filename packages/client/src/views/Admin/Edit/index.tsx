import React, { useEffect, useState } from 'react';
import { Button, Card, Collapse, DatePicker, Flex, Form, Input, InputNumber, Radio, Space, notification } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { MoehubDataCharacter } from '@moehub/common';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles.module.css';
import { getCharacter, updateCharacter } from '../../../http';
import Loading from '../../../components/loading';

const EditView: React.FC = () => {
  const { id: characterId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!characterId) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const [form] = Form.useForm();

  const onFinish = (values: MoehubDataCharacter) => {
    updateCharacter(Number(characterId), values).then(() => notification.success({ message: '角色编辑成功' }));
  };

  useEffect(() => {
    getCharacter(Number(characterId))
      .then((res) => form.setFieldsValue(res.data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <h1>角色编辑</h1>
      <Flex justify="center" align="center" vertical>
        <Card hoverable className="card cardFixed cleanAll">
          {isLoading ? (
            <Loading />
          ) : (
            <Form form={form} name="control-hooks" className={styles.form} onFinish={onFinish}>
              <Form.Item name="name" label="角色名" rules={[{ required: true }]}>
                <Input disabled />
              </Form.Item>
              <Form.Item name="romaji" label="罗马音" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="gender" label="性别" rules={[{ required: true }]}>
                <Radio.Group>
                  <Radio.Button value="MALE">男性</Radio.Button>
                  <Radio.Button value="FEMALE">女性</Radio.Button>
                  <Radio.Button value="OTHER">其它/未知</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="series" label="作品名" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="seriesGenre" label="作品类型" rules={[{ required: true }]}>
                <Radio.Group>
                  <Radio value="ANIME">动画</Radio>
                  <Radio value="COMIC">漫画</Radio>
                  <Radio value="GALGAME">Galgame</Radio>
                  <Radio value="GAME">游戏</Radio>
                  <Radio value="NOVEL">轻小说</Radio>
                  <Radio value="OTHER">其它</Radio>
                </Radio.Group>
              </Form.Item>
              <hr />
              <Form.List name="alias">
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field) => (
                      <>
                        <Form.Item {...field} rules={[{ required: true }]}>
                          <Input />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      </>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                        添加别名
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.List name="images">
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field) => (
                      <>
                        <Form.Item {...field} rules={[{ required: true }]}>
                          <Input />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      </>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                        添加图片
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item name="description" label="描述">
                <Input />
              </Form.Item>
              <Form.Item name="hitokoto" label="一言">
                <Input />
              </Form.Item>
              <Form.Item name="birthday" label="生日">
                <DatePicker format="MM-DD" />
              </Form.Item>
              <Form.Item name="comment" label="个人评价">
                <Input />
              </Form.Item>
              <Form.List name="tags">
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field) => (
                      <>
                        <Form.Item {...field} rules={[{ required: true }]}>
                          <Input />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      </>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                        添加萌点
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <hr />
              <Collapse>
                <Collapse.Panel header="其它信息" key="1">
                  <Form.Item name="voice" label="声优">
                    <Input />
                  </Form.Item>
                  <Form.Item name="age" label="年龄" rules={[{ type: 'number' }]}>
                    <InputNumber />
                  </Form.Item>
                  <Form.Item name="height" label="身高" rules={[{ type: 'number' }]}>
                    <InputNumber />
                  </Form.Item>
                  <Form.Item name="bust" label="胸围" rules={[{ type: 'number' }]}>
                    <InputNumber />
                  </Form.Item>
                  <Form.Item name="waist" label="腰围" rules={[{ type: 'number' }]}>
                    <InputNumber />
                  </Form.Item>
                  <Form.Item name="hip" label="臀围" rules={[{ type: 'number' }]}>
                    <InputNumber />
                  </Form.Item>
                  <Form.Item name="hairColor" label="发色">
                    <Input />
                  </Form.Item>
                  <Form.Item name="eyeColor" label="瞳色">
                    <Input />
                  </Form.Item>
                  <Form.Item name="bloodType" label="血型">
                    <Radio.Group>
                      <Radio value="A">A 型</Radio>
                      <Radio value="B">B 型</Radio>
                      <Radio value="AB">AB 型</Radio>
                      <Radio value="O">O 型</Radio>
                    </Radio.Group>
                  </Form.Item>

                  <Form.List name="url">
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        {fields.map((field) => (
                          <>
                            <Form.Item {...field} rules={[{ required: true }]}>
                              <Input />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                          </>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                            添加链接
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Collapse.Panel>
              </Collapse>
              <br />
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" className="cardButton">
                    提交
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          )}
        </Card>
      </Flex>
    </div>
  );
};

export default EditView;
