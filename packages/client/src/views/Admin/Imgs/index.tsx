import { Card, Flex, Upload, type UploadFile, type UploadProps, notification } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { InboxOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { getToken } from '@/store/adminReducer'
import { useState } from 'react'
import { f, t } from '@/i18n'
import { handleUrl } from '@/utils'

const ImgsView: React.FC = () => {
  const token = useSelector(getToken)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: `${handleUrl()}/settings/imgs`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    fileList,
    beforeUpload: (file) => {
      const isPNG = file.type.startsWith('image/')
      if (!isPNG) notification.error({ message: f('view.imgs.notImageFile', file.name) })
      return isPNG || Upload.LIST_IGNORE
    },
    onChange(info) {
      setFileList(
        info.fileList.map((file) => {
          const newName = file.response?.data?.[0]?.filename
          const url = newName ? `${new URL(handleUrl()).origin}/imgs/${newName}` : undefined
          return { ...file, name: newName ?? file.name, url }
        })
      )
      const { status } = info.file

      if (status === 'done') {
        notification.success({ message: f('view.imgs.uploadSuccess', info.file.name) })
      } else if (status === 'error') {
        notification.error({ message: f('view.imgs.uploadFailure', info.file.name) })
      }
    }
  }

  return (
    <div>
      <h1>{t`view.imgs.imageUpload`}</h1>
      <Flex justify="center" align="center" vertical wrap>
        <Card hoverable className="card cardFixed">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">{t`view.imgs.dragAndDropHint`}</p>
            <p className="ant-upload-hint">{t`view.imgs.multipleUploadHint`}</p>
          </Dragger>
        </Card>
      </Flex>
    </div>
  )
}

export default ImgsView
