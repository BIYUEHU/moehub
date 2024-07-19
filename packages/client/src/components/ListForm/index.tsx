import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Space } from 'antd'

interface ListItemProps {
  name: string
  children: (name: number) => JSX.Element
  addButtonText: string
}

const ListForm: React.FC<ListItemProps> = ({ name, children, addButtonText }) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              {children(name)}
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              {addButtonText}
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  )
}

export default ListForm
