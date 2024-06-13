import { Result } from 'antd';

const ErrorResult: React.FC = () => (
  <Result status="error" title="获取数据失败" subTitle="请检查网络连接或接口地址是否配置正确" />
);

export default ErrorResult;
