import { Flex, Layout as AntLayout } from 'antd';
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
              Moe Hub
            </Link>
          </h1>
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
