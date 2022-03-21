import React from 'react'
import { Table, Space, Progress } from 'antd';

const TableDatasets = ({
  dataSource,
  handleDelete,
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
      title: 'Format',
      dataIndex: 'format',
      key: 'format',
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
            <Progress percent={downloadProgress} size="small" />
            {/* <Progress percent={50} size="small" status="active" />
            <Progress percent={70} size="small" status="exception" />
            <Progress percent={100} size="small" /> */}
          </div>
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleDelete(record._id)}>Delete</a>
        </Space>
      ),
    },
  ];
    
  const handleDataSource = () => {
    console.log({dataSource})
    if (!dataSource.length) return []
    return dataSource.map(data => ({
      _id: data._id,
      key: data._id,
      name: data.name,
      path: data.path,
      downloadLink: data.downloadLink,
      downloadProgress: data.downloadProgress,
      format: data.format,
    }))
  }

  return (
    <Table
      columns={columns}
      dataSource={handleDataSource()}
    />
  )
}

export default TableDatasets
