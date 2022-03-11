import React, { useState } from 'react'
import { Modal } from 'antd';
import { Input } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
const AddDatasetModal = ({
  isModalVisible,
  handleOk,
  handleCancel,
}) => {
  const [openmlId, setOpenmlId] = useState('')
  const handleSubmit = () => {
    if (!openmlId) handleCancel()
    handleOk(openmlId)
  }
  return (
    <>
      <Modal
        title="Add new dataset"
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Title level={5}> Input the openml Id</Title>
        <Input
          placeholder="123"
          onChange={(e) => {
            setOpenmlId(e.target.value)
          }}
        />
      </Modal>
    </>
  )
}

export default AddDatasetModal