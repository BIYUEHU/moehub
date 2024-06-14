import { Flex, Layout as AntLayout, Avatar, Image } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const { Header, Footer, Content } = AntLayout;

const Layout: React.FC<{ outlet: React.ReactElement }> = ({ outlet }) => (
  <>
    <div className={styles.background}></div>
    <Flex gap="middle" wrap>
      <AntLayout className={styles.layout}>
        <Header className={styles.header}>
          <h1>
            <Link className={styles.headerTitle} to="/">
              <Avatar style={{ marginRight: 10 }} src={<Image src="https://biyuehu.github.io/images/avatar.png" />} />
              Moe Hub
            </Link>
          </h1>

          <Link to="/admin">
            <Avatar style={{ background: 'none', color: '#eee' }} icon={<LoginOutlined />} />
          </Link>
        </Header>
        <Content className={styles.content}>{outlet}</Content>
        <Footer className={styles.footer}>
          Made with ❤ By{' '}
          <a href="https://github.com/biyuehu" target="_blank">
            Arimura Sena
          </a>{' '}
          In © 2024
        </Footer>
      </AntLayout>
    </Flex>
  </>
);

export default Layout;
