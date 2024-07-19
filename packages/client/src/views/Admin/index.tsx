import { Button, Card, Flex } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getSettings } from '@/store/settingsReducer'

const AdminView: React.FC = () => {
  const { admin_username } = useSelector(getSettings)

  return (
    <div>
      <h1>管理中心</h1>
      <Flex justify="center" align="center" vertical wrap>
        <Card hoverable className="card cardFixed">
          <h2>
            欢迎来到管理后台，<strong>{admin_username}</strong>！
          </h2>
          <h2>在这里，你可以：</h2>
          <Flex justify="center" className="cardList" wrap>
            <Link to="./settings">
              <Button className="cardButton" ghost>
                系统设置
              </Button>
            </Link>
            <Link to="./list">
              <Button className="cardButton" ghost>
                查看角色
              </Button>
            </Link>
            <Link to="./create">
              <Button className="cardButton" ghost>
                创建角色
              </Button>
            </Link>
          </Flex>
        </Card>
        <Card hoverable className="card cardFixed" style={{ margin: 10 }}>
          <h2>仪表盘</h2>
        </Card>
      </Flex>
    </div>
  )
}

export default AdminView
