import React, { useState } from 'react'
import { Modal } from 'antd';
import OpenMLModal from './ModalTypes/OpenMLModal'
import CustomUrlModal from './ModalTypes/CustomUrlModal'
import SelectDatasets from './SelectDatasets'
import LocalStorageModal from './ModalTypes/LocalStorageModal'

const AddDatasetModal = ({
  isModalVisible,
  handleOk,
  handleCancel,
}) => {
  const [modalType, setModalType] = useState({
    openml: false,
    localStorage: false,
    customUrl: false,
  })
  const [openmlId, setOpenmlId] = useState('')

  const handleSubmit = () => {
    if (!openmlId) handleCancel()
    handleOk(openmlId)
  }

  const handleOnChangeModalType = (incomingModalType) => {
    setModalType(prev => {
      return Object.keys(prev).reduce((acc, modal) => {
        return {
          ...acc,
          [modal]: false,
          [incomingModalType]: true,
        }
      }, {})
    })
  }

  return (
    <>
      <Modal
        title="Add new dataset"
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <SelectDatasets onChange={handleOnChangeModalType}/>
        { !!modalType.openml &&
          <OpenMLModal onChangeInput={setOpenmlId}/>
        }
        { !!modalType.localStorage &&
          <LocalStorageModal/>
        }
        { !!modalType.customUrl &&
          <CustomUrlModal onChangeInput={setOpenmlId}/>
        }
      </Modal>
    </>
  )
}

export default AddDatasetModal