import React from 'react'
import { Table } from 'antd';

const PreviewDatasetTable = ({
  dataSource,
}) => {
  const columns = Object.keys(dataSource[0])
    .slice(0, 15)
    .reduce((acc, columnName) => {
      acc.push({
        title: columnName,
        dataIndex: columnName,
        key: columnName,
      })
      return acc
    }, [])

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: 760 }}
    />
  )
}

export default PreviewDatasetTable