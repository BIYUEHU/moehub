import { Flex, Layout as AntLayout, Avatar } from 'antd'
import { PictureOutlined, PoweroffOutlined, TranslationOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { useEffect } from 'react'
import { getToken, nextLanguage } from '@/store/adminReducer'
import { getCurrentBackground, getSettings } from '@/store/settingsReducer'
import { useDispatch, useSelector } from 'react-redux'

interface LayoutProps {
  title: string
  outlet: React.ReactElement
  isPrivate?: boolean
}

const Layout: React.FC<LayoutProps> = ({ title, outlet, isPrivate }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLogged = useSelector(getToken)
  const settings = useSelector(getSettings)
  const currentBackground = useSelector(getCurrentBackground)

  useEffect(() => {
    document.title = title ? `${title} | ${settings.site_title}` : settings.site_title
    if (isPrivate && !isLogged) navigate('/admin/login')
  })

  return (
    <>
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(${currentBackground})`
        }}
      />
      <Flex gap="middle" wrap>
        <AntLayout className={styles.layout}>
          <AntLayout.Header className={styles.header}>
            <h1>
              <Link className={styles.headerTitle} to="/">
                <Avatar onClick={() => {}} style={{ marginRight: 10 }} src={settings.site_logo} />
                {settings.site_name}
              </Link>
            </h1>
            <div>
              <a
                //  biome-ignore lint:
                onClick={() => {
                  dispatch(nextLanguage())
                  navigate(0)
                }}
              >
                <Avatar style={{ background: 'none', color: '#eee' }} icon={<TranslationOutlined />} />
              </a>
              <Link to="/photos">
                <Avatar style={{ background: 'none', color: '#eee' }} icon={<PictureOutlined />} />
              </Link>
              <Link to="/admin">
                <Avatar style={{ background: 'none', color: '#eee' }} icon={<PoweroffOutlined />} />
              </Link>
            </div>
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
