import React, { useState, useEffect } from 'react'
import './App.css';
import { Button, message } from 'antd';
import TableDatasets from './TableDatasets'
import AddDatasetModal from './AddDatasetModal'
import axios from 'axios';
import io from 'socket.io-client'

const socket = io('http://localhost:9000/downloadprogress')

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

  useEffect(() => {
    socket.on('dataset_download_progress_event', (incomingDataset) => {
      console.log({incomingDataset})
      handleSocketDownloadProgress(incomingDataset)
    })
  }, [])

  const handleSocketDownloadProgress = (incomingDataset) => {
    if (!incomingDataset) return

    setDataSource(prev => {
      if (!prev.length) return

      return prev.map(rowData => {
        if (rowData._id === incomingDataset.data._id) {
          const percentage = incomingDataset.data.payload.percentage
          const path = incomingDataset?.data?.payload?.path || ''
          const currentPercentage = (Math.round(percentage * 100)).toFixed(2)
          return {
            ...rowData,
            path,
            downloadProgress: currentPercentage
          }
        }
        return rowData
      })

    })
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (id) => {
    if (!id) {
      return message.warning('Please insert an OpenML ID');
    }
    axios.post(`http://localhost:9000/store-dataset`, { id, type: 'openml' })
      .then(() => {
        getDataset()
        setIsModalVisible(false);
      })
      .catch(error => {
        if (error?.response?.data?.message === 'duplicate dataset added') {
          message.warning('Duplicate dataset, try another one');
        } else {
          message.warning('Something went wrong');
        }
      })
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
