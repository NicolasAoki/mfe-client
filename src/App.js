import React, { useState, useEffect } from 'react'
import './App.css';
import { Button, message, Spin } from 'antd';
import TableDatasets from './TableDatasets'
import AddDatasetModal from './AddDatasetModal'
import axios from 'axios';
import io from 'socket.io-client'
import PreviewDatasetModal from './ModalTypes/PreviewDatasetModal'

const socket = io('http://localhost:9000/downloadprogress')

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false)
  const [previewDataset, setDatasetPreview] = useState({})
  const [dataSource, setDataSource] = useState([])

  const getDataset = async() => {
    setLoading(true)
    return await axios.get(`http://localhost:9000/get-datasets`).then(
      res => {
        setDataSource(res.data)
        setLoading(false)
      }
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

  const handleOpemlSubmit = (id) => {
    if (!id) {
      return message.warning('Please insert an OpenML ID');
    }
    setLoading(true)
    axios.post(`http://localhost:9000/store-dataset`, { id, type: 'openml' })
      .then(() => {
        setLoading(false)
        getDataset()
        setIsModalVisible(false);
      })
      .catch(error => {
        setLoading(false)
        if (error?.response?.data?.message === 'duplicate dataset added') {
          message.warning('Duplicate dataset, try another one');
        } else {
          message.warning('Something went wrong');
        }
      })
  }

  const handleCustomUrlSubmit = (url) => {
    if (!url) {
      return message.warning('Please insert a custom url');
    }
    setLoading(true)
    axios.post(`http://localhost:9000/store-dataset`, { url, type: 'customURL' })
      .then(() => {
        setLoading(false)
        getDataset()
        setIsModalVisible(false);
      })
      .catch(error => {
        setLoading(false)
        if (error?.response?.data?.message === 'duplicate dataset added') {
          message.warning('Duplicate dataset, try another one');
        } else {
          message.warning('Something went wrong');
        }
      })
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteRow = (_id) => {
    setLoading(true)
    axios.post(`http://localhost:9000/remove-dataset`, { _id })
    .then(() => {
      setLoading(false)
      getDataset()
    })
    .catch(err => {
      setLoading(false)
      console.log(err)
    })
  }

  const handlePreview = (_id) => {
    console.log('aqi', _id)
    console.log({_id})
    setLoading(true)
    axios.post(`http://localhost:9000/preview-dataset`, { _id })
    .then(({data}) => {
      setLoading(false)
      setDatasetPreview(data)
      setIsPreviewModalVisible(true)
    })
    .catch(err => {
      setLoading(false)
      console.log(err)
    })
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add new dataset
      </Button>
      <Spin
        spinning={loading}
        size={'large'}
      >
        <TableDatasets
          dataSource={dataSource}
          handleDelete={handleDeleteRow}
          handlePreview={handlePreview}
        />
      </Spin>
      { isModalVisible &&
        <Spin spinning={loading} size={'large'} tip={'Loading...'}>
          <AddDatasetModal
            reloadDatasetTable={getDataset}
            isModalVisible={isModalVisible}
            handleOpemlSubmit={handleOpemlSubmit}
            handleCustomUrlSubmit={handleCustomUrlSubmit}
            handleCancel={handleCancel}
            loading={loading}
          />
        </Spin>
      }
      { isPreviewModalVisible && 
        <PreviewDatasetModal
          handleVisible={setIsPreviewModalVisible}
          previewDataset={previewDataset}
        />
      }
    </>
  )
}

export default App;
