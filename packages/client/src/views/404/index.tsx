import { Card, Typography, Flex, Button } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

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
              {'页面走丢了呜呜 ヽ(*。>Д<)o゜'}
            </Title>
            <Button className="cardButton clean" icon={<HomeOutlined />} onClick={() => navigate('/')}>
              回到主页
            </Button>
          </Flex>
        </Card>
      </Flex>
    </div>
  )
}

export default NotFoundView
