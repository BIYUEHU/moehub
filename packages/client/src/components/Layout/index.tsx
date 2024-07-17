import { Flex, Layout as AntLayout, Avatar, Image } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { useEffect } from 'react'
import Store from '@/store'

interface LayoutProps {
  title: string
  outlet: React.ReactElement
  isPrivate?: boolean
}

const Layout: React.FC<LayoutProps> = ({ title, outlet, isPrivate }) => {
  document.title = title

  if (isPrivate) {
    const navigate = useNavigate()

    useEffect(() => {
      if (Store.get('login') !== 'yes') navigate('./login', { replace: true })
    }, [navigate])
  }

  return (
    <>
      <div className={styles.background} />
      <Flex gap="middle" wrap>
        <AntLayout className={styles.layout}>
          <AntLayout.Header className={styles.header}>
            <h1>
              <Link className={styles.headerTitle} to="/">
                <Avatar
                  onClick={() => {}}
                  style={{ marginRight: 10 }}
                  src="https://biyuehu.github.io/images/avatar.png"
                />
                Moe Hub
              </Link>
            </h1>
            <Link to="/admin">
              <Avatar style={{ background: 'none', color: '#eee' }} icon={<LoginOutlined />} />
            </Link>
          </AntLayout.Header>
          <AntLayout.Content className={styles.content}>{outlet}</AntLayout.Content>
          <AntLayout.Footer className={styles.footer}>
            Made with ❤ By{' '}
            <a href="https://github.com/biyuehu" target="_blank" rel="noreferrer">
              Arimura Sena
            </a>{' '}
            In © 2024
          </AntLayout.Footer>
        </AntLayout>
      </Flex>
    </>
  )
}

export default Layout
