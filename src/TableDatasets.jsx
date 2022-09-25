import React from 'react'
import {
  Table,
  Space,
  Progress,
} from 'antd';

const TableDatasets = ({
  dataSource,
  handleDelete,
  handlePreview,
  setSelectedRowKeys,
  selectedRowKeys,
}) => {

  const columns = [
    {
      title: 'id',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Path',
      dataIndex: 'path',
      key: 'path',
    },
    {
      title: 'Downloaded',
      dataIndex: 'downloadProgress',
      key: 'downloadProgress',
      render: downloadProgress => (
        <>
          <div style={{ width: 170 }}>
            <Progress percent={downloadProgress} size="small"/>
          </div>
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handlePreview(record._id)}>Preview</a>
          <a onClick={() => handleDelete(record._id)}>Delete</a>
        </Space>
      ),
    },
  ];
    
  const handleDataSource = () => {
    if (!dataSource.length) return []
    return dataSource.map(data => ({
      _id: data._id,
      key: data._id,
      name: data.name,
      path: data.path,
      downloadLink: data.downloadLink,
      downloadProgress: data.downloadProgress,
      type: data.type,
    }))
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys) => {
      setSelectedRowKeys(newSelectedRowKeys)
    }
  };

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={handleDataSource()}
    />
  )
}

export default TableDatasets
