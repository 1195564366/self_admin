import React, { Component } from 'react'
import { Button, Table, Modal } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

class Account extends Component {
  constructor (props) {
    super(props)
    this.state = {
      total: 0,
      pageObj: {
        pageNo: 1,
        pageSize: 10
      },
      list: [],
      loading: false,
      modelShow: false,
      modelType: 1, // 1：新增 2：编辑
    }
  }
  componentDidMount () {
    // console.log('componentDidMount', React, this)
    this.getList()
  }

  async getList () {
    this.setState({
      loading: true
    })
    const result = await React.$fetchPost('/admin/account/list', this.state.pageObj)
    this.setState({
      list: result.data.rows.map(item => {
        item.key = item.id
        return item
      }),
      total: result.data.total,
      loading: false
    })
  }

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '账号',
        dataIndex: 'account',
        key: 'account',
      },
    ];

    return (
      <div>
        {/* 顶部操作区域 */}
        <div style={{ textAlign: 'right', marginBottom: '20px' }}>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />} onClick={() => {
              this.setState({
                modelType: 1,
                modelShow: true
              })
            }}>
            新增账号
          </Button>
        </div>
        {/* 表格区域 */}
        <div className="table-container">
          <Table dataSource={this.state.list} columns={columns} loading={this.state.loading}/>
        </div>
        {/* 新增/修改弹窗 */}
        <Modal
          title="新增账号"
          // centered
          visible={this.state.modelShow}
          onOk={() => {
            this.setState({
              modelShow: false
            })
          }}
          onCancel={() => {
            this.setState({
              modelShow: false
            })
          }}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    )
  }
}
export default Account