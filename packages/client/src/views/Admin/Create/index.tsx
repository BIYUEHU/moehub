import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Collapse,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  SelectProps,
  Space,
  notification
} from 'antd';
import { MoehubDataCharacter } from '@moehub/common';
import dayjs from 'dayjs';
import styles from '../styles.module.css';
import { createCharacter, getTags } from '../../../http';

const CreateView: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: Omit<MoehubDataCharacter, 'birthday'> & { birthday: dayjs.Dayjs }) => {
    const data = { ...values, birthday: values.birthday ? new Date(values.birthday.toString()).getTime() : undefined };
    createCharacter(data).then(() => notification.success({ message: '角色创建成功' }));
  };

  const [tagOptions, setTagOptions] = useState<SelectProps['options']>([]);

  useEffect(() => {
    getTags().then(({ data }) => {
      setTagOptions(data.map((tag) => ({ label: tag.name, value: tag.name })));
    });
  }, []);

  return (
    <div>
      <h1>角色创建</h1>
      <Flex justify="center" align="center" vertical>
        <Card hoverable className="card cardFixed cleanAll">
          <Form form={form} name="control-hooks" className={styles.form} onFinish={onFinish}>
            <Form.Item name="name" label="角色名" rules={[{ required: true }]}>
              <Input />
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
            <Form.Item name="alias" label="角色别名">
              <Select mode="tags"></Select>
            </Form.Item>
            <Form.Item name="images" label="相关图片">
              <Select mode="tags"></Select>
            </Form.Item>
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
            <Form.Item name="tags" label="萌点">
              <Select mode="tags" options={tagOptions}></Select>
            </Form.Item>
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
                <Form.Item name="url" label="相关链接">
                  <Select mode="tags"></Select>
                </Form.Item>
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
        </Card>
      </Flex>
    </div>
  );
};

export default CreateView;
