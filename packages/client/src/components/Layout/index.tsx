import { Flex, Layout as AntLayout, Avatar } from 'antd'
import { LoginOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggedIn } from '@/store/adminReducer'
import useSWR from 'swr'
import { getSettings } from '@/http'
import { loadSettings } from '@/store/settingsReducer'
import Loading from '../Loading'
import ErrorResult from '../result/error'

interface LayoutProps {
  title: string
  outlet: React.ReactElement
  isPrivate?: boolean
}

const Layout: React.FC<LayoutProps> = ({ title, outlet, isPrivate }) => {
  const navigate = useNavigate()
  const isLogged = useSelector(isLoggedIn)
  const dispatch = useDispatch()
  const { data, error } = useSWR('/api/settings', getSettings)

  useEffect(() => {
    if (data) {
      dispatch(loadSettings(data))
      document.title = title ? `${title} | ${data.site_title}` : data.site_title
    }
    if (isPrivate && !isLogged) navigate('./login')
  }, [data, dispatch, navigate, isPrivate, isLogged, title])

  if (error) return <ErrorResult />
  if (!data) return <Loading />

  return (
    <>
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(${data.site_backgrounds[Math.floor(Math.random() * data.site_backgrounds.length)]})`
        }}
      />
      <Flex gap="middle" wrap>
        <AntLayout className={styles.layout}>
          <AntLayout.Header className={styles.header}>
            <h1>
              <Link className={styles.headerTitle} to="/">
                <Avatar onClick={() => {}} style={{ marginRight: 10 }} src={data.site_logo} />
                {data.site_name}
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
