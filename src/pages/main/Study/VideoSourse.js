import React from 'react'
import { Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
export default function VideoSourse() {
  return (
    <div>
      <div style={{ textAlign: 'right', marginRight: '30px' }}>
        <Button 
          type="primary"
          icon={<PlusCircleOutlined />}
        >添加课程</Button>
      </div>
    </div>
  )
}
