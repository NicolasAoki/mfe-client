import React from "react"
import { Input } from 'antd';
import { Typography } from 'antd';

const OpenMLModal = ({ onChangeInput }) => {
  const { Title } = Typography;

  const handleChange = (event) => {
    onChangeInput(event.target.value)
  }

  return (
    <>
      <Title level={5}>OpenML Id</Title>
      <Input
        placeholder="123"
        onChange={handleChange}
      />
    </>
  )
}

export default OpenMLModal