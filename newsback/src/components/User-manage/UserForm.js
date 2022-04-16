import React, { forwardRef, useEffect, useState } from "react";
import {Form, Input, Select} from "antd";

const { Option } = Select;

const  UserForm = forwardRef((props,ref) => {
    const [isDisabled,setisDisabled] = useState(false)

    useEffect(()=>{
      setisDisabled(props.isUpdateDisabled)
    },[props.isUpdateDisabled])

    return(
        <Form
        ref={ref}
        layout="vertical"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input the user name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input the user password' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="region"
          label="Region"
          rules={isDisabled?[]:[{ required: true, message: 'Please input the user region' }]}
        >
          <Select disabled={isDisabled}>
            {
              props.regionList.map(item=>
                <Option value={item.value} key={item.id}>
                  {item.title}
                </Option>)
            }
          </Select>
        </Form.Item>
        <Form.Item
          name="roleId"
          label="Role"
          rules={[{ required: true, message: 'Please input the user region' }]}
        >
          <Select onChange={(value)=>{
              if(value === 1){
                  setisDisabled(true)
                  ref.current.setFieldsValue({
                      region: ""
                  })
              }else{
                  setisDisabled(false)
              }
          }}>
            {
              props.roleList.map(item=>
                <Option value={item.id} key={item.id}>
                  {item.roleName}
                </Option>)
            }
          </Select>
        </Form.Item>
      </Form>
    )
})
export default UserForm;