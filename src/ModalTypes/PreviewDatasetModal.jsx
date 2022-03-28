import React from "react"
import { Modal } from 'antd'
import PreviewDatasetTable from '../Tables/PreviewDatasetTable'
const PreviewDatasetModal = ({
  handleVisible,
  previewDataset,
}) => {
  return (
    <>
      <Modal
        title="Preview Dataset"
        visible
        onOk={() => handleVisible(false)}
        onCancel={() => handleVisible(false)}
        width={1024}
      >
        <PreviewDatasetTable
          dataSource={previewDataset}
        />
      </Modal>
    </>
  )
}

export default PreviewDatasetModal