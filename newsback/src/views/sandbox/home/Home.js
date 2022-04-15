import React from 'react'
import {Button} from 'antd'
import axios from 'axios'

export default function Home() {
  const ajax = () =>{
      axios.put("http://localhost:8000/posts/1", {
        title: "1111-edit"
      })
  }

  return (
    <div>
      home
      <Button type='primary' onClick={ajax}>Test</Button>
    </div>
  )

  //
}
