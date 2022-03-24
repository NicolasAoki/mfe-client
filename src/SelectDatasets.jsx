import React from "react"
import { Select } from 'antd';
import { DATASET_TYPES } from './constants'

const SelectDatasets = ({ onChange }) => {
  const { Option } = Select;

  return (
    <div style={localStyle.selectBlock}>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Search to Select"
        onChange={onChange}
      >
        <Option value={DATASET_TYPES.OPENML}>OpenML</Option>
        <Option value={DATASET_TYPES.LOCAL_STORAGE}>Local Storage</Option>
        <Option value={DATASET_TYPES.CUSTOM_URL}>Custom URL</Option>
      </Select>
    </div>
  )
}

const localStyle = {
  selectBlock: {
    display: 'flex',
    justifyContent: 'center',
  }
}

export default SelectDatasets