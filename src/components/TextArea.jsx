import React from 'react'
import { IoSend } from "react-icons/io5"
function TextArea({onChange, onClick, value}) {
  return (
    <div className='prompt'>
      <textarea placeholder='try typing something...' onChange={onChange} value={value} ></textarea>
      <button onClick={onClick}><i><IoSend /></i></button>
    </div>
  )
}

export default TextArea
