import { t } from '@/i18n'
import { Result } from 'antd'

const ErrorResult: React.FC = () => (
  <Result status="error" title={t`com.resultError.title`} subTitle={t`com.resultError.subTitle`} />
)

export default ErrorResult
