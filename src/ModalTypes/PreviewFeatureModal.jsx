import React from "react"
import { Modal, Tabs } from 'antd'
import PreviewFeatureTable from '../Tables/PreviewFeatureTable'
import FeaturesBars from "../Graphs/FeaturesBars"
const PreviewFeatureModal = ({
  handleVisible,
  featurePreview,
}) => {
  return (
    <Modal
      title="Preview Feature"
      visible
      onOk={() => handleVisible(false)}
      onCancel={() => handleVisible(false)}
      width={1440}
    >
      <Tabs defaultActiveKey="2">
        <Tabs.TabPane tab="Meta features" key="1">
          <PreviewFeatureTable
            dataSource={featurePreview}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Graphs info" key="2">
          <FeaturesBars
            dataSource={featurePreview}
          />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  )
}

export default PreviewFeatureModal