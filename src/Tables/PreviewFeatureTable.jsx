import React from 'react'
import { Table } from 'antd';

const PreviewDatasetTable = ({ dataSource }) => {
  const columnsKeys = dataSource[0].keys
    .reduce((acc, columnName) => {
      acc.push({
        title: columnName,
        dataIndex: columnName,
        key: columnName,
      })
      return acc
    }, [])

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
      ...columnsKeys
    ]

    const handleDataSource = () => {
      if (!dataSource.length) return []
      return dataSource.map((data, i) => {
        
        const features = data.keys.reduce((acc,feature, i) => ({
          ...acc,
          [feature]: data.values[i]
        }), {})

        return {
          _id: data._id,
          name: data.name,
          ...features
        }
      })
    }

    console.log(handleDataSource())
  return (
    <Table
      columns={columns}
      dataSource={handleDataSource()}
      scroll={{ x: 760 }}
    />
  )
}

export default PreviewDatasetTable