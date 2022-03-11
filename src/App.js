import React, { useState, useEffect } from 'react'
import './App.css';
import { Button } from 'antd';
import TableDatasets from './TableDatasets'
import AddDatasetModal from './AddDatasetModal'
import axios from 'axios';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([])
  const getDataset = async() => {
    return await axios.get(`http://localhost:9000/get-datasets`).then(
      res => setDataSource(res.data)
    )
  }
  useEffect(() => {
    getDataset()
  }, [])


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (id) => {
    console.log({id})
    axios.post(`http://localhost:9000/store-dataset`, { id })
      .then(() => getDataset())
      .catch(err => console.log(err))
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteRow = (_id) => {
    console.log({_id})
    axios.post(`http://localhost:9000/remove-dataset`, { _id })
    .then(() => getDataset())
    .catch(err => console.log(err))
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add new dataset
      </Button>
      <TableDatasets
        dataSource={dataSource}
        handleDelete={handleDeleteRow}
      />
      { isModalVisible &&
        <AddDatasetModal
          isModalVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      }
    </>
  )
}

export default App;
