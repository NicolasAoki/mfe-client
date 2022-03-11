import React from 'react'
import { Table, Space } from 'antd';

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
      title: 'Download Link',
      dataIndex: 'downloadLink',
      key: 'downloadLink',
      render: text => <a>{text}</a>,
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
      downloadLink: data.downloadLink,
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
