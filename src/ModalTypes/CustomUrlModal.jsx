import React from "react"
import { Input } from 'antd';
import { Typography } from 'antd';

const CustomUrlModal = ({ onChangeInput }) => {
  const { Title } = Typography;

  const handleChange = (event) => {
    onChangeInput(event.target.value)
  }

  return (
    <>
      <Title level={5}>Custom Url</Title>
      <Input
        placeholder="https://www.openml.org/data/v1/download/4/labor.arff"
        onChange={handleChange}
      />
    </>
  )
}

export default CustomUrlModal