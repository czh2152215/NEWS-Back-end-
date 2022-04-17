import {
    React, 
    Component,
  } from 'react';
import './Login.css'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
  
function Login(props){
    let navigate = useNavigate();
    const onFinish =(values)=>{

      axios.get(`http://localhost:5000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then
      (res=>{
          if(res.data.length===0){
              message.error("Incorrect username or password")
          }else{
              localStorage.setItem("token", JSON.stringify(res.data[0]))
              window.location.href=("http://localhost:3000/#/home")
          }
      })
    }
  
      return(
        <div className='lg_bg'>
          <div className='lg_cb'>
            <p className='lg_cb_tit'>News System</p>
          <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        wrapperCol={{ span: 16 }}
        labelCol={{ span: 6 }}
        colon={false}
      >
        <Form.Item
          name="username"
          label={<label style={{ color: "white" }}><UserOutlined className="site-form-item-icon" />&nbsp;Username:</label>}
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input style={{borderRadius:"8px"}}/>
        </Form.Item>
  
        <Form.Item
          name="password"
          label={<label style={{ color: "white" }}><LockOutlined className="site-form-item-icon" />&nbsp;Password:</label>}
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password style={{borderRadius:"8px"}}/>
        </Form.Item>
  
        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 2, span: 15 }}>
          <Checkbox style={{ color: "white"}}>Remember me</Checkbox>
        </Form.Item>
  
        <Form.Item wrapperCol={{ offset: 2, span: 12 }}>
          <Button type="primary" htmlType="submit" style={{borderRadius:"10px"}}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>
        </div>
      )
    
  }

  export default Login
  