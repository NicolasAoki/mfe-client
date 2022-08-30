import React from "react"
import { Modal } from 'antd'
import PreviewFeatureTable from '../Tables/PreviewFeatureTable'
const PreviewFeatureModal = ({
  handleVisible,
  featurePreview,
}) => {
  console.log({featurePreview})
  return (
    <>
      <Modal
        title="Preview Feature"
        visible
        onOk={() => handleVisible(false)}
        onCancel={() => handleVisible(false)}
        width={1024}
      >
        <PreviewFeatureTable
          dataSource={featurePreview}
        />
      </Modal>
    </>
  )
}

export default PreviewFeatureModal