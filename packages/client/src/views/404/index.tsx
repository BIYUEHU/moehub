import { Card, Typography, Flex, Button } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { t } from '@/i18n'

const { Title } = Typography

const NotFoundView: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Flex justify="center" align="center" style={{ marginTop: '25vh' }}>
        <Card className="card cardFixed" style={{ maxWidth: 500 }}>
          <Flex vertical align="center" gap="middle">
            <Title level={1} style={{ marginBottom: 0, color: 'pink', fontSize: '10rem' }}>
              404
            </Title>
            <Title level={3} type="warning">
              {t`view.404.message`}
            </Title>
            <Button className="cardButton clean" icon={<HomeOutlined />} onClick={() => navigate('/')}>
              {t`view.404.button`}
            </Button>
          </Flex>
        </Card>
      </Flex>
    </div>
  )
}

export default NotFoundView
