import { Flex, Spin } from 'antd'

const Loading: React.FC = () => (
  <Flex justify="center" align="center" style={{ width: '100%', height: '80vh' }}>
    <Spin size="large" />
  </Flex>
)

export default Loading
