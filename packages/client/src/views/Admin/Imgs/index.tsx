import { Card, Flex, Upload, type UploadFile, type UploadProps, notification } from 'antd'
import config from '@/http/config'
import Dragger from 'antd/es/upload/Dragger'
import { InboxOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { getToken } from '@/store/adminReducer'
import { useState } from 'react'

const ImgsView: React.FC = () => {
  const token = useSelector(getToken)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: `${config.url}/settings/imgs`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    fileList,
    beforeUpload: (file) => {
      const isPNG = file.type.startsWith('image/')
      if (!isPNG) notification.error({ message: `${file.name} 不是一个图片文件` })
      return isPNG || Upload.LIST_IGNORE
    },
    onChange(info) {
      setFileList(
        info.fileList.map((file) => {
          const newName = file.response?.data?.[0]?.filename
          const url = newName ? `${new URL(config.url).origin}/imgs/${newName}` : undefined
          return { ...file, name: newName ?? file.name, url }
        })
      )
      console.log(info)
      const { status } = info.file
      // if (status !== 'uploading') {
      //   console.log(info.file, info.fileList)
      // }
      if (status === 'done') {
        notification.success({ message: `${info.file.name} 文件上传成功` })
      } else if (status === 'error') {
        notification.error({ message: `${info.file.name} 文件上传失败` })
      }
    }
  }

  return (
    <div>
      <h1>图片上传</h1>
      <Flex justify="center" align="center" vertical wrap>
        <Card hoverable className="card cardFixed">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到该区域进行上传</p>
            <p className="ant-upload-hint">一次性支持单个或多个图片上传</p>
          </Dragger>
        </Card>
      </Flex>
    </div>
  )
}

export default ImgsView
